import { combineReducers } from 'redux'
import usersReducer from './users_reducer'
import invoicesReducer from './invoices_reducer'
import { invoicesVisibilityReducer } from './invoices'
export default combineReducers({
  users: usersReducer,
  invoices: invoicesReducer,
  visibilityFilter: invoicesVisibilityReducer,
})
