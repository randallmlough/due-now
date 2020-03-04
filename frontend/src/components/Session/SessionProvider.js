import React, { useEffect } from 'react'
import Session from './Session'
import { Provider } from './SessionContext'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const SessionProvider = props => {
  const { dispatch, children } = props
  const session = new Session(dispatch)
  useEffect(() => {
    // session.loadSession()
    session.initialize()
  }, [session])

  return <Provider value={session}>{children}</Provider>
}

SessionProvider.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.object,
}

const mapDispatchToProps = dispatch => ({ dispatch })
export default connect(null, mapDispatchToProps)(SessionProvider)
