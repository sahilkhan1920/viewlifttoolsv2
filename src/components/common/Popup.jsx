/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'

import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

const Popup = ({ children, heading, setPopup, popUpOpen }) => {
  const [open, setOpen] = useState(popUpOpen)

  const [scroll, setScroll] = useState('paper')

  const handleClose = () => {
    setPopup(false)
  }

  const descriptionElementRef = React.useRef(null)
  useEffect(() => {
    if (open) {
      const descriptionElement = descriptionElementRef?.current
      if (descriptionElement !== null) {
        descriptionElement?.focus()
      }
    }
  }, [open])

  // useEffect(() => {
  //   return () => {}
  // }, [])
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title" sx={{ padding: '0px' }}>
        <Box
          sx={{
            background: '#024062',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '5px 10px 5px 10px',
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontSize: '20px' }}
            color="info.main"
            component="h5"
          >
            {heading}
          </Typography>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setPopup(false)
            }}
          >
            <CloseIcon color="info" />
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent dividers={scroll === 'paper'}>
        <DialogContentText
          id="scroll-dialog-description"
          ref={descriptionElementRef}
          tabIndex={-1}
        >
          <Box className="popupChildren">{children}</Box>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}

export default Popup
