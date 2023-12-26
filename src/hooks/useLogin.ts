import { useState } from 'react'
import { useCookies } from 'react-cookie'

import {
  FORGOT_PASSWORD,
  GENERATE_OTP,
  LOGIN,
  RESET_PASSWORD,
  USER_INFO,
  VERIFY_OTP,
} from 'src/constants/urlConstants'
import fetchHelper from 'src/helpers/fetchHelper'

import { useRouter } from 'next/router'
import { getDomain } from 'src/helpers/queryHelpers'

interface Roles {
  [key: string]: string
}
interface UserData {
  roles: Roles
  gaId: string
  siteId: string
  siteMap: string
  desktopLogo: string
  isServiceLaunched: boolean
  isToolsMonetizationModelEnabled: boolean
  site: string
  username: string
  otpDetails: string
  siteType: string
  googleGAIds: string
  firebasePropertyId: string
  serviceId: string
  domainName: string
  enableSSAISupport: boolean
  bucket: string
  analyticsURL: string
  reelybaseURL: string
  encodingService: string
  contributorData: string
  contentContributorData: string
  renditionUrl: string
  templateBuilderURL: string
  tbHostUrl: string
  isDRMEncryptionRequired: string
  isVerified: string
  settingsId: string
  enableQOS: string
  enableLiveStream: string
  bucketRegion: string
  isSocialPublishAutomated: string
  managementXApiKey: string
}

const getExpiryTime = () => {
  return new Date(new Date().getTime() + 60 * 60000)
}

const useLogin = () => {
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const domain = getDomain()

  const forgot = router?.query.forgot

  const getUserInfo = async (token: string) => {
    const data = await fetchHelper({
      url: USER_INFO,
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + token,
      },
    })
    return data.response
  }

  const commonCookieAttrs = {
    path: '/',
    domain,
  }

  const handleLogin = async (data: object) => {
    setLoading(true)
    const {
      success,
      isTwoFactorOnLogin,
      message,
      accessToken,
      v2ManagementApiEnabled,
      username,
      obscureMobileNumber,
    } = await fetchHelper({
      url: LOGIN,
      method: 'POST',
      data,
    })
    setLoading(false)

    if (!success) {
      setMessage(message)
      return
    }

    setCookie(
      'v2ManagementApiEnabled',
      v2ManagementApiEnabled,
      commonCookieAttrs
    )
    setCookie('obscureMobileNumber', obscureMobileNumber, commonCookieAttrs)

    if (isTwoFactorOnLogin) {
      setCookie('username', username, {
        expires: getExpiryTime(),
        ...commonCookieAttrs,
      })
      router.push('/verify-number')

      return
    }

    setCookie('accessToken', accessToken, {
      expires: getExpiryTime(),
      ...commonCookieAttrs,
    })
    const res = await getUserInfo(accessToken)
    onSuccessLogin(res)
    router.push('/ui-analytics')
  }

  const generateOtp = async () => {
    const { success, message } = await fetchHelper({
      url: GENERATE_OTP,
      method: 'POST',
      data: {
        username: cookies.username,
        isLogin: true,
      },
    })

    setSuccess(success)
    setMessage(message)

    if (!success) return

    setLoading(false)
  }

  const verifyOtp = async ({ otp }: { otp: string }) => {
    setLoading(true)

    const { success, message, accessToken, v2ManagementApiEnabled } =
      await fetchHelper({
        url: VERIFY_OTP,
        method: 'POST',
        data: {
          username: cookies.username,
          otp,
          isLogin: !forgot,
        },
      })

    setLoading(false)

    setMessage(message)
    setSuccess(success)

    if (!success) {
      return
    }

    setCookie('accessToken', accessToken, {
      expires: getExpiryTime(),
      ...commonCookieAttrs,
    })
    setCookie(
      'v2ManagementApiEnabled',
      v2ManagementApiEnabled,
      commonCookieAttrs
    )

    if (forgot) {
      router.push(`/reset-password?token=${accessToken}`)
    } else {
      getUserInfo(accessToken)
      router.push('/ui-analytics')
    }
  }

  const forgotPassword = async (data: { username: string }) => {
    setLoading(true)
    const { success, message, errorMessage } = await fetchHelper({
      url: FORGOT_PASSWORD,
      method: 'POST',
      data,
    })

    setLoading(false)
    setSuccess(success)
    setMessage(message || errorMessage)

    if (!success) return
    setCookie('username', data.username, {
      expires: getExpiryTime(),
      ...commonCookieAttrs,
    })

    router.push('/verify-number?forgot=true')
  }

  const resetPassword = async (data: object) => {
    const token = router?.query?.token

    setLoading(true)
    const { success, message } = await fetchHelper({
      url: RESET_PASSWORD,
      method: 'POST',
      data: {
        ...data,
        token,
      },
    })

    setLoading(false)
    setSuccess(success)
    setMessage(message)

    if (!success) return

    router.push('/')
  }

  const getIsLoggedIn = () => {
    return Boolean(cookies.accessToken)
  }

  const handleLogout = () => {
    removeCookie('accessToken', { path: '/' })
    router.push('/')
  }

  const onSuccessLogin = (data: UserData) => {
    const accessList = data.roles
    // localStorage['user-roles'] = JSON.stringify(data.roles)
    setCookie('user-roles', JSON.stringify(data.roles), {
      expires: getExpiryTime(),
      ...commonCookieAttrs,
    })
    setCookie('adminAccess', accessList['Admin'] === 'read', commonCookieAttrs)
    setCookie(
      'contentAccess',
      accessList['Content'] === 'read',
      commonCookieAttrs
    )
    setCookie(
      'subOfferAccess',
      accessList['Subscriptions & Offers'] === 'read',
      commonCookieAttrs
    )
    setCookie(
      'custAccess',
      accessList['Customer Support'] === 'read',
      commonCookieAttrs
    )
    localStorage['userSiteMap'] = data.siteMap
      ? JSON.stringify(data.siteMap)
      : []

    localStorage['isServiceLaunched'] = data.isServiceLaunched
    setCookie('gaId', data.gaId, {
      expires: getExpiryTime(),
      ...commonCookieAttrs,
    })
    setCookie('siteId', data.siteId, commonCookieAttrs)
    setCookie('desktopLogo', data.desktopLogo, commonCookieAttrs)
    setCookie('site', data.site, {
      expires: getExpiryTime(),
      ...commonCookieAttrs,
    })
    setCookie('user', data.username, {
      expires: getExpiryTime(),
      ...commonCookieAttrs,
    })
    setCookie('otpDetails', data.otpDetails, {
      expires: getExpiryTime(),
      ...commonCookieAttrs,
    })
    setCookie('siteType', data.siteType, {
      expires: getExpiryTime(),
      ...commonCookieAttrs,
    })
    setCookie('googleGAIds', data.googleGAIds, {
      expires: getExpiryTime(),
      ...commonCookieAttrs,
    })
    setCookie('firebasePropertyId', data.firebasePropertyId, {
      expires: getExpiryTime(),
      ...commonCookieAttrs,
    })
    setCookie('serviceId', data.serviceId, {
      expires: getExpiryTime(),
      ...commonCookieAttrs,
    })
    setCookie('DomainName', data.domainName, {
      expires: getExpiryTime(),
      ...commonCookieAttrs,
    })
    setCookie('bucket-name', data.bucket, {
      expires: getExpiryTime(),
      ...commonCookieAttrs,
    })
    setCookie('analyticsURL', data.analyticsURL, {
      expires: getExpiryTime(),
      ...commonCookieAttrs,
    })
    setCookie('reelybaseURL', data.reelybaseURL, {
      expires: getExpiryTime(),
      ...commonCookieAttrs,
    })
    setCookie('encodingService', data.encodingService, {
      expires: getExpiryTime(),
      ...commonCookieAttrs,
    })
    setCookie('contributorData', data.contributorData, {
      expires: getExpiryTime(),
      ...commonCookieAttrs,
    })
    setCookie('contentContributorData', data.contentContributorData, {
      expires: getExpiryTime(),
      ...commonCookieAttrs,
    })
    setCookie(
      'isToolsMonetizationModelEnabled',
      data.isToolsMonetizationModelEnabled,
      { expires: getExpiryTime(), ...commonCookieAttrs }
    )
    setCookie('renditionUrl', data.renditionUrl, {
      expires: getExpiryTime(),
      ...commonCookieAttrs,
    })
    setCookie('templateBuilderURL', data.templateBuilderURL, {
      expires: getExpiryTime(),
      ...commonCookieAttrs,
    })
    setCookie('tbHostUrl', data.tbHostUrl, {
      expires: getExpiryTime(),
      ...commonCookieAttrs,
    })
    setCookie('isDRMEncryptionRequired', data.isDRMEncryptionRequired, {
      expires: getExpiryTime(),
      ...commonCookieAttrs,
    })
    setCookie('isVerified', data.isVerified, {
      expires: getExpiryTime(),
      ...commonCookieAttrs,
    })
    setCookie('settingsId', data.settingsId, {
      expires: getExpiryTime(),
      ...commonCookieAttrs,
    })
    setCookie('enableQOS', data.enableQOS, {
      expires: getExpiryTime(),
      ...commonCookieAttrs,
    })
    setCookie('enableLiveStream', data.enableLiveStream, {
      expires: getExpiryTime(),
      ...commonCookieAttrs,
    })
    setCookie('enableSSAISupport', data.enableSSAISupport, {
      expires: getExpiryTime(),
      ...commonCookieAttrs,
    })
    setCookie('bucketRegion', data.bucketRegion, {
      expires: getExpiryTime(),
      ...commonCookieAttrs,
    })
    setCookie('managementXApiKey', data.managementXApiKey, {
      expires: getExpiryTime(),
      ...commonCookieAttrs,
    })

    if (data.site == 'rchdtv') {
      setCookie('enableEncoding', false, {
        expires: getExpiryTime(),
        ...commonCookieAttrs,
      })
    } else {
      setCookie('enableEncoding', true, {
        expires: getExpiryTime(),
        ...commonCookieAttrs,
      })
    }

    localStorage['content-view.current-siteid'] = '/' + data.site
    localStorage['isSocialPublishAutomated'] = data.isSocialPublishAutomated
  }

  return {
    handleLogin,
    verifyOtp,
    generateOtp,
    forgotPassword,
    loading,
    message,
    setMessage,
    resetPassword,
    success,
    setSuccess,
    getIsLoggedIn,
    handleLogout,
  }
}

export default useLogin
