import { find, trim } from 'lodash'
const getQueryArray = (value = []) => {
  if (value && typeof value === 'string') return Array(value)
  return value
}

export const getCookie = (name: string) => {
  const cookieArr = document?.cookie?.split(';')
  const cookie = find(cookieArr, (cookie) => {
    return trim(cookie.split('=')[0]) === name
  })

  if (cookie) {
    return decodeURIComponent(cookie.split('=')[1])
  } else {
    return null
  }
}

export const getDomain = () => {
  if (typeof window !== 'undefined') {
    const domain = window.location.hostname
    if (domain === 'localhost') return 'localhost'

    const domainParts = domain.split('.')
    const topLevelDomain = domainParts.slice(-3).join('.')
    const cookieDomain = `.${topLevelDomain}`

    console.log('==>', cookieDomain)

    return cookieDomain
  }
  return ''
}

export default getQueryArray
