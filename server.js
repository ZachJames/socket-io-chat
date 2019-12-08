const express = require("express");
const session = require("express-session");
const {
  uniqueNamesGenerator,
  colors,
  adjectives,
  animals
} = require("unique-names-generator");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(
  session({
    secret: "change me soon!",
    name: "user",
    resave: false,
    saveUninitialized: true
  })
);

app.get("/", (req, res) => {
  if (!req.session.username) {
    req.session.username = uniqueNamesGenerator({
      dictionaries: [colors, adjectives, animals]
    });
  }

  res.sendFile(__dirname + "/chat.html");
});

io.on("connection", socket => {
  console.log(socket.request.session);
  io.emit("user joined");
  socket.on("disconnect", () => io.emit("user left"));
  socket.on("chat message", msg => io.emit("chat message", msg));
});

const PORT = 3000;
http.listen(PORT, () => console.log(`> Server live on port ${PORT}`));
