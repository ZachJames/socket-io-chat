import React from 'react'
import styled from 'styled-components'
import Fade from 'react-reveal/Fade'

import { useSettings } from '../store'

const colors = [
  '#3b88eb',
  '#ff4330',
  '#f78b00',
  '#58dc00',
  '#ffea58',
  '#4ae8c4',
  '#3824aa',
  '#d300e7',
]

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1.5rem;
  div {
    margin-bottom: 60px;
  }
`

const Text = styled.p`
  margin: 8px;
  color: #ccc;
`

const UsernameInput = styled.input`
  border: none;
  background-color: transparent;
  border-bottom: 1px solid #fff;
  color: #fff;
  font-size: inherit;
  text-align: center;
  padding: 8px;
  &:focus {
    outline: none;
  }
  ::placeholder {
    color: #ccc;
  }
`

const ColorSelectList = styled.ul`
  list-style: none;
  margin-top: 15px;
  display: flex;
`

const ColorBoxButton = styled.button`
  cursor: pointer;
  width: 35px;
  height: 35px;
  margin: 4px;
  border-radius: 3px;
  background-color: ${({ color }) => (color ? color : 'blue')};
  border: ${({ selected }) => (selected ? '2px solid #fff' : 'none')};
  outline: none;
  &:hover {
    filter: brightness(75%);
    transition: filter 0.3s;
  }
`

const SaveButton = styled.button`
  border: 1px solid #ccc;
  padding: 6px 10px 6px 10px;
  cursor: pointer;
  background-color: transparent;
  color: #ccc;
  border-radius: 3px;
  font-size: inherit;
  &:hover {
    background-color: #fff;
    color: #000;
  }
  &:active {
    transform: translateY(4px);
    transition: all 0.3s;
  }
`

function Settings() {
  const { state, dispatch } = useSettings()

  return (
    <Fade duration={2000}>
      <Container>
        <div>
          <UsernameInput
            value={state.username}
            placeholder="Enter username..."
            onFocus={e => (e.target.placeholder = '')}
            onBlur={e => (e.target.placeholder = 'Enter username...')}
            onChange={e =>
              dispatch({ type: 'SET_USERNAME', payload: e.target.value })
            }
          />
        </div>
        <div>
          <Text>Choose your color:</Text>
          <ColorSelectList>
            {colors.map(color => (
              <li key={color}>
                <ColorBoxButton
                  selected={state.userColor === color}
                  color={color}
                  onClick={() =>
                    dispatch({ type: 'SET_USER_COLOR', payload: color })
                  }
                />
              </li>
            ))}
          </ColorSelectList>
        </div>
        <div>
          <SaveButton>Save</SaveButton>
        </div>
      </Container>
    </Fade>
  )
}

export default Settings
