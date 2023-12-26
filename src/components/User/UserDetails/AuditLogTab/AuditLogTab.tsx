import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { Box, Button } from '@mui/material'
import { useCookies } from 'react-cookie'

import VLLoaderWrapper from 'src/components/common/VLLoaderWrapper'
import fetchHelper from 'src/helpers/fetchHelper'
import CONFIG from '../../../../../pages/users/config.json'
import { SessionData } from 'src/types/AuditLogsType'
import SortedTable from 'src/components/common/SortingTable'
import useCsvGenerator from 'src/hooks/useCsvGenerator'
import { SortedTableHeaderSearchBar } from '../../SearchBar'

type AuditLogTableDataType = {
  date: string
  property: string
  change: string
  comments: string
  admin: string
}
export default function AuditLogTab({ userId }: { userId: string }) {
  const [cookies] = useCookies()

  const [loading, setLoading] = useState(false)
  const [resData, setResData] = useState<SessionData[] | undefined>(undefined)
  const [searchKeyword, setSearchKeyword] = useState('')

  function handleKeywordChange(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target
    // TODO: validate input
    return setSearchKeyword(value.trim())
  }

  const prepareLogsTableData = useCallback(() => {
    if (!resData) return
    const _tableData: AuditLogTableDataType[] = []
    resData.map((node) =>
      _tableData.push({
        date: new Date(node.events[0].occurred).toLocaleString(),
        property: node.events[0].event_name,
        change: node.events[0].event_name,
        comments: node.events[0].event_comments,
        admin: node.user,
        // TODO: Fix invalid date issue
      })
    )
    return _tableData
  }, [resData])

  const { downloadAsCsv } = useCsvGenerator({ data: prepareLogsTableData() ?? [] })

  const fetchAuditLogs = useMemo(async () => {
    return await fetchHelper({
      headers: {
        xapikey: cookies.managementXApiKey,
        Authorization: cookies.accessToken,
      },
      method: 'GET',
      url: `https://tools.develop.monumentalsportsnetwork.com/${cookies.site}/users/logs/${userId}`,
    })
  }, [cookies.managementXApiKey, cookies.accessToken, cookies.site, userId])

  useEffect(() => {
    setLoading(true)
    fetchAuditLogs
      .then((res) => {
        if (new Object(res).hasOwnProperty('error')) return
        setResData(res)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [fetchAuditLogs, prepareLogsTableData])

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
                'auditLog_downloadAsCsv',
                `audit-logs-${Intl.DateTimeFormat('en-IN', { dateStyle: 'long' }).format(new Date(Date.now()))}.csv`
              )
            }
          >
            DOWNLOAD CSV
          </Button>
          <a hidden id="auditLog_downloadAsCsv"></a>
        </Box>
        <SortedTable
          data={prepareLogsTableData() ?? []}
          defaultOrderBy="date"
          columns={CONFIG.tableColumns.AuditLogsTable as { key: keyof AuditLogTableDataType; title: string }[]}
          headerComponent={<SortedTableHeaderSearchBar value={searchKeyword} onChange={handleKeywordChange} id="auditLogSearch" />}
        />
      </VLLoaderWrapper>
    </Box>
  )
}
