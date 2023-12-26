import Typography from '@mui/material/Typography'
import FormLabel from '@mui/material/FormLabel'
import TextareaAutosize from '@mui/base/TextareaAutosize'
import DeleteIcon from '@mui/icons-material/Delete'
import styles from '../../../../styles/devices.module.css'
import { Container, Grid, Switch, TextField, Button } from '@mui/material'
import useDevices from './useDevices'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import React, { useState } from 'react'

export default function Ios() {
  const { formik, saveService } = useDevices()
  const handleInputChange = (event) => {
    const { name, value } = event.target
    formik.handleChange(event)
    saveService(name, value)
  }
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  
  return (
    <>
      {' '}
      <Container>
        <Grid
          xs={12}
          sx={{
            padding: 0,
          }}
        >
          <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid item xs={2}>
              <FormLabel>App Name</FormLabel>
              <TextField
                sx={{
                  width: '100%',
                }}
                size="small"
                type="text"
                id="app_name"
                name="settings.appStore.app_name"
                value={formik?.values?.settings?.appStore?.app_name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={2}>
              <FormLabel>App Short Name</FormLabel>
              <TextField
                sx={{
                  width: '100%',
                }}
                size="small"
                type="text"
                name="settings.appStore.short_app_name"
                value={formik?.values?.settings?.appStore?.short_app_name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={3}>
              <FormLabel>Site ID</FormLabel>
              <TextField
                sx={{
                  width: '100%',
                }}
                size="small"
                type="text"
                name="service.uuid"
                value={formik?.values?.service?.uuid}
                disabled="disabled"
              />
            </Grid>
            <Grid item xs={3}>
              <FormLabel>Testing Platform</FormLabel>
              <TextField
                sx={{
                  width: '100%',
                }}
                size="small"
                type="text"
                name="SiteID"
                value="TestFlight"
              />
            </Grid>
            <Grid item xs={2}>
              <FormLabel>Release Type</FormLabel>
              <TextField
                sx={{
                  width: '100%',
                }}
                size="small"
                type="text"
                name="SiteID"
                value="Release Automatically"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid item xs={2}>
              <FormLabel>iTunes Username</FormLabel>
              <TextField
                sx={{
                  width: '100%',
                }}
                size="small"
                type="text"
                id="itunes_connect_username"
                value={
                  formik?.values?.settings?.appStore?.itunes_connect_username
                }
                name="settings.appStore.itunes_connect_username"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={2}>
              <FormLabel>iTunes Password</FormLabel>
              <TextField
                sx={{
                  width: '100%',
                }}
                size="small"
                type="password"
                id="itunes_connect_username"
                value={
                  formik?.values?.settings?.appStore?.itunes_connect_password
                }
                name="settings.appStore.itunes_connect_password"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={2}>
              <FormLabel>Bundle Id</FormLabel>
              <TextField
                sx={{
                  width: '100%',
                }}
                size="small"
                type="text"
                id="bundleId"
                value={formik?.values?.buildDetails?.ios?.bundleId}
                name="buildDetails.ios.bundleId"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={2}>
              <FormLabel>Extension Bundle Id</FormLabel>
              <TextField
                sx={{
                  width: '100%',
                }}
                size="small"
                type="text"
                value={formik?.values?.buildDetails?.ios?.bundleExtensionId}
                name="buildDetails.ios.bundleExtensionId"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={2}>
              <FormLabel>Notification Content Bundle Id</FormLabel>
              <TextField
                sx={{
                  width: '100%',
                }}
                size="small"
                type="text"
                value={
                  formik?.values?.buildDetails?.ios?.bundleNotificationContentId
                }
                name="buildDetails.ios.bundleNotificationContentId"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={2}>
              <FormLabel>App Version</FormLabel>
              <TextField
                sx={{
                  width: '100%',
                }}
                size="small"
                type="text"
                value={formik?.values?.buildDetails?.ios?.appVersion}
                name="buildDetails.ios.appVersion"
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid item xs={3}>
              <FormLabel>Version Code</FormLabel>
              <TextField
                sx={{
                  width: '100%',
                }}
                size="small"
                type="text"
                value={formik?.values?.buildDetails?.ios?.versionCode}
                name="buildDetails.ios.versionCode"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={3}>
              <FormLabel>App Specific Password</FormLabel>
              <TextField
                sx={{
                  width: '100%',
                }}
                size="small"
                type="password"
                value={formik?.values?.buildDetails?.ios?.appSpecificPassword}
                name="buildDetails.ios.appSpecificPassword"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={3}>
              <FormLabel>Slack Web Hook Url</FormLabel>
              <TextField
                sx={{
                  width: '100%',
                }}
                size="small"
                type="text"
                value={formik?.values?.buildDetails?.ios?.slackWebHook}
                name="buildDetails.ios.slackWebHook"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={3}>
              <FormLabel>Primary Category</FormLabel>
              <TextField
                sx={{
                  width: '100%',
                }}
                size="small"
                type="text"
                value={formik?.values?.buildDetails?.ios?.primaryCategory}
                name="buildDetails.ios.primaryCategory"
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid item xs={4}>
              <FormLabel>App Store Marketing URL</FormLabel>
              <TextField
                sx={{
                  width: '100%',
                }}
                size="small"
                type="text"
                value={formik?.values?.buildDetails?.ios?.marketingUrl}
                name="buildDetails.ios.marketingUrl"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={4}>
              <FormLabel>App Store Support URL</FormLabel>
              <TextField
                sx={{
                  width: '100%',
                }}
                size="small"
                type="text"
                value={formik?.values?.buildDetails?.ios?.supportUrl}
                name="buildDetails.ios.supportUrl"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={4}>
              <FormLabel>Privacy Policy Url</FormLabel>
              <TextField
                sx={{
                  width: '100%',
                }}
                size="small"
                type="text"
                value={formik?.values?.buildDetails?.ios?.privacyPolicyUrl}
                name="buildDetails.ios.privacyPolicyUrl"
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid>
              <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogContent className={`${styles.modelBackground}`}>
                  <DialogTitle
                    id="alert-dialog-title"
                    sx={{
                      padding: '0 0 2px 0',
                    }}
                  >
                    Sign-In Information
                  </DialogTitle>
                  <Grid container spacing={2} sx={{ mb: 1 }}>
                    <Grid item xs={12}>
                      <Typography
                        sx={{ mb: 1, borderBottom: '1px solid #ccc' }}
                      >
                        Provide a user name and password so we can sign in to
                        your app. We’ll need this to complete your app review.
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <FormLabel color="primary">Username</FormLabel>
                      <TextField
                        sx={{
                          width: '100%',
                        }}
                        size="small"
                        type="text"
                        value={
                          formik?.values?.buildDetails?.ios?.appReviewDemoUser
                        }
                        name="buildDetails.ios.appReviewDemoUser"
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormLabel color="primary">Password</FormLabel>
                      <TextField
                        sx={{
                          width: '100%',
                        }}
                        size="small"
                        type="text"
                        value={
                          formik?.values?.buildDetails?.ios
                            ?.appReviewDemoPassword
                        }
                        name="buildDetails.ios.appReviewDemoPassword"
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        sx={{
                          mb: 1,
                          borderTop: '1px solid #ccc',
                          paddingTop: '10px',
                        }}
                      >
                        Contact Information
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <FormLabel color="primary">First Name</FormLabel>
                      <TextField
                        sx={{
                          width: '100%',
                        }}
                        size="small"
                        type="text"
                        value={
                          formik?.values?.buildDetails?.ios?.appReviewFirstName
                        }
                        name="buildDetails.ios.appReviewFirstName"
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormLabel color="primary">Last Name</FormLabel>
                      <TextField
                        sx={{
                          width: '100%',
                        }}
                        size="small"
                        type="text"
                        value={
                          formik?.values?.buildDetails?.ios?.appReviewLastName
                        }
                        name="buildDetails.ios.appReviewLastName"
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormLabel color="primary">Phone Number</FormLabel>
                      <TextField
                        sx={{
                          width: '100%',
                        }}
                        size="small"
                        type="text"
                        value={
                          formik?.values?.buildDetails?.ios?.appReviewPhoneNumbe
                        }
                        name="buildDetails.ios.appReviewPhoneNumbe"
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormLabel color="primary">Email</FormLabel>
                      <TextField
                        sx={{
                          width: '100%',
                        }}
                        size="small"
                        type="text"
                        value={
                          formik?.values?.buildDetails?.ios?.appReviewEmail
                        }
                        name="buildDetails.ios.appReviewEmail"
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormLabel color="primary">Notes</FormLabel>
                      <TextareaAutosize
                        sx={{
                          width: '100%',
                        }}
                        size="small"
                        type="text"
                        className={`${styles.textArea}`}
                        value={
                          formik?.values?.buildDetails?.ios?.appReviewNotes
                        }
                        name="buildDetails.ios.appReviewNotes
                        "
                        onChange={handleInputChange}
                      />
                    </Grid>
                  </Grid>
                  <DialogActions
                    sx={{
                      textAlign: 'center',
                      display: 'block',
                    }}
                  >
                    <Button onClick={handleClose}>Close</Button>
                  </DialogActions>
                </DialogContent>
              </Dialog>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid item xs={3}>
              <FormLabel>Google Client Id</FormLabel>
              <TextField
                sx={{
                  width: '100%',
                }}
                size="small"
                type="text"
                value={formik?.values?.buildDetails?.ios?.googleClientId}
                name="buildDetails.ios.googleClientId"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={3}>
              <FormLabel>Google Service Info Plist</FormLabel>
              <label
                htmlFor="googleServiceInfo"
                className={`${styles.uploadFile}`}
              >
                <TextField
                  sx={{
                    width: '100%',
                    display: 'none',
                  }}
                  size="small"
                  type="file"
                  name="googleServiceInfo"
                  id="googleServiceInfo"
                />
                <Button variant="contained" component="span">
                  Upload
                </Button>
              </label>
            </Grid>
            <Grid item xs={3}>
              <FormLabel>UPLOAD GTM</FormLabel>
              <label htmlFor="uploadGtm" className={`${styles.uploadFile}`}>
                <TextField
                  sx={{
                    width: '100%',
                    display: 'none',
                  }}
                  size="small"
                  type="file"
                  name="uploadGtm"
                  id="uploadGtm"
                />
                <Button variant="contained" component="span">
                  Upload
                </Button>
              </label>
            </Grid>
            <Grid item xs={3}>
              <FormLabel>OM SDK</FormLabel>
              <label htmlFor="uploadSdk" className={`${styles.uploadFile}`}>
                <TextField
                  sx={{
                    width: '100%',
                    display: 'none',
                  }}
                  size="small"
                  type="file"
                  name="uploadSdk"
                  id="uploadSdk"
                />
                <Button variant="contained" component="span">
                  Upload
                </Button>
              </label>
            </Grid>
          </Grid>
          {/* Model */}
          <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid item xs={4}>
              <Button
                variant="contained"
                sx={{
                  width: '90%',
                  height: '40px',
                  display: 'block',
                  margin: '0 auto',
                  marginTop: '13px',
                }}
              >
                Rating
              </Button>

              <Button
                variant="contained"
                sx={{
                  width: '90%',
                  height: '40px',
                  display: 'block',
                  margin: '0 auto',
                  marginTop: '13px',
                }}
                onClick={handleClickOpen}
              >
                APP REVIEW INFORMATION
              </Button>
            </Grid>
            <Grid item xs={4}>
              <FormLabel>App Description (minimum 10 char)</FormLabel>
              <TextareaAutosize
                className={`${styles.textArea}`}
                size="large"
                value={formik?.values?.buildDetails?.ios?.description}
                name="buildDetails.ios.description"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={4}>
              <FormLabel>Release Notes</FormLabel>
              <TextareaAutosize
                className={`${styles.textArea}`}
                size="large"
                value={formik?.values?.buildDetails?.ios?.releaseNotes}
                name="buildDetails.ios.releaseNotes"
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          {/* Model */}
          <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid item xs={4}>
              <Switch
                sx={{
                  margin: '0',
                }}
                checked={formik?.values?.buildDetails?.ios?.isMultipleTeams}
                name="buildDetails.ios.isMultipleTeams"
                onChange={handleInputChange}
              />
              <FormLabel>Is multiple Teams? </FormLabel>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid item xs={6}>
              <FormLabel>Apple Team Id</FormLabel>
              <TextField
                sx={{
                  width: '100%',
                }}
                size="small"
                type="text"
                value={formik?.values?.buildDetails?.ios?.appleTeamId}
                name="buildDetails.ios.appleTeamId"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <FormLabel>Itunes Connect Team Id</FormLabel>
              <TextField
                sx={{
                  width: '100%',
                }}
                size="small"
                type="text"
                value={formik?.values?.buildDetails?.ios?.iTuneConnectTeamId}
                name="buildDetails.ios.iTuneConnectTeamId"
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid item xs={12}>
              <Typography sx={{ mb: 1 }} color="primary">
                ATT Localized Metadata :
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <FormLabel>Localized Language</FormLabel>
              <TextField
                sx={{
                  width: '100%',
                }}
                size="small"
                type="text"
                name="SiteID"
              />
            </Grid>
            <Grid item xs={2}>
              <FormLabel>Key</FormLabel>
              <TextField
                sx={{
                  width: '100%',
                }}
                size="small"
                type="text"
                placeholder="Enter language key"
              />
            </Grid>
            <Grid item xs={2}>
              <FormLabel>Value</FormLabel>
              <TextField
                sx={{
                  width: '100%',
                }}
                size="small"
                type="text"
                placeholder="Enter language value"
                disabled="disabled"
              />
            </Grid>
            <Grid item xs={1}>
              <DeleteIcon
                sx={{
                  width: '100%',
                  marginTop: 4,
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                sx={{
                  width: '100%',
                  marginTop: 3,
                }}
                size="small"
                type="text"
                placeholder="Added key value"
              />
            </Grid>
            <Grid item xs={1}>
              <DeleteIcon
                sx={{
                  width: '100%',
                  marginTop: 4,
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                sx={{
                  width: '100%',
                  marginTop: 3,
                }}
                size="small"
                type="text"
                placeholder="Add localization"
              />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
