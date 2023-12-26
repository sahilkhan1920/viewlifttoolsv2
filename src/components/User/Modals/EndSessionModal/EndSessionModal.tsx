import { Box, Modal, Button, Typography, useTheme, ModalProps } from '@mui/material'
import { Dispatch, SetStateAction, useState } from 'react'
import dynamic from 'next/dynamic'

import CONFIG from 'pages/users/config.json'

const SessionSummary = dynamic(() => import('./SessionSummary').then((comp) => comp.SessionSummary), {
  ssr: false,
})

export type EndSessionModalPropType = Pick<ModalProps, 'open' | 'onClose'> & {
  onCancel: Dispatch<SetStateAction<boolean>>
  userId: string
}
export default function EndSessionModal({ userId, open, onClose, onCancel }: EndSessionModalPropType) {
  const { palette } = useTheme()
  const [showSessionSummary, setShowSessionSummary] = useState(false)
  const { title, subtitle, cta } = CONFIG.endSessionModal
  return (
    <Modal open={open} onClose={onClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {showSessionSummary ? (
        <SessionSummary userId={userId} isVisible={showSessionSummary} />
      ) : (
        <Box sx={{ background: 'white' }} flex={1} maxWidth={'30rem'}>
          <Box p={1} bgcolor={palette.primary.dark}>
            <Typography variant="h6" color={palette.primary.contrastText}>
              {title}
            </Typography>
          </Box>
          <Box paddingY={3} paddingX={2} display="flex" flexDirection="column" gap={2}>
            <Typography>{subtitle}</Typography>
            <Box display="flex" gap={5}>
              <Button fullWidth variant="outlined" onClick={onCancel.bind(null, false)}>
                {cta.cancel}
              </Button>
              <Button fullWidth variant="contained" onClick={setShowSessionSummary.bind(null, true)}>
                {cta.ok}
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Modal>
  )
}
