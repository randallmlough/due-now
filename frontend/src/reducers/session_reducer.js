import actions from '../actions'

const _nullState = {
  currentUser: null,
}

export const sessionReducer = (state = _nullState, action) => {
  Object.freeze(state)
  switch (action.type) {
    case actions.RECEIVE_USER_SESSION:
      return Object.assign({}, state, { currentUser: action.currentUser })
    case actions.REMOVE_USER_SESSION:
      return _nullState
    default:
      return state
  }
}
