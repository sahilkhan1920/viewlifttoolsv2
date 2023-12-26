import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

export default function AddPlaylistModal({ createContent }) {
  return (
    <>
      <Typography
        id="playlist-modal-title"
        variant="h6"
        component="h2"
        sx={{ fontSize: '28px' }}
      >
        Add Playlist
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
          variant="outlined"
          onClick={createContent}
          sx={{
            width: 200,
            height: 35,
            fontWeight: 500,
            fontSize: '14px',
            '&:hover': {
              backgroundColor: 'primary.main',
              color: '#FFFFFF',
            },
          }}
        >
          Create Videoplaylist
        </Button>
      </Box>
    </>
  )
}
