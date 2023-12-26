import { Box, Modal, Button, Typography, useTheme, ModalProps } from '@mui/material'
import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import dynamic from 'next/dynamic'

import CONFIG from 'pages/users/config.json'
import { useCookies } from 'react-cookie'
import fetchHelper from 'src/helpers/fetchHelper'
import { INVOKE_V2_API } from 'src/constants/urlConstants'

const Popup = dynamic(() => import('src/components/common/Popup'))

export type SendPasswordResetEmailModalPropType = Pick<ModalProps, 'open' | 'onClose'> & {
  onCancel: Dispatch<SetStateAction<boolean>>
  userId: string
  userEmail?: string
}

export default function SendPasswordResetEmailModal({ userId, userEmail, open, onClose, onCancel }: SendPasswordResetEmailModalPropType) {
  const { palette } = useTheme()
  const [cookies] = useCookies()
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [error, setError] = useState('')

  const { title, subtitle, cta, confirmation } = CONFIG.sendPasswordResetEmailModal

  // TODO: Send event to logs API to update session actions
  const onSendPasswordResetEmail = useCallback(async () => {
    if (!userEmail) return
    const site = cookies.site
    const xapikey = cookies.managementXApiKey
    const Authorization = cookies.accessToken

    const res = await fetchHelper({
      method: 'POST',
      url: INVOKE_V2_API,
      data: {
        url: '/identity/password/forgot',
        method: 'POST',
        role: 'Customer Support',
        auth: { site, userId },
        query: { site },
        body: { email: userEmail },
      },
      headers: { xapikey, Authorization },
    })
    if (new Object(res).hasOwnProperty('error')) {
      setError(res.error)
    }
    setShowConfirmation(true)
    // * Comment is sent to the audit log endpoint and not to the anonymise endpoint
    // TODO: Call audit log
  }, [cookies.managementXApiKey, cookies.accessToken, cookies.site, userId, userEmail])

  function onCloseConfirmation() {
    setShowConfirmation(false)
    onCancel(true)
    return
  }
  return (
    <>
      <Modal open={open} onClose={onClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ background: 'white' }} flex={1} maxWidth={'30rem'}>
          <Box p={1} bgcolor={palette.primary.dark}>
            <Typography variant="h6" color={palette.primary.contrastText}>
              {title}
            </Typography>
          </Box>
          <Box paddingY={3} paddingX={2} display="flex" flexDirection="column" gap={4}>
            <Typography variant="body1">{subtitle}</Typography>
            <Box display="flex" gap={5}>
              <Button fullWidth variant="outlined" onClick={onCancel.bind(null, false)}>
                {cta.cancel.label}
              </Button>
              <Button fullWidth variant="contained" onClick={onSendPasswordResetEmail}>
                {cta.confirm.label}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      {showConfirmation ? (
        <Popup popUpOpen={showConfirmation} setPopup={setShowConfirmation} heading={confirmation.title}>
          <Box p={2} display="flex" flexDirection="column" gap={2}>
            <Typography>{error.length ? error : confirmation.text}</Typography>
            <Button variant="contained" onClick={onCloseConfirmation} sx={{ margin: '0 0 0 auto' }}>
              Close
            </Button>
          </Box>
        </Popup>
      ) : (
        false
      )}
    </>
  )
}
