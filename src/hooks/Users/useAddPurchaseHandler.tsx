import { useFormik } from 'formik'
import { useCookies } from 'react-cookie'
import { INVOKE_V2_API } from 'src/constants/urlConstants'
import fetchHelper from 'src/helpers/fetchHelper'

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
  {
    label: 'Stripe',
    value: 'stripe',
  },
]
export const PurchaseTypeList: { value: PurchaseType; label: string }[] = [
  {
    label: 'Purchase',
    value: 'purchase',
  },
  {
    label: 'Rent',
    value: 'rent',
  },
]
export const ContentTypeList: { value: ContentType; label: string }[] = [
  { label: 'VIDEO', value: 'VIDEO' },
  { label: 'SERIES', value: 'SERIES' },
  { label: 'BUNDLE', value: 'BUNDLE' },
  { label: 'EPISODE', value: 'EPISODE' },
  { label: 'SEASON', value: 'SEASON' },
]
export const VideoQualityList: { value: VideoQualityType; label: string }[] = [
  { label: 'HD', value: 'hd' },
  { label: 'SD', value: 'sd' },
  { label: 'UHD', value: 'uhd' },
]
export type PaymentHandlerType = 'none' | 'prepaid' | 'ios' | 'android' | 'stripe'
export type PurchaseType = 'purchase' | 'rent'
export type VideoQualityType = 'hd' | 'sd' | 'uhd'
export type ContentType = 'VIDEO' | 'SERIES' | 'BUNDLE' | 'EPISODE' | 'SEASON'
export type CommonPurchaseFieldType = {
  paymentHandler: PaymentHandlerType
  purchaseType: PurchaseType
}
export type MobilePaymentHandlerFieldType = {
  contentId: string
  contentType: ContentType
  seasonId?: string
  seriesId?: string
  videoQuality: VideoQualityType
  receipt: string
}
export type PrepaidHandlerFieldType = CommonPurchaseFieldType & {
  couponCode: string
}
export type IOSHandlerFieldType = CommonPurchaseFieldType &
  MobilePaymentHandlerFieldType & {
    paymentUniqueId: string
    planId: string
  }
export type AndroidHandlerFieldType = CommonPurchaseFieldType & MobilePaymentHandlerFieldType
export type StripeHandlerFieldType = CommonPurchaseFieldType &
  MobilePaymentHandlerFieldType & {
    stripeRequestId: string
    stripeToken: string
    amount: string
  }
export type AddPurchaseDataType = PrepaidHandlerFieldType | IOSHandlerFieldType | AndroidHandlerFieldType | StripeHandlerFieldType
export default function useAddPurchaseHandler({ userId }: { userId: string }) {
  const [cookies] = useCookies()
  return useFormik<AddPurchaseDataType>({
    enableReinitialize: true,
    initialValues: {
      paymentHandler: 'none',
      purchaseType: 'purchase',
      receipt: '',
      couponCode: '',
      contentId: '',
      contentType: 'VIDEO',
      seasonId: undefined,
      seriesId: undefined,
      videoQuality: 'hd',
      paymentUniqueId: '',
      planId: '',
      stripeRequestId: '',
      stripeToken: '',
      amount: '',
    },
    onSubmit: async (values) => {
      const site = cookies.site
      const siteId = cookies.siteId
      const platform = ''
      const email = ''

      await fetchHelper({
        method: 'POST',
        url: INVOKE_V2_API,
        headers: {},
        data: {
          url: '/transaction/transaction',
          method: 'POST',
          role: 'Customer Support',
          auth: {
            site,
            userId: "'",
          },
          query: {
            site,
          },
          body: { ...constructPayload(values, site, platform), email, site, siteId, userId },
        },
      })
    },
  })
}

function isIOSPurchaseData(data: AddPurchaseDataType): data is IOSHandlerFieldType {
  return data.paymentHandler === 'ios'
}
function isAndroidPurchaseData(data: AddPurchaseDataType): data is AndroidHandlerFieldType {
  return data.paymentHandler === 'android'
}
function isStripePurchaseData(data: AddPurchaseDataType): data is StripeHandlerFieldType {
  return data.paymentHandler === 'stripe'
}
function isPrepaidPurchaseData(data: AddPurchaseDataType): data is PrepaidHandlerFieldType {
  return data.paymentHandler === 'prepaid'
}
function constructPayload(data: AddPurchaseDataType, siteInternalName: string, platform: string) {
  if (isIOSPurchaseData(data)) {
    const payload = {
      contentRequest: {
        contentId: data.contentId,
        contentType: data.contentType,
        seasonId: data.seasonId ?? null,
        seriesId: data.seriesId ?? null,
        videoIds: data.contentId,
        videoQuality: data.videoQuality,
      },
      purchaseType: data.purchaseType,
      transaction: data.paymentHandler,
      receipt: data.receipt,
      paymentUniqueId: data.paymentUniqueId,
      planIdentifier: data.planId,
      siteInternalName,
      platform,
    }
    return payload
  }
  if (isPrepaidPurchaseData(data)) {
    const payload = {
      couponCode: data.couponCode,
      platform,
      purchaseType: data.purchaseType,
      transaction: data.paymentHandler,
    }
    return payload
  }
  if (isAndroidPurchaseData(data)) {
    const payload = {
      contentRequest: {
        contentId: data.contentId,
        contentType: data.contentType,
        seasonId: data.seasonId ?? null,
        seriesId: data.seriesId ?? null,
        videoIds: data.contentId,
        videoQuality: data.videoQuality,
      },
      purchaseType: data.purchaseType,
      transaction: data.paymentHandler,
      receipt: data.receipt,
      device: 'android_phone',
      siteInternalName,
      platform,
    }
    return payload
  }
  if (isStripePurchaseData(data)) {
    const _data = data as StripeHandlerFieldType
    const payload = {
      contentRequest: {
        contentId: _data.contentId,
        contentType: _data.contentType,
        seasonId: _data.seasonId ?? null,
        seriesId: _data.seriesId ?? null,
        videoIds: _data.contentId,
        videoQuality: _data.videoQuality,
      },
      purchaseType: _data.purchaseType,
      transaction: _data.paymentHandler,
      amount: _data.amount,
      requestId: _data.stripeRequestId,
      stripeToken: _data.stripeToken,
      platform: 'web_browser',
      currencyCode: 'USD',
    }
    return payload
  }
}
