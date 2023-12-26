import React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useFormik } from 'formik'
import {
  ForgotPasswordSchema,
  forgotInitialValues,
} from 'src/validationSchemas/loginSchema'

import useLogin from 'src/hooks/useLogin'
import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton'
import VLAlert from 'src/components/common/VLAlert'

export default function Home() {
  const { forgotPassword, loading, message, setMessage } = useLogin()

  const formik = useFormik({
    initialValues: forgotInitialValues,
    validationSchema: ForgotPasswordSchema,
    onSubmit: forgotPassword,
  })

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        height: '100vh',
      }}
    >
      {/* <DarkHeader /> */}
      <Box
        sx={{
          margin: {
            sx: '20px auto',
            md: '50px auto',
          },
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          padding: 5,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            mb: 3,
          }}
        >
          Reset Password
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            mb: 2,
          }}
        >
          {`Enter your username/email address & we'll redirect you to a link to
          reset your password.`}
        </Typography>
        <Typography variant="subtitle2">
          Note: Messages and data rates may apply.
        </Typography>

        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '30ch' },
            padding: {
              xs: 1,
              md: 2,
            },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          noValidate
          autoComplete="off"
          onSubmit={formik.handleSubmit}
        >
          <TextField
            name="username"
            id="username"
            size="small"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={Boolean(formik.touched.username && formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />

          <LoadingButton
            color="primary"
            type="submit"
            variant="contained"
            size="large"
            loadingPosition="start"
            loading={loading}
            sx={{
              width: '13em',
              mt: {
                xs: '2em',
                md: '3em',
              },
            }}
          >
            Confirm Email
          </LoadingButton>
          <Typography
            variant="caption"
            sx={{
              mt: 4,
            }}
          >
            Questions? Contact techsupport@viewlift.com
          </Typography>
        </Box>
      </Box>
      <VLAlert message={message} setMessage={setMessage} success={false} />
    </Container>
  )
}
