import React, { useEffect } from 'react'
import Views from './views'
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/Navbar'
import API from './api'
function App() {
  useEffect(() => {
    new API().ping()
  }, [])
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Views />
      </div>
    </Router>
  )
}

export default App
