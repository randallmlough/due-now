import React, { useEffect } from 'react'
import Routes from './routes'
import { BrowserRouter as Router } from 'react-router-dom'
import API from './api'
import './app.css'
import { withFlashProvider } from './components/Flash'

function App() {
  useEffect(() => {
    new API().ping().catch(e => {
      console.log(e)
    })
  }, [])
  return (
    <div className="App">
      <Router>
        <Routes />
      </Router>
    </div>
  )
}

export default withFlashProvider(App)
