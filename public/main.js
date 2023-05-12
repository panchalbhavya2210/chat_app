const socket = io();

socket.on("message", (message) => {
  console.log(message);
});

let formOfMsg = document.getElementById("formOfMsg");

formOfMsg.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputField = document.getElementById("messageField").value;
  let name = document.getElementById("nameOfUser").value;

  socket.emit("userName", name);

  socket.emit("chatMessage", inputField);
});
