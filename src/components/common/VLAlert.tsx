import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

type VLAlertProps = {
  message: string
  setMessage: (message: string) => void
  success?: boolean
}

const VLAlert = ({ message, setMessage, success }: VLAlertProps) => {
  return (
    <Snackbar
      open={Boolean(message)}
      autoHideDuration={2000}
      onClose={() => setMessage('')}
    >
      <Alert
        onClose={() => setMessage('')}
        severity={success ? 'success' : 'error'}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

export default VLAlert
