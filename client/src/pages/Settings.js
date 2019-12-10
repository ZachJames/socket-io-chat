import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
`

const UsernameInput = styled.input`
  border: none;
  background-color: transparent;
  border-bottom: 1px solid #fff;
  color: #fff;
  font-size: inherit;
  text-align: center;
  margin-top: 15px;
  padding: 8px;

  &:focus {
    outline: none;
  }
`

function Settings() {
  return (
    <Container>
      <div>
        <p>Enter your username</p>
        <UsernameInput />
      </div>
    </Container>
  )
}

export default Settings
