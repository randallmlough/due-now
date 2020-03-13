import React, { useState, useEffect, useReducer } from 'react'
import { Loader } from '../../components/UI/loaders'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getInvoiceAction } from '../../actions'
import { InvoiceForm } from './Form'
import { useHistory } from 'react-router-dom'
import { useInvoice } from './useInvoice'
import { initialState } from '.'
import { getPublicInvoice } from '../../api'

const EditInvoiceView = props => {
  const [{ data: invoice, loading, error }, setInvoice] = useInvoice(
    props.match.params.uuid,
    initialState,
    getPublicInvoice
  )
  const history = useHistory()

  useEffect(() => {
    if (error) {
      if (error.status === 404) {
        history.push('/404')
        return
      }
    }
  }, [invoice.id])
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container mx-auto sm:px-4 py-8">
          <div className="py-8">
            <div className="row justify-center">
              <div className="col md:w-3/4 shadow rounded-lg bg-white">
                <InvoiceForm invoice={invoice} setInvoice={setInvoice} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

EditInvoiceView.propTypes = {
  submit: PropTypes.func.isRequired,
}

const mapStateToProps = (state = {}, ownProps) => ({
  invoice: state.entities.invoices[ownProps.match.params.uuid],
})

const mapDispatchToProps = dispatch => ({
  getInvoice: async invoiceId => await dispatch(getInvoiceAction(invoiceId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditInvoiceView)
