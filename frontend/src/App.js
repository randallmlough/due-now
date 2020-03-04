import React, { useEffect } from 'react'
import Views from './views'
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/Navbar'
import API from './api'
import './app.css'
import { withFlashProvider } from './components/Flash'
import { Footer } from './components/Footer/Footer'

function App() {
  useEffect(() => {
    new API().ping().catch(e => {
      console.log(e)
    })
  }, [])
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Views />
        <Footer />
      </Router>
    </div>
  )
}

export default withFlashProvider(App)
