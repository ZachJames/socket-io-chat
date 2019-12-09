$(function() {
  const selectUsernamePage = $('.select-username')
  const chatPage = $('.chat')
  const usernameInput = $('.username-input')
  const messageInput = $('.message-input')
  const messages = $('.messages')
  const usernameDisplay = $('.username-display')
  const userCount = $('.user-count')

  let username = null
  let usernameColor = null

  const socket = io()
  const colors = [
    '#e21400',
    '#91580f',
    '#f8a700',
    '#f78b00',
    '#58dc00',
    '#287b00',
    '#a8f07a',
    '#4ae8c4',
    '#3b88eb',
    '#3824aa',
    '#a700ff',
    '#d300e7',
  ]

  const addMessageToChat = ({ message, username }) => {
    messages.append(
      `<li><span class="message-username" style="color: ${usernameColor}">${username}:</span>${message}</li>`
    )
  }

  // Login the user
  const login = () => {
    username = usernameInput.val().trim()

    if (username.length > 0) {
      socket.emit('user logged in', username)
      usernameDisplay.text(username)
      usernameColor = getRandomColor()
      selectUsernamePage.hide()
      chatPage.show()
      messageInput.focus()
    }
  }

  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)]

  // When user submits username form
  $('.username-form').submit(e => {
    e.preventDefault()
    login()
  })

  // When user submits a new message
  $('.message-form').submit(e => {
    e.preventDefault()
    const message = $('.message-input')
      .val()
      .trim()
    socket.emit('new message', { message, username })
  })

  /* Socket events */

  // Whenever the server emits 'login', log the login message
  socket.on('user logged in', ({ numUsersInRoom }) => {
    // connected = true
    // Display the welcome message
    // var message = 'Welcome to Socket.IO Chat – '
    // log(message, {
    //   prepend: true,
    // })
  })

  socket.on('update number of users', ({ numUsersInRoom }) => {
    let text = ''
    if (numUsersInRoom === 1) {
      text += '1 user online'
    } else {
      text += `${numUsersInRoom} users online`
    }
    console.log(text)
    userCount.text(text)
  })

  socket.on('new message', ({ message, username }) => {
    addMessageToChat({ message, username })
  })

  usernameInput.focus()
})()
