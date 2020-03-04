import React from 'react'
import Form from '../../UI/Form/Form'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { authenticateUserAction } from '../../../actions'
import { Button } from '../../UI'
import Input from '../../UI/Form/Input'
import PropTypes from 'prop-types'
import { useSession } from '../../Session'

const AuthenticateUser = ({ submit }) => {
  const history = useHistory()
  const [, setSession] = useSession()

  const handleSubmit = async data => {
    await submit(data)
      .then(resp => {
        setSession(resp.session_token)
        history.push('/')
      })
      .catch(e => {
        console.log(e)
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
          Sign In
        </Button>
      </Form>
    </>
  )
}

AuthenticateUser.propTypes = {
  submit: PropTypes.func.isRequired,
}

export default AuthenticateUser

const mapDispatchToProps = dispatch => ({
  submit: async user => await dispatch(authenticateUserAction(user)),
})

export const AuthenticateUserContainer = connect(
  null,
  mapDispatchToProps
)(AuthenticateUser)
