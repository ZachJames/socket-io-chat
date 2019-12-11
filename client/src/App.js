import React from 'react'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import io from 'socket.io-client'

import { SettingsProvider } from './store'
import { Chat, Settings } from './pages'
import GlobalStyles from './GlobalStyles'

const socket = io('http://localhost:9000')

function App() {
  socket.emit('hello')
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
