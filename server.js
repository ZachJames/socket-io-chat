const express = require('express')
const path = require('path')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use(express.static(path.join(__dirname, 'public')))

let numberOfUsersInRoom = 0

io.on('connection', socket => {
  let userHasLoggedIn = false

  socket.on('LOGIN', ({ username }) => {
    if (userHasLoggedIn) return
    socket.username = username
    numberOfUsersInRoom++
    userHasLoggedIn = true
    io.emit('USER_JOINED', { username, numberOfUsersInRoom })
  })

  // When someone is typing
  socket.on('TYPING', () => {
    socket.broadcast.emit('USER_TYPING', {
      username: socket.username,
    })
  })

  socket.on('STOPPED_TYPING', () => {
    socket.emit('STOPPED_TYPING', {
      username: socket.username,
    })
  })

  // When someone stops typing
  socket.on('user stopped typing', () => {
    socket.broadcast.emit('user stopped typing', {
      username: socket.username,
    })
  })

  socket.on('new message', ({ message, username }) => {
    socket.emit('new message', { message, username })
  })

  socket.on('disconnect', () => {
    if (!userHasLoggedIn) return
    numberOfUsersInRoom--
    io.emit('USER_LEFT', {
      username: socket.username,
      numberOfUsersInRoom,
    })
  })
})

const PORT = process.env.PORT || 3000
http.listen(PORT, () => console.log(`> Server live on port ${PORT}`))
