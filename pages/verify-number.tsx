import React, { useEffect } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useFormik } from 'formik'
import { OtpSchema, otpInitialValues } from 'src/validationSchemas/loginSchema'
import useLogin from 'src/hooks/useLogin'
import TextField from '@mui/material/TextField'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import LoadingButton from '@mui/lab/LoadingButton'
import Button from '@mui/material/Button'
import VLAlert from 'src/components/common/VLAlert'

export default function Home() {
  const { verifyOtp, generateOtp, loading, message, setMessage, success } =
    useLogin()
  const [cookies] = useCookies()
  const [mNumber, setMNumber] = React.useState(null)
  const router = useRouter()

  useEffect(() => {
    if (!cookies.obscureMobileNumber) {
      router.push('/')
    }
    setMNumber(cookies.obscureMobileNumber)
  }, [cookies, router])

  const formik = useFormik({
    initialValues: otpInitialValues,
    validationSchema: OtpSchema,
    onSubmit: (values) => {
      verifyOtp(values)
    },
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
          Two-factor Authentication
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            mb: 2,
          }}
        >
          {`Enter the 6-digit code sent to your mobile phone number xxxxxx${mNumber}`}
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
            label="OTP"
            name="otp"
            type="number"
            id="otp"
            size="small"
            value={formik.values.otp}
            onChange={formik.handleChange}
            error={Boolean(formik.touched.otp && formik.errors.otp)}
            helperText={formik.errors.otp}
          />

          <LoadingButton
            color="primary"
            type="submit"
            variant="contained"
            size="large"
            loadingPosition="start"
            loading={loading}
            sx={{
              width: '10em',
              mt: {
                xs: '2em',
                md: '3em',
              },
            }}
          >
            Confirm
          </LoadingButton>
          <Button
            sx={{
              mt: 1,
            }}
            onClick={generateOtp}
          >
            Resend Code
          </Button>
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
      <VLAlert message={message} setMessage={setMessage} success={success} />
    </Container>
  )
}
