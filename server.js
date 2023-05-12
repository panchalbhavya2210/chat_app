const path = require("path");
const express = require("express");
const http = require("http");
const socket = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  socket.emit("message", "Welcome");

  socket.broadcast.emit("userName", (name) => {
    io.emit("message", name);
  });
  // socket.broadcast.emit("new-user", (name) => {
  //   io.emit("message", "user joined");
  // });
  socket.on("disconnect", () => {
    io.emit("message", "user left");
  });
  socket.on("chatMessage", (msg) => {
    io.emit("message", msg);
  });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log("running On " + PORT));
//
