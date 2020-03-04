import {
  receiveUserSession,
  receiveRemoveSession,
} from '../../actions/session_actions'
import * as jwt_decode from 'jwt-decode'
const initialState = null

export default class Session {
  constructor(dispatcher) {
    this.dispatch = dispatcher
    this.session = initialState
    this.subscribers = {}
  }

  loadSession() {
    const session = this.getSessionFromLocalStorage()
    if (session) {
      this.session = session
      this.dispatch(receiveUserSession(session))
      this._updateSubscribers()
    }
  }

  getSession() {
    return this.session
  }

  setSession(sessionToken) {
    const session = this.decodeJwtToken(sessionToken)
    if (session) {
      if (shouldUpdate(this.session, session)) {
        this.addSessionLocalStorage(sessionToken)
        this.session = session
        this.dispatch(receiveUserSession(session))
        this._updateSubscribers()
      }
    }
  }

  removeSession() {
    this.removeFromLocalStorage()
    this.dispatch(receiveRemoveSession())
    this.session = initialState
    this._updateSubscribers()
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

  addSessionLocalStorage(sessionToken) {
    localStorage.setItem('session', sessionToken)
  }

  getSessionFromLocalStorage() {
    const session = localStorage.getItem('session')
    return session ? this.decodeJwtToken(session) : null
  }

  removeFromLocalStorage() {
    localStorage.removeItem('session')
  }

  decodeJwtToken(jwtToken) {
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
