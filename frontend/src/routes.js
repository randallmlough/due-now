import React from 'react'
import { Switch } from 'react-router-dom'
import { RegisterUserView, AuthenticateUserView } from './views/auth'
import { DashboardView } from './views/users'
import NotFound from './views/404'
import { StaticView, AppView } from './views'
import { InvoicesView, NewInvoiceView } from './views/invoices'

export default () => {
  return (
    <Switch>
      <StaticView exact path={routes.REGISTER} component={RegisterUserView} />
      <StaticView exact path={routes.LOGIN} component={AuthenticateUserView} />
      <AppView exact path={routes.DASHBOARD} component={DashboardView} />
      <AppView exact path={routes.INVOICES} component={InvoicesView} />
      <AppView exact path={routes.INVOICES_NEW} component={NewInvoiceView} />
      <StaticView path="*" component={NotFound} />
    </Switch>
  )
}

export const routes = {
  // static routes
  REGISTER: '/register',
  LOGIN: '/login',

  // app routes
  DASHBOARD: '/',

  // invoices
  INVOICES: '/invoices',
  INVOICES_NEW: '/invoices/new',
  INVOICE: '/invoices/:id',
}
