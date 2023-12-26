// Type definitions for the data
export type FeatureType = {
  value: string
  textToDisplay: string
  valueType: string
}

export type PlanType = {
  recurringPaymentAmount: number
  visible: boolean
  taxIncluded: boolean
  displayStrikeThroughPrice: boolean
  scheduledFromDate: number
  hidePlanPrice: boolean
  numberOfAllowedDevices: number
  numberOfAllowedStreams: number
  isDefault: boolean
  carrierBillingProviders: any[] // Type of carrierBillingProviders is not clear from the provided data.
  countryCode: string
  recurringPaymentCurrencyCode: string
  supportedDevices: string[]
  featureDetails: FeatureType[]
}

export type MonetizationPlanType = {
  identifier: string
  updateDate: number
  addedDate: number
  description: string
  planDetails: PlanType[]
  renewable: boolean
  renewalCycleType: string
  objectKey: string
  name: string
  renewalCyclePeriodMultiplier: number
  siteOwner: string
  id: string
}

export type SubscriptionInfoType = {
  paymentUniqueId: string
  updateDate: string
  addedDate: string
  freeTrial: boolean
  paymentHandlerDisplayName: string
  originRegion: string
  platform: string
  gatewayFee: number
  countryCode: string
  paymentHandler: string
  subscriptionStatus: string
  planId: string
  preTaxAmount: number
  subscriptionCancellationDate: string
  paymentState: string
  subscriptionStartDate: string
  email: string
  androidResponse: string
  identifier: string
  subscriptionEndDate: string
  gatewayChargeId: string
  ipAddress: string
  numberOfAllowedDevices: number
  userId: string
  numberOfAllowedStreams: number
  totalAmount: number
  site: string
  environment: string
  siteId: string
  siteOwner: string
  receipt: string
  taxAmount: number
  currencyCode: string
  planAmount: number
}

// Data structure
export type SubscriptionType = {
  subscriptionInfo: SubscriptionInfoType
  plans: MonetizationPlanType[]
  subscriptionPlanInfo: MonetizationPlanType
}
