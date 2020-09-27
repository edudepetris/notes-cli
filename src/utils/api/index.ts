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

// defines whether to resolve or reject the promise for a given
// HTTP response status code.
const validateStatus = (status: any) => {
  return status < 500
}

// Config
axios.defaults.baseURL = baseUrl()
axios.defaults.headers = defaultHeaders()
axios.defaults.validateStatus = validateStatus

const login = async (user: any) => {
  try {
    return await axios.post('/v1/users/sign_in', user)
  } catch (error) {
    // outside >= 500
    return error.response
  }
}

const logout = () => {
  // console.log('logout')
}

export {
  login,
  logout,
}
