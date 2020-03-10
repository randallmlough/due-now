import React, { useState } from 'react'
import { RegisterUserForm } from './Form'
import { Redirect } from 'react-router-dom'
import { useSession } from '../../components/Session'
import { Link } from '../../components/UI'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { registerUserAction, authenticateUserAction } from '../../actions'
import { Button } from '../../components/UI'
import { useLastLocation } from 'react-router-last-location'
import { routes } from '../../routes'
import {
  useNotification,
  welcomeNotification,
} from '../../components/Notification'

export default function RegisterView({ submit, demo }) {
  const [session, setSession] = useSession()
  const history = useHistory()
  const notification = useNotification()
  const demoAccount = {
    email: 'demo@example.com',
    password: '1234567',
  }
  const [submitting, setSubmitting] = useState(false)
  const handleDemo = e => {
    e.preventDefault()
    setSubmitting(true)
    demo(demoAccount)
      .then(resp => {
        setSession(resp.sessionToken)
        notification.add(welcomeNotification)
        history.push(routes.DASHBOARD)
      })
      .catch(e => {
        setSubmitting(false)
      })
  }
  const lastLocation = useLastLocation()

  const slideIn = lastLocation && lastLocation.pathname === routes.LOGIN
  return (
    <>
      {session ? (
        lastLocation ? (
          <Redirect to={lastLocation.pathname} />
        ) : (
          <Redirect to="/" />
        )
      ) : (
        <div className="container mx-auto px-4 py-32 h-screen">
          <div
            className={
              'w-100 md:w-2/3 lg:w-1/2 xl:w-2/5 mx-auto animated ' +
              (slideIn ? 'fadeInLeft-25' : 'fadeIn')
            }
          >
            <div className="bg-gray-100 px-10 pt-8 shadow-md w-full rounded-t">
              <div className="mb-6">
                <h3 className="text-dark-600">Register</h3>
              </div>
              <RegisterUserForm submit={submit} />
              <div className="my-6"></div>
              <Button
                white
                full
                onClick={handleDemo}
                disabled={submitting}
                spinner={submitting}
              >
                {submitting ? '' : 'Demo'}
              </Button>
            </div>
            <div className="bg-gray-100 p-10 shadow-md rounded-b w-full mb-5">
              <hr className="mt-10 mb-3 border-t border-gray-300" />
              <div className="flex flex-col items-center">
                <div className="mb-2">
                  <span className="text-dark-700 text-sm mr-1">
                    Have an account?
                  </span>
                  <Link to="/login">Sign In</Link>
                </div>
                <div>
                  <span className="text-dark-700 text-sm mr-1">
                    Forgot your password?
                  </span>
                  <Link to="/forgot-password">Reset password</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

RegisterView.propTypes = {
  submit: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  demo: async user => await dispatch(authenticateUserAction(user)),
  submit: async user => await dispatch(registerUserAction(user)),
})

export const RegisterUserViewContainer = connect(
  null,
  mapDispatchToProps
)(RegisterView)
