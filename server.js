const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/chat.html");
});

io.on("connection", socket => {
  io.emit("user joined");
  socket.on("disconnection", () => io.emit("user left"));
  socket.on("chat message", msg => io.emit("chat message", msg));
});

const PORT = 3000;
http.listen(PORT, () => console.log(`> Server live on port ${PORT}`));
