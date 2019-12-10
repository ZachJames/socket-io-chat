import React, { useState } from 'react'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import io from 'socket.io-client'

import { Chat, Settings } from './pages'
import GlobalStyles from './GlobalStyles'

const socket = io('http://localhost:9000')

function App() {
  const [userSettings, setUserSettings] = useState({
    username: '',
    color: '',
  })

  return (
    <>
      <GlobalStyles />
      <Router>
        <Route exact path="/" component={() => <Redirect to="/settings" />} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/chat" component={Chat} />
      </Router>
    </>
  )
}

export default App
