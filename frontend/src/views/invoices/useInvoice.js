import { useReducer, useEffect } from 'react'
import { set } from 'object-path-immutable'
import { getInvoice } from '../../api'

const invoiceFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        loading: true,
        isError: false,
      }
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        isError: false,
        data: action.payload,
      }
    case 'FETCH_FAILURE':
      return {
        ...state,
        loading: false,
        isError: true,
      }
    case 'UPDATE_STATE':
      return {
        ...state,
        loading: false,
        isError: false,
        data: set(state.data, action.payload.key, action.payload.value),
      }
    default:
      throw new Error()
  }
}

export const useInvoice = (invoiceId, initialData) => {
  const [state, dispatch] = useReducer(invoiceFetchReducer, {
    loading: false,
    isError: false,
    data: initialData,
  })
  useEffect(() => {
    if (!invoiceId) return
    let didCancel = false
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' })
      try {
        const result = await getInvoice(invoiceId)
        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' })
        }
      }
    }
    fetchData()
    return () => {
      didCancel = true
    }
  }, [invoiceId])

  const updateState = (key, value) =>
    dispatch({ type: 'UPDATE_STATE', payload: { key, value } })
  return [state, updateState]
}
