import actions from './index'

import {
  createInvoice,
  getInvoices,
  getInvoice,
  updateInvoice,
  deleteInvoice,
  formatError,
} from '../api'

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_PAID: 'SHOW_PAID',
  SHOW_UNPAID: 'SHOW_UNPAID',
}

const receiveInvoices = invoices => ({
  type: actions.RECEIVE_INVOICES,
  invoices,
})

const receiveInvoice = invoice => ({
  type: actions.RECEIVE_INVOICE,
  invoice,
})

const removeInvoice = invoiceId => ({
  type: actions.REMOVE_INVOICE,
  invoiceId,
})

export const createInvoiceAction = invoice => async dispatch => {
  return await createInvoice(invoice)
    .then(resp => {
      dispatch(receiveInvoice(resp.data))
      return resp.data
    })
    .catch(error => Promise.reject(formatError(error)))
}

export const getInvoicesAction = () => async dispatch => {
  return await getInvoices()
    .then(resp => {
      dispatch(receiveInvoices(resp.data))
      return resp.data
    })
    .catch(error => Promise.reject(formatError(error)))
}

export const getInvoiceAction = invoiceId => async dispatch => {
  return await getInvoice(invoiceId)
    .then(resp => {
      dispatch(receiveInvoice(resp.data))
      return resp.data
    })
    .catch(error => Promise.reject(formatError(error)))
}

export const updateInvoiceAction = invoice => async dispatch => {
  return await updateInvoice(invoice)
    .then(resp => {
      dispatch(receiveInvoice(resp.data))
      return resp.data
    })
    .catch(error => Promise.reject(formatError(error)))
}

export const deleteInvoiceAction = invoiceId => async dispatch => {
  return await deleteInvoice(invoiceId)
    .then(resp => {
      dispatch(removeInvoice(invoiceId))
      return resp
    })
    .catch(error => Promise.reject(formatError(error)))
}
