import React, { useEffect } from 'react'
import Views from './views'
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/Navbar'
import API from './api'
import './app.css'
import { Footer } from './components/Footer/Footer'
function App() {
  useEffect(() => {
    new API().ping()
  }, [])
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Views />
        <Footer />
      </div>
    </Router>
  )
}

export default App
