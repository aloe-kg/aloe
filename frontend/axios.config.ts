import { BASE_URL } from 'api'
import axios from 'axios'
import { getTokenFromCookie } from 'utils/token'

const instance = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  baseURL: BASE_URL,
})

instance.interceptors.request.use(function (config) {
  const token = getTokenFromCookie()
  if (token) {
    config.headers = {
      Authorization: 'Token ' + token,
    }
  }
  return config
})

export default instance
