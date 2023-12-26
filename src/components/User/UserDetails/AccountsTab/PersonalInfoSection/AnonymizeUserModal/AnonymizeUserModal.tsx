import { Box, Modal, Button, Typography, useTheme, ModalProps } from '@mui/material'
import { CSSProperties, ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from 'react'
import dynamic from 'next/dynamic'

import CONFIG from 'pages/users/config.json'
import { useCookies } from 'react-cookie'
import fetchHelper from 'src/helpers/fetchHelper'
import { INVOKE_V2_API } from 'src/constants/urlConstants'

const Popup = dynamic(() => import('src/components/common/Popup'))

export type AnonymizeUserModalPropType = Pick<ModalProps, 'open' | 'onClose'> & {
  onCancel: Dispatch<SetStateAction<boolean>>
  userId: string
}
export type AnonymizeUserFormDataType = {
  comment: string
}

const TextAreaCss: CSSProperties = { width: '100%', fontFamily: 'inherit', padding: '1rem', resize: 'none' }

export default function AnonymizeUserModal({ userId, open, onClose, onCancel }: AnonymizeUserModalPropType) {
  const { palette } = useTheme()
  const [cookies] = useCookies()
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [formData, setFormData] = useState<AnonymizeUserFormDataType>({ comment: '' })
  const { title, subtitle, cta, confirmation, fields } = CONFIG.anonymizeUserModal

  // TODO: Send event to logs API to update session actions
  const onAnonymizeUser = useCallback(async () => {
    const site = cookies.site
    const { message, status }: { message: string; status: number } = await fetchHelper({
      method: 'POST',
      url: INVOKE_V2_API,
      data: {
        url: 'identity-admin/anonymize',
        method: 'POST',
        role: 'Customer Support',
        auth: { site, userId },
        query: { site },
        body: { site, userId },
      },
      headers: {
        xapikey: cookies.managementXApiKey,
        Authorization: cookies.accessToken,
      },
    })
    if (status !== 200) return alert(message)
    setShowConfirmation(true)
    // * Comment is sent to the audit log endpoint and not to the anonymise endpoint
    // TODO: Call audit log
  }, [cookies.managementXApiKey, cookies.accessToken, cookies.site, userId])

  function onInputChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = e.target
    return setFormData({ ...formData, [name]: value })
  }
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
            <Typography variant="h6">{subtitle}</Typography>
            <Box display="flex" gap={1} flexDirection="column">
              {fields.map(({ id, label, placeholder }) => (
                <Box key={id}>
                  <Typography>{label}</Typography>
                  <textarea
                    style={TextAreaCss}
                    placeholder={placeholder}
                    required
                    value={formData[id as keyof AnonymizeUserFormDataType]}
                    onChange={onInputChange}
                  />
                </Box>
              ))}
            </Box>
            <Box display="flex" gap={5}>
              <Button fullWidth variant="contained" onClick={onAnonymizeUser}>
                {cta.yes.label}
              </Button>
              <Button fullWidth variant="outlined" onClick={onCancel.bind(null, false)}>
                {cta.cancel.label}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      {showConfirmation ? (
        <Popup popUpOpen={showConfirmation} setPopup={setShowConfirmation} heading={confirmation.title}>
          <Box p={2} display="flex" flexDirection="column" gap={2}>
            <Typography>{confirmation.text}</Typography>
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
