import React, { useState, useEffect } from 'react'
import { Loader } from '../../components/UI/loaders'
import { InvoiceForm } from './Form'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createInvoiceAction } from '../../actions'

export default function NewInvoiceView(props) {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(false)
  }, [loading])
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex-grow container mx-auto sm:px-4 py-10">
          <div className="flex flex-wrap -mx-4 mb-10">
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <h1>Create Invoice</h1>
              <InvoiceForm />
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

export const NewInvoiceViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewInvoiceView)
