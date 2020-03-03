import React from 'react'
import { useSession } from './Session'

export default props => {
  const [session] = useSession()
  return (
    <div>
      <h1>{session.first_name}'s Dashboard</h1>
      <ul>
        <li>id: {session.sub}</li>
        <li>first_name: {session.first_name}</li>
        <li>last_name: {session.last_name}</li>
      </ul>
    </div>
  )
}
