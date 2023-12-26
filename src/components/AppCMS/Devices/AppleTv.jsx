import Typography from '@mui/material/Typography'
import FormLabel from '@mui/material/FormLabel'
import TextareaAutosize from '@mui/base/TextareaAutosize'
import DeleteIcon from '@mui/icons-material/Delete'
import styles from '../../../../styles/devices.module.css'
import { Container, Grid, Switch, TextField, Button } from '@mui/material'
import useDevices from './useDevices'

export default function AppleTv() {
  const { formik, saveService } = useDevices()
  const handleInputChange = (event) => {
    const { name, value } = event.target
    formik.handleChange(event)
    saveService(name, value)
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
            <Grid item xs={3}>
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
            <Grid item xs={3}>
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
            <Grid item xs={3}>
              <FormLabel>Bundle Id</FormLabel>
              <TextField
                sx={{
                  width: '100%',
                }}
                size="small"
                type="text"
                id="bundleId"
                value={formik?.values?.buildDetails?.appleTv?.bundleId}
                name="buildDetails.appleTv.bundleId"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={3}>
              <FormLabel>App Version</FormLabel>
              <TextField
                sx={{
                  width: '100%',
                }}
                size="small"
                type="text"
                value={formik?.values?.buildDetails?.appleTv?.appVersion}
                name="buildDetails.appleTv.appVersion"
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
                value={formik?.values?.buildDetails?.appleTv?.versionCode}
                name="buildDetails.appleTv.versionCode"
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
                value={
                  formik?.values?.buildDetails?.appleTv?.appSpecificPassword
                }
                name="buildDetails.appleTv.appSpecificPassword"
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
                value={formik?.values?.buildDetails?.appleTv?.slackWebHook}
                name="buildDetails.appleTv.slackWebHook"
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
                value={formik?.values?.buildDetails?.appleTv?.primaryCategory}
                name="buildDetails.appleTv.primaryCategory"
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
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
              >
                APP REVIEW INFORMATION
              </Button>
            </Grid>
            <Grid item xs={4}>
              <FormLabel>App Description (minimum 10 char)</FormLabel>
              <TextareaAutosize
                className={`${styles.textArea}`}
                size="large"
                value={formik?.values?.buildDetails?.appleTv?.description}
                name="buildDetails.appleTv.description"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={4}>
              <FormLabel>Release Notes</FormLabel>
              <TextareaAutosize
                className={`${styles.textArea}`}
                size="large"
                value={formik?.values?.buildDetails?.appleTv?.releaseNotes}
                name="buildDetails.appleTv.releaseNotes"
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mb: 1 }}>
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
              <FormLabel>App Store Marketing URL</FormLabel>
              <TextField
                sx={{
                  width: '100%',
                }}
                size="small"
                type="text"
                value={formik?.values?.buildDetails?.appleTv?.marketingUrl}
                name="buildDetails.appleTv.marketingUrl"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={3}>
              <FormLabel>App Store Support URL</FormLabel>
              <TextField
                sx={{
                  width: '100%',
                }}
                size="small"
                type="text"
                value={formik?.values?.buildDetails?.appleTv?.supportUrl}
                name="buildDetails.appleTv.supportUrl"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={3}>
              <FormLabel>Privacy Policy Url</FormLabel>
              <TextField
                sx={{
                  width: '100%',
                }}
                size="small"
                type="text"
                value={formik?.values?.buildDetails?.appleTv?.privacyPolicyUrl}
                name="buildDetails.appleTv.privacyPolicyUrl"
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
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
              >
                APP REVIEW INFORMATION
              </Button>
            </Grid>
            <Grid item xs={4}>
              <FormLabel>App Description (minimum 10 char)</FormLabel>
              <TextareaAutosize
                className={`${styles.textArea}`}
                size="large"
                value={formik?.values?.buildDetails?.appleTv?.description}
                name="buildDetails.appleTv.description"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={4}>
              <FormLabel>Release Notes</FormLabel>
              <TextareaAutosize
                className={`${styles.textArea}`}
                size="large"
                value={formik?.values?.buildDetails?.appleTv?.releaseNotes}
                name="buildDetails.appleTv.releaseNotes"
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid item xs={4}>
              <Switch
                sx={{
                  margin: '0',
                }}
                checked={formik?.values?.buildDetails?.appleTv?.isMultipleTeams}
                name="buildDetails.appleTv.isMultipleTeams"
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
                value={formik?.values?.buildDetails?.appleTv?.appleTeamId}
                name="buildDetails.appleTv.appleTeamId"
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
                value={
                  formik?.values?.buildDetails?.appleTv?.iTuneConnectTeamId
                }
                name="buildDetails.appleTv.iTuneConnectTeamId"
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
