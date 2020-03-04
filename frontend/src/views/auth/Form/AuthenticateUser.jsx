import React from 'react'
import Form from '../../../components/UI/Form/Form'
import { useHistory } from 'react-router-dom'
import { Button } from '../../../components/UI'
import Input from '../../../components/UI/Form/Input'
import PropTypes from 'prop-types'
import { useSession } from '../../../components/Session'
import { useFlash } from '../../../components/Flash'

export default function AuthenticateUserForm({ submit }) {
  const history = useHistory()
  const [, setSession] = useSession()
  const flash = useFlash()

  const handleSubmit = async data => {
    await submit(data)
      .then(resp => {
        setSession(resp.session_token)
        history.push('/')
      })
      .catch(e => {
        if (e.status < 500) {
          if (e.status === 401) {
            flash.add({
              type: 'error',
              title: 'Whoops',
              body: 'Either the email or the password you entered is incorrect',
            })
          } else {
            flash.add({
              type: 'error',
              body: e.message,
            })
          }
        }
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
        <Button primary full>
          Log In
        </Button>
      </Form>
    </>
  )
}
AuthenticateUserForm.propTypes = {
  submit: PropTypes.func.isRequired,
}
