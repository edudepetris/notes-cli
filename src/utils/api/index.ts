import axios from 'axios'

const baseUrl = () => {
  const development = process.env.APP_ENV === 'development'
  const base = development ? 'http://localhost:3000' : 'https://glacial-shelf-79171.herokuapp.com'

  return `${base}/api/`
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

const create = (data: any, headers: any) => (axios.post('/v1/user/notes', data, {headers}))
const update = (id: string, data: any, headers: any) => (axios.post(`/v1/user/notes/${id}`, data, {headers}))

export {
  login,
  logout,
  create,
  update,
}
