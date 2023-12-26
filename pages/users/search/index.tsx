import { Box, Typography } from '@mui/material'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'

import styles from '../../../styles/usersSearchResults.module.css'

import VLTable from 'src/components/common/VLTable'
import { SearchBar } from 'src/components/User'
import CONFIG from '../config.json'
import { SearchResponseType, TableDataType } from 'src/types/SearchType'
import fetchHelper from 'src/helpers/fetchHelper'
import VLLoaderWrapper from 'src/components/common/VLLoaderWrapper'
import useCsvGenerator from 'src/hooks/useCsvGenerator'
import useTableDataFormatter from 'src/hooks/useTableDataFormatter'
import dynamic from 'next/dynamic'

const AddUserModal = dynamic(() => import('src/components/User/Modals').then((m) => m.AddUserModal))

const _url = `${process.env.NEXT_PUBLIC_V1_API_URL}/${CONFIG.serviceEndpoint.v1}`

export default function SearchResults() {
  const tableRef = useRef<HTMLTableElement | null>(null)
  const { replace } = useRouter()
  const [cookies] = useCookies()
  const { prepareSearchTableData } = useTableDataFormatter()

  const [addingUser, setAddingUser] = useState(false)
  const [resultData, setResultData] = useState<SearchResponseType | undefined>(undefined)
  const { downloadAsCsv } = useCsvGenerator({ data: prepareSearchTableData(resultData) ?? [] })
  const [isLoading, setIsLoading] = useState(false)

  const { keyword, filter } = useRouter().query as {
    keyword: string
    filter: string
  }

  function navigateToDetailsPage(data: TableDataType) {
    const _node = resultData?.users.filter((user) => user.name === data.name)[0]
    if (!_node) return
    return replace(`/users/search/${_node.userId}`)
  }

  const callSearchService = useMemo(async () => {
    const site = cookies.site
    const query = {
      site: cookies.site,
      totalCount: true,
    }
    return await fetchHelper({
      url: _url,
      data: {
        url: 'identity-admin/user-search',
        method: 'POST',
        role: 'Customer Support',
        auth: {
          site: site,
          isServerToken: true,
        },
        query: query,
        body: { searchTerm: keyword, offset: 0, limit: 30, type: filter },
      },
      method: 'POST',
      headers: {
        Authorization: cookies.accessToken,
        xApiKey: cookies.managementXApiKey,
      },
    })
  }, [cookies.accessToken, cookies.managementXApiKey, keyword, filter, cookies.site])

  useEffect(() => {
    setIsLoading(true)
    callSearchService
      .then((data) => {
        if (new Object(data).hasOwnProperty('message')) return setResultData(undefined)
        return setResultData(data as unknown as SearchResponseType)
      })
      .catch(console.error)
      .finally(() => setIsLoading(false))

    return () => setIsLoading(false)
  }, [callSearchService, setResultData])

  return (
    <>
      <main className={`${styles.searchResultPage}`}>
        <Box data-id="page-title-container" className={`${styles.pageHeaderContainer}`}>
          <Typography data-id="page-title" variant="h3" className={`${styles.pageTitleText}`}>
            Users
          </Typography>
          <SearchBar
            style={{ justifyContent: 'flex-end', margin: '0 0 0 auto' }}
            dropdownListConfig={CONFIG.searchFilterOptionsDropdown}
            placeholder="Search user..."
            showClearButton
            showAddUserButton
            showDownloadCsvButton
            buttonConfig={{
              searchButton: {
                label: 'Search',
              },
              clearButton: {
                label: 'Reset',
              },
              downloadCsvButton: {
                onClick: () =>
                  downloadAsCsv(
                    'searchbar_downloadCsvButton',
                    `search-list-${Intl.DateTimeFormat('en-IN', { dateStyle: 'long' }).format(new Date(Date.now()))}.csv`
                  ),
              },
              addNewUserButton: {
                onClick: () => setAddingUser(true),
              },
            }}
          />
        </Box>
        {isLoading ? (
          <VLLoaderWrapper loading={isLoading} />
        ) : (
          <VLTable
            onRowClick={(data: TableDataType) => navigateToDetailsPage(data)}
            pagination={true}
            rows={prepareSearchTableData(resultData)?.length ?? 10} //! This prop does not do anything in VLTable component
            columns={CONFIG.tableColumns.SearchResultTable}
            data={prepareSearchTableData(resultData) ?? []}
            tableRef={tableRef}
          />
        )}
      </main>
      {addingUser ? <AddUserModal onCancel={() => setAddingUser(false)} onClose={() => setAddingUser(false)} open={addingUser} /> : false}
    </>
  )
}
