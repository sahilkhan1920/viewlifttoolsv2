import React from 'react'
import { Box, Drawer, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

interface vldrawer {
  open: boolean
  close: () => void
  children: React.ReactNode
}

const VlDrawer = ({ open, close, children }: vldrawer) => {
  return (
    <Drawer anchor="right" open={open} onClose={close}>
      <Box sx={{ minWidth: '300px', padding: '15px' }}>
        <Box
          className="vlDrawerHeader"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography textAlign="center" variant="h4">
            Filter Data
          </Typography>
          <Box
            onClick={() => {
              close()
            }}
            sx={{ cursor: 'pointer' }}
          >
            <CloseIcon sx={{ position: 'relative', top: '4px' }} />
          </Box>
        </Box>
        <Box>{children}</Box>
      </Box>
    </Drawer>
  )
}

export default VlDrawer
