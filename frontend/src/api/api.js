import axios from 'axios'

class API {
  constructor(baseRoute) {
    this.baseURL = '/api'
    if (baseRoute) this.baseURL += baseRoute
  }

  getAccessToken() {
    localStorage.getItem('session_token')
  }

  async get(url) {
    return await this.request('get', url)
  }

  async post(url, data) {
    return await this.request('post', url, data)
  }

  async put(url, data) {
    return await this.request('put', url, data)
  }

  async delete(url) {
    return await this.request('delete', url)
  }

  async request(method, url, data) {
    return await axios({
      baseURL: this.baseURL,
      xsrfCookieName: 'CSRF-TOKEN',
      xsrfHeaderName: 'X-CSRF-Token',
      withCredentials: true,
      method: method,
      url: url,
      data: data,
      headers: {
        'content-type': 'application/json',
      },
    })
  }
}

export default API

export const formatError = error => {
  const err = {}
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    err.type = 'request error'
    err.status = error.response.status
    err.message = error.response.data.error
    err.errors = error.response.data.errors
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    err.type = 'server error'
    err.status = 500
    err.message = 'something went wrong'
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message)
  }
  return err
}
