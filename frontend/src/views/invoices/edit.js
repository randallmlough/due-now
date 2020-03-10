import React, { useState, useEffect, useReducer } from 'react'
import { Loader } from '../../components/UI/loaders'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateInvoiceAction, getInvoiceAction } from '../../actions'
import { InvoiceForm } from './Form'
import Sidebar from './sidebar'

import { useInvoice } from './useInvoice'
import { initialState } from '.'

// const initialState = {
//   id: undefined,
//   dueDate: undefined,
//   invoiceDate: undefined,
//   invoiceNumber: '',
//   status: '',
//   paymentTerms: '',
//   private: false,
//   from: { name: '', emailAddress: '', mailingAddress: '', phoneNumber: '' },
//   recipient: {
//     name: '',
//     emailAddress: '',
//     mailingAddress: '',
//     phoneNumber: '',
//   },
//   notes: '',
//   invoiceItems: [
//     {
//       id: '',
//       description: 'Item description',
//       qty: 1,
//       rate: 0,
//       total: 0,
//     },
//   ],
//   tax: 0,
//   total: 0,
// }

// const invoiceFetchReducer = (state, action) => {
//   switch (action.type) {
//     case 'FETCH_INIT':
//       return {
//         ...state,
//         loading: true,
//         isError: false,
//       }
//     case 'FETCH_SUCCESS':
//       return {
//         ...state,
//         loading: false,
//         isError: false,
//         data: action.payload,
//       }
//     case 'FETCH_FAILURE':
//       return {
//         ...state,
//         loading: false,
//         isError: true,
//       }
//     case 'UPDATE_STATE':
//       return {
//         ...state,
//         loading: false,
//         isError: false,
//         data: immutable.set(
//           state.data,
//           action.payload.key,
//           action.payload.value
//         ),
//       }
//     default:
//       throw new Error()
//   }
// }

// const useInvoice = (invoiceId, initialData) => {
//   const [state, dispatch] = useReducer(invoiceFetchReducer, {
//     loading: false,
//     isError: false,
//     data: initialData,
//   })
//   useEffect(() => {
//     let didCancel = false
//     const fetchData = async () => {
//       dispatch({ type: 'FETCH_INIT' })
//       try {
//         const result = await getInvoice(invoiceId)
//         if (!didCancel) {
//           dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
//         }
//       } catch (error) {
//         if (!didCancel) {
//           dispatch({ type: 'FETCH_FAILURE' })
//         }
//       }
//     }
//     fetchData()
//     return () => {
//       didCancel = true
//     }
//   }, [])

//   const updateState = (key, value) =>
//     dispatch({ type: 'UPDATE_STATE', payload: { key, value } })
//   return [state, updateState]
// }

const EditInvoiceView = props => {
  const { submit } = props
  const [{ data: invoice, loading, isError }, setInvoice] = useInvoice(
    props.match.params.id,
    initialState
  )

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
                  editing
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

EditInvoiceView.propTypes = {
  submit: PropTypes.func.isRequired,
}

const mapStateToProps = (state = {}, ownProps) => ({
  invoice: state.entities.invoices[parseInt(ownProps.match.params.id)],
})

const mapDispatchToProps = dispatch => ({
  getInvoice: async invoiceId => await dispatch(getInvoiceAction(invoiceId)),
  submit: async invoice => await dispatch(updateInvoiceAction(invoice)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditInvoiceView)
