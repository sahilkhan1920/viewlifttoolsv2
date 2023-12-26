import SortedTable from 'src/components/common/SortingTable'

import CONFIG from './config.json'
import { MonetizationOfferTableData, MonetizationOfferType } from 'src/types/MonetizationOfferType'
import { Edit, History } from '@mui/icons-material'
import { Button } from '@mui/material'

export type MonetizationOffersTablePropType = {
  data: MonetizationOfferType[] | []
  onEditOffer: (offerId: string) => void
  onViewVersionHistory: (offerId: string) => void
}
export default function MonetizationOffersTable({ data, onEditOffer, onViewVersionHistory }: MonetizationOffersTablePropType) {
  function prepareTableData() {
    if (!data) return []
    const tableData: MonetizationOfferTableData[] = []
    data.map(({ offerDetails, marketing, description, status, id }) =>
      tableData.push({
        offerName: description,
        status: status,
        availability: '',
        campaignType: marketing.campaignType ? marketing.campaignType : 'N/A',
        offerType: offerDetails.offerStrategyType.replace('_', ' '),
        offerInfo: 0,
        billingPeriod: offerDetails.freeTrial.renewalCycleMultiplier,
        offerLimit: offerDetails.offerLimit.offerLimitType,
        editOffer: (
          <Button type="button" onClick={onEditOffer.bind(null, id)}>
            <Edit />
          </Button>
        ),
        versionHistory: (
          <Button type="button" onClick={onViewVersionHistory.bind(null, id)}>
            <History />
          </Button>
        ),
      } satisfies MonetizationOfferTableData)
    )
    return tableData
  }
  return (
    <SortedTable
      data={prepareTableData()}
      columns={CONFIG.tableColumns as { key: keyof MonetizationOfferTableData; title: string }[]}
      defaultOrderBy="offerName"
    />
  )
}
