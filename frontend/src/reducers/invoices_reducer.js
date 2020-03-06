import actions from '../actions'

export default (state = {}, action) => {
  Object.freeze(state)
  switch (action.type) {
    case actions.RECEIVE_INVOICES:
      const newInvoices = {}
      action.invoices.forEach(invoice => (newInvoices[invoice.id] = invoice))
      return Object.assign({}, state, newInvoices)
    case actions.RECEIVE_INVOICE:
      return Object.assign({}, state, { [action.invoice.id]: action.invoice })
    case actions.REMOVE_INVOICE:
      const newState = state
      delete newState[action.invoiceId]
      return newState
    default:
      return state
  }
}
