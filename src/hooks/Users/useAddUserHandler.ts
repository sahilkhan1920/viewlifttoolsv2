import { useFormik } from 'formik'
import { useCookies } from 'react-cookie'
import { AddUserErrorResponseType, AddUserResponse, AddUserSuccessResponse } from 'src/components/User/Modals/AddUserModal/AddUserType'
import { INVOKE_V2_API } from 'src/constants/urlConstants'
import fetchHelper from 'src/helpers/fetchHelper'

export type AddUserDataType = {
  email: string
  name?: string
  country: string
  password: string
  confirmPassword: string
}

function checkResponseType(res: AddUserResponse): res is AddUserErrorResponseType {
  return 'code' in res
}

export default function useAddUserHandler() {
  const [cookies] = useCookies()
  return useFormik<AddUserDataType>({
    initialValues: {
      name: '',
      email: '',
      confirmPassword: '',
      country: '',
      password: '',
    },
    validate: ({ email, password, country, confirmPassword }) => {
      if (!email) return { email: 'Email is required' }
      if (!password) return { password: 'Password is required' }
      if (!country) return { country: 'Password is required' }
      if (password !== confirmPassword) return { confirmPassword: 'Passwords do not match' }
    },
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(false)
      const res = await fetchHelper({
        method: 'POST',
        url: INVOKE_V2_API,
        data: {
          url: 'identity/signup',
          method: 'POST',
          role: 'Customer Support',
          auth: { site: cookies.site },
          query: { site: cookies.site, device: 'web_browser_tools' },
          body: values,
        },
        headers: {
          xapikey: cookies.managementXApiKey,
          Authorization: cookies.accessToken,
        },
      })
      console.log(res)
      if (checkResponseType(res)) {
        // TODO: Implement error handling and provide feedback to user on error
        console.error(res)
      }
      const { email, userId } = res as AddUserSuccessResponse
      await fetchHelper({
        headers: {
          xapikey: cookies.managementXApiKey,
          Authorization: cookies.accessToken,
        },
        data: {
          method: 'POST',
          body: {
            userId,
            event_code: 'addNewUser',
            event_comments: `Add new user ${email}`,
            event_name: 'Add new user',
          },
        },
        method: 'POST',
        url: `https://tools.develop.monumentalsportsnetwork.com/${cookies.site}/users/logs/${userId}`,
      })
    },
  })
}
