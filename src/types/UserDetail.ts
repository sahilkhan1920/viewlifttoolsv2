type FeatureDetailType = {
  value: string
  textToDisplay: string
  valueType: string
}

export type FeatureType = {
  value: string
  textToDisplay: string
  valueType: string
}

export type PlanDetailType = {
  isRentEnabled: boolean
  recurringPaymentAmount: number
  visible: boolean
  redirectUrl: string
  displayStrikeThroughPrice: boolean
  hidePlanPrice: boolean
  scheduledFromDate: number
  numberOfAllowedDevices: number
  isPurchaseEnabled: boolean
  numberOfAllowedStreams: number
  features: FeatureType[]
  isDefault: boolean
  carrierBillingProviders: unknown[]
  scheduledToDate: null | number
  countryCode: string
  recurringPaymentCurrencyCode: string
  supportedDevices: string[]
  tnCPoints: unknown[]
  featureDetails: FeatureDetailType[]
}

export type MonetizationPlanType = {
  identifier: string
  metadata: unknown[]
  updateDate: string
  addedDate: string
  featureSetting: {
    numberOfAllowedStreams: number
    contentConsumption: string[]
    includingAds: boolean
    isHdStreaming: boolean
    isBeamingAllowed: boolean
    isDownloadAllowed: boolean
    numberOfAllowedDevices: number
  }
  scheduledFromDate: string
  description: string
  site: string
  planDetails: PlanDetailType[]
  objectKey: string
  renewable: boolean
  renewalCycleType: string
  name: string
  renewalCyclePeriodMultiplier: number
  siteOwner: string
  id: string
  planOffers: unknown[]
  planDisplayOrder: number
  monetizationModel: string
}

export type SubscriptionInfoType = {
  paymentUniqueId: string
  updateDate: string
  addedDate: string
  freeTrial: boolean
  originRegion: string
  platform: string
  countryCode: string
  paymentHandler: string
  subscriptionStatus: string
  planId: string
  preTaxAmount: number
  paymentState: string
  subscriptionStartDate: string
  email: string
  identifier: string
  subscriptionEndDate: string
  numberOfAllowedDevices: number
  userId: string
  numberOfAllowedStreams: number
  site: string
  siteId: string
  siteOwner: string
  taxAmount: number
  currencyCode: string
  planAmount: number
}

export type SubscriptionType = {
  subscriptionStatus: string
  subscriptionInfo: SubscriptionInfoType
}

export type ProfileType = {
  profileName: string
  metadata: unknown
  isDefault: string
  site: string
  addedDate: string
  profileType: string
  profileId: string
  userId: string
}

export type UserDetailType = {
  country: string
  updateDate: string
  city: string
  timezone: string
  lastLoginDate: string
  subscription: SubscriptionType
  isActive: number
  registeredDevice: string
  lastLoginIp: string
  registerdVia: string
  isSubscribed: boolean
  emailConsent: boolean
  provider: string
  stateName: string
  userState: string
  postalcode: string
  whatsappConsent: boolean
  phoneCode: number
  monetizationPlan: MonetizationPlanType
  state: string
  id: string
  email: string
  profiles: ProfileType[]
  passwordEnabled: boolean
  purchasedItems: unknown[]
  registrationIp: string
  userId: string
  site: string
  phoneNumber: string
  name: string
  countryName: string
  registeredOn: string
  providers: string[]
}
