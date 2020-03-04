import React from 'react'
import { useSession } from './Session'

export default props => {
  const [session] = useSession()
  return (
    <div className="container mx-auto px-4 py-32 h-screen">
      <div className="w-100 md:w-3/4 mx-auto bg-white shadow p-10 rounded">
        <h1>{session.first_name}'s Dashboard</h1>
        <ul>
          <li>id: {session.sub}</li>
          <li>first_name: {session.first_name}</li>
          <li>last_name: {session.last_name}</li>
        </ul>
      </div>
    </div>
  )
}
