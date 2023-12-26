import { Box, Modal, Button, Typography, useTheme, ModalProps, TextField } from '@mui/material'
import { CSSProperties, ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from 'react'
import dynamic from 'next/dynamic'

import CONFIG from 'pages/users/config.json'
import { useCookies } from 'react-cookie'
import fetchHelper from 'src/helpers/fetchHelper'
import { INVOKE_V2_API } from 'src/constants/urlConstants'

const Popup = dynamic(() => import('src/components/common/Popup'))

export type DeactivateAccountModalPropType = Pick<ModalProps, 'open' | 'onClose'> & {
  onCancel: Dispatch<SetStateAction<boolean>>
  userId: string
}
export type DeactivateFormDataType = {
  reason: string
  comments: string
}
export type CancelOption = 'DEFER' | 'CANCEL'
export type GetRefundDataPayloadType = {
  isDeactivate: boolean
  isCancel: boolean
  paymentHandlerDeact: any
  reason: string
  cancelOption?: CancelOption
}

const TextAreaCss: CSSProperties = { width: '100%', fontFamily: 'inherit', padding: '1rem', resize: 'none' }

export default function DeactivateAccountModal({ userId, open, onClose, onCancel }: DeactivateAccountModalPropType) {
  const { palette } = useTheme()
  const [cookies] = useCookies()
  const [showConfirmation, setShowConfirmation] = useState(false)

  const { title, subtitle, cta, confirmation, fields } = CONFIG.deactivateAccountModal

  const [formData, setFormData] = useState<DeactivateFormDataType>({ comments: '', reason: '' })
  const xapikey = cookies.managementXApiKey
  const Authorization = cookies.accessToken
  const site = cookies.site

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // TODO: Send event to logs API to update session actions
  const getRefundApiData = useCallback(
    async ({ isDeactivate, isCancel, paymentHandlerDeact, reason, cancelOption }: GetRefundDataPayloadType) => {
      const subscriptionObj: {
        userId: string
        site: string
        comment: string
        paymentHandler: any
        deactivate?: boolean
        cancellation?: { option: CancelOption }
      } = {
        userId,
        site,
        comment: reason,
        paymentHandler: paymentHandlerDeact,
      }
      if (isDeactivate) {
        subscriptionObj.deactivate = isDeactivate
      }
      if (isCancel) {
        subscriptionObj.cancellation = {
          option: cancelOption as CancelOption,
        }
      }
      return subscriptionObj
    },
    [site, userId]
  )

  async function onDeactivateAccount() {
    const refundData = await getRefundApiData({
      isDeactivate: true,
      isCancel: false,
      paymentHandlerDeact: null,
      reason: formData.reason,
      cancelOption: 'CANCEL',
    })
    await fetchHelper({
      url: INVOKE_V2_API,
      method: 'POST',
      headers: {
        xapikey,
        Authorization,
      },
      data: {
        url: 'subscription-misc/refund',
        method: 'POST',
        role: 'Customer Support',
        auth: { site, userId },
        query: { site, userId },
        body: refundData,
      },
    })
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
              {fields.map(({ id, label, type, placeholder }) => (
                <Box key={id} display="flex" alignItems="center">
                  <Typography width={'50%'}>{label}</Typography>
                  <TextField
                    style={TextAreaCss}
                    placeholder={placeholder}
                    name={id}
                    type={type}
                    onChange={handleInputChange}
                    value={formData[id as keyof DeactivateFormDataType]}
                  />
                </Box>
              ))}
            </Box>
            <Box display="flex" gap={5}>
              <Button fullWidth variant="outlined" onClick={onCancel.bind(null, false)}>
                {cta.cancel.label}
              </Button>
              <Button fullWidth variant="contained" onClick={onDeactivateAccount}>
                {cta.confirm.label}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      {showConfirmation ? (
        <Popup popUpOpen={showConfirmation} setPopup={setShowConfirmation} heading={confirmation.title}>
          <Box p={2} display="flex" flexDirection="column" gap={2}>
            <Typography>{confirmation.text}</Typography>
            <Button variant="contained" onClick={() => setShowConfirmation(false)} sx={{ margin: '0 0 0 auto' }}>
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
