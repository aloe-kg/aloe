import { Cookies } from 'react-cookie'

export const getTokenFromCookie = () => {
  const cookies = new Cookies()
  return cookies.get('token')
}

export const removeTokenFromCookie = () => {
  const cookies = new Cookies()
  return cookies.remove('token')
}

export const setToken = (token: string) => {
  const cookies = new Cookies()
  if (token) cookies.set('token', token, { path: '/' })
  else cookies.remove('token', { path: '/' })
}
