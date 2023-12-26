import Typography from '@mui/material/Typography'
import AppleIcon from '@mui/icons-material/Apple'
import styles from '../../../../styles/devices.module.css'
import LanguageIcon from '@mui/icons-material/Language'
import AndroidIcon from '@mui/icons-material/Android'
import ConnectedTvIcon from '@mui/icons-material/ConnectedTv'
import { Box, Button, Container, Grid } from '@mui/material'
import useAddDevices from './useAddDevices'

export default function AddmoreDevices() {
  let { formik, saveService } = useAddDevices()

  const handleButtonClick = (fieldName, fieldValue) => {
    formik.setFieldValue(fieldName, fieldValue)
    formik.handleChange
    saveService(fieldName, fieldValue)
  }

  return (
    <>
      {' '}
      <Typography
        variant="h4"
        color="primary"
        align="center"
        sx={{
          mt: 4,
          mb: 4,
        }}
      >
        Add More Devices
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        <Container className={`${styles.moreDeviceRow}`}>
          <Grid
            xs={9}
            sx={{
              background: '#fafcfe',
              display: 'flex',
            }}
          >
            {' '}
            <LanguageIcon className={`${styles.deviceLogo}`} />
            <Box component="span" className={`${styles.deviceName}`}>
              Web
            </Box>{' '}
          </Grid>
          <Grid
            xs={3}
            sx={{
              justifyContent: 'flex-end',
              display: 'flex',
            }}
          >
            <Button
              type="button"
              className={`${
                formik?.values?.devices?.web?.browser
                  ? `${styles.active}`
                  : `${styles.inactive}`
              }`}
              device="web"
              name="devices.web.browser"
              value={`${
                formik?.values?.devices?.web?.browser
                  ? 'Selected'
                  : 'Get This App'
              }`}
              onClick={() =>
                handleButtonClick(
                  'devices.web.browser',
                  !formik.values.devices.web.browser
                )
              }
            >
              {`${
                formik?.values?.devices?.web?.browser
                  ? 'Selected'
                  : 'Get This App'
              }`}
            </Button>
          </Grid>
        </Container>
        <Container className={`${styles.moreDeviceRow}`}>
          <Grid
            xs={9}
            sx={{
              background: '#fafcfe',
              display: 'flex',
            }}
          >
            {' '}
            <AppleIcon className={`${styles.deviceLogo}`} />
            <Box component="span" className={`${styles.deviceName}`}>
              iOS - iPhone
            </Box>
          </Grid>
          <Grid
            xs={3}
            sx={{
              justifyContent: 'flex-end',
              display: 'flex',
            }}
          >
            <Button
              type="button"
              className={`${
                formik?.values?.devices?.ios?.phone
                  ? `${styles.active}`
                  : `${styles.inactive}`
              }`}
              device="ios"
              name="devices.ios.phone"
              value={`${
                formik?.values?.devices?.ios?.phone
                  ? 'Selected'
                  : 'Get This App'
              }`}
              onClick={() =>
                handleButtonClick(
                  'devices.ios.phone',
                  !formik.values.devices.ios.phone
                )
              }
            >
              {`${
                formik?.values?.devices?.ios?.phone
                  ? 'Selected'
                  : 'Get This App'
              }`}
            </Button>
          </Grid>
        </Container>
        <Container className={`${styles.moreDeviceRow}`}>
          <Grid
            xs={9}
            sx={{
              background: '#fafcfe',
              display: 'flex',
            }}
          >
            {' '}
            <AppleIcon className={`${styles.deviceLogo}`} />
            <Box component="span" className={`${styles.deviceName}`}>
              iOS - ipad
            </Box>
          </Grid>
          <Grid
            xs={3}
            sx={{
              justifyContent: 'flex-end',
              display: 'flex',
            }}
          >
            <Button
              type="button"
              className={`${
                formik?.values?.devices?.ios?.pad
                  ? `${styles.active}`
                  : `${styles.inactive}`
              }`}
              device="ios"
              name="devices.ios.pad"
              value={`${
                formik?.values?.devices?.ios?.pad ? 'Selected' : 'Get This App'
              }`}
              onClick={() =>
                handleButtonClick(
                  'devices.ios.pad',
                  !formik.values.devices.ios.pad
                )
              }
            >
              {`${
                formik?.values?.devices?.ios?.pad ? 'Selected' : 'Get This App'
              }`}
            </Button>
          </Grid>
        </Container>
        <Container className={`${styles.moreDeviceRow}`}>
          <Grid
            xs={9}
            sx={{
              background: '#fafcfe',
              display: 'flex',
            }}
          >
            {' '}
            <AppleIcon className={`${styles.deviceLogo}`} />
            <Box component="span" className={`${styles.deviceName}`}>
              iOS - apple tv
            </Box>
          </Grid>
          <Grid
            xs={3}
            sx={{
              justifyContent: 'flex-end',
              display: 'flex',
            }}
          >
            <Button
              type="button"
              className={`${
                formik?.values?.devices?.ios?.apple_tv
                  ? `${styles.active}`
                  : `${styles.inactive}`
              }`}
              device="ios"
              name="devices.ios.apple_tv"
              value={`${
                formik?.values?.devices?.ios?.apple_tv
                  ? 'Selected'
                  : 'Get This App'
              }`}
              onClick={() =>
                handleButtonClick(
                  'devices.ios.apple_tv',
                  !formik.values.devices.ios.apple_tv
                )
              }
            >
              {`${
                formik?.values?.devices?.ios?.apple_tv
                  ? 'Selected'
                  : 'Get This App'
              }`}
            </Button>
          </Grid>
        </Container>
        <Container Container className={`${styles.moreDeviceRow}`}>
          <Grid
            xs={9}
            sx={{
              background: '#fafcfe',
              display: 'flex',
            }}
          >
            {' '}
            <AppleIcon className={`${styles.deviceLogo}`} />
            <Box component="span" className={`${styles.deviceName}`}>
              iOS - apple watch
            </Box>
          </Grid>
          <Grid
            xs={3}
            sx={{
              justifyContent: 'flex-end',
              display: 'flex',
            }}
          >
            <Button
              type="button"
              className={`${
                formik?.values?.devices?.ios?.apple_watch
                  ? `${styles.active}`
                  : `${styles.inactive}`
              }`}
              device="ios"
              name="devices.ios.apple_tv"
              value={`${
                formik?.values?.devices?.ios?.apple_watch
                  ? 'Selected'
                  : 'Get This App'
              }`}
              onClick={() =>
                handleButtonClick(
                  'devices.ios.apple_watch',
                  !formik.values.devices.ios.apple_watch
                )
              }
            >
              {`${
                formik?.values?.devices?.ios?.apple_watch
                  ? 'Selected'
                  : 'Get This App'
              }`}
            </Button>
          </Grid>
        </Container>
        <Container Container className={`${styles.moreDeviceRow}`}>
          <Grid
            xs={9}
            sx={{
              background: '#fafcfe',
              display: 'flex',
            }}
          >
            {' '}
            <AndroidIcon className={`${styles.deviceLogo}`} />
            <Box component="span" className={`${styles.deviceName}`}>
              android phone
            </Box>
          </Grid>
          <Grid
            xs={3}
            sx={{
              justifyContent: 'flex-end',
              display: 'flex',
            }}
          >
            <Button
              type="button"
              className={`${
                formik?.values?.devices?.android?.phone
                  ? `${styles.active}`
                  : `${styles.inactive}`
              }`}
              device="ios"
              name="devices.android.phone"
              value={`${
                formik?.values?.devices?.android?.phone
                  ? 'Selected'
                  : 'Get This App'
              }`}
              onClick={() =>
                handleButtonClick(
                  'devices.android.phone',
                  !formik.values.devices?.android?.phone
                )
              }
            >
              {`${
                formik?.values?.devices?.android?.phone
                  ? 'Selected'
                  : 'Get This App'
              }`}
            </Button>
          </Grid>
        </Container>
        <Container Container className={`${styles.moreDeviceRow}`}>
          <Grid
            xs={9}
            sx={{
              background: '#fafcfe',
              display: 'flex',
            }}
          >
            {' '}
            <AndroidIcon className={`${styles.deviceLogo}`} />
            <Box component="span" className={`${styles.deviceName}`}>
              android tablet
            </Box>
          </Grid>
          <Grid
            xs={3}
            sx={{
              justifyContent: 'flex-end',
              display: 'flex',
            }}
          >
            <Button
              type="button"
              className={`${
                formik?.values?.devices?.android?.tablet
                  ? `${styles.active}`
                  : `${styles.inactive}`
              }`}
              device="ios"
              name="devices.android.tablet"
              value={`${
                formik?.values?.devices?.android?.tablet
                  ? 'Selected'
                  : 'Get This App'
              }`}
              onClick={() =>
                handleButtonClick(
                  'devices.android.tablet',
                  !formik.values.devices?.android?.tablet
                )
              }
            >
              {`${
                formik?.values?.devices?.android?.tablet
                  ? 'Selected'
                  : 'Get This App'
              }`}
            </Button>
          </Grid>
        </Container>
        <Container Container className={`${styles.moreDeviceRow}`}>
          <Grid
            xs={9}
            sx={{
              background: '#fafcfe',
              display: 'flex',
            }}
          >
            {' '}
            <AndroidIcon className={`${styles.deviceLogo}`} />
            <Box component="span" className={`${styles.deviceName}`}>
              android tv
            </Box>
          </Grid>
          <Grid
            xs={3}
            sx={{
              justifyContent: 'flex-end',
              display: 'flex',
            }}
          >
            <Button
              type="button"
              className={`${
                formik?.values?.devices?.android?.tv
                  ? `${styles.active}`
                  : `${styles.inactive}`
              }`}
              device="ios"
              name="devices.android.tv"
              value={`${
                formik?.values?.devices?.android?.tv
                  ? 'Selected'
                  : 'Get This App'
              }`}
              onClick={() =>
                handleButtonClick(
                  'devices.android.tv',
                  !formik.values.devices?.android?.tv
                )
              }
            >
              {`${
                formik?.values?.devices?.android?.tv
                  ? 'Selected'
                  : 'Get This App'
              }`}
            </Button>
          </Grid>
        </Container>
        <Container Container className={`${styles.moreDeviceRow}`}>
          <Grid
            xs={9}
            sx={{
              background: '#fafcfe',
              display: 'flex',
            }}
          >
            {' '}
            <AndroidIcon className={`${styles.deviceLogo}`} />
            <Box component="span" className={`${styles.deviceName}`}>
              android wear
            </Box>
          </Grid>
          <Grid
            xs={3}
            sx={{
              justifyContent: 'flex-end',
              display: 'flex',
            }}
          >
            <Button
              type="button"
              className={`${
                formik?.values?.devices?.android?.wear
                  ? `${styles.active}`
                  : `${styles.inactive}`
              }`}
              device="ios"
              name="devices?.android?.wear"
              value={`${
                formik?.values?.devices?.android?.wear
                  ? 'Selected'
                  : 'Get This App'
              }`}
              onClick={() =>
                handleButtonClick(
                  'devices.android.wear',
                  !formik.values.devices?.android?.wear
                )
              }
            >
              {`${
                formik?.values?.devices?.android?.wear
                  ? 'Selected'
                  : 'Get This App'
              }`}
            </Button>
          </Grid>
        </Container>
        <Container Container className={`${styles.moreDeviceRow}`}>
          <Grid
            xs={9}
            sx={{
              background: '#fafcfe',
              display: 'flex',
            }}
          >
            {' '}
            <AndroidIcon className={`${styles.deviceLogo}`} />
            <Box component="span" className={`${styles.deviceName}`}>
              android mitv
            </Box>
          </Grid>
          <Grid
            xs={3}
            sx={{
              justifyContent: 'flex-end',
              display: 'flex',
            }}
          >
            <Button
              type="button"
              className={`${
                formik?.values?.devices?.android?.miTv
                  ? `${styles.active}`
                  : `${styles.inactive}`
              }`}
              device="ios"
              name="devices.android.miTv"
              value={`${
                formik?.values?.devices?.android?.miTv
                  ? 'Selected'
                  : 'Get This App'
              }`}
              onClick={() =>
                handleButtonClick(
                  'devices?.android?.miTv',
                  !formik.values.devices?.android?.miTv
                )
              }
            >
              {`${
                formik?.values?.devices?.android?.miTv
                  ? 'Selected'
                  : 'Get This App'
              }`}
            </Button>
          </Grid>
        </Container>
        <Container Container className={`${styles.moreDeviceRow}`}>
          <Grid
            xs={9}
            sx={{
              background: '#fafcfe',
              display: 'flex',
            }}
          >
            {' '}
            <AndroidIcon className={`${styles.deviceLogo}`} />
            <Box component="span" className={`${styles.deviceName}`}>
              android corpus
            </Box>
          </Grid>
          <Grid
            xs={3}
            sx={{
              justifyContent: 'flex-end',
              display: 'flex',
            }}
          >
            <Button
              type="button"
              className={`${
                formik?.values?.devices?.android?.corpus
                  ? `${styles.active}`
                  : `${styles.inactive}`
              }`}
              name="devices.android.corpus"
              value={`${
                formik?.values?.devices?.android?.corpus
                  ? 'Selected'
                  : 'Get This App'
              }`}
              onClick={() =>
                handleButtonClick(
                  'devices.android.corpus',
                  !formik.values.devices?.android?.corpus
                )
              }
            >
              {`${
                formik?.values?.devices?.android?.corpus
                  ? 'Selected'
                  : 'Get This App'
              }`}
            </Button>
          </Grid>
        </Container>
        <Container Container className={`${styles.moreDeviceRow}`}>
          <Grid
            xs={9}
            sx={{
              background: '#fafcfe',
              display: 'flex',
            }}
          >
            {' '}
            <ConnectedTvIcon className={`${styles.deviceLogo}`} />
            <Box component="span" className={`${styles.deviceName}`}>
              amazon fire
            </Box>
          </Grid>
          <Grid
            xs={3}
            sx={{
              justifyContent: 'flex-end',
              display: 'flex',
            }}
          >
            <Button
              type="button"
              className={`${
                formik?.values?.devices?.amazon?.fire
                  ? `${styles.active}`
                  : `${styles.inactive}`
              }`}
              name="devices.amazon.fire"
              value={`${
                formik?.values?.devices?.amazon?.fire
                  ? 'Selected'
                  : 'Get This App'
              }`}
              onClick={() =>
                handleButtonClick(
                  'devices.amazon.fire',
                  !formik.values.devices?.amazon?.fire
                )
              }
            >
              {`${
                formik?.values?.devices?.amazon?.fire
                  ? 'Selected'
                  : 'Get This App'
              }`}
            </Button>
          </Grid>
        </Container>
        <Container Container className={`${styles.moreDeviceRow}`}>
          <Grid
            xs={9}
            sx={{
              background: '#fafcfe',
              display: 'flex',
            }}
          >
            {' '}
            <ConnectedTvIcon className={`${styles.deviceLogo}`} />
            <Box component="span" className={`${styles.deviceName}`}>
              amazon tv
            </Box>
          </Grid>
          <Grid
            xs={3}
            sx={{
              justifyContent: 'flex-end',
              display: 'flex',
            }}
          >
            <Button
              type="button"
              className={`${
                formik?.values?.devices?.amazon?.tv
                  ? `${styles.active}`
                  : `${styles.inactive}`
              }`}
              name="devices.amazon.tv"
              value={`${
                formik?.values?.devices?.amazon?.tv
                  ? 'Selected'
                  : 'Get This App'
              }`}
              onClick={() =>
                handleButtonClick(
                  'devices.amazon.tv',
                  !formik.values.devices?.amazon?.tv
                )
              }
            >
              {`${
                formik?.values?.devices?.amazon?.tv
                  ? 'Selected'
                  : 'Get This App'
              }`}
            </Button>
          </Grid>
        </Container>
        <Container Container className={`${styles.moreDeviceRow}`}>
          <Grid
            xs={9}
            sx={{
              background: '#fafcfe',
              display: 'flex',
            }}
          >
            {' '}
            <ConnectedTvIcon className={`${styles.deviceLogo}`} />
            <Box component="span" className={`${styles.deviceName}`}>
              amazon stick
            </Box>
          </Grid>
          <Grid
            xs={3}
            sx={{
              justifyContent: 'flex-end',
              display: 'flex',
            }}
          >
            <Button
              type="button"
              className={`${
                formik?.values?.devices?.amazon?.stick
                  ? `${styles.active}`
                  : `${styles.inactive}`
              }`}
              name="devices.amazon.stick"
              value={`${
                formik?.values?.devices?.amazon?.stick
                  ? 'Selected'
                  : 'Get This App'
              }`}
              onClick={() =>
                handleButtonClick(
                  'devices.amazon.stick',
                  !formik.values.devices?.amazon?.stick
                )
              }
            >
              {`${
                formik?.values?.devices?.amazon?.stick
                  ? 'Selected'
                  : 'Get This App'
              }`}
            </Button>
          </Grid>
        </Container>
        <Container Container className={`${styles.moreDeviceRow}`}>
          <Grid
            xs={9}
            sx={{
              background: '#fafcfe',
              display: 'flex',
            }}
          >
            {' '}
            <ConnectedTvIcon className={`${styles.deviceLogo}`} />
            <Box component="span" className={`${styles.deviceName}`}>
              roku box
            </Box>
          </Grid>
          <Grid
            xs={3}
            sx={{
              justifyContent: 'flex-end',
              display: 'flex',
            }}
          >
            <Button
              type="button"
              className={`${
                formik?.values?.devices?.roku?.box
                  ? `${styles.active}`
                  : `${styles.inactive}`
              }`}
              name="devices.roku.box"
              value={`${
                formik?.values?.devices?.roku?.box ? 'Selected' : 'Get This App'
              }`}
              onClick={() =>
                handleButtonClick(
                  'devices.roku.box',
                  !formik.values.devices?.roku?.box
                )
              }
            >
              {`${
                formik?.values?.devices?.roku?.box ? 'Selected' : 'Get This App'
              }`}
            </Button>
          </Grid>
        </Container>
        <Container Container className={`${styles.moreDeviceRow}`}>
          <Grid
            xs={9}
            sx={{
              background: '#fafcfe',
              display: 'flex',
            }}
          >
            {' '}
            <ConnectedTvIcon className={`${styles.deviceLogo}`} />
            <Box component="span" className={`${styles.deviceName}`}>
              roku stick
            </Box>
          </Grid>
          <Grid
            xs={3}
            sx={{
              justifyContent: 'flex-end',
              display: 'flex',
            }}
          >
            <Button
              type="button"
              className={`${
                formik?.values?.devices?.roku?.stick
                  ? `${styles.active}`
                  : `${styles.inactive}`
              }`}
              name="devices.roku.stick"
              value={`${
                formik?.values?.devices?.roku?.stick
                  ? 'Selected'
                  : 'Get This App'
              }`}
              onClick={() =>
                handleButtonClick(
                  'devices.roku.box',
                  !formik.values.devices?.roku?.stick
                )
              }
            >
              {`${
                formik?.values?.devices?.roku?.stick
                  ? 'Selected'
                  : 'Get This App'
              }`}
            </Button>
          </Grid>
        </Container>
        <Container Container className={`${styles.moreDeviceRow}`}>
          <Grid
            xs={9}
            sx={{
              background: '#fafcfe',
              display: 'flex',
            }}
          >
            {' '}
            <ConnectedTvIcon className={`${styles.deviceLogo}`} />
            <Box component="span" className={`${styles.deviceName}`}>
              microsoft windows 10 xbox
            </Box>
          </Grid>
          <Grid
            xs={3}
            sx={{
              justifyContent: 'flex-end',
              display: 'flex',
            }}
          >
            <Button
              type="button"
              className={`${
                formik?.values?.devices?.microsoft?.xbox
                  ? `${styles.active}`
                  : `${styles.inactive}`
              }`}
              name="devices.microsoft.xbox"
              value={`${
                formik?.values?.devices?.microsoft?.xbox
                  ? 'Selected'
                  : 'Get This App'
              }`}
              onClick={() =>
                handleButtonClick(
                  'devices.microsoft.xbox',
                  !formik.values.devices?.microsoft?.xbox
                )
              }
            >
              {`${
                formik?.values?.devices?.microsoft?.xbox
                  ? 'Selected'
                  : 'Get This App'
              }`}
            </Button>
          </Grid>
        </Container>
        <Container Container className={`${styles.moreDeviceRow}`}>
          <Grid
            xs={9}
            sx={{
              background: '#fafcfe',
              display: 'flex',
            }}
          >
            {' '}
            <ConnectedTvIcon className={`${styles.deviceLogo}`} />
            <Box component="span" className={`${styles.deviceName}`}>
              microsoft windows 10 desktop
            </Box>
          </Grid>
          <Grid
            xs={3}
            sx={{
              justifyContent: 'flex-end',
              display: 'flex',
            }}
          >
            <Button
              type="button"
              className={`${
                formik?.values?.devices?.microsoft?.windows10_desktop
                  ? `${styles.active}`
                  : `${styles.inactive}`
              }`}
              name="devices.microsoft.windows10_desktop"
              value={`${
                formik?.values?.devices?.microsoft?.windows10_desktop
                  ? 'Selected'
                  : 'Get This App'
              }`}
              onClick={() =>
                handleButtonClick(
                  'devices.microsoft.windows10_desktop',
                  !formik.values.devices?.microsoft?.windows10_desktop
                )
              }
            >
              {`${
                formik?.values?.devices?.microsoft?.windows10_desktop
                  ? 'Selected'
                  : 'Get This App'
              }`}
            </Button>
          </Grid>
        </Container>
        <Container Container className={`${styles.moreDeviceRow}`}>
          <Grid
            xs={9}
            sx={{
              background: '#fafcfe',
              display: 'flex',
            }}
          >
            {' '}
            <ConnectedTvIcon className={`${styles.deviceLogo}`} />
            <Box component="span" className={`${styles.deviceName}`}>
              smart tv lg
            </Box>
          </Grid>
          <Grid
            xs={3}
            sx={{
              justifyContent: 'flex-end',
              display: 'flex',
            }}
          >
            <Button
              type="button"
              className={`${
                formik?.values?.devices?.smartTv?.lg
                  ? `${styles.active}`
                  : `${styles.inactive}`
              }`}
              name="devices.smartTv.lg"
              value={`${
                formik?.values?.devices?.smartTv?.lg
                  ? 'Selected'
                  : 'Get This App'
              }`}
              onClick={() =>
                handleButtonClick(
                  'devices.smartTv.lg',
                  !formik.values.devices?.smartTv?.lg
                )
              }
            >
              {`${
                formik?.values?.devices?.smartTv?.lg
                  ? 'Selected'
                  : 'Get This App'
              }`}
            </Button>
          </Grid>
        </Container>
        <Container Container className={`${styles.moreDeviceRow}`}>
          <Grid
            xs={9}
            sx={{
              background: '#fafcfe',
              display: 'flex',
            }}
          >
            {' '}
            <ConnectedTvIcon className={`${styles.deviceLogo}`} />
            <Box component="span" className={`${styles.deviceName}`}>
              smart tv samsung
            </Box>
          </Grid>
          <Grid
            xs={3}
            sx={{
              justifyContent: 'flex-end',
              display: 'flex',
            }}
          >
            <Button
              type="button"
              className={`${
                formik?.values?.devices?.smartTv?.samsung
                  ? `${styles.active}`
                  : `${styles.inactive}`
              }`}
              name="devices.smartTv.samsung"
              value={`${
                formik?.values?.devices?.smartTv?.samsung
                  ? 'Selected'
                  : 'Get This App'
              }`}
              onClick={() =>
                handleButtonClick(
                  'devices.smartTv.samsung',
                  !formik.values.devices?.smartTv?.samsung
                )
              }
            >
              {`${
                formik?.values?.devices?.smartTv?.samsung
                  ? 'Selected'
                  : 'Get This App'
              }`}
            </Button>
          </Grid>
        </Container>
        <Container Container className={`${styles.moreDeviceRow}`}>
          <Grid
            xs={9}
            sx={{
              background: '#fafcfe',
              display: 'flex',
            }}
          >
            {' '}
            <ConnectedTvIcon className={`${styles.deviceLogo}`} />
            <Box component="span" className={`${styles.deviceName}`}>
              smart tv sony
            </Box>
          </Grid>
          <Grid
            xs={3}
            sx={{
              justifyContent: 'flex-end',
              display: 'flex',
            }}
          >
            <Button
              type="button"
              className={`${
                formik?.values?.devices?.smartTv?.sony
                  ? `${styles.active}`
                  : `${styles.inactive}`
              }`}
              name="devices.smartTv.sony"
              value={`${
                formik?.values?.devices?.smartTv?.sony
                  ? 'Selected'
                  : 'Get This App'
              }`}
              onClick={() =>
                handleButtonClick(
                  'devices.smartTv.sony',
                  !formik.values.devices?.smartTv?.sony
                )
              }
            >
              {`${
                formik?.values?.devices?.smartTv?.sony
                  ? 'Selected'
                  : 'Get This App'
              }`}
            </Button>
          </Grid>
        </Container>
        <Container Container className={`${styles.moreDeviceRow}`}>
          <Grid
            xs={9}
            sx={{
              background: '#fafcfe',
              display: 'flex',
            }}
          >
            {' '}
            <ConnectedTvIcon className={`${styles.deviceLogo}`} />
            <Box component="span" className={`${styles.deviceName}`}>
              smart tv panasonic
            </Box>
          </Grid>
          <Grid
            xs={3}
            sx={{
              justifyContent: 'flex-end',
              display: 'flex',
            }}
          >
            <Button
              type="button"
              className={`${
                formik?.values?.devices?.smartTv?.panasonic
                  ? `${styles.active}`
                  : `${styles.inactive}`
              }`}
              name="devices.smartTv.panasonic"
              value={`${
                formik?.values?.devices?.smartTv?.panasonic
                  ? 'Selected'
                  : 'Get This App'
              }`}
              onClick={() =>
                handleButtonClick(
                  'devices.smartTv.panasonic',
                  !formik.values.devices?.smartTv?.panasonic
                )
              }
            >
              {`${
                formik?.values?.devices?.smartTv?.panasonic
                  ? 'Selected'
                  : 'Get This App'
              }`}
            </Button>
          </Grid>
        </Container>
        <Container Container className={`${styles.moreDeviceRow}`}>
          <Grid
            xs={9}
            sx={{
              background: '#fafcfe',
              display: 'flex',
            }}
          >
            {' '}
            <ConnectedTvIcon className={`${styles.deviceLogo}`} />
            <Box component="span" className={`${styles.deviceName}`}>
              smart tv operatv
            </Box>
          </Grid>
          <Grid
            xs={3}
            sx={{
              justifyContent: 'flex-end',
              display: 'flex',
            }}
          >
            <Button
              type="button"
              className={`${
                formik?.values?.devices?.smartTv?.opera_tv
                  ? `${styles.active}`
                  : `${styles.inactive}`
              }`}
              name="devices.smartTv.opera_tv"
              value={`${
                formik?.values?.devices?.smartTv?.opera_tv
                  ? 'Selected'
                  : 'Get This App'
              }`}
              onClick={() =>
                handleButtonClick(
                  'devices.smartTv.opera_tv',
                  !formik.values?.devices?.smartTv?.opera_tv
                )
              }
            >
              {`${
                formik?.values?.devices?.smartTv?.opera_tv
                  ? 'Selected'
                  : 'Get This App'
              }`}
            </Button>
          </Grid>
        </Container>
        <Container Container className={`${styles.moreDeviceRow}`}>
          <Grid
            xs={9}
            sx={{
              background: '#fafcfe',
              display: 'flex',
            }}
          >
            {' '}
            <ConnectedTvIcon className={`${styles.deviceLogo}`} />
            <Box component="span" className={`${styles.deviceName}`}>
              tivo
            </Box>
          </Grid>
          <Grid
            xs={3}
            sx={{
              justifyContent: 'flex-end',
              display: 'flex',
            }}
          >
            <Button
              type="button"
              className={`${
                formik?.values?.devices?.tivo
                  ? `${styles.active}`
                  : `${styles.inactive}`
              }`}
              name="devices.tivo"
              value={`${
                formik?.values?.devices?.tivo ? 'Selected' : 'Get This App'
              }`}
              onClick={() =>
                handleButtonClick('devices.tivo', !formik.values.devices?.tivo)
              }
            >
              {`${formik?.values?.devices?.tivo ? 'Selected' : 'Get This App'}`}
            </Button>
          </Grid>
        </Container>
        <Container Container className={`${styles.moreDeviceRow}`}>
          <Grid
            xs={9}
            sx={{
              background: '#fafcfe',
              display: 'flex',
            }}
          >
            {' '}
            <ConnectedTvIcon className={`${styles.deviceLogo}`} />
            <Box component="span" className={`${styles.deviceName}`}>
              metrological
            </Box>
          </Grid>
          <Grid
            xs={3}
            sx={{
              justifyContent: 'flex-end',
              display: 'flex',
            }}
          >
            <Button
              type="button"
              className={`${
                formik?.values?.devices?.metrological
                  ? `${styles.active}`
                  : `${styles.inactive}`
              }`}
              name="devices.metrological"
              value={`${
                formik?.values?.devices?.metrological
                  ? 'Selected'
                  : 'Get This App'
              }`}
              onClick={() =>
                handleButtonClick(
                  'devices.metrological',
                  !formik.values.devices?.metrological
                )
              }
            >
              {`${
                formik?.values?.devices?.metrological
                  ? 'Selected'
                  : 'Get This App'
              }`}
            </Button>
          </Grid>
        </Container>
        <Container Container className={`${styles.moreDeviceRow}`}>
          <Grid
            xs={9}
            sx={{
              background: '#fafcfe',
              display: 'flex',
            }}
          >
            {' '}
            <ConnectedTvIcon className={`${styles.deviceLogo}`} />
            <Box component="span" className={`${styles.deviceName}`}>
              jiotv
            </Box>
          </Grid>
          <Grid
            xs={3}
            sx={{
              justifyContent: 'flex-end',
              display: 'flex',
            }}
          >
            <Button
              type="button"
              className={`${
                formik?.values?.devices?.jiostb
                  ? `${styles.active}`
                  : `${styles.inactive}`
              }`}
              name="devices.jiostb"
              value={`${
                formik?.values?.devices?.jiostb ? 'Selected' : 'Get This App'
              }`}
              onClick={() =>
                handleButtonClick(
                  'devices.jiostb',
                  !formik.values.devices?.jiostb
                )
              }
            >
              {`${
                formik?.values?.devices?.jiostb ? 'Selected' : 'Get This App'
              }`}
            </Button>
          </Grid>
        </Container>
        <Container Container className={`${styles.moreDeviceRow}`}>
          <Grid
            xs={9}
            sx={{
              background: '#fafcfe',
              display: 'flex',
            }}
          >
            {' '}
            <ConnectedTvIcon className={`${styles.deviceLogo}`} />
            <Box component="span" className={`${styles.deviceName}`}>
              {' '}
              vizioTv
            </Box>
          </Grid>
          <Grid
            xs={3}
            sx={{
              justifyContent: 'flex-end',
              display: 'flex',
            }}
          >
            <Button
              type="button"
              className={`${
                formik?.values?.devices?.vizioTv
                  ? `${styles.active}`
                  : `${styles.inactive}`
              }`}
              name="devices.vizioTv"
              value={`${
                formik?.values?.devices?.vizioTv ? 'Selected' : 'Get This App'
              }`}
              onClick={() =>
                handleButtonClick(
                  'devices.vizioTv',
                  !formik.values.devices?.vizioTv
                )
              }
            >
              {`${
                formik?.values?.devices?.vizioTv ? 'Selected' : 'Get This App'
              }`}
            </Button>
          </Grid>
        </Container>
      </Box>
    </>
  )
}
