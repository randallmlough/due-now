import React, { useState } from 'react'
import Form from '../../../components/UI/Form/Form'
import { useHistory } from 'react-router-dom'
import { Button } from '../../../components/UI'
import Input from '../../../components/UI/Form/Input'
import PropTypes from 'prop-types'
import { useSession } from '../../../components/Session'
import { useFlash } from '../../../components/Flash'
import { routes } from '../../../routes'
import {
  useNotification,
  authenticatedNotification,
} from '../../../components/Notification'

export default function AuthenticateUserForm({ submit }) {
  const history = useHistory()
  const [, setSession] = useSession()
  const [submitting, setSubmitting] = useState(false)
  const flash = useFlash()
  const notification = useNotification()
  const handleSubmit = async data => {
    setSubmitting(true)
    await submit(data)
      .then(resp => {
        setSession(resp.session_token)
        notification.add(authenticatedNotification)
        history.push(routes.DASHBOARD)
      })
      .catch(e => {
        if (e.status < 500) {
          if (e.status === 401) {
            flash.add({
              type: 'danger',
              title: 'Whoops!',
              time: null,
              body: 'Either the email or the password you entered is incorrect',
            })
          } else {
            flash.add({
              type: 'danger',
              time: null,
              body: e.message,
            })
          }
        }
        setSubmitting(false)
      })
  }

  return (
    <>
      <Form submit={handleSubmit}>
        <Input
          name="email"
          // value={user.email}
          placeholder="Enter your email"
          required
        >
          Email Address
        </Input>
        <Input
          name="password"
          // value={user.password}
          placeholder="Enter your password"
          type="password"
          required
        >
          Password
        </Input>
        <Button primary full disabled={submitting} spinner={submitting}>
          {submitting ? '' : 'Log In'}
        </Button>
      </Form>
    </>
  )
}
AuthenticateUserForm.propTypes = {
  submit: PropTypes.func.isRequired,
}
