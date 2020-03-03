import React from "react";
import Views from "./views";
import { BrowserRouter as Router, Link } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <div>
            <Link to="/">Dashboard</Link>
          </div>
          <div>
            <Link to="/register">Register</Link>
          </div>
          <div>
            <Link to="/login">Log in</Link>
          </div>
        </header>
        <Views />
      </div>
    </Router>
  );
}

export default App;
