export { default as InvoicesView } from './list'

export { default as NewInvoiceView } from './new'
export { default as EditInvoiceView } from './edit'
export { default as PreviewInvoiceView } from './preview'

export const initialState = {
  id: undefined,
  dueDate: new Date(),
  invoiceDate: new Date(),
  invoiceNumber: '',
  status: '',
  paymentTerms: '',
  private: false,
  from: { name: '', emailAddress: '', mailingAddress: '', phoneNumber: '' },
  recipient: {
    name: '',
    emailAddress: '',
    mailingAddress: '',
    phoneNumber: '',
  },
  notes: '',
  invoiceItems: [
    {
      id: '',
      description: '',
      qty: 0,
      rate: 0,
      total: 0,
    },
  ],
  tax: 0,
  total: 0,
}
