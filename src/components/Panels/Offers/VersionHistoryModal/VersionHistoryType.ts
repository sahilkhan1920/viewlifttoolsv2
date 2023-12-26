export type DateStringType = string // This can be refined further based on the actual date format used in the data

export type OfferLimitType = {
  promotionCodes: string[]
  offerLimitType: string
}

export type FreeTrialType = {
  renewalCycleType: string
  renewalCycleMultiplier: string
}

export type OfferDetailsType = {
  offerStrategyType: string
  reduceCharge: object
  freeTrialUntil: object
  freeTrial: FreeTrialType
  offerLimit: OfferLimitType
}

export type MarketingType = {
  campaignType: string
  cookieValidDays: string
}

export type ScheduleDetailsType = {
  scheduledFromDate: DateStringType
  scheduledToDate: DateStringType | null
}

export type MonetizationOfferType = {
  offerId: string
  siteInternalName: string
  name: string
  description: string
  offerDetails: OfferDetailsType
  offerType: null | string
  scheduleDetails: ScheduleDetailsType
  status: string
  url: null | string
  marketing: MarketingType
  dateCreated: DateStringType
  versionStatus: string
  versionName: string
  versionCreatedBy: string
}

export type ResponseType = {
  content: MonetizationOfferType[]
  contentCount: number
}

export type ApiResponse = {
  responseCode: number
  response: ResponseType
}
