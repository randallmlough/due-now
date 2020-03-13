import API from './api'
import path from 'path'

const invoiceAPI = new API('/invoices') // auth

export const createInvoice = async invoice => {
  return await invoiceAPI.post('', invoice)
}

export const getInvoices = async query => {
  return await invoiceAPI.get(query ? query : '')
}

export const getInvoice = async invoiceID => {
  return await invoiceAPI.get(path.resolve(invoiceID.toString()))
}

export const updateInvoice = async invoice => {
  return await invoiceAPI.patch(path.resolve(invoice.id.toString()), invoice)
}

export const deleteInvoice = async invoiceID => {
  return await invoiceAPI.delete(path.resolve(invoiceID.toString()))
}

export const getPublicInvoice = async invoiceUUID => {
  invoiceAPI.baseResource = '/invoice'
  return await invoiceAPI.get(path.resolve(invoiceUUID.toString()))
}
