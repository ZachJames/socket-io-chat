const express = require("express");
const path = require("path");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static(path.join(__dirname, "public")));

let numUsersInRoom = 0;

io.on("connection", socket => {
  let userAdded = false;

  socket.on("login user", username => {
    console.log(username);
  });
});

const PORT = 3000;
http.listen(PORT, () => console.log(`> Server live on port ${PORT}`));
