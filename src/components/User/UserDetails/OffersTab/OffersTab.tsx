import { Box } from '@mui/material'
import { memo, useEffect, useMemo, useState } from 'react'
import { useCookies } from 'react-cookie'

import { INVOKE_V2_API } from 'src/constants/urlConstants'
import fetchHelper from 'src/helpers/fetchHelper'
import CONFIG from '../../../../../pages/users/config.json'
import VLLoaderWrapper from 'src/components/common/VLLoaderWrapper'
import SortedTable from 'src/components/common/SortingTable'
import { SortedTableHeaderSearchBar } from '../../SearchBar'
import useTableDataFormatter from 'src/hooks/useTableDataFormatter'
import { OfferType, OffersTableDataType } from 'src/types/OfferType'

export type OffersTabPropType = {
  userId: string
}

export default memo(function OffersTab({ userId }: OffersTabPropType) {
  const [cookies] = useCookies()
  const { prepareOfferTableData } = useTableDataFormatter()

  const [loading, setLoading] = useState(false)
  const [offerData, setOfferData] = useState<OfferType[] | undefined>(undefined)

  const fetchOffers = useMemo(async () => {
    if (!userId) return
    return await fetchHelper({
      url: INVOKE_V2_API,
      data: {
        body: {},
        method: 'GET',
        url: `subscription/offers/user/${userId}`,
        role: 'Customer Support',
        auth: {
          site: cookies.site,
          isServerToken: true,
        },
        query: { site: cookies.site },
      },
      method: 'POST',
      headers: {
        xapikey: cookies.managementXApiKey,
        Authorization: cookies.accessToken,
      },
    })
  }, [userId, cookies.managementXApiKey, cookies.accessToken, cookies.site])

  useEffect(() => {
    setLoading(true)
    fetchOffers
      .then((res) => {
        if (new Object(res).hasOwnProperty('error')) return setOfferData(undefined)
        return setOfferData(res.offerList)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [fetchOffers, prepareOfferTableData])

  return (
    <Box paddingTop={3}>
      <VLLoaderWrapper type="inline" loading={loading}>
        <SortedTable
          columns={CONFIG.tableColumns.OffersTable as Array<{ key: keyof OffersTableDataType; title: string }>}
          data={prepareOfferTableData(offerData) ?? []}
          defaultOrderBy="name"
          enablePagination
          headerComponent={<SortedTableHeaderSearchBar />}
        />
      </VLLoaderWrapper>
    </Box>
  )
})
