const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const path = require('path')
const cors = require('cors')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(cors())

const { addUser, deleteUser, getUser, getNumUsersInChat } = require('./users')

io.on('connection', socket => {
  socket.on('addUserToChat', user => {
    const { username, userColor } = user
    const { newUser } = addUser({ id: socket.id, username, userColor })
    socket.emit('log', { text: `Hey ${newUser.username}, welcome to the chat!` })
    socket.broadcast.emit('log', { text: `${newUser.username} joined the room!` })
    io.emit('updateChatInfo', { numUsers: getNumUsersInChat() })
  })

  socket.on('sendMessage', (message, cb) => {
    const { username, userColor } = getUser(socket.id)
    io.emit('message', { username, userColor, text: message })
    cb()
  })

  socket.on('disconnect', () => {
    deleteUser(socket.id)
    io.emit('updateChatInfo', { numUsers: getNumUsersInChat() })
  })
})

if (process.env.NODE_ENV === 'production') {
  // Serve React app in production
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`))
