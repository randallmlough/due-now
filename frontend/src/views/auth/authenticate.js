import React from 'react'
import { AuthenticateUser } from '../../components/Session/Form'
import { Redirect } from 'react-router-dom'
import { useSession } from '../../components/Session'

export default props => {
  const [session] = useSession()
  return (
    <>
      {session ? (
        <Redirect to="/" />
      ) : (
        <div>
          <h1>Log in</h1>
          <AuthenticateUser />
        </div>
      )}
    </>
  )
}
