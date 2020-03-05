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
        <StaticView exact path={routes.REGISTER} component={RegisterUserView} />
        <StaticView
          exact
          path={routes.LOGIN}
          component={AuthenticateUserView}
        />
        <AppView exact path={routes.DASHBOARD} component={Dashboard} />
        <StaticView path="*" component={NotFound} />
      </Switch>
    </>
  )
}

export const routes = {
  REGISTER: '/register',
  LOGIN: '/login',
  DASHBOARD: '/',
}
