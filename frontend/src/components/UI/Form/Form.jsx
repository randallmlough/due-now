import React, { useState } from 'react'
import { validateForm } from './validation'
import PropTypes from 'prop-types'

const Form = ({ submit, children, ...props }) => {
  const [errors, setErr] = useState({})

  const formData = target => {
    const data = {}
    Array.from(target.elements)
      .filter(input => input.type !== 'submit')
      .forEach(input => (data[input.name] = input.value))
    return data
  }

  const handleSubmit = event => {
    event.preventDefault()

    const err = { ...errors, ...validateForm(event) }
    if (!isValid(err)) return setErr(err)

    submit(formData(event.target))
  }

  const isValid = errors => Object.values(errors).every(val => val.length === 0)

  return (
    <form onSubmit={handleSubmit} {...props} noValidate>
      {children}
    </form>
  )
}

Form.propTypes = {
  submit: PropTypes.func.isRequired,
  children: PropTypes.array,
}

export default Form
