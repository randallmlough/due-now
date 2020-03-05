import React, { useState } from 'react'
import { validateInput } from './validation'
import { classList } from '../.'
import PropTypes from 'prop-types'

const Input = ({
  name,
  value: initialValue = '',
  children,
  onSuccess,
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
    <div className="mb-4">
      {children && (
        <label
          htmlFor={'input' + name}
          className="block text-neutral-700 text-sm font-bold"
        >
          {children}
        </label>
      )}

      <input
        id={'input' + name}
        name={name}
        value={valueState}
        className={classList(
          'shadow-sm appearance-none border border-neutral-200 rounded w-full py-2 px-3 text-neutral-dark leading-tight text-base focus:outline-none focus:border-primary-light focus:shadow',
          err && err.length > 0 && 'border-red-400'
        )}
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
    <div className="mb-4" {...props}>
      {children}
    </div>
  )
}

InputGroup.propTypes = {
  children: PropTypes.array,
}
