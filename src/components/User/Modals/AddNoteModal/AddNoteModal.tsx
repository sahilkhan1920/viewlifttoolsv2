import { Box, Modal, Button, Typography, useTheme, ModalProps } from '@mui/material'
import { CSSProperties, ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

import CONFIG from 'pages/users/config.json'
import { useCookies } from 'react-cookie'
import fetchHelper from 'src/helpers/fetchHelper'
import { INVOKE_V2_API } from 'src/constants/urlConstants'
import { UserDetailType } from 'src/types/UserDetail'
import VLLoaderWrapper from 'src/components/common/VLLoaderWrapper'

const Popup = dynamic(() => import('src/components/common/Popup'))

export type AddNoteModalPropType = Pick<ModalProps, 'open' | 'onClose'> & {
  onCancel: Dispatch<SetStateAction<boolean>>
  userId: string
  fetchUserIdentity: Promise<unknown>
}
export type AddNoteFormDataType = {
  note: string
}

const TextAreaCss: CSSProperties = { width: '100%', fontFamily: 'inherit', padding: '1rem', resize: 'none', minHeight: '15rem' }

export default function AddNoteModal({ userId, fetchUserIdentity, open, onClose, onCancel }: AddNoteModalPropType) {
  const { palette } = useTheme()
  const [cookies] = useCookies()
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [formData, setFormData] = useState<AddNoteFormDataType>({ note: '' })
  const { title, cta, confirmation, fields } = CONFIG.addNoteModal
  const [userData, setUserData] = useState<Pick<UserDetailType, 'email'> | undefined>(undefined)
  const [loading, setLoading] = useState(false)

  // TODO: Send event to logs API to update session actions
  const onAddNote = useCallback(async () => {
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

  useEffect(() => {
    setLoading(true)
    fetchUserIdentity
      .then((res) => {
        if (new Object(res).hasOwnProperty('error')) return setUserData(undefined)
        return setUserData({
          email: (res as UserDetailType).email,
        })
      })
      .catch((err) => console.error(`Add Note error: `, err))
      .finally(() => setLoading(false))

    return () => setLoading(false)
  }, [fetchUserIdentity])

  return (
    <>
      <VLLoaderWrapper loading={loading}>
        <Modal open={open} onClose={onClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ background: 'white' }} flex={1} maxWidth={'30rem'}>
            <Box p={1} bgcolor={palette.primary.dark}>
              <Typography variant="h6" color={palette.primary.contrastText}>
                {title}
              </Typography>
            </Box>
            <Typography p={2} bgcolor={palette.background.paper}>
              {userData?.email}
            </Typography>
            <Box paddingY={3} paddingX={2} display="flex" flexDirection="column" gap={4}>
              <Box display="flex" gap={1} flexDirection="column">
                {fields.map(({ id, placeholder }) => (
                  <Box key={id}>
                    <textarea
                      style={TextAreaCss}
                      placeholder={placeholder}
                      required
                      value={formData[id as keyof AddNoteFormDataType]}
                      onChange={onInputChange}
                    />
                  </Box>
                ))}
              </Box>
              <Box display="flex" gap={5}>
                <Button fullWidth variant="outlined" onClick={onCancel.bind(null, false)}>
                  {cta.cancel.label}
                </Button>
                <Button fullWidth variant="contained" onClick={onAddNote}>
                  {cta.add.label}
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      </VLLoaderWrapper>
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
