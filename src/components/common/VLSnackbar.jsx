import { Button, IconButton, Snackbar } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import { useRouter } from 'next/router'

const VLSnackbar = () => {
  const router = useRouter()
  const {
    query: { open },
  } = router

  const handleClose = () => {
    router.push({
      query: {},
    })
  }

  const action = (
    <>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  )
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message="Note archived"
      action={action}
    />
  )
}

export default VLSnackbar
