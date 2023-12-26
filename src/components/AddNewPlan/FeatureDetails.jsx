import Box from '@mui/material/Box'
import { TextField, Typography } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { useEffect, useRef } from 'react'

const FeatureDetails = ({
  values,
  handleChange,
  setFieldValue,
  errors,
  touched,
  handleBlur,
  addOrEditPlan,
  type,
}) => {
  const first = useRef('')

  useEffect(() => {
    if (
      values?.featureSetting?.isLoginRequired === true &&
      (first.current === '' || first.current === 'isEmailRequired')
    ) {
      setFieldValue('featureSetting', {
        ...values.featureSetting,
        isEmailRequired: false,
      })
      first.current = 'isLoginRequired'
      return
    }

    if (
      values.featureSetting?.isEmailRequired === true &&
      (first.current === '' || first.current === 'isLoginRequired')
    ) {
      setFieldValue('featureSetting', {
        ...values.featureSetting,
        isLoginRequired: false,
      })

      first.current = 'isEmailRequired'
      return
    }

    // return () => {}
  }, [
    values.featureSetting?.isLoginRequired,
    values.featureSetting?.isEmailRequired,
  ])

  const disabelithCss =
    addOrEditPlan === 'edit' && type !== 'FREE'
      ? { opacity: 0.7, pointerEvents: 'none', cursor: 'not-allowed' }
      : {}

  return (
    <Box
      className="featureDetails"
      sx={{
        borderRadius: '10px',
        border: '1px solid #cfcfcf',
        padding: '20px 40px',
        marginTop: '40px',
        ...disabelithCss,
      }}
    >
      <Typography variant="h6">Feature Details</Typography>

      {values.featureSetting.hasOwnProperty('isDownloadAllowed') && (
        <Box
          className="featureFieldDetails"
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
            gap: '20px',
          }}
        >
          <HelpOutlineIcon />
          <Box className="label&inputfield" sx={{ display: 'flex' }}>
            <Box
              className="label"
              sx={{
                fontSize: '14px',
                color: '#333',
                fontWeight: 'bold',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginRight: '20px',
              }}
            >
              <Box>isDownloadAllowed: </Box>
            </Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.featureSetting.isDownloadAllowed}
                  onChange={handleChange}
                  name="featureSetting.isDownloadAllowed"
                />
              }
              label=""
            />
          </Box>
        </Box>
      )}
      {values.featureSetting.hasOwnProperty('includingAds') && (
        <Box
          className="featureFieldDetails"
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
            gap: '20px',
          }}
        >
          <HelpOutlineIcon />
          <Box className="label&inputfield" sx={{ display: 'flex' }}>
            <Box
              className="label"
              sx={{
                fontSize: '14px',
                color: '#333',
                fontWeight: 'bold',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginRight: '20px',
              }}
            >
              <Box>includingAds: </Box>
            </Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.featureSetting.includingAds}
                  onChange={handleChange}
                  name="featureSetting.includingAds"
                />
              }
              label=""
            />
          </Box>
        </Box>
      )}

      {values.featureSetting.hasOwnProperty('isHdStreaming') && (
        <Box
          className="featureFieldDetails"
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
            gap: '20px',
          }}
        >
          <HelpOutlineIcon />
          <Box className="label&inputfield" sx={{ display: 'flex' }}>
            <Box
              className="label"
              sx={{
                fontSize: '14px',
                color: '#333',
                fontWeight: 'bold',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginRight: '20px',
              }}
            >
              <Box>HD Streaming :</Box>
            </Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.featureSetting.isHdStreaming}
                  onChange={handleChange}
                  name="featureSetting.isHdStreaming"
                />
              }
              label=""
            />
          </Box>
        </Box>
      )}
      {values.featureSetting.hasOwnProperty('isBeamingAllowed') && (
        <Box
          className="featureFieldDetails"
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
            gap: '20px',
          }}
        >
          <HelpOutlineIcon />
          <Box className="label&inputfield" sx={{ display: 'flex' }}>
            <Box
              className="label"
              sx={{
                fontSize: '14px',
                color: '#333',
                fontWeight: 'bold',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginRight: '20px',
              }}
            >
              <Box>isBeamingAllowed :</Box>
            </Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.featureSetting.isBeamingAllowed}
                  onChange={handleChange}
                  name="featureSetting.isBeamingAllowed"
                />
              }
              label=""
            />
          </Box>
        </Box>
      )}

      {/* free start
       */}
      {values.featureSetting.hasOwnProperty('isLoginRequired') && (
        <Box
          className="featureFieldDetails"
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
            gap: '20px',
          }}
        >
          <HelpOutlineIcon />
          <Box className="label&inputfield" sx={{ display: 'flex' }}>
            <Box
              className="label"
              sx={{
                fontSize: '14px',
                color: '#333',
                fontWeight: 'bold',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginRight: '20px',
              }}
            >
              <Box>Login Required :</Box>
            </Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.featureSetting.isLoginRequired}
                  onChange={(e) => {
                    handleChange(e)
                  }}
                  name="featureSetting.isLoginRequired"
                />
              }
              label=""
            />
          </Box>
        </Box>
      )}
      {values.featureSetting.hasOwnProperty('isEmailRequired') && (
        <Box
          className="featureFieldDetails"
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
            gap: '20px',
          }}
        >
          <HelpOutlineIcon />
          <Box className="label&inputfield" sx={{ display: 'flex' }}>
            <Box
              className="label"
              sx={{
                fontSize: '14px',
                color: '#333',
                fontWeight: 'bold',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginRight: '20px',
              }}
            >
              <Box>Email Required :</Box>
            </Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.featureSetting.isEmailRequired}
                  onChange={(e) => {
                    handleChange(e)
                  }}
                  name="featureSetting.isEmailRequired"
                />
              }
              label=""
            />
          </Box>
        </Box>
      )}

      {/* free end  */}

      {/* Avod start
       */}

      {type === 'AVOD' && (
        <Typography sx={{ fontWeight: 'bold' }} mt={3}>
          Show Ads for :
        </Typography>
      )}
      {values.featureSetting.hasOwnProperty('loggedIn') && (
        <Box
          className="featureFieldDetails"
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
            gap: '20px',
          }}
        >
          <HelpOutlineIcon />
          <Box className="label&inputfield" sx={{ display: 'flex' }}>
            <Box
              className="label"
              sx={{
                fontSize: '14px',
                color: '#333',
                fontWeight: 'bold',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginRight: '20px',
              }}
            >
              <Box>Logged In :</Box>
            </Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.featureSetting.loggedIn}
                  onChange={handleChange}
                  name="featureSetting.loggedIn"
                />
              }
              label=""
            />
          </Box>
        </Box>
      )}
      {values.featureSetting.hasOwnProperty('nonLoggedIn') && (
        <Box
          className="featureFieldDetails"
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
            gap: '20px',
          }}
        >
          <HelpOutlineIcon />
          <Box className="label&inputfield" sx={{ display: 'flex' }}>
            <Box
              className="label"
              sx={{
                fontSize: '14px',
                color: '#333',
                fontWeight: 'bold',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginRight: '20px',
              }}
            >
              <Box>Non Logged In :</Box>
            </Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.featureSetting.nonLoggedIn}
                  onChange={handleChange}
                  name="featureSetting.nonLoggedIn"
                />
              }
              label=""
            />
          </Box>
        </Box>
      )}
      {values.featureSetting.hasOwnProperty('subscribed') && (
        <Box
          className="featureFieldDetails"
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
            gap: '20px',
          }}
        >
          <HelpOutlineIcon />
          <Box className="label&inputfield" sx={{ display: 'flex' }}>
            <Box
              className="label"
              sx={{
                fontSize: '14px',
                color: '#333',
                fontWeight: 'bold',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginRight: '20px',
              }}
            >
              <Box>Subscribed :</Box>
            </Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.featureSetting.subscribed}
                  onChange={handleChange}
                  name="featureSetting.subscribed"
                />
              }
              label=""
            />
          </Box>
        </Box>
      )}
      {values.featureSetting.hasOwnProperty('transactionPurchased') && (
        <Box
          className="featureFieldDetails"
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
            gap: '20px',
          }}
        >
          <HelpOutlineIcon />
          <Box className="label&inputfield" sx={{ display: 'flex' }}>
            <Box
              className="label"
              sx={{
                fontSize: '14px',
                color: '#333',
                fontWeight: 'bold',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginRight: '20px',
              }}
            >
              <Box>Transaction Purchased :</Box>
            </Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.featureSetting.transactionPurchased}
                  onChange={handleChange}
                  name="featureSetting.transactionPurchased"
                />
              }
              label=""
            />
          </Box>
        </Box>
      )}
      {values.featureSetting.hasOwnProperty('tve') && (
        <Box
          className="featureFieldDetails"
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
            gap: '20px',
          }}
        >
          <HelpOutlineIcon />
          <Box className="label&inputfield" sx={{ display: 'flex' }}>
            <Box
              className="label"
              sx={{
                fontSize: '14px',
                color: '#333',
                fontWeight: 'bold',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginRight: '20px',
              }}
            >
              <Box>Tve:</Box>
            </Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.featureSetting.tve}
                  onChange={handleChange}
                  name="featureSetting.tve"
                />
              }
              label=""
            />
          </Box>
        </Box>
      )}
      {values.featureSetting.hasOwnProperty('churned') && (
        <Box
          className="featureFieldDetails"
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
            gap: '20px',
          }}
        >
          <HelpOutlineIcon />
          <Box className="label&inputfield" sx={{ display: 'flex' }}>
            <Box
              className="label"
              sx={{
                fontSize: '14px',
                color: '#333',
                fontWeight: 'bold',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginRight: '20px',
              }}
            >
              <Box>Churned:</Box>
            </Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.featureSetting.churned}
                  onChange={handleChange}
                  name="featureSetting.churned"
                />
              }
              label=""
            />
          </Box>
        </Box>
      )}

      {/* Avod end  */}
      {values.featureSetting.hasOwnProperty('contentConsumption') && (
        <Box
          className="featureFieldDetails"
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
            gap: '20px',
          }}
        >
          <HelpOutlineIcon />
          <Box className="label&inputfield" sx={{ display: 'flex' }}>
            <Box
              className="label"
              sx={{
                fontSize: '14px',
                color: '#333',
                fontWeight: 'bold',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginRight: '20px',
              }}
            >
              <Box> Content Consumption Enabled:</Box>
            </Box>
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.featureSetting.contentConsumption.web}
                    onChange={handleChange}
                    name="featureSetting.contentConsumption.web"
                  />
                }
                label="web"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.featureSetting.contentConsumption.ios}
                    onChange={handleChange}
                    name="featureSetting.contentConsumption.ios"
                  />
                }
                label="ios"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.featureSetting.contentConsumption.android}
                    onChange={handleChange}
                    name="featureSetting.contentConsumption.android"
                  />
                }
                label="android"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.featureSetting.contentConsumption.roku}
                    onChange={handleChange}
                    name="featureSetting.contentConsumption.roku"
                  />
                }
                label="roku"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.featureSetting.contentConsumption.fireTv}
                    onChange={handleChange}
                    name="featureSetting.contentConsumption.fireTv"
                  />
                }
                label="fireTv"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.featureSetting.contentConsumption.appleTv}
                    onChange={handleChange}
                    name="featureSetting.contentConsumption.appleTv"
                  />
                }
                label="appleTv"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.featureSetting.contentConsumption.samsung}
                    onChange={handleChange}
                    name="featureSetting.contentConsumption.samsung"
                  />
                }
                label="samsung"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.featureSetting.contentConsumption.lg}
                    onChange={handleChange}
                    name="featureSetting.contentConsumption.lg"
                  />
                }
                label="lg"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.featureSetting.contentConsumption.androidTv}
                    onChange={handleChange}
                    name="featureSetting.contentConsumption.androidTv"
                  />
                }
                label="androidTv"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.featureSetting.contentConsumption.tivo}
                    onChange={handleChange}
                    name="featureSetting.contentConsumption.tivo"
                  />
                }
                label="tivo"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.featureSetting.contentConsumption.xbox}
                    onChange={handleChange}
                    name="featureSetting.contentConsumption.xbox"
                  />
                }
                label="xbox"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.featureSetting.contentConsumption.miTv}
                    onChange={handleChange}
                    name="featureSetting.contentConsumption.miTv"
                  />
                }
                label="miTv"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.featureSetting.contentConsumption.corpus}
                    onChange={handleChange}
                    name="featureSetting.contentConsumption.corpus"
                  />
                }
                label="corpus"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.featureSetting.contentConsumption.vizioTv}
                    onChange={handleChange}
                    name="featureSetting.contentConsumption.vizioTv"
                  />
                }
                label="vizioTv"
              />
            </Box>
          </Box>
        </Box>
      )}

      {values.featureSetting.hasOwnProperty('numberOfAllowedStreams') && (
        <Box
          className="featureFieldDetails"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <HelpOutlineIcon />
          <Box className="label&inputfield" sx={{ display: 'flex' }}>
            <Box
              className="label"
              sx={{
                fontSize: '14px',
                color: '#333',
                fontWeight: 'bold',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginRight: '20px',
              }}
            >
              <Box># Simultaneous Streams: </Box>
            </Box>
            <Box>
              <TextField
                label="Simultaneous Streams"
                name="featureSetting.numberOfAllowedStreams"
                value={values.featureSetting.numberOfAllowedStreams}
                onChange={handleChange}
                onBlur={handleBlur}
                type="number"
                error={
                  errors?.featureSetting?.numberOfAllowedStreams &&
                  touched?.featureSetting?.numberOfAllowedStreams
                }
                helperText={
                  touched.featureSetting?.numberOfAllowedStreams &&
                  errors?.featureSetting?.numberOfAllowedStreams
                }
              />
            </Box>
          </Box>
        </Box>
      )}

      {values.featureSetting.hasOwnProperty('numberOfAllowedDevices') && (
        <Box
          className="featureFieldDetails"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <HelpOutlineIcon />
          <Box className="label&inputfield" sx={{ display: 'flex' }}>
            <Box
              className="label"
              sx={{
                fontSize: '14px',
                color: '#333',
                fontWeight: 'bold',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginRight: '20px',
              }}
            >
              <Box># Connected Devices : </Box>
            </Box>
            <Box>
              <TextField
                label="Connected Devices"
                name="featureSetting.numberOfAllowedDevices"
                value={values.featureSetting.numberOfAllowedDevices}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  errors?.featureSetting?.numberOfAllowedDevices &&
                  touched?.featureSetting?.numberOfAllowedDevices
                }
                helperText={
                  touched.featureSetting?.numberOfAllowedDevices &&
                  errors?.featureSetting?.numberOfAllowedDevices
                }
              />
            </Box>
          </Box>
        </Box>
      )}

      {values.featureSetting.hasOwnProperty('logoOfParnter') && (
        <Box
          className="featureFieldDetails"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <HelpOutlineIcon />
          <Box className="label&inputfield" sx={{ display: 'flex' }}>
            <Box
              className="label"
              sx={{
                fontSize: '14px',
                color: '#333',
                fontWeight: 'bold',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginRight: '20px',
              }}
            >
              <Box>Logo Of Parnter : </Box>
            </Box>
            <Box>
              <TextField
                label="Logo of Partner"
                name="featureSetting.logoOfParnter"
                value={values.featureSetting.logoOfParnter}
                onChange={handleChange}
              />
            </Box>
          </Box>
        </Box>
      )}

      {type !== 'FREE' && (
        <Box>
          <Box sx={{ display: 'inline', fontWeight: 'bold' }}>Note: </Box>
          These values once submitted while plan creation, cannot be modified
          later.
        </Box>
      )}
    </Box>
  )
}

export default FeatureDetails
