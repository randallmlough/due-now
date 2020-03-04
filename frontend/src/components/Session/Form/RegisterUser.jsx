import React, { useState } from 'react'
import Form from '../../UI/Form/Form'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { registerUserAction } from '../../../actions'
import { Button } from '../../UI'
import Input from '../../UI/Form/Input'
import PropTypes from 'prop-types'
import { useSession } from '../../Session'

const RegisterUser = ({ submit }) => {
  const initialState = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  }
  const [, setSession] = useSession()
  const [user, setUser] = useState(initialState)
  const history = useHistory()

  const handleSubmit = async data => {
    await submit(data)
      .then(resp => {
        setSession(resp.session_token)
        setUser(initialState)
        history.push('/')
      })
      .catch(e => {
        console.log(e)
      })
  }
  return (
    <Form submit={handleSubmit}>
      <Input
        name="first_name"
        value={user.first_name}
        placeholder="Enter your first name"
        required
      >
        First name
      </Input>
      <Input
        name="last_name"
        value={user.last_name}
        placeholder="Enter your last name"
        required
      >
        Last name
      </Input>
      <Input
        name="email"
        value={user.email}
        placeholder="Enter your email"
        required
      >
        Email Address
      </Input>
      <Input
        name="password"
        value={user.password}
        type="password"
        placeholder="Enter your password"
        required
      >
        Password
      </Input>
      <Button primary full>
        Sign Up
      </Button>
    </Form>
  )
}

RegisterUser.propTypes = {
  submit: PropTypes.func.isRequired,
  history: PropTypes.object,
}

export default RegisterUser

const mapStateToProps = (state = {}) => {
  return {
    user: state.session.currentUser,
  }
}

const mapDispatchToProps = dispatch => ({
  submit: async user => await dispatch(registerUserAction(user)),
})

export const RegisterUserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterUser)
