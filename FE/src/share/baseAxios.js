import axios from 'axios'

const baseAxios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
})

baseAxios.interceptors.request.use(
  config => {
    config.headers.Authorization = `bearer ${localStorage.getItem('token')}`
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default baseAxios
