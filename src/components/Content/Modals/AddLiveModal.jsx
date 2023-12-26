import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

export default function AddLiveModal({ handleLiveEventModal }) {
  return (
    <>
      <Typography id="live-modal-title" variant="h6" component="h2" sx={{ fontSize: '28px' }}>
        Add Live Event
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          marginTop: '80px',
        }}
      >
        <Button
          id="thirdPartyLive"
          variant="outlined"
          onClick={handleLiveEventModal}
          sx={{
            width: 260,
            height: 35,
            fontWeight: 500,
            fontSize: '14px',
            '&:hover': {
              backgroundColor: 'primary.main',
              color: '#FFFFFF',
            },
          }}
        >
          Third Party Live Stream (HLS)
        </Button>
        <Button
          id="selfServiceLive"
          variant="outlined"
          onClick={handleLiveEventModal}
          sx={{
            width: 260,
            height: 35,
            fontWeight: 500,
            fontSize: '14px',
            '&:hover': {
              backgroundColor: 'primary.main',
              color: '#FFFFFF',
            },
          }}
        >
          Viewlift Live Stream Services
        </Button>
      </Box>
    </>
  )
}
