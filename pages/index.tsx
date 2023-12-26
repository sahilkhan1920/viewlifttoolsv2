import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import NextLink from 'next/link'
import { Link as MUILink } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { useFormik } from 'formik'
import loginValidationSchema, {
  loginInitialValues,
} from '../src/validationSchemas/loginSchema'

import useLogin from 'src/hooks/useLogin'
import VLAlert from 'src/components/common/VLAlert'
import { useRouter } from 'next/router'
import { getCookie } from 'src/helpers/queryHelpers'
import { useEffect } from 'react'

export default function Home() {
  const { handleLogin, loading, message, setMessage } = useLogin()
  const router = useRouter()
  const formik = useFormik({
    initialValues: loginInitialValues,
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      handleLogin(values)
    },
  })

  useEffect(() => {
    const token = getCookie('accessToken')
    if (token) {
      router.push('/ui-analytics')
    }
  }, [router])

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        backgroundColor: 'secondary.light',
        height: '100vh',
      }}
      style={{ paddingTop: '50px' }}
    >
      {/* <DarkHeader /> */}
      <Box
        sx={{
          width: {
            xs: '90%',
            sm: '70%',
            md: '60%',
            lg: '40%',
            xl: '30%',
          },
          height: {
            xs: '21em',
          },
          backgroundColor: 'background.default',
          margin: 'auto',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'primary.main',
            padding: {
              xs: 1,
              md: 2,
            },
          }}
        >
          <Typography variant="h5" color="info.main">
            Please Login
          </Typography>
        </Box>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '30ch' },
            padding: {
              xs: 1,
              md: 2,
            },
          }}
          noValidate
          autoComplete="off"
          onSubmit={formik.handleSubmit}
        >
          <Box>
            <Grid container spacing={1}>
              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gridGap: 4,
                }}
              >
                <Typography variant="subtitle2">Username: </Typography>
                <TextField
                  name="username"
                  id="username"
                  size="small"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  error={Boolean(
                    formik.touched.username && formik.errors.username
                  )}
                  helperText={formik.touched.username && formik.errors.username}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gridGap: 4,
                }}
              >
                <Typography variant="subtitle2">Password: </Typography>
                <TextField
                  name="password"
                  type="password"
                  id="password"
                  size="small"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={Boolean(
                    formik.touched.password && formik.errors.password
                  )}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <LoadingButton
                  color="primary"
                  type="submit"
                  variant="contained"
                  size="large"
                  loading={loading}
                  sx={{
                    px: 6,
                  }}
                >
                  Login
                </LoadingButton>
              </Grid>
              <Grid item container xs={12}>
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <NextLink
                    href="/forgot-password"
                    passHref
                    style={{ textDecoration: 'none' }}
                    legacyBehavior
                  >
                    <MUILink
                      variant="body2"
                      color="secondary"
                      sx={{ textDecoration: 'none' }}
                    >
                      Forgot Password
                    </MUILink>
                  </NextLink>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <NextLink
                    href="/forgot-password"
                    passHref
                    style={{ textDecoration: 'none' }}
                    legacyBehavior
                  >
                    <MUILink
                      variant="body2"
                      color="secondary"
                      sx={{ textDecoration: 'none' }}
                    >
                      Forgot Username
                    </MUILink>
                  </NextLink>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 1,
                  }}
                >
                  <Typography variant="caption">
                    This site is protected by reCAPTCHA and the Google{' '}
                    <NextLink
                      href="https://policies.google.com/privacy"
                      passHref
                      legacyBehavior
                      target="_blank"
                    >
                      <MUILink
                        color="primary"
                        sx={{ textDecoration: 'none' }}
                        target="_blank"
                      >
                        Privacy Policy
                      </MUILink>
                    </NextLink>{' '}
                    and{' '}
                    <NextLink
                      href="https://policies.google.com/terms"
                      passHref
                      legacyBehavior
                    >
                      <MUILink
                        color="primary"
                        sx={{ textDecoration: 'none' }}
                        target="_blank"
                      >
                        Terms of Service
                      </MUILink>
                    </NextLink>{' '}
                    apply.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
      <VLAlert message={message} setMessage={setMessage} />
    </Container>
  )
}
