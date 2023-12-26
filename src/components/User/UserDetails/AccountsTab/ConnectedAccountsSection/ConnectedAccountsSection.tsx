import { Box, Typography, useTheme } from '@mui/material'
import { memo } from 'react'

export default memo(function ConnectedAccountsSection() {
  const { spacing } = useTheme()
  return (
    <Box id="subscription-plan" paddingY={spacing(1)}>
      <Box display="flex" id="section-header" alignItems={'center'} marginBottom={5}>
        <Typography variant="h6" flex={1}>
          Connected Accounts
        </Typography>
      </Box>
    </Box>
  )
})
