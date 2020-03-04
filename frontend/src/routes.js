import React from 'react'
import { Switch } from 'react-router-dom'
import { RegisterUserView, AuthenticateUserView } from './views/auth'
import Dashboard from './components/dashboard'
import NotFound from './views/404'
import { StaticView, AppView } from './views'

export default () => {
  return (
    <>
      <Switch>
        <StaticView exact path="/register" component={RegisterUserView} />
        <StaticView exact path="/login" component={AuthenticateUserView} />
        <AppView exact path="/" component={Dashboard} />
        <StaticView path="*" component={NotFound} />
      </Switch>
    </>
  )
}
