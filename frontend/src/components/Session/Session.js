import {
  receiveUserSession,
  logoutUserAction,
} from '../../actions/session_actions'
import { checkAuth } from '../../api'
import * as jwt_decode from 'jwt-decode'
const initialState = null

export default class Session {
  constructor(dispatcher) {
    this.dispatch = dispatcher
    this.session = initialState
    this.subscribers = {}
  }

  initialize() {
    checkAuth()
      .then(resp => {
        if (resp.data && resp.data.token) {
          const session = this._decodeJwtToken(resp.data.token)
          if (session) {
            this.session = session
            this._updateSubscribers()
            this.dispatch(receiveUserSession(session))
          }
        }
      })
      .catch(error => console.log(error))
  }
  getSession() {
    return this.session
  }

  setSession(sessionToken) {
    return new Promise((resolve, reject) => {
      const session = this._decodeJwtToken(sessionToken)
      if (session) {
        if (shouldUpdate(this.session, session)) {
          this.session = session
          this.dispatch(receiveUserSession(session))
          this._updateSubscribers()
        }
        resolve(session)
      } else {
        reject(Error('no session to update'))
      }
    })
  }

  removeSession() {
    this.session = initialState
    this._updateSubscribers()
    this.dispatch(logoutUserAction())
  }

  subscribeSessionUpdates(key, onSetSessionCallback) {
    this.subscribers[key] = onSetSessionCallback
  }

  unsubscribeSessionUpdates(key) {
    delete this.subscribers[key]
  }

  _updateSubscribers() {
    for (let [, callback] of Object.entries(this.subscribers)) {
      callback()
    }
  }

  _decodeJwtToken(jwtToken) {
    return jwt_decode(jwtToken)
  }
}

function shouldUpdate(ogSession, newSession) {
  if (ogSession === newSession) {
    return false
  }
  if (!ogSession || !newSession) {
    return true
  }
  if (Object.keys(ogSession).length !== Object.keys(newSession).length) {
    return true
  }

  for (let [key, value] of Object.entries(ogSession)) {
    if (newSession[key] !== value) return true
  }

  return false
}
