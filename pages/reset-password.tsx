import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useFormik } from 'formik'
import {
  ResetPasswordSchema,
  resetPasswordInitialValues,
} from 'src/validationSchemas/loginSchema'

import useLogin from 'src/hooks/useLogin'
import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton'
import VLAlert from 'src/components/common/VLAlert'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'

export default function Home() {
  const { resetPassword, loading, message, setMessage } = useLogin()
  const [cookies] = useCookies()
  const [username, setUsername] = useState(null)
  const router = useRouter()

  const formik = useFormik({
    initialValues: resetPasswordInitialValues,
    validationSchema: ResetPasswordSchema,
    onSubmit: resetPassword,
  })

  useEffect(() => {
    if (!cookies.username) {
      router.push('/')
    }
    setUsername(cookies.username)
  }, [router, cookies])

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
          Enter a new password for your account
        </Typography>
        <Typography variant="subtitle2">
          Note: Messages and data rates may apply.
        </Typography>
        <Typography variant="subtitle2" sx={{ mt: 2 }}>
          {username}
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
            name="newPassword"
            id="newPassword"
            size="small"
            value={formik.values.newPassword}
            label="New Password"
            onChange={formik.handleChange}
            error={Boolean(
              formik.touched.newPassword && formik.errors.newPassword
            )}
            helperText={formik.touched.newPassword && formik.errors.newPassword}
          />
          <TextField
            name="confirmPassword"
            id="confirmPassword"
            size="small"
            value={formik.values.confirmPassword}
            label="Confirm Password"
            onChange={formik.handleChange}
            error={Boolean(
              formik.touched.confirmPassword && formik.errors.confirmPassword
            )}
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
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
            Save
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
