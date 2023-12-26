export type MonetizationOfferTableData = {
  offerName: string
  status: string
  availability: string
  campaignType: string
  offerType: string
  offerInfo: number
  billingPeriod: number
  offerLimit: string
  editOffer: unknown
  versionHistory: unknown
}

type DateStringType = string // This can be refined further based on the actual date format used in the data

export type OfferDetailsType = {
  offerStrategyType: string
  reduceCharge: object
  freeTrialUntil: object
  freeTrial: {
    renewalCycleType: string
    renewalCycleMultiplier: number
  }
  offerLimit: {
    promotionCodes: string[]
    offerLimitType: string
  }
}

export type MarketingType = {
  campaignType: string
  cookieValidDays: number
}

export type ScheduleDetailsType = {
  scheduledFromDate: number // Assuming this represents a Unix timestamp
  scheduledToDate: number | null // Assuming this represents a Unix timestamp or null
}

export type MonetizationOfferType = {
  updateDate: DateStringType
  addedDate: DateStringType
  offerDetails: OfferDetailsType
  description: string
  marketing: MarketingType
  site: string
  name: string
  siteOwner: string
  id: string
  scheduleDetails: ScheduleDetailsType
  status: string
}
