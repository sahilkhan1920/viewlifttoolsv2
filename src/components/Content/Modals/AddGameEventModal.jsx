import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

export default function AddGameEventModal({ createContent }) {
  return (
    <>
      <Typography id="game-event-modal-title" variant="h6" component="h2" sx={{ fontSize: '28px' }}>
        Add Event/Game
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
          id="addEvent"
          variant="outlined"
          onClick={() => createContent('addEvent')}
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
          NEW EVENT
        </Button>
        <Button
          id="addGame"
          variant="outlined"
          onClick={() => createContent('addGame')}
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
          NEW GAME
        </Button>
      </Box>
    </>
  )
}
