import { NextPage } from 'next'
import { ComponentPropsWithRef } from 'react'
import { UserType } from './UserType'

export type SearchBarPropType = ComponentPropsWithRef<'div'> & {
  showClearButton?: boolean
  showDownloadCsvButton?: boolean
  showAddUserButton?: boolean
  dropdownListConfig: { key: string; value: string; label: string }[]
  buttonConfig?: {
    searchButton?: {
      label?: string
      onClick?: () => void
    }
    clearButton?: {
      label?: string
      onClick?: () => void
    }
    downloadCsvButton?: {
      label?: string
      onClick?: () => void
    }
    addNewUserButton?: {
      label?: string
      onClick?: () => void
    }
  }
  clearCb?: () => void
}

export type TableDataType = {
  name: string
  email: string
  account: number
  country: string
  subscription: string
  phoneNumber: string
  card: string
}

export type SearchResultPageProps = NextPage & {
  filter: string
  keyword: string
  data: TableDataType[]
}

export type SearchResponseType = {
  count: number
  users: UserType[]
}

export type TabHeaderCtaButtonHandlerType = 'onAddPurchaseHandler' | 'onAddPlanHandler'

export type PageSegmentTabType = {
  key: string
  label: string
  showOnLoad: boolean
  headerCtaButton?: { label: string; onClickHandler?: TabHeaderCtaButtonHandlerType }
}

export type PageSegmentConfigOptionsType = {
  url: string
  method: string
  role: string
}

export type PageSegmentConfigType = {
  [key in 'personalInfoSection' | 'billingHistory']?: PageSegmentConfigOptionsType
}

export type PageSegmentType = PageSegmentTabType & {
  tabs?: PageSegmentTabType[]
  config: PageSegmentConfigType
}

export enum PAGE_SEGMENT_KEYS {
  ACCOUNT = 'account',
  BILLING_PURCHASE = 'billingAndPurchase',
  OFFERS = 'offers',
  ACTIVITY_WATCHLIST = 'activityAndWatchList',
  DEVICES = 'devices',
  AUDIT_LOG = 'auditLog',
}
