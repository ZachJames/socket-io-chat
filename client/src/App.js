import React from 'react'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'

import { SettingsProvider } from './store'
import { Chat, Settings } from './pages'
import GlobalStyles from './GlobalStyles'

function App() {
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
