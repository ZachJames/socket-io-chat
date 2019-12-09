const express = require('express')
const path = require('path')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use(express.static(path.join(__dirname, 'public')))

let numUsersInRoom = 0

io.on('connection', socket => {
  let thisUserLoggedIn = false

  // When a user logs in, store the username in socket session
  // and increment num users in room
  socket.on('user logged in', username => {
    if (thisUserLoggedIn) return

    socket.username = username
    numUsersInRoom++
    thisUserLoggedIn = true
    socket.broadcast.emit('update number of users', { numUsersInRoom })
  })

  // When someone is typing
  socket.on('user typing', () => {
    socket.broadcast.emit('user typing', {
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
    if (thisUserLoggedIn) {
      numUsersInRoom--
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsersInRoom: numUsersInRoom,
      })
    }
  })
})

const PORT = 3000
http.listen(PORT, () => console.log(`> Server live on port ${PORT}`))
