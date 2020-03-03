import React from 'react'
import { Link } from 'react-router-dom'
import { useSession } from '../Session'

const Navbar = props => {
  const [session, , removeSession] = useSession()
  console.log(session)
  return (
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
      {session && (
        <div>
          <button onClick={removeSession}>Log out</button>
        </div>
      )}
    </header>
  )
}

export default Navbar
