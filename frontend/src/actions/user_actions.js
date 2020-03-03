import actions from './index'

export const receiveUser = user => ({
  type: actions.RECEIVE_USER,
  user,
})
