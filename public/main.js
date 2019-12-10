$(function() {
  const selectUsernamePage = $('.select-username')
  const chatPage = $('.chat')
  const usernameInput = $('.username-input')
  const messageInput = $('.message-input')
  const messages = $('.messages')
  const usernameDisplay = $('.username-display')
  const userCount = $('.user-count')

  const socket = io()

  const usernameColors = [
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

  let username = null
  let usernameColor = null
  let isTyping = false

  // Append new message to chat
  const addMessageToChat = ({ message, username }) => {
    const usernameSpan = $('<span class="message-username"/>')
      .text(username)
      .css('color', getRandomUsernameColor())

    const listItem = $('<li>')
      .text(message)
      .prepend(usernameSpan)

    messages.append(listItem)

    // $messages[0].scrollTop = $messages[0].scrollHeight
  }

  // Login the user
  const login = () => {
    username = usernameInput.val().trim()

    if (username.length > 0) {
      socket.emit('LOGIN', { username })
      usernameDisplay.text(username)
      usernameColor = getRandomUsernameColor()
      selectUsernamePage.hide()
      chatPage.show()
      messageInput.focus()
    }
  }

  // Get a random color for username color
  const getRandomUsernameColor = () =>
    usernameColors[Math.floor(Math.random() * usernameColors.length)]

  /* DOM Events */

  // When user submits username form
  $('.username-form').submit(e => {
    e.preventDefault()
    login()
  })

  messageInput.on('input', () => {
    if (!isTyping) {
      isTyping = true
      socket.emit('TYPING')
    }

    const lastTypingTime = new Date().getTime()

    setTimeout(() => {
      const typingTimer = new Date().getTime()
      const timeDiff = typingTimer - lastTypingTime
      if (timeDiff >= 2000 && isTyping) {
        socket.emit('STOPPED_TYPING')
        isTyping = false
      }
    }, 2000)
  })

  // When user submits a new message
  $('.message-form').submit(e => {
    e.preventDefault()
    const message = $('.message-input')
      .val()
      .trim()
    socket.emit('NEW_MESSAGE', { message })
    messageInput.val('')
  })

  /* Socket events */

  socket.on('USER_JOINED', ({ username, numberOfUsersInRoom }) => {
    console.log(username, 'joined')
    let text = '1 user online'
    if (numberOfUsersInRoom > 1) {
      text = `${numberOfUsersInRoom} users online`
    }
    userCount.text(text)
  })

  socket.on('USER_LEFT', ({ username, numberOfUsersInRoom }) => {
    console.log(username, 'left')
  })

  socket.on('USER_TYPING', ({ username }) => {
    addMessageToChat({ message: 'is typing', username })
  })

  socket.on('NEW_MESSAGE', ({ message, username }) => {
    addMessageToChat({ message, username })
  })

  usernameInput.focus()
})()
