import { Box, Typography, Button, useTheme } from '@mui/material'
import { CSSProperties, useCallback, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

import fetchHelper from 'src/helpers/fetchHelper'
import CONFIG from 'pages/users/config.json'
import SortedTable from 'src/components/common/SortingTable'
import VLLoaderWrapper from 'src/components/common/VLLoaderWrapper'
import { useRouter } from 'next/router'
import useTableDataFormatter from 'src/hooks/useTableDataFormatter'
import { SessionData } from 'src/types/AuditLogsType'

type SessionSummaryTableData = {
  occurred: string
  event: string
  reason: string
}
export type SessionSummaryPropType = {
  userId: string
  isVisible: boolean
}
const TextAreaCss: CSSProperties = { width: '100%', fontFamily: 'inherit', padding: '1rem', resize: 'none' }
export default function SessionSummary({ userId }: SessionSummaryPropType) {
  const [cookies] = useCookies()
  const { palette } = useTheme()
  const { replace } = useRouter()
  const { prepareSessionSummaryData } = useTableDataFormatter()

  const [loading, setLoading] = useState(false)
  const [sessionData, setSessionData] = useState<SessionData | undefined>(undefined)

  const { base, service } = CONFIG.serviceEndpoint.sessionSummary
  const { title, timeLabel, cta, subtitle, fields } = CONFIG.endSessionModal.sessionSummary
  const { SessionSummaryTable } = CONFIG.tableColumns

  const sessionToken = sessionStorage.getItem('sessionToken')

  function getSessionDuration() {
    if (!sessionToken) return
    const td = Date.now() - +sessionToken.split(userId)[1]
    const min = Math.floor(td / (1000 * 60))
    const sec = Math.floor((td % (1000 * 60)) / 1000)
    return `${min} minutes, ${sec} seconds`
  }

  function onConfirmSessionEnd() {
    sessionStorage.removeItem('sessionToken')
    replace('/users')
  }

  const getSessionSummary = useCallback(async () => {
    return await fetchHelper({
      headers: {
        xapikey: cookies.managementXApiKey,
        Authorization: cookies.accessToken,
      },
      method: 'GET',
      url: `${base}/${cookies.site}/${service}/${userId}?session=${sessionToken}`,
    })
  }, [cookies.managementXApiKey, cookies.accessToken, cookies.site, userId, base, service, sessionToken])

  useEffect(() => {
    setLoading(true)
    getSessionSummary()
      .then((res) => {
        if (new Object(res).hasOwnProperty('error')) return setSessionData(undefined)
        return setSessionData(res)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
    return () => {}
  }, [getSessionSummary])

  return (
    <VLLoaderWrapper loading={loading} type="inline">
      <Box sx={{ background: 'white' }} flex={1} maxWidth={'40rem'}>
        <Box p={1} bgcolor={palette.primary.dark}>
          <Typography variant="h6" color={palette.primary.contrastText}>
            {title}
          </Typography>
        </Box>
        <Box padding={2} display="flex" flexDirection="column" gap={2}>
          <Box>
            <Typography variant="h5">{`${timeLabel}: ${getSessionDuration()}`}</Typography>
            <Typography variant="body2">{subtitle}</Typography>
          </Box>
          <Box>
            <SortedTable
              rowsPerPage={3}
              rowsPerPageOptions={[2, 3, 4]}
              data={prepareSessionSummaryData(sessionData?.events)}
              defaultOrderBy="occurred"
              defaultOrderDirection="desc"
              columns={SessionSummaryTable as { key: keyof SessionSummaryTableData; title: string }[]}
            />
          </Box>
          <Box id="fields-container" display="flex" flexDirection="column" gap={2}>
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography>{fields.additionalRecipients.label}</Typography>
              <textarea style={TextAreaCss} placeholder={fields.additionalRecipients.placeholderText} />
            </Box>
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography>{fields.personalMessage.label}</Typography>
              <textarea style={TextAreaCss} placeholder={fields.personalMessage.placeholderText} />
            </Box>
          </Box>
          <Box id="cta-container" display="flex" justifyContent="center">
            <Button variant="contained" onClick={onConfirmSessionEnd}>
              {cta.submit}
            </Button>
          </Box>
        </Box>
      </Box>
    </VLLoaderWrapper>
  )
}
