const express = require("express");
const path = require("path");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static(path.join(__dirname, "public")));

let numUsersInRoom = 0;

io.on("connection", socket => {
  let userAdded = false;

  socket.on("chat message", msg => {
    socket.broadcast.emit("chat message", {
      msg,
      username: socket.username
    });
  });

  io.emit("user joined");
  socket.on("disconnect", () => io.emit("user left"));
});

const PORT = 3000;
http.listen(PORT, () => console.log(`> Server live on port ${PORT}`));
