import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSession } from '../components/Session'
import Navbar from '../components/Navbar'

export const StaticView = ({ component: Component, showNav, ...rest }) => {
  return (
    <>
      {showNav && <Navbar />}
      <Route {...rest} render={props => <Component {...props} />} />
    </>
  )
}

export const AppView = props => {
  return (
    <>
      <Navbar />
      <PrivateRoute {...props} />
    </>
  )
}

const PrivateRoute = props => {
  const [hasSession] = useSession()

  const { component: Component, ...rest } = props
  return (
    <Route
      {...rest}
      render={props =>
        hasSession ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
}
