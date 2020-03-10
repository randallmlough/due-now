import React, { useState, useEffect } from 'react'
import { Loader } from '../../components/UI/loaders'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createInvoiceAction } from '../../actions'
import { InvoiceForm } from './Form'
import Sidebar from './sidebar'

const initialState = {
  dueDate: undefined,
  invoiceDate: undefined,
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
      description: 'Item description',
      qty: 1,
      rate: 0,
      total: 0,
    },
  ],
  tax: 0,
  total: 0,
}
const NewInvoiceView = ({ submit }) => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(false)
  }, [loading])

  const [invoice, setInvoice] = useState(initialState)

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container mx-auto sm:px-4 py-8">
          <div className="py-8">
            <div className="row">
              <div className="col md:w-3/4 shadow rounded-lg bg-white">
                <InvoiceForm invoice={invoice} setInvoice={setInvoice} />
              </div>
              <div className="col md:w-1/4 pl-8 py-8">
                <Sidebar
                  invoice={invoice}
                  setInvoice={setInvoice}
                  submit={submit}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

NewInvoiceView.propTypes = {
  submit: PropTypes.func.isRequired,
}

const mapStateToProps = (state = {}) => ({
  invoice: {},
})

const mapDispatchToProps = dispatch => ({
  submit: async invoice => await dispatch(createInvoiceAction(invoice)),
})

export default connect(mapStateToProps, mapDispatchToProps)(NewInvoiceView)
