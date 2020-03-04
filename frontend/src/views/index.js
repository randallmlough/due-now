import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { RegisterUserView, AuthenticateUserView } from './auth'
import Dashboard from '../components/dashboard'
import NotFound from './404'
import { useSession } from '../components/Session'
export default () => {
  return (
    <Switch>
      <Route exact path="/register" component={RegisterUserView} />
      <Route exact path="/login" component={AuthenticateUserView} />
      <PrivateRoute exact path="/" component={Dashboard} />
      <Route path="*" component={NotFound} />
    </Switch>
  )
}

const PrivateRoute = props => {
  const [session] = useSession()
  const { component: Component, ...rest } = props
  return (
    <Route
      {...rest}
      render={props =>
        session ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
}
