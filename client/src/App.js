import React, { useEffect } from 'react'
import io from 'socket.io-client'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'

import { SettingsProvider } from './store'
import { Chat, Settings } from './pages'
import GlobalStyles from './GlobalStyles'

const SOCKET_ENDPOINT = 'http://localhost:9000'

function App() {
  useEffect(() => {
    const socket = io(SOCKET_ENDPOINT)
    socket.emit('')
  }, [])

  return (
    <SettingsProvider>
      <GlobalStyles />
      <Router>
        <Route exact path="/" component={() => <Redirect to="/settings" />} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/chat" component={Chat} />
      </Router>
    </SettingsProvider>
  )
}

export default App
