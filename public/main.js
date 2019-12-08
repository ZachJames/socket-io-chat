const socket = io();
const messageForm = document.getElementById("form");
const messageInput = document.getElementById("input");

function appendMessageToChat(message, type) {
  const newMsg = document.createElement("li");
  if (type === "light") {
    newMsg.className = "light";
  }
  const newMsgText = document.createTextNode(message);
  newMsg.appendChild(newMsgText);
  document.getElementById("messages").appendChild(newMsg);
}

messageForm.onsubmit = e => {
  e.preventDefault();
  if (messageInput.value.tim() !== "") {
    socket.emit("chat message", messageInput.value);
    messageInput.value = "";
  }
  return false;
};

socket.on("user joined", () => {
  appendMessageToChat("A new user joined the chat.", "light");
});

socket.on("user left", () => {
  appendMessageToChat("A user left the chat.", "light");
});

socket.on("chat message", msg => {
  appendMessageToChat(msg);
});
