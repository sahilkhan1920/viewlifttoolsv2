// Feature Type
export type FeatureType = {
  value: string | number
  textToDisplay: string
  valueType: 'string' | 'number'
}
// Plan Detail Type
export type PlanDetailType = {
  isRentEnabled: boolean
  recurringPaymentAmount: number
  redirectUrl: string
  displayStrikeThroughPrice: boolean
  scheduledFromDate: number
  description: string
  title: string
  callToAction: string
  features: FeatureType[]
  scheduledToDate: string | null
  countryCode: string
  recurringPaymentCurrencyCode: string
  tnCPoints: any[] // Replace 'any[]' with a more specific type if available
  featureDetails: FeatureType[]
  visible: boolean
  hidePlanPrice: boolean
  numberOfAllowedDevices: number
  isPurchaseEnabled: boolean
  numberOfAllowedStreams: number
  isDefault: boolean
  carrierBillingProviders: any[] // Replace 'any[]' with a more specific type if available
  supportedDevices: string[]
  displayFeaturePlanIdentifier?: boolean
}
// FeatureSetting type
export type FeatureSettingType = {
  numberOfAllowedStreams: number
  contentConsumption: string[]
  includingAds: boolean
  isHdStreaming: boolean
  isBeamingAllowed: boolean
  isDownloadAllowed: boolean
  numberOfAllowedDevices: number
}
// Plan Type
export type PlanType = {
  identifier: string
  metadata: any[] // Replace 'any[]' with a more specific type if available
  updateDate: string
  addedDate: string
  featureSetting: FeatureSettingType
  scheduledFromDate: string
  description: string
  site: string
  planDetails: PlanDetailType[]
  objectKey: string
  renewable: boolean
  renewalCycleType: RenewalCycle
  name: string
  renewalCyclePeriodMultiplier: number
  siteOwner: string
  id: string
  planOffers: any[] // Replace 'any[]' with a more specific type if available
  planDisplayOrder: number
  monetizationModel: MonetizationModel
}
// Renewal cycle enum
export enum RenewalCycle {
  MONTH = 'MONTH',
  YEAR = 'YEAR',
}
// Monetization models enum
export enum MonetizationModel {
  SVOD = 'SVOD',
  TVOD = 'TVOD',
  TVE = 'TVE',
  FREE = 'FREE',
}
