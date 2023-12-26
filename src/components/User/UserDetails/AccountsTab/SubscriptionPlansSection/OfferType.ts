export type Offer = {
  updateDate: string // The date and time when the offer was last updated (in UTC, ISO 8601 format).
  addedDate: string // The date and time when the offer was added (in UTC, ISO 8601 format).
  offerDetails: OfferDetails // Details about the offer.
  description: string // A brief description of the offer.
  marketing: MarketingDetails // Marketing-related details for the offer.
  site: string // The site associated with the offer.
  name: string // The name of the offer.
  siteOwner: string // The owner of the site associated with the offer.
  id: string // The unique identifier of the offer.
  scheduleDetails: ScheduleDetails // Details about the offer's scheduling.
  status: OfferStatus // The status of the offer.
}

export type OfferDetails = {
  offerStrategyType: string // The type of offer strategy (e.g., "FREE_TRIAL").
  reduceCharge: unknown // Details about reducing charges (empty in this case).
  freeTrialUntil: string | undefined // Details about the free trial period expiration date (empty in this case).
  freeTrial: FreeTrialDetails // Details about the free trial period.
  offerLimit: OfferLimitDetails // Details about the offer limits.
}

export type FreeTrialDetails = {
  renewalCycleType: string // The type of renewal cycle for the free trial (e.g., "DAY").
  renewalCycleMultiplier: number // The number of renewal cycles for the free trial (e.g., 7 days).
}

export type OfferLimitDetails = {
  promotionCodes: string[] // An array of promotion codes associated with the offer.
  offerLimitType: string // The type of offer limit (e.g., "UNLIMITED").
}

export type MarketingDetails = {
  campaignType: string // The type of marketing campaign (empty in this case).
  cookieValidDays: number // The number of days the marketing cookie is valid (e.g., 30 days).
}

export type ScheduleDetails = {
  scheduledFromDate: number // The timestamp (in milliseconds) when the offer is scheduled to start.
  scheduledToDate: number | null // The timestamp (in milliseconds) when the offer is scheduled to end (null if not scheduled).
}

type OfferStatus = 'UnExpired' | 'Expired' | string // The status of the offer (can be "UnExpired", "Expired", or any other custom status).
