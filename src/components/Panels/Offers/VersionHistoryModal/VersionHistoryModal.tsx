import { Box, Button, Modal, ModalProps, Typography, useTheme } from '@mui/material'
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Close, ContentCopy } from '@mui/icons-material'

import SortedTable from 'src/components/common/SortingTable'
import fetchHelper from 'src/helpers/fetchHelper'
import useCopyToClipboard from 'src/hooks/useCopyToClipboard'
import { ApiResponse, MonetizationOfferType } from './VersionHistoryType'

import ModalConfig from './config.json'

type VersionHistoryTableColumns = {
  offer: string
  changesBy: string
  createdAt: string
  version: string
  action: ReactNode
}

export type VersionHistoryModalPropType = Pick<ModalProps, 'open' | 'onClose'> & {
  onCancel: () => void
  offerId: string
}
export default function VersionHistoryModal({ onCancel, onClose, open, offerId }: VersionHistoryModalPropType) {
  const { palette } = useTheme()
  const [cookies] = useCookies()
  const { copy } = useCopyToClipboard()

  const { title, columns } = ModalConfig
  const [tableData, setTableData] = useState<VersionHistoryTableColumns[] | []>([])
  const xapikey = cookies.managementXApiKey
  const Authorization = cookies.accessToken
  const site = cookies.site

  // TODO: v2 api not ready, v1 is not getting data since it needs cookie.
  // * UI will render correctly as soon as data is available. Can check with static data
  const getVersionHistory = useMemo(async () => {
    console.log(cookies)
    const offset = 0
    const max = 10
    const orderBy = 'lastUpdated'
    const order = 'DESC'
    const url = `https://tools.develop.monumentalsportsnetwork.com/${site}/offer/snapshot/${offerId}?offset=${offset}&max=${max}&orderBy=${orderBy}&order=${order}&site=${site}`
    return await fetchHelper({
      url,
      method: 'GET',
      headers: {
        xapikey,
        Authorization,
      },
    })
  }, [xapikey, Authorization, site, offerId])

  const prepareVersionHistoryTableData = useCallback((data: MonetizationOfferType[]) => {
    if (!data) return
    const _tableData: VersionHistoryTableColumns[] = []
    data.map((node) => {
      _tableData.push({
        offer: node.name,
        changesBy: node.versionCreatedBy,
        createdAt: Intl.DateTimeFormat('en-IN', { dateStyle: 'long', timeStyle: 'long' }).format(new Date(node.dateCreated)),
        version: node.versionName,
        action: (
          <Button>
            <ContentCopy sx={{ cursor: 'pointer' }} onClick={() => copy(JSON.stringify(node))} />
          </Button>
        ),
      } satisfies VersionHistoryTableColumns)
    })
    return setTableData(_tableData)
  }, [])

  useEffect(() => {
    getVersionHistory
      .then((res) => {
        if (new Object(res).hasOwnProperty('message')) return console.log(res)
        prepareVersionHistoryTableData((res as ApiResponse).response.content)
      })
      .catch(console.error)
  }, [getVersionHistory, prepareVersionHistoryTableData])

  return (
    <Modal open={open} onClose={onClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ background: 'white' }} flex={1} maxWidth={'40rem'} maxHeight={'20rem'}>
        <Box paddingX={2} paddingY={1} bgcolor={palette.primary.dark} display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" color={palette.primary.contrastText}>
            {title}
          </Typography>
          <Box
            role="button"
            sx={{ color: palette.primary.contrastText, width: 'fit-content', cursor: 'pointer' }}
            display="flex"
            alignItems="center"
            onClick={onCancel}
          >
            <Close />
          </Box>
        </Box>
        <SortedTable
          data={tableData}
          columns={columns as { key: keyof VersionHistoryTableColumns; title: string }[]}
          defaultOrderBy="createdAt"
          defaultOrderDirection="desc"
        />
      </Box>
    </Modal>
  )
}
