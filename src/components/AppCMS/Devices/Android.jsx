import FormLabel from '@mui/material/FormLabel'
import TextareaAutosize from '@mui/base/TextareaAutosize'
import styles from '../../../../styles/devices.module.css'
import { Container, Grid, TextField, Button } from '@mui/material'
import useDevices from './useDevices'

export default function Android() {
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
            <Grid item xs={3}>
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
              <FormLabel>Host Url</FormLabel>
              <TextField
                sx={{
                  width: '100%',
                }}
                size="small"
                type="text"
                name="service.domainName"
                value={formik?.values?.service?.domainName}
                onChange={handleInputChange}
                disabled="disabled"
              />
            </Grid>
            <Grid item xs={3}>
              <FormLabel>Build Type</FormLabel>
              <TextField
                sx={{
                  width: '100%',
                }}
                size="small"
                type="text"
                name="SiteID"
                value="Alpha"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid item xs={3}>
              <FormLabel>App Version</FormLabel>
              <TextField
                sx={{
                  width: '100%',
                }}
                size="small"
                type="text"
                id="buildDetails.android.appVersion"
                value={formik?.values?.buildDetails?.android?.appVersion}
                name="buildDetails.appVersion"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={3}>
              <FormLabel>Package Name</FormLabel>
              <TextField
                sx={{
                  width: '100%',
                }}
                size="small"
                type="text"
                id="bundleId"
                value={formik?.values?.buildDetails?.android?.packageName}
                name="buildDetails.android.packageName"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={3}>
              <FormLabel>Version Code</FormLabel>
              <TextField
                sx={{
                  width: '100%',
                }}
                size="small"
                type="text"
                value={formik?.values?.buildDetails?.android?.versionCode}
                name="buildDetails.android.versionCode"
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
                value={formik?.values?.buildDetails?.android?.slackWebHook}
                name="buildDetails.android.slackWebHook"
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid item xs={3}>
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
                Manage Image
              </Button>
            </Grid>
            <Grid item xs={3}>
              <FormLabel>App Short Description</FormLabel>
              <TextareaAutosize
                className={`${styles.textArea}`}
                size="large"
                value={formik?.values?.buildDetails?.android?.shortDescription}
                name="buildDetails.android.shortDescription"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={3}>
              <FormLabel>App Long Description</FormLabel>
              <TextareaAutosize
                className={`${styles.textArea}`}
                size="large"
                value={formik?.values?.buildDetails?.android?.description}
                name="buildDetails.android.description"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={3}>
              <FormLabel>Build What New</FormLabel>
              <TextareaAutosize
                className={`${styles.textArea}`}
                size="large"
                value={formik?.values?.buildDetails?.android?.whatsnew}
                name="buildDetails.android.whatsnew"
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid item xs={3}>
              <FormLabel>Keystore File</FormLabel>
              <label htmlFor="Keystore" className={`${styles.uploadFile}`}>
                <TextField
                  sx={{
                    width: '100%',
                    display: 'none',
                  }}
                  size="small"
                  type="file"
                  name="googleServiceInfo"
                  id="Keystore"
                />
                <Button variant="contained" component="span">
                  Upload
                </Button>
              </label>
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
        </Grid>
      </Container>
    </>
  )
}
