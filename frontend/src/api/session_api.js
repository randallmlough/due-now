import API from './api'

const sessionAPI = new API('/auth') // auth

export const createUser = async user => {
  return await sessionAPI.post('/register', user) // /register
}

export const authenticateUser = async userCredentials => {
  return await sessionAPI.post('/authenticate', userCredentials)
}

export const logoutUser = async () => {
  return await sessionAPI.delete('/logout')
}

export const checkAuth = async () => {
  return await sessionAPI.get('/check')
}

export const resetPassword = async email => {
  return await sessionAPI.post('/reset-password', email)
}
