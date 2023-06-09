const path = require("path");
const express = require("express");
const http = require("http");
const socket = require("socket.io");
const formatMsg = require("./utils/format");

const app = express();
const server = http.createServer(app);
const io = socket(server);

// app.use(express.static(path.join(__dirname, "public")));
const nameOfBot = "Chat-Bit-Bot";

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username }) => {
    socket.emit("message", formatMsg(nameOfBot, `Welcome ${username}`));

    socket.broadcast.emit("new-user", (name) => {
      io.emit(
        "message",
        formatMsg(nameOfBot, `${username} Has Joined The Chat`)
      );
    });
    socket.on("disconnect", () => {
      io.emit("message", formatMsg(nameOfBot, `${username} Has Left The Chat`));
    });
    socket.on("chatMessage", (msg) => {
      io.emit("message", formatMsg(`${username}`, msg));
    });
  });
});

// const PORT = 3000 || process.env.PORT;

// server.listen(PORT, () => console.log("running On " + PORT));
app.get(express.static(path.join("__dirname", "public")));
// module.exports.handler = serverless(app);

module.exports = app;
