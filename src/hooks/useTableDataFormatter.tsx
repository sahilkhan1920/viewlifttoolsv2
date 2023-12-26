import { useCallback } from 'react'
import { SearchResponseType, TableDataType } from 'src/types/SearchType'
import { PurchaseType } from 'src/types/UserType'
import { OfferType, OffersTableDataType } from 'src/types/OfferType'
import { EventDataType } from 'src/types/AuditLogsType'

function formatCardNumber({ lastDigits, maskLength, mask }: { lastDigits: string | undefined; maskLength: number; mask: string }) {
  if (!lastDigits) return 'N/A'
  // TODO: Dynamically set locale to get correct currency sign
  return `${mask.repeat(maskLength)} ${lastDigits}`
}

function formatSubscriptionStatus({ planName, currencyCode, planAmount }: PurchaseType) {
  if (!planAmount || !planName || !currencyCode) return 'No Plan'
  return `${planName} ${Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(planAmount)}`
}

export default function useTableDataFormatter() {
  const prepareSearchTableData = useCallback((data: SearchResponseType | undefined) => {
    if (!data) return
    const _data: TableDataType[] = []
    data.users.map(({ name, purchases, accountDetails, billing, isSubscribed }) => {
      _data.push({
        name: name,
        email: accountDetails.email,
        account: accountDetails.isActive,
        country: accountDetails.country,
        subscription: isSubscribed && Array.isArray(purchases) ? formatSubscriptionStatus(purchases[0] as PurchaseType) : 'No Plan',
        phoneNumber: accountDetails.phoneNumber ?? 'N/A',
        card: formatCardNumber({
          mask: '*',
          maskLength: 4,
          lastDigits: billing.last4.value,
        }),
      })
    })
    return _data
  }, [])

  const prepareOfferTableData = useCallback((data: OfferType[] | undefined) => {
    if (!data) return
    const _tableData: OffersTableDataType[] = []
    data.map(({ offerName, offerCode, addedDate, offerEndDate }) => {
      _tableData.push({
        name: offerName,
        offerCode,
        applyDate: Intl.DateTimeFormat('en-IN', { dateStyle: 'short' }).format(new Date(addedDate)),
        expirationDate: Intl.DateTimeFormat('en-IN', { dateStyle: 'short' }).format(new Date(offerEndDate)),
      } satisfies OffersTableDataType)
    })
    return _tableData
  }, [])

  const prepareSessionSummaryData = useCallback((data: EventDataType[] | undefined) => {
    if (!data) return []
    const _tableData: { occurred: string; event: string; reason: string }[] = []
    data.map(({ occurred, event_name, reason }) =>
      _tableData.push({
        occurred: new Date(occurred).toLocaleString(),
        event: event_name,
        reason: reason ?? 'N/A',
        // TODO: Fix invalid date issue
      })
    )
    return _tableData
  }, [])

  return { prepareSearchTableData, prepareOfferTableData, prepareSessionSummaryData }
}
