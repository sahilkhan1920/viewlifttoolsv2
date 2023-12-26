import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useState } from 'react'
import { IconButton } from '@mui/material'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import Image from 'next/image'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
}

export default function BasicModal({ imageObj }) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <IconButton onClick={handleOpen} color="inherit">
        <RemoveRedEyeIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          border: 'solid 1px red',
        }}
      >
        <Box sx={style}>
          <Typography
            variant="h5"
            align="center"
            color="primary"
            sx={{
              mb: 1,
            }}
          >
            {imageObj?.heading}
          </Typography>
          <Image
            src={imageObj?.imageURI}
            width={500}
            height={500}
            alt="Picture of the author"
          />
          <Typography
            variant="h5"
            align="center"
            color="primary"
            sx={{
              mt: 1,
            }}
          >
            {imageObj?.footerText}
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}
