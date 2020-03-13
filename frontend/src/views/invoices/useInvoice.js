import { useReducer, useEffect } from 'react'
import { set } from 'object-path-immutable'
import { formatError } from '../../api'

const invoiceFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      }
    case 'FETCH_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case 'UPDATE_STATE':
      return {
        ...state,
        loading: false,
        error: null,
        data: set(state.data, action.payload.key, action.payload.value),
      }
    default:
      throw new Error()
  }
}

export const useInvoice = (invoiceId, initialData, getterMethod) => {
  const [state, dispatch] = useReducer(invoiceFetchReducer, {
    loading: false,
    error: null,
    data: initialData,
  })
  useEffect(() => {
    if (!invoiceId) return
    let didCancel = false
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' })
      try {
        const result = await getterMethod(invoiceId)
        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE', payload: formatError(error) })
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
