const socket = io();

socket.on("message", (message) => {
  msgBody(message);
  console.log(message);

  let chatContainer = document.querySelector(".chatSection");

  chatContainer.scrollTo({
    top: 100000000000000000,
    behavior: "smooth",
  });
});

const { username } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

socket.emit("joinRoom", { username });

let formOfMsg = document.getElementById("formOfMsg");

formOfMsg.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputField = document.getElementById("messageField").value;

  socket.emit("chatMessage", inputField);
});

function msgBody(message) {
  let chatContainer = document.querySelector(".chatSection");
  let divCreator = document.createElement("div");

  divCreator.innerHTML = ` <div class="chatLimiterBg">
  <span class="msgDetail" id="userName">${message.userName}</span> | <span class="msgDetail" id="timeOfMsg">${message.time}</span><br><br>
  <p>
   ${message.text}
  </p>
</div>`;

  chatContainer.appendChild(divCreator);
}
