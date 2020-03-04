import React, { useState } from 'react'
import { validateInput } from './validation'
import { classList } from '../.'
import PropTypes from 'prop-types'

const Input = ({
  name,
  value: initialValue = '',
  children,
  onSuccess,
  type,
  ...props
}) => {
  const [valueState, setValue] = useState(initialValue)
  let [err, setErr] = useState('')

  const handleInputChange = event => {
    event.preventDefault()
    const { name, value } = event.target
    err = validateInput(name, value)
    setErr(err)
    setValue(value)
  }
  return (
    <div className="form-control">
      {children && <label htmlFor={'input' + name}>{children}</label>}

      <input
        id={'input' + name}
        name={name}
        value={valueState}
        className={classList('form-input', err && err.length > 0 && 'error')}
        onChange={handleInputChange}
        {...props}
      />
      {err && err.length > 0 && <InputError>{err}</InputError>}
    </div>
  )
}

export default Input

const InputError = ({ children }) => {
  return <span className="text-sm text-red-400">{children}</span>
}

InputError.propTypes = {
  children: PropTypes.string,
}

const Label = ({ children, ...props }) => {
  return <label {...props}>{children}</label>
}

Label.propTypes = {
  children: PropTypes.array,
}

const InputGroup = ({ children, ...props }) => {
  return (
    <div className="form-control" {...props}>
      {children}
    </div>
  )
}

InputGroup.propTypes = {
  children: PropTypes.array,
}
