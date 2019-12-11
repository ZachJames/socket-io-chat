const io = require('socket.io')()

io.on('connection', socket => {
  socket.on('USER_LOGIN', ({ username, userColor }) => {
    console.log(username, userColor)
  })
})

const PORT = process.env.PORT || 9000
io.listen(PORT)
console.log(`> Socket server live on port ${PORT}`)
