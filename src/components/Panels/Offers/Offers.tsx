import { Add } from '@mui/icons-material'
import { Box, Button, Card, OutlinedInput, Table, Typography, useTheme } from '@mui/material'
import { useCookies } from 'react-cookie'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'

import MonetizationOffersTable from './OffersTable'
import fetchHelper from 'src/helpers/fetchHelper'
import { INVOKE_V2_API } from 'src/constants/urlConstants'
import VLLoaderWrapper from 'src/components/common/VLLoaderWrapper'
import { MonetizationOfferType } from 'src/types/MonetizationOfferType'
import dynamic from 'next/dynamic'

const VersionHistoryModal = dynamic(() => import('./VersionHistoryModal/VersionHistoryModal'))

export default function OffersPanel() {
  const { palette } = useTheme()
  const [cookies] = useCookies()
  const { replace } = useRouter()

  const [loading, setLoading] = useState(false)
  const [resData, setResData] = useState<MonetizationOfferType[] | []>([])
  const [searchKeyword, setSearchKeyword] = useState('')
  const [searchData, setSearchData] = useState<MonetizationOfferType[] | []>([])
  const [versionHistoryModalState, setVersionHistoryModalState] = useState({ isOpen: false, id: '' })

  const xapikey = cookies.managementXApiKey
  const Authorization = cookies.accessToken
  const site = cookies.site

  const manageTableData = useCallback(
    (keyword: string, columnToSearch: keyof Pick<MonetizationOfferType, 'name' | 'status'>) => {
      if (!keyword) return setSearchData(resData)
      console.log(keyword)
      const filtered = resData.filter((item) => item[columnToSearch].includes(keyword))
      if (filtered.length === 0) return setSearchData([])
      setSearchData(filtered)
    },
    [resData]
  )

  const monetizationOfferData = useMemo(async () => {
    setLoading(true)
    return await fetchHelper({
      method: 'POST',
      url: INVOKE_V2_API,
      headers: {
        xapikey,
        Authorization,
      },
      data: {
        url: 'subscription/offers',
        method: 'GET',
        role: 'Subscriptions & Offers',
        auth: {
          site,
          isServerToken: true,
        },
        query: {
          site,
          offset: 0,
          limit: 10,
        },
        body: {},
      },
    })
  }, [xapikey, Authorization, site])

  const handleEditOfferAction = (offerId: string) => {
    replace(`/contentModels/offers/edit/${offerId}`)
  }
  const handleViewVersionHistoryAction = (offerId: string) => {
    setVersionHistoryModalState({ isOpen: true, id: offerId })
  }

  useEffect(() => {
    monetizationOfferData
      .then((res) => {
        if (new Object(res).hasOwnProperty('error')) {
          return setResData([])
        }
        delete res.status
        setResData(res)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [monetizationOfferData])

  useEffect(() => {
    const debounce = setTimeout(() => manageTableData(searchKeyword, 'name'), 2000)
    return () => clearTimeout(debounce)
  }, [searchKeyword, manageTableData])

  return (
    <>
      <Box p={2}>
        <VLLoaderWrapper loading={loading}>
          <Card sx={{ padding: 2, display: 'flex', flexDirection: 'column', gap: 2, background: palette.background.default }}>
            <Box id="offers-header" display="flex" flexDirection="column" gap={2}>
              <Typography variant="h6">Offers Dashboard</Typography>
              <Box id="header-actions" display="flex" alignItems="center" justifyContent="space-between">
                <Box id="action-buttons" display="flex" alignItems="center" gap={2} flex={3}>
                  <Button size="large" variant="contained">
                    <Add />
                    <Typography marginLeft={1}>Add New Offer</Typography>
                  </Button>
                  <Button size="large" variant="contained">
                    <Add />
                    <Typography marginLeft={1}>Add New Redemption Code</Typography>
                  </Button>
                </Box>
                <Box id="search-container" flex={1}>
                  <OutlinedInput size="small" fullWidth placeholder="Search for offer..." onChange={(e) => setSearchKeyword(e.target.value)} />
                </Box>
              </Box>
            </Box>
            <MonetizationOffersTable
              data={searchKeyword ? searchData : resData}
              onEditOffer={handleEditOfferAction}
              onViewVersionHistory={handleViewVersionHistoryAction}
            />
          </Card>
        </VLLoaderWrapper>
        <Table />
      </Box>
      {versionHistoryModalState.isOpen ? (
        <VersionHistoryModal
          offerId={versionHistoryModalState.id}
          onClose={() => setVersionHistoryModalState({ isOpen: false, id: '' })}
          onCancel={() => setVersionHistoryModalState({ isOpen: false, id: '' })}
          open={versionHistoryModalState.isOpen}
        />
      ) : (
        false
      )}
    </>
  )
}
