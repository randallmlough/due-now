import React from 'react'
import Views from './views'
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/Navbar'
function App() {
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
