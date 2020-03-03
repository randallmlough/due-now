import actions from './index'
import { receiveUser } from './user_actions'

import { createUser, authenticateUser, formatError } from '../api'

export const receiveUserSession = currentUser => ({
  type: actions.RECEIVE_USER_SESSION,
  currentUser,
})

export const receiveRemoveSession = () => ({
  type: actions.REMOVE_USER_SESSION,
})

export const registerUserAction = user => async dispatch => {
  return await createUser(user)
    .then(resp => {
      dispatch(receiveUser(resp.data.user))
      return resp.data
    })
    .catch(error => Promise.reject(formatError(error)))
}

export const authenticateUserAction = ({
  email,
  password,
}) => async dispatch => {
  return await authenticateUser({ email, password })
    .then(resp => {
      dispatch(receiveUser(resp.data.user))
      return resp.data
    })
    .catch(error => Promise.reject(formatError(error)))
}

export const logoutUserAction = () => dispatch => {
  dispatch(receiveRemoveSession())
}

export const storeSessionAction = userSession => dispatch =>
  dispatch(receiveUserSession(userSession))
