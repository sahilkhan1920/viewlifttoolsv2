import { Modal, Typography, Box, ModalProps, Button, useTheme, TextField } from '@mui/material'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'

import CONFIG from 'pages/users/config.json'
import { useCookies } from 'react-cookie'
import fetchHelper from 'src/helpers/fetchHelper'
import { INVOKE_V2_API } from 'src/constants/urlConstants'

type PinsType = { newPin: string; confirmNewPin: string }
type ChangePinPayloadType = {
  reason: string
  comment: string
  actionType: 'resetPin'
  session: string
}

export type ChangePinPropType = Pick<ModalProps, 'open' | 'onClose'> & {
  onCancel: Dispatch<SetStateAction<boolean>>
  userId: string
}
export default function ChangePin({ open, onClose, onCancel, userId }: ChangePinPropType) {
  const { palette } = useTheme()
  const [cookies] = useCookies()
  const { title, subtitle, fields, cta, payloadText } = CONFIG.changePinModal

  const [pins, setPins] = useState<PinsType>({ newPin: '', confirmNewPin: '' })

  const sessionToken = sessionStorage.getItem('sessionToken')

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { value, id } = e.target
    setPins({ ...pins, [id]: value })
  }

  function preparePayload() {
    if (!sessionToken) return
    const fd = new FormData()
    const _payload: ChangePinPayloadType = {
      ...payloadText,
      actionType: 'resetPin',
      session: sessionToken,
    }
    Object.keys(_payload).map((key) => fd.append(key, _payload[key as keyof ChangePinPayloadType]))
    return fd
  }

  async function onChangePinConfirm() {
    return await fetchHelper({
      url: INVOKE_V2_API,
      data: {
        url: 'identity/parental',
        method: 'PUT',
        role: 'Customer Support',
        auth: {
          site: cookies.site,
          userId,
        },
        query: { site: cookies.site },
        body: preparePayload(),
      },
      method: 'POST',
      headers: {
        Authorization: cookies.accessToken,
        xApiKey: cookies.managementXApiKey,
      },
    })
  }

  return (
    <Modal open={open} onClose={onClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ background: 'white' }} flex={1} maxWidth={'30rem'}>
        <Box p={1} bgcolor={palette.primary.dark}>
          <Typography variant="h6" color={palette.primary.contrastText}>
            {title}
          </Typography>
        </Box>
        <Box paddingY={3} paddingX={2} display="flex" flexDirection="column" gap={2}>
          <Typography>{subtitle}</Typography>
          <Box id="modal-fields" display="flex" flexDirection="column" gap={3}>
            {fields.map(({ id, label }) => (
              <Box id="modal-field" key={id} display="flex" alignItems="center" gap={3}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', width: '100%' }}>
                  {label}
                </Typography>
                <TextField variant="outlined" size="small" value={pins[id as keyof PinsType]} id={id} onChange={handleChange} fullWidth />
              </Box>
            ))}
          </Box>
          <Box id="modal-btn-container" display="flex" gap={5}>
            <Button fullWidth variant="outlined" onClick={onCancel.bind(null, false)}>
              {cta.cancel}
            </Button>
            <Button fullWidth variant="contained" onClick={onChangePinConfirm}>
              {cta.confirm}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}
