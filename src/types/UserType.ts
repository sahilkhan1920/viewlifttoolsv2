export type CommonPaymentPropertyType = {
  paymentUniqueId: string
  updateDate: string
  addedDate: string
  freeTrial: boolean
  countryCode: string
  paymentHandler: string
  subscriptionStatus: string
  planId: string
  preTaxAmount: number
  subscriptionStartDate: string
  identifier: string
  subscriptionEndDate: string
  userId: string
  site: string
  siteOwner: string
  taxAmount: number
  currencyCode: string
}

export type PaymentData = CommonPaymentPropertyType & {
  gatewayChargeId: string
  gatewayFee: number
  initiatedAt: string
  receipt: string
}

export type PurchaseType = CommonPaymentPropertyType & {
  originRegion: string
  planName: string
  type: string
  platform: string
  paymentState: string
  email: string
  numberOfAllowedDevices: number
  siteId: string
  planAmount: number
  numberOfAllowedStreams: number
}

export type ProfileType = {
  isDefault: boolean
  updateDate: string
  addedDate: string
  name: string
  interestedGenres: string[]
  id: string
}

export type BillingType = {
  paymentUniqueId: {
    value: string | null
    hash: string | null
  }
  last4: Record<string, never>
  vlTransactionId: Record<string, never>
  receipt: {
    value: string | null
    hash: string | null
  }
  gatewayChargeId: Record<string, never>
}

export type AccountDetailType = {
  country: string
  updateDate: string
  city: string
  timezone: string
  lastLoginDate: string
  isActive: number
  lastLoginIp: string
  registerdVia: string
  isSubscribed: boolean
  emailConsent: boolean
  provider: string
  stateName: string
  postalcode: string
  whatsappConsent: boolean
  phoneCode: number
  id: string
  state: string
  email: string
  registrationIp: string
  userId: string
  site: string
  phoneNumber: string
  name: string
  countryName: string
  registeredOn: string
  providers: string[]
}

export type UserType = {
  indexTime: number
  updateDate: string
  purchases: PurchaseType[] | never[]
  profiles: ProfileType[]
  lastLoginDate: string
  type: string
  isActive: number
  userId: string
  billing: BillingType
  site: string
  isSubscribed: boolean
  phoneNumber: string
  accountDetails: AccountDetailType
  name: string
  registeredOn: string
  email: string
}
