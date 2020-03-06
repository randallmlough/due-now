const actions = {
  // session
  RECEIVE_USER_SESSION: 'RECEIVE_USER_SESSION',
  REMOVE_USER_SESSION: 'REMOVE_USER_SESSION',

  // entities
  RECEIVE_USER: 'RECEIVE_USER',

  RECEIVE_INVOICES: 'RECEIVE_INVOICES',
  RECEIVE_INVOICE: 'RECEIVE_INVOICE',
  REMOVE_INVOICE: 'REMOVE_INVOICE',
}

export default actions

export {
  registerUserAction,
  authenticateUserAction,
  logoutUserAction,
} from './session_actions'

export {
  createInvoiceAction,
  getInvoicesAction,
  getInvoiceAction,
  updateInvoiceAction,
  deleteInvoiceAction,
} from './invoice_actions'

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter,
})
