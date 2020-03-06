import API from './api'
import path from 'path'

const invoiceAPI = new API('/invoices') // auth

export const createInvoice = async invoice => {
  return await invoiceAPI.post('', invoice)
}

export const getInvoices = async () => {
  return await invoiceAPI.get('')
}

export const getInvoice = async invoiceID => {
  return await invoiceAPI.get(path.resolve(invoiceID))
}

export const updateInvoice = async invoice => {
  return await invoiceAPI.put(path.resolve(invoice.id), invoice)
}

export const deleteInvoice = async invoiceID => {
  return await invoiceAPI.delete(path.resolve(invoiceID))
}
