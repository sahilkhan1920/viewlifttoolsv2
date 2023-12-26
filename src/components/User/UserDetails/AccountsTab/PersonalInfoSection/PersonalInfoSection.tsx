import { Box, Button, Grid, InputAdornment, MenuItem, OutlinedInput, Select, TextField, Typography, useTheme } from '@mui/material'
import { memo, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

import { UserDetailType } from 'src/types/UserDetail'
import CountryPhoneCode from '../../../../../json/countryPhoneCode.json'
import VLLoaderWrapper from 'src/components/common/VLLoaderWrapper'

const AnonymizeUserModal = dynamic(() => import('./AnonymizeUserModal').then((m) => m.AnonymizeUserModal))
const DeactivateAccountModal = dynamic(() => import('./DeactivateAccountModal').then((m) => m.DeactivateAccountModal))
const SendPasswordResetEmailModal = dynamic(() => import('./SendPasswordResetEmailModal').then((m) => m.SendPasswordResetEmailModal))

export default memo(function PersonalInfoSection({ userIdentity, userId }: { userIdentity: Promise<unknown>; userId: string }) {
  const { palette } = useTheme()

  const [userData, setUserData] = useState<
    Pick<UserDetailType, 'name' | 'email' | 'phoneNumber' | 'phoneCode' | 'provider' | 'providers'> | undefined
  >(undefined)
  const [loading, setLoading] = useState(false)
  const [anonymizeUser, setAnonymizeUser] = useState(false)
  const [deactivatingAccount, setDeactivatingAccount] = useState(false)
  const [sendingPasswordResetMail, setSendingPasswordResetMail] = useState(false)

  useEffect(() => {
    setLoading(true)
    userIdentity
      .then((res) => {
        if (new Object(res).hasOwnProperty('error')) return setUserData(undefined)
        return setUserData({
          email: (res as UserDetailType).email,
          name: (res as UserDetailType).name,
          phoneCode: (res as UserDetailType).phoneCode,
          phoneNumber: (res as UserDetailType).phoneNumber,
          provider: (res as UserDetailType).provider,
          providers: (res as UserDetailType).providers,
        })
      })
      .catch((err) => console.error(`PersonalInfoSection error: `, err))
      .finally(() => setLoading(false))

    return () => setLoading(false)
  }, [userIdentity])

  return (
    <>
      <Box id="personal-info" paddingY={5}>
        <Typography variant="h6">Personal Info</Typography>
        <VLLoaderWrapper loading={loading} type="inline">
          <Grid container spacing={2} rowGap={2}>
            <Grid sx={{ padding: 0, margin: 0 }} item xs={4}>
              <Typography>Name</Typography>
              <TextField size="small" fullWidth disabled value={userData?.name} name="Name" type="text" />
            </Grid>
            <Grid sx={{ padding: 0, margin: 0 }} item xs={4}>
              <Typography>Email</Typography>
              <TextField fullWidth disabled value={userData?.email} name="Email" type="email" size="small" />
            </Grid>
            <Grid sx={{ padding: 0, margin: 0 }} item xs={4}>
              <Typography>Phone</Typography>
              <OutlinedInput
                size="small"
                fullWidth
                disabled
                value={userData?.phoneNumber}
                name="Phone"
                type="text"
                startAdornment={
                  <InputAdornment position="start">
                    <Select
                      size="small"
                      sx={{
                        maxHeight: '10rem',
                        background: palette.primary.main,
                        color: palette.primary.contrastText,
                      }}
                      value={userData?.phoneCode ?? ''}
                    >
                      {CountryPhoneCode.map(({ code, dial_code }) => (
                        <MenuItem key={code} value={dial_code}>
                          +{dial_code} ({code})
                        </MenuItem>
                      ))}
                    </Select>
                  </InputAdornment>
                }
                sx={{ paddingLeft: 0, width: '100%' }}
              />
            </Grid>
            <Grid sx={{ padding: 0, margin: 0 }} item xs={4}>
              <Select fullWidth variant="outlined" size="small" sx={{ background: palette.primary.main }}>
                <MenuItem onClick={() => setSendingPasswordResetMail(true)}>
                  <Typography>Send Email</Typography>
                </MenuItem>
                <MenuItem>
                  <Typography>Create Temporary Password</Typography>
                </MenuItem>
              </Select>
            </Grid>
            <Grid sx={{ padding: 0, margin: 0 }} item xs={4}>
              <Button fullWidth size="large" variant="contained" disableElevation onClick={() => setAnonymizeUser(true)}>
                ANONYMIZE
              </Button>
            </Grid>
            <Grid sx={{ padding: 0, margin: 0 }} item xs={4}>
              <Button fullWidth size="large" variant="contained" disableElevation onClick={() => setDeactivatingAccount(true)}>
                DEACTIVATE ACCOUNT
              </Button>
            </Grid>
            {userData?.providers ? (
              <Grid sx={{ padding: 0, margin: 0 }} item xs={4}>
                <Typography>Login Provider</Typography>
                <Select fullWidth variant="outlined" size="small" value={userData?.provider}>
                  {userData?.providers.map((_provider) => (
                    <MenuItem key={_provider} value={_provider}>
                      <Typography>{_provider}</Typography>
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            ) : (
              false
            )}
          </Grid>
        </VLLoaderWrapper>
      </Box>
      {anonymizeUser ? (
        <AnonymizeUserModal userId={userId} open={anonymizeUser} onCancel={() => setAnonymizeUser(false)} onClose={() => setAnonymizeUser(false)} />
      ) : (
        false
      )}
      {deactivatingAccount ? (
        <DeactivateAccountModal
          userId={userId}
          open={deactivatingAccount}
          onCancel={() => setDeactivatingAccount(false)}
          onClose={() => setDeactivatingAccount(false)}
        />
      ) : (
        false
      )}
      {sendingPasswordResetMail ? (
        <SendPasswordResetEmailModal
          userId={userId}
          userEmail={userData?.email}
          open={sendingPasswordResetMail}
          onCancel={() => setSendingPasswordResetMail(false)}
          onClose={() => setSendingPasswordResetMail(false)}
        />
      ) : (
        false
      )}
    </>
  )
})
