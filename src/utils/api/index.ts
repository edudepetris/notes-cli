import axios from 'axios'

const baseUrl = () => {
  const port = 3000
  // on the build process we can add a ENV variable
  // for the endpoint.
  return `http://localhost:${port}/api/`
}

const defaultHeaders = () => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
})

// It defines whether to resolve or reject the promise for a given
// HTTP response status code.
const validateStatus = (status: any) => {
  return status < 500
}

// Config
axios.defaults.baseURL = baseUrl()
axios.defaults.headers = defaultHeaders()
axios.defaults.validateStatus = validateStatus

const login = (user: any) => (axios.post('/v1/users/sign_in', user))

const logout = (headers: any) => (axios.delete('/v1/users/sign_out', {headers}))

export {
  login,
  logout,
}
