export const validEmailRegex = RegExp(
  // eslint-disable-next-line
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
)

export const validateInput = (name, value) => {
  switch (name) {
    case 'name':
      return value.length === 0
        ? 'Name is required'
        : value.length < 5
        ? 'Name must be 5 characters long!'
        : ''
    case 'email':
      return value.length === 0
        ? 'Email is required'
        : validEmailRegex.test(value)
        ? ''
        : 'Please enter a valid email'
    case 'password':
      return value.length === 0
        ? 'Password is required'
        : value.length < 6
        ? 'Password must be at least 6 characters long'
        : ''
    default:
      return ''
  }
}

export const validateForm = event => {
  const requiredInputs = Array.from(event.target.elements).filter(
    el => el.required
  )
  const errors = {}
  requiredInputs.forEach(el => {
    errors[el.name] = validateInput(el.name, el.value)
  })
  return errors
}

export const isValid = errors => {
  Object.values(errors).some(val => val.length > 0)
}
