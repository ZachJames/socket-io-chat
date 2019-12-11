import React, { createContext, useReducer, useContext } from 'react'

const SettingsContext = createContext()

const INITIAL_STATE = {
  username: '',
  userColor: '#3b88eb',
  loggedIn: false,
}

function reducer(state, { type, payload }) {
  switch (type) {
    case 'SET_USERNAME': {
      return { ...state, username: payload }
    }
    case 'SET_USER_COLOR': {
      return { ...state, userColor: payload }
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`)
    }
  }
}

function SettingsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
  return (
    <SettingsContext.Provider value={{ state, dispatch }}>
      {children}
    </SettingsContext.Provider>
  )
}

function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}

export { SettingsProvider, useSettings }
