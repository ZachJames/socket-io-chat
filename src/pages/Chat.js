import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import Fade from 'react-reveal/Fade'

import { useSettings } from '../store'
import socket from '../socket-api'

const TYPING_TIMER_LENGTH = 400

const Container = styled.div`
  padding: 40px;
  font-size: 1.4rem;
`

const ChatBanner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

const ChatMessages = styled.div`
  overflow: hidden;
  height: 100%;
  ul {
    list-style: none;
    font-size: 1.3rem;
  }
`

const Message = styled.li`
  margin-bottom: 7px;
  line-height: 1.4;
`

const Username = styled.span`
  color: ${props => props.color};
  font-weight: bold;
  margin-right: 13px;
`

const MessageText = styled.span``

const MessageInput = styled.input`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  font-size: 1.5rem;
  padding: 40px;
  border: none;
  color: #fff;
  background: transparent;
  &:focus {
    outline: none;
  }
`

function Chat() {
  const { state } = useSettings()
  const [numUsersInChat, setNumUsersInChat] = useState(0)
  const [messages, setMessages] = useState([])
  const [messageInput, setMessageInput] = useState('')
  // const [isTyping, setIsTyping] = useState(false)
  // const [lastTypingTime, setLastTypingTime] = useState(null)

  useEffect(() => {
    socket.on('updateChatInfo', ({ numUsers }) => {
      setNumUsersInChat(numUsers)
    })

    socket.on('message', message => {
      setMessages([...messages, message])
    })

    return () => {
      socket.emit('disconnect')
      socket.off()
    }
  }, [messages])

  const onSendMessage = e => {
    e.preventDefault()
    if (messageInput !== '') {
      socket.emit('sendMessage', messageInput, () => {
        setMessageInput('')
      })
    }
  }

  const handleTyping = e => {
    setMessageInput(e.target.value)

    // if (!isTyping) {
    //   setIsTyping(true)
    //   socket.emit('isTyping')
    // }

    // setLastTypingTime(new Date().getTime())

    // setTimeout(() => {
    //   const typingTimer = new Date().getTime()
    //   const timeDiff = typingTimer - lastTypingTime
    //   if (timeDiff >= TYPING_TIMER_LENGTH && isTyping) {
    //     socket.emit('stopTyping')
    //     setIsTyping(false)
    //   }
    // }, TYPING_TIMER_LENGTH)
  }

  return state.username === '' ? (
    <Redirect to="/settings" />
  ) : (
    <Fade duration={1000}>
      <Container>
        <ChatBanner>
          <div>{numUsersInChat} online users</div>
          <div>Logged in as {state.username}</div>
        </ChatBanner>
        <ChatMessages>
          <ul>
            {messages.map((message, i) => (
              <Fade duration={300} key={i}>
                <Message>
                  <Username color={message.userColor}>{message.username}</Username>
                  <MessageText>{message.text}</MessageText>
                </Message>
              </Fade>
            ))}
          </ul>
        </ChatMessages>
        <form onSubmit={onSendMessage}>
          <MessageInput
            placeholder="Enter a message..."
            onChange={handleTyping}
            value={messageInput}
          />
        </form>
      </Container>
    </Fade>
  )
}

export default Chat
