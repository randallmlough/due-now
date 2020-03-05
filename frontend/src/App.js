import React, { useEffect } from 'react'
import Routes from './routes'
import { BrowserRouter as Router } from 'react-router-dom'
import API from './api'
import { LastLocationProvider } from 'react-router-last-location'
import FlashProvider from './components/Flash'
import NotificationProvider from './components/Notification'
import './app.css'

function App() {
  useEffect(() => {
    new API().ping().catch(e => {
      console.log(e)
    })
  }, [])
  return (
    <div className="App">
      <FlashProvider>
        <NotificationProvider>
          <Router>
            <LastLocationProvider>
              <Routes />
            </LastLocationProvider>
          </Router>
        </NotificationProvider>
      </FlashProvider>
    </div>
  )
}

export default App
