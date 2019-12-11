const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const path = require('path')

const { addUser, deleteUser, getUser, getNumUsersInChat } = require('./users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(path.join(__dirname, '../../build')))

app.get('/', (req, res) => {
  res.sendFile(__dirname + './index.html')
})

app.get('*', (req, res) => res.redirect('/'))

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

const PORT = process.env.PORT || 8080
server.listen(PORT, () => console.log(`Server has started on port ${PORT}.`))
