const actions = {
  // session
  RECEIVE_USER_SESSION: 'RECEIVE_USER_SESSION',
  REMOVE_USER_SESSION: 'REMOVE_USER_SESSION',

  // entities
  RECEIVE_USER: 'RECEIVE_USER',
}

export default actions

export {
  registerUserAction,
  authenticateUserAction,
  logoutUserAction,
} from './session_actions'
