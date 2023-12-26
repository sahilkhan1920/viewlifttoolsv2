import { useFormik } from 'formik'
import { useCookies } from 'react-cookie'
import { INVOKE_V2_API } from 'src/constants/urlConstants'
import fetchHelper from 'src/helpers/fetchHelper'

export type PaymentHandlerType = 'none' | 'prepaid' | 'ios' | 'android'
export type AddPlanDataType = {
  paymentHandler: PaymentHandlerType
  country: string
  plan: string
  receipt: string
  error?: string
}

export const PaymentHandlerList: { value: PaymentHandlerType; label: string }[] = [
  {
    label: 'Select',
    value: 'none',
  },
  {
    label: 'Prepaid',
    value: 'prepaid',
  },
  {
    label: 'iOS',
    value: 'ios',
  },
  {
    label: 'Android',
    value: 'android',
  },
]
export default function useAddPlanHandler({ userId }: { userId: string }) {
  const [cookies] = useCookies()

  const xapikey = cookies.managementXApiKey
  const Authorization = cookies.accessToken
  const site = cookies.site
  const siteId = cookies.siteId

  return useFormik<AddPlanDataType>({
    initialValues: {
      receipt: '',
      country: '',
      paymentHandler: 'none',
      plan: '',
      error: undefined,
    },
    onSubmit: async ({ plan, receipt, paymentHandler, country }, { setSubmitting, setErrors }) => {
      const res = await fetchHelper({
        url: INVOKE_V2_API,
        method: 'POST',
        headers: { xapikey, Authorization },
        data: {
          url: '/subscription/subscribe',
          method: 'POST',
          role: 'Customer Support',
          auth: {
            site,
            userId,
          },
          query: {
            site,
            platform: 'ios_phone',
            store_countryCode: country,
          },
          body: {
            planIdentifier: plan,
            siteId,
            subscription: paymentHandler,
            userId,
            receipt,
            siteInternalName: site,
            addEntitlement: false,
            platform: 'ios_phone',
          },
        },
      })
      setSubmitting(false)
      if (new Object(res).hasOwnProperty('code')) return setErrors({ error: res.message })
    },
  })
}
