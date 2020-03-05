import React from 'react'
import { Switch } from 'react-router-dom'
import { RegisterUserView, AuthenticateUserView } from './views/auth'
import { DashboardView } from './views/users'
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
        <AppView exact path={routes.DASHBOARD} component={DashboardView} />
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
