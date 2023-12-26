import { Box, Button } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { useCookies } from 'react-cookie'
import SortedTable from 'src/components/common/SortingTable'
import VLLoaderWrapper from 'src/components/common/VLLoaderWrapper'
import { INVOKE_V2_API } from 'src/constants/urlConstants'
import fetchHelper from 'src/helpers/fetchHelper'
import CONFIG from '../../../../../pages/users/config.json'
import useCsvGenerator from 'src/hooks/useCsvGenerator'
import { SortedTableHeaderSearchBar } from '../../SearchBar'

type ActivityAndWatchListColumnType = {
  date: string
  change: string
  ipLogin: string
  email: string
  phone: string
  city: string
  country: string
  message: string
}

export default function ActivityWatchListTab({ userId }: { userId: string }) {
  const [cookies] = useCookies()
  const [loading, setLoading] = useState(false)
  const [resData, setResData] = useState([])

  function prepareActivityTableData() {
    return []
  }
  const { downloadAsCsv } = useCsvGenerator({ data: prepareActivityTableData() })

  const fetchActivityAndWatchList = useMemo(async () => {
    return await fetchHelper({
      method: 'POST',
      url: INVOKE_V2_API,
      data: {
        url: 'user/queues',
        method: 'GET',
        role: 'Customer Support',
        auth: {
          site: cookies.site,
          userId,
        },
        query: {
          site: cookies.site,
          userId,
        },
      },
      headers: {
        xapikey: cookies.managementXApiKey,
        Authorization: cookies.accessToken,
      },
    })
  }, [cookies.managementXApiKey, cookies.accessToken, cookies.site, userId])

  useEffect(() => {
    setLoading(true)
    fetchActivityAndWatchList
      .then((res) => {
        if (new Object(res).hasOwnProperty('error')) return setResData([])
        // return setResData(res.Items)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [fetchActivityAndWatchList, userId])

  return (
    <Box width="100%">
      <VLLoaderWrapper loading={loading}>
        <Box id="page-header" width="100%" display="flex" justifyContent="flex-end" marginBottom={2} marginTop={1}>
          <Button
            disabled={resData?.length === 0 ? true : false}
            variant="contained"
            sx={{ margin: '0 0 0 auto' }}
            onClick={() =>
              downloadAsCsv(
                'activityWatchList_downloadAsCsv',
                `activity-watchlist-${Intl.DateTimeFormat('en-IN', { dateStyle: 'long' }).format(new Date(Date.now()))}.csv`
              )
            }
          >
            DOWNLOAD CSV
          </Button>
          <a hidden id="auditLog_downloadAsCsv"></a>
        </Box>
        <SortedTable
          data={[]}
          defaultOrderBy="date"
          columns={CONFIG.tableColumns.ActivityAndWatchListTable as { key: keyof ActivityAndWatchListColumnType; title: string }[]}
          headerComponent={<SortedTableHeaderSearchBar />}
        />
      </VLLoaderWrapper>
    </Box>
  )
}
