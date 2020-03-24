import React, { useState } from 'react'
import { connect } from 'react-redux'
import { AuthenticateUserForm } from './Form'
import { Redirect } from 'react-router-dom'
import { useSession } from '../../components/Session'
import { Link } from '../../components/UI'
import { Button } from '../../components/UI'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { authenticateUserAction } from '../../actions'
import { useLastLocation } from 'react-router-last-location'
import { routes } from '../../routes'
import { useFlash } from '../../components/Flash'
import {
  useNotification,
  welcomeNotification,
} from '../../components/Notification'

export default function AuthenticateView({ submit }) {
  const [session, setSession] = useSession()
  const demoAccount = {
    email: 'demo@example.com',
    password: '1234567',
  }
  const [submitting, setSubmitting] = useState(false)
  const flash = useFlash()
  const notification = useNotification()

  const history = useHistory()
  const handleDemo = e => {
    e.preventDefault()
    setSubmitting(true)
    submit(demoAccount)
      .then(resp => {
        setSession(resp.sessionToken)
        notification.add(welcomeNotification)
        history.push(routes.DASHBOARD)
      })
      .catch(e => {
        console.log(e)
        setSubmitting(false)
        flash.add({
          type: 'danger',
          title: 'Sorry!',
          body: 'Something unexpected happened. Please try again.',
        })
      })
  }
  const lastLocation = useLastLocation()
  const slideIn = lastLocation && lastLocation.pathname === routes.REGISTER

  if (session) {
    if (lastLocation && lastLocation.pathname !== routes.LANDING_PAGE) {
      return <Redirect to={lastLocation.pathname} />
    } else {
      return <Redirect to={routes.DASHBOARD} />
    }
  }
  return (
    <>
      <div className="container mx-auto px-4 py-32 h-screen">
        <div
          className={
            'w-100 md:w-2/3 lg:w-1/2 xl:w-2/5 mx-auto animated ' +
            (slideIn ? 'fadeInRight-25' : 'fadeIn')
          }
        >
          <div className="bg-gray-100 px-10 pt-8 shadow-md w-full rounded-t">
            <div className="mb-6">
              <h3 className="text-dark-600">Sign in</h3>
            </div>
            <AuthenticateUserForm submit={submit} />
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
                  Don't have an account?
                </span>
                <Link to="/register">Sign Up</Link>
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
    </>
  )
}

AuthenticateView.propTypes = {
  submit: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  submit: async user => await dispatch(authenticateUserAction(user)),
})

export const AuthenticateUserViewContainer = connect(
  null,
  mapDispatchToProps
)(AuthenticateView)
