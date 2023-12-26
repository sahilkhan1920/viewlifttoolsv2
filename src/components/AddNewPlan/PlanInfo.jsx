import Box from '@mui/material/Box'
import { FormHelperText, TextField, Typography } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import { FieldArray } from 'formik'
import MinimizeIcon from '@mui/icons-material/Minimize'
import AddIcon from '@mui/icons-material/Add'
import OutlinedInput from '@mui/material/OutlinedInput'
import Chip from '@mui/material/Chip'
import { useTheme } from '@mui/material/styles'

import Countriesjson from 'src/json/countries.json'

import countriesJsonInObject from 'src/json/countriesJsonInObject.json'
import { choosePlanDetailObjectIntial } from 'src/helpers/createPlanIntialObjectHelper'

const PlanInfo = ({
  handleChange,
  handleChangeForCountryToAlsoSetCountryCode,
  handleCustomSelect,
  type,
  touched,
  errors,
  handleBlur,
  handleBlurForCountryToAlsoSetCountryCode,
  addOrEditPlan,
  data,
}) => {
  const theme = useTheme()

  const tncPointsObject = { point: '' }

  const featureDetailsObject = {
    textToDisplay: '',
    value: '',
    valueType: 'String',
  }

  const devicesList = [
    'android_tablet',
    'android_tv',
    'oneplus_tv',
    'web_browser',
    'ios_ipad',
    'ios_phone',
    'android_phone',
    'jio_stb',
    'ios_apple_tv',
    'roku_box',
    'fire_tv',
    'smart_tv_samsung',
    'smart_tv_lg',
    'windows_xbox',
    'mi_tv',
    'corpus',
    'vizioTv',
  ]

  const countriesJsonInKeyValuePair = countriesJsonInObject

  const allowedPaymentMethodsStatic = [
    'AMAZONPAY WALLET',
    'FREECHARGE WALLET',
    'GOOGLEPAY WALLET',
    'MOBIKWIK WALLET',
    'PAYPAL WALLET',
    'PAYTM WALLET',
    'PHONEPE WALLET',
    'CREDIT CARDS',
    'DEBIT CARDS',
    'NET BANKING',
    'UPI',
  ]

  const carrierBillingProvidersMap = [
    'GRAMEEN PHONE',
    'ROBI',
    'TIMWE ETISALAT',
    'TIMWE DU',
    'TIMWE OOREDOO',
    'TIMWE BAHRAIN TELCO',
    'GP DATA BUNDLE',
  ]

  const channelIdsList = ['WFN', 'outdoor', 'sportsman']

  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  }

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName?.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    }
  }

  return (
    <FieldArray name="planDetails">
      {(props) => {
        const { form, push } = props
        const { values } = form
        const { planDetails } = values
        return (
          <Box>
            {planDetails.map((item, planDetailsIndex) => {
              let disableTextField = false
              if (addOrEditPlan === 'edit') {
                const length = data?.planDetails?.length - 1
                disableTextField = length >= planDetailsIndex ? true : false
              }

              return (
                <Box
                  className="planSetup"
                  key={`plan-${planDetailsIndex}`}
                  sx={{
                    borderRadius: '10px',
                    border: '1px solid #cfcfcf',
                    padding: '20px 40px',
                    marginBottom: '20px',
                  }}
                >
                  {/* plan setup start  */}
                  <Typography variant="h6" sx={{ marginBottom: '30px' }}>
                    Plan Setup
                  </Typography>
                  {planDetails[planDetailsIndex].hasOwnProperty(
                    'countryCode'
                  ) && (
                    <Box
                      className="planSetupField"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px',
                      }}
                    >
                      <HelpOutlineIcon />
                      <Typography
                        ml={5}
                        sx={{
                          fontWeight: 'bold',
                          width: '80px',
                        }}
                      >
                        Country:
                      </Typography>
                      <Box sx={{ flex: 1 }} ml={2}>
                        <FormControl fullWidth>
                          <InputLabel id="countryCode">Country</InputLabel>
                          <Select
                            sx={{ minWidth: '114px' }}
                            labelId="countryCode"
                            id="countryCode"
                            value={
                              values.planDetails[planDetailsIndex].countryCode
                            }
                            onBlur={(e) => {
                              handleBlurForCountryToAlsoSetCountryCode(
                                e,
                                planDetailsIndex
                              )
                            }}
                            disabled={disableTextField}
                            label="Select Country"
                            error={
                              touched &&
                              touched?.planDetails &&
                              touched?.planDetails?.length > 0 &&
                              touched.planDetails[planDetailsIndex]
                                ?.countryCode &&
                              errors &&
                              errors?.planDetails &&
                              errors?.planDetails?.length > 0 &&
                              errors.planDetails[planDetailsIndex]
                                ?.countryCode &&
                              errors &&
                              errors.planDetails &&
                              errors.planDetails.length > 0 &&
                              errors.planDetails[planDetailsIndex]?.countryCode
                            }
                            name={` values.planDetails[${planDetailsIndex}].countryCode`}
                            onChange={(e) => {
                              handleChangeForCountryToAlsoSetCountryCode(
                                e,
                                planDetailsIndex
                              )
                            }}
                          >
                            <MenuItem disabled>Choose Country</MenuItem>
                            {Countriesjson.map((item, index) => {
                              const value = Object.values(item)[0]
                              const key = Object.keys(item)[0]

                              return (
                                <MenuItem value={key} key={`menu-${index}`}>
                                  {value}
                                </MenuItem>
                              )
                            })}
                          </Select>
                          {touched &&
                            touched?.planDetails &&
                            touched?.planDetails?.length > 0 &&
                            touched.planDetails[planDetailsIndex]
                              ?.countryCode &&
                            errors &&
                            errors?.planDetails &&
                            errors?.planDetails?.length > 0 &&
                            errors.planDetails[planDetailsIndex]
                              ?.countryCode && (
                              <FormHelperText sx={{ color: '#ff1744' }}>
                                {
                                  errors.planDetails[planDetailsIndex]
                                    .countryCode
                                }
                              </FormHelperText>
                            )}
                        </FormControl>
                      </Box>
                    </Box>
                  )}
                  {type === 'TVOD' && (
                    <Box
                      className="planSetupField"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px',
                      }}
                    >
                      <Box
                        sx={{
                          flex: 1,
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              disabled={disableTextField}
                              checked={
                                values.planDetails[planDetailsIndex]
                                  .isPurchaseEnabled
                              }
                              onChange={handleChange}
                              name={`planDetails[${planDetailsIndex}].isPurchaseEnabled`}
                            />
                          }
                          label="Purchase"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              disabled={disableTextField}
                              checked={
                                values.planDetails[planDetailsIndex]
                                  .isRentEnabled
                              }
                              onChange={handleChange}
                              name={`planDetails[${planDetailsIndex}].isRentEnabled`}
                            />
                          }
                          label="Rent "
                        />
                      </Box>
                    </Box>
                  )}
                  {type === 'TVOD' &&
                    planDetails[planDetailsIndex].isPurchaseEnabled && (
                      <Box
                        className="planSetupField"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '20px',
                        }}
                      >
                        <HelpOutlineIcon />
                        <Typography
                          ml={5}
                          sx={{
                            fontWeight: 'bold',
                            width: '80px',
                            minWidth: '80px',
                          }}
                        >
                          Purchase Cost :
                        </Typography>
                        <Box sx={{ flex: 1 }} ml={2}>
                          <FormControl
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              gap: '16px',
                            }}
                          >
                            <TextField
                              disabled={disableTextField}
                              sx={{ flex: 1 }}
                              name={`planDetails[${planDetailsIndex}].purchaseAmount`}
                              label="Purchase Cost"
                              value={
                                values.planDetails[planDetailsIndex]
                                  .purchaseAmount
                              }
                              onBlur={handleBlur}
                              error={
                                touched &&
                                touched?.planDetails &&
                                touched?.planDetails?.length > 0 &&
                                touched.planDetails[planDetailsIndex]
                                  ?.purchaseAmount &&
                                errors &&
                                errors?.planDetails &&
                                errors?.planDetails?.length > 0 &&
                                errors.planDetails[planDetailsIndex]
                                  ?.purchaseAmount &&
                                errors &&
                                errors.planDetails &&
                                errors.planDetails.length > 0 &&
                                errors.planDetails[planDetailsIndex]
                                  ?.purchaseAmount
                              }
                              helperText={
                                touched &&
                                touched?.planDetails &&
                                touched?.planDetails?.length > 0 &&
                                touched.planDetails[planDetailsIndex]
                                  ?.purchaseAmount &&
                                errors &&
                                errors?.planDetails &&
                                errors?.planDetails?.length > 0 &&
                                errors.planDetails[planDetailsIndex]
                                  ?.purchaseAmount &&
                                errors &&
                                errors.planDetails &&
                                errors.planDetails.length > 0 &&
                                errors.planDetails[planDetailsIndex]
                                  ?.purchaseAmount
                              }
                              onChange={handleChange}
                            />
                            <Box
                              sx={{
                                background: '#eee',
                                flex: 1,
                                padding: '16px 14px',
                                borderRadius: '4px',
                              }}
                            ></Box>
                          </FormControl>
                        </Box>
                      </Box>
                    )}
                  {type === 'TVOD' &&
                    planDetails[planDetailsIndex].isRentEnabled && (
                      <Box
                        className="planSetupField"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '20px',
                        }}
                      >
                        <HelpOutlineIcon />
                        <Typography
                          ml={5}
                          sx={{
                            fontWeight: 'bold',
                            width: '80px',
                            minWidth: '80px',
                          }}
                        >
                          Rent Cost
                        </Typography>
                        <Box sx={{ flex: 1 }} ml={2}>
                          <FormControl
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              gap: '16px',
                            }}
                          >
                            <TextField
                              disabled={disableTextField}
                              name={`planDetails[${planDetailsIndex}].rentAmount`}
                              label="Rent Cost"
                              sx={{ flex: 1 }}
                              value={
                                values.planDetails[planDetailsIndex].rentAmount
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched &&
                                touched?.planDetails &&
                                touched?.planDetails?.length > 0 &&
                                touched.planDetails[planDetailsIndex]
                                  ?.rentAmount &&
                                errors &&
                                errors?.planDetails &&
                                errors?.planDetails?.length > 0 &&
                                errors.planDetails[planDetailsIndex]
                                  ?.rentAmount &&
                                errors &&
                                errors.planDetails &&
                                errors.planDetails.length > 0 &&
                                errors.planDetails[planDetailsIndex]?.rentAmount
                              }
                              helperText={
                                touched &&
                                touched?.planDetails &&
                                touched?.planDetails?.length > 0 &&
                                touched.planDetails[planDetailsIndex]
                                  ?.rentAmount &&
                                errors &&
                                errors?.planDetails &&
                                errors?.planDetails?.length > 0 &&
                                errors.planDetails[planDetailsIndex]
                                  ?.rentAmount &&
                                errors &&
                                errors.planDetails &&
                                errors.planDetails.length > 0 &&
                                errors.planDetails[planDetailsIndex]?.rentAmount
                              }
                            />
                            <Box
                              sx={{
                                background: '#eee',
                                flex: 1,
                                padding: '16px 14px',
                                borderRadius: '4px',
                              }}
                            ></Box>
                          </FormControl>
                        </Box>
                      </Box>
                    )}
                  {type === 'TVOD' &&
                    planDetails[planDetailsIndex].isRentEnabled && (
                      <Box
                        className="planSetupField"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '20px',
                        }}
                      >
                        <HelpOutlineIcon />
                        <Typography
                          ml={5}
                          sx={{
                            fontWeight: 'bold',
                            width: '80px',
                            minWidth: '80px',
                          }}
                        >
                          Starting Period:
                        </Typography>
                        <Box sx={{ flex: 1 }} ml={2}>
                          <FormControl
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              gap: '16px',
                            }}
                          >
                            <TextField
                              disabled={disableTextField}
                              name={`planDetails[${planDetailsIndex}].startingPeriodValue`}
                              label=""
                              type="number"
                              sx={{ flex: 1 }}
                              value={
                                values.planDetails[planDetailsIndex]
                                  .startingPeriodValue
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched &&
                                touched?.planDetails &&
                                touched?.planDetails?.length > 0 &&
                                touched.planDetails[planDetailsIndex]
                                  ?.startingPeriodValue &&
                                errors &&
                                errors?.planDetails &&
                                errors?.planDetails?.length > 0 &&
                                errors.planDetails[planDetailsIndex]
                                  ?.startingPeriodValue &&
                                errors &&
                                errors.planDetails &&
                                errors.planDetails.length > 0 &&
                                errors.planDetails[planDetailsIndex]
                                  ?.startingPeriodValue
                              }
                              helperText={
                                touched &&
                                touched?.planDetails &&
                                touched?.planDetails?.length > 0 &&
                                touched.planDetails[planDetailsIndex]
                                  ?.startingPeriodValue &&
                                errors &&
                                errors?.planDetails &&
                                errors?.planDetails?.length > 0 &&
                                errors.planDetails[planDetailsIndex]
                                  ?.startingPeriodValue &&
                                errors &&
                                errors.planDetails &&
                                errors.planDetails.length > 0 &&
                                errors.planDetails[planDetailsIndex]
                                  ?.startingPeriodValue
                              }
                            />

                            <Select
                              sx={{ flex: 1 }}
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              defaultValue="Days"
                              value={
                                values.planDetails[planDetailsIndex]
                                  .startingPeriodDaysOrHours
                              }
                              name={`planDetails[${planDetailsIndex}].startingPeriodDaysOrHours`}
                              onChange={handleChange}
                              disabled={disableTextField}
                            >
                              <MenuItem value={'Days'}>Days</MenuItem>
                              <MenuItem value={'Hours'}>Hours</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </Box>
                    )}
                  {type === 'TVOD' &&
                    planDetails[planDetailsIndex].isRentEnabled && (
                      <Box
                        className="planSetupField"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '20px',
                        }}
                      >
                        <HelpOutlineIcon />
                        <Typography
                          ml={5}
                          sx={{
                            fontWeight: 'bold',
                            width: '80px',
                            minWidth: '80px',
                          }}
                        >
                          Rental Period
                        </Typography>
                        <Box sx={{ flex: 1 }} ml={2}>
                          <FormControl
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              gap: '16px',
                            }}
                          >
                            <TextField
                              disabled={disableTextField}
                              sx={{ flex: 1 }}
                              name={`planDetails[${planDetailsIndex}].rentalPeriodValue`}
                              label=""
                              type="number"
                              value={
                                values.planDetails[planDetailsIndex]
                                  .rentalPeriodValue
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched &&
                                touched?.planDetails &&
                                touched?.planDetails?.length > 0 &&
                                touched.planDetails[planDetailsIndex]
                                  ?.rentalPeriodValue &&
                                errors &&
                                errors?.planDetails &&
                                errors?.planDetails?.length > 0 &&
                                errors.planDetails[planDetailsIndex]
                                  ?.rentalPeriodValue &&
                                errors &&
                                errors.planDetails &&
                                errors.planDetails.length > 0 &&
                                errors.planDetails[planDetailsIndex]
                                  ?.rentalPeriodValue
                              }
                              helperText={
                                touched &&
                                touched?.planDetails &&
                                touched?.planDetails?.length > 0 &&
                                touched.planDetails[planDetailsIndex]
                                  ?.rentalPeriodValue &&
                                errors &&
                                errors?.planDetails &&
                                errors?.planDetails?.length > 0 &&
                                errors.planDetails[planDetailsIndex]
                                  ?.rentalPeriodValue &&
                                errors &&
                                errors.planDetails &&
                                errors.planDetails.length > 0 &&
                                errors.planDetails[planDetailsIndex]
                                  ?.rentalPeriodValue
                              }
                            />
                            {/* <FormControl > */}

                            <Select
                              sx={{ flex: 1 }}
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              defaultValue="days"
                              disabled={disableTextField}
                              value={
                                values.planDetails[planDetailsIndex]
                                  .rentalPeriodUnit
                              }
                              name={`planDetails[${planDetailsIndex}].rentalPeriodUnit`}
                              onChange={handleChange}
                            >
                              <MenuItem value={'days'}>Days</MenuItem>
                              <MenuItem value={'hours'}>Hours</MenuItem>
                            </Select>
                            {/* </FormControl> */}
                          </FormControl>
                        </Box>
                      </Box>
                    )}
                  {planDetails[planDetailsIndex].hasOwnProperty(
                    'channelIds'
                  ) && (
                    <Box
                      className="planSetupField"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px',
                      }}
                    >
                      <HelpOutlineIcon />
                      <Typography
                        ml={5}
                        sx={{
                          fontWeight: 'bold',
                          width: '80px',
                          minWidth: '80px',
                        }}
                      >
                        Channels:
                      </Typography>
                      <Box sx={{ flex: 1 }} ml={2}>
                        <FormControl fullWidth>
                          <InputLabel id="supportedDevices"></InputLabel>
                          <Select
                            labelId="supportedDevices"
                            id="supportedDevices"
                            multiple
                            value={
                              values.planDetails[planDetailsIndex].channelIds
                            }
                            name="channelIds"
                            onChange={(e) => {
                              handleCustomSelect(e, planDetailsIndex)
                            }}
                            input={
                              <OutlinedInput
                                id="channelIds"
                                label="channelIds"
                              />
                            }
                            renderValue={(selected) => (
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexWrap: 'wrap',
                                  gap: 0.5,
                                }}
                              >
                                {selected.map((value) => (
                                  <Chip key={value} label={value} />
                                ))}
                              </Box>
                            )}
                            MenuProps={MenuProps}
                          >
                            {channelIdsList.map((name) => (
                              <MenuItem
                                key={name}
                                value={name}
                                style={getStyles(
                                  name,
                                  values.planDetails[planDetailsIndex]
                                    .channelIds,
                                  theme
                                )}
                              >
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </Box>
                  )}
                  {planDetails[planDetailsIndex].hasOwnProperty(
                    'recurringPaymentAmount'
                  ) && (
                    <Box
                      className="planSetupField"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px',
                      }}
                    >
                      <HelpOutlineIcon />
                      <Typography
                        ml={5}
                        sx={{
                          fontWeight: 'bold',
                          width: '80px',
                        }}
                      >
                        Cost Per Billing Periods :
                      </Typography>
                      <Box sx={{ flex: 1 }} ml={2}>
                        <FormControl fullWidth>
                          <TextField
                            name={`planDetails[${planDetailsIndex}].recurringPaymentAmount`}
                            label="Cost"
                            type="number"
                            value={
                              values.planDetails[planDetailsIndex]
                                .recurringPaymentAmount
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={disableTextField}
                            error={
                              touched &&
                              touched?.planDetails &&
                              touched?.planDetails?.length > 0 &&
                              touched.planDetails[planDetailsIndex]
                                ?.recurringPaymentAmount &&
                              errors &&
                              errors?.planDetails &&
                              errors?.planDetails?.length > 0 &&
                              errors.planDetails[planDetailsIndex]
                                ?.recurringPaymentAmount &&
                              errors &&
                              errors.planDetails &&
                              errors.planDetails.length > 0 &&
                              errors.planDetails[planDetailsIndex]
                                ?.recurringPaymentAmount
                            }
                            helperText={
                              touched &&
                              touched?.planDetails &&
                              touched?.planDetails?.length > 0 &&
                              touched.planDetails[planDetailsIndex]
                                ?.recurringPaymentAmount &&
                              errors &&
                              errors?.planDetails &&
                              errors?.planDetails?.length > 0 &&
                              errors.planDetails[planDetailsIndex]
                                ?.recurringPaymentAmount &&
                              errors &&
                              errors.planDetails &&
                              errors.planDetails.length > 0 &&
                              errors.planDetails[planDetailsIndex]
                                ?.recurringPaymentAmount
                            }
                          />
                        </FormControl>
                      </Box>
                      <Box sx={{ flex: 1 }} ml={2}>
                        <FormControl fullWidth>
                          <TextField
                            InputProps={{
                              readOnly: true,
                            }}
                            variant="filled"
                            label="Currency"
                            value={
                              values.planDetails[planDetailsIndex]
                                .recurringPaymentCurrencyCode
                            }
                          />
                        </FormControl>
                      </Box>
                    </Box>
                  )}

                  {planDetails[planDetailsIndex].hasOwnProperty(
                    'redirectUrl'
                  ) && (
                    <Box
                      className="planSetupField"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px',
                      }}
                    >
                      <HelpOutlineIcon />
                      <Typography
                        ml={5}
                        sx={{
                          fontWeight: 'bold',
                          width: '80px',
                          minWidth: '80px',
                        }}
                      >
                        Redirect url:
                      </Typography>
                      <Box sx={{ flex: 1 }} ml={2}>
                        <FormControl fullWidth>
                          <TextField
                            name={`planDetails[${planDetailsIndex}].redirectUrl`}
                            label="Redirect Url"
                            value={
                              values.planDetails[planDetailsIndex].redirectUrl
                            }
                            onChange={handleChange}
                          />
                        </FormControl>
                      </Box>
                    </Box>
                  )}
                  {/* plan  info end */}

                  {/* Add tag start  */}
                  {type === 'AVOD' && (
                    <>
                      <Typography
                        variant="h6"
                        sx={{
                          marginTop: '30px',
                          marginBottom: '20px',
                        }}
                      >
                        Add Tags
                      </Typography>

                      {planDetails[
                        planDetailsIndex
                      ].preRoll.adTags.hasOwnProperty('web') && (
                        <Box
                          className="planSetupField"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '20px',
                          }}
                        >
                          <HelpOutlineIcon />
                          <Typography
                            ml={5}
                            sx={{
                              fontWeight: 'bold',
                              width: '80px',
                              minWidth: '80px',
                            }}
                          >
                            Web:
                          </Typography>
                          <Box sx={{ flex: 1 }} ml={2}>
                            <FormControl
                              fullWidth
                              sx={{
                                display: 'flex',
                                gap: '10px',
                                flexDirection: 'row',
                              }}
                            >
                              <TextField
                                sx={{ flex: 1 }}
                                name={`planDetails[${planDetailsIndex}].preRoll.adTags.web.url`}
                                label="Enter Add Tag for Web"
                                value={
                                  values.planDetails[planDetailsIndex].preRoll
                                    .adTags.web.url
                                }
                                onChange={handleChange}
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={
                                      values.planDetails[planDetailsIndex]
                                        .preRoll.adTags.web.active
                                    }
                                    onChange={handleChange}
                                    name={`planDetails[${planDetailsIndex}].preRoll.adTags.web.active`}
                                  />
                                }
                                label="Active ?"
                              />
                            </FormControl>
                          </Box>
                        </Box>
                      )}
                      {planDetails[
                        planDetailsIndex
                      ].preRoll.adTags.hasOwnProperty('ios') && (
                        <Box
                          className="planSetupField"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '20px',
                          }}
                        >
                          <HelpOutlineIcon />
                          <Typography
                            ml={5}
                            sx={{
                              fontWeight: 'bold',
                              width: '80px',
                              minWidth: '80px',
                            }}
                          >
                            Ios:
                          </Typography>
                          <Box sx={{ flex: 1 }} ml={2}>
                            <FormControl
                              fullWidth
                              sx={{
                                display: 'flex',
                                gap: '10px',
                                flexDirection: 'row',
                              }}
                            >
                              <TextField
                                sx={{ flex: 1 }}
                                name={`planDetails[${planDetailsIndex}].preRoll.adTags.ios.url`}
                                label="Enter Add Tag for Ios"
                                value={
                                  values.planDetails[planDetailsIndex].preRoll
                                    .adTags.ios.url
                                }
                                onChange={handleChange}
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={
                                      values.planDetails[planDetailsIndex]
                                        .preRoll.adTags.ios.active
                                    }
                                    onChange={handleChange}
                                    name={`planDetails[${planDetailsIndex}].preRoll.adTags.ios.active`}
                                  />
                                }
                                label="Active ?"
                              />
                            </FormControl>
                          </Box>
                        </Box>
                      )}
                      {planDetails[
                        planDetailsIndex
                      ].preRoll.adTags.hasOwnProperty('apple_tv') && (
                        <Box
                          className="planSetupField"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '20px',
                          }}
                        >
                          <HelpOutlineIcon />
                          <Typography
                            ml={5}
                            sx={{
                              fontWeight: 'bold',
                              width: '80px',
                              minWidth: '80px',
                            }}
                          >
                            Apple tv:
                          </Typography>
                          <Box sx={{ flex: 1 }} ml={2}>
                            <FormControl
                              fullWidth
                              sx={{
                                display: 'flex',
                                gap: '10px',
                                flexDirection: 'row',
                              }}
                            >
                              <TextField
                                sx={{ flex: 1 }}
                                name={`planDetails[${planDetailsIndex}].preRoll.adTags.apple_tv.url`}
                                label="Enter Add Tag for apple tv"
                                value={
                                  values.planDetails[planDetailsIndex].preRoll
                                    .adTags.apple_tv.url
                                }
                                onChange={handleChange}
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={
                                      values.planDetails[planDetailsIndex]
                                        .preRoll.adTags.apple_tv.active
                                    }
                                    onChange={handleChange}
                                    name={`planDetails[${planDetailsIndex}].preRoll.adTags.apple_tv.active`}
                                  />
                                }
                                label="Active ?"
                              />
                            </FormControl>
                          </Box>
                        </Box>
                      )}
                      {planDetails[
                        planDetailsIndex
                      ].preRoll.adTags.hasOwnProperty('android') && (
                        <Box
                          className="planSetupField"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '20px',
                          }}
                        >
                          <HelpOutlineIcon />
                          <Typography
                            ml={5}
                            sx={{
                              fontWeight: 'bold',
                              width: '80px',
                              minWidth: '80px',
                            }}
                          >
                            Android:
                          </Typography>
                          <Box sx={{ flex: 1 }} ml={2}>
                            <FormControl
                              fullWidth
                              sx={{
                                display: 'flex',
                                gap: '10px',
                                flexDirection: 'row',
                              }}
                            >
                              <TextField
                                sx={{ flex: 1 }}
                                name={`planDetails[${planDetailsIndex}].preRoll.adTags.android.url`}
                                label="Enter Add Tag for android"
                                value={
                                  values.planDetails[planDetailsIndex].preRoll
                                    .adTags.android.url
                                }
                                onChange={handleChange}
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={
                                      values.planDetails[planDetailsIndex]
                                        .preRoll.adTags.android.active
                                    }
                                    onChange={handleChange}
                                    name={`planDetails[${planDetailsIndex}].preRoll.adTags.android.active`}
                                  />
                                }
                                label="Active ?"
                              />
                            </FormControl>
                          </Box>
                        </Box>
                      )}
                      {planDetails[
                        planDetailsIndex
                      ].preRoll.adTags.hasOwnProperty('android_tv') && (
                        <Box
                          className="planSetupField"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '20px',
                          }}
                        >
                          <HelpOutlineIcon />
                          <Typography
                            ml={5}
                            sx={{
                              fontWeight: 'bold',
                              width: '80px',
                              minWidth: '80px',
                            }}
                          >
                            Android tv:
                          </Typography>
                          <Box sx={{ flex: 1 }} ml={2}>
                            <FormControl
                              fullWidth
                              sx={{
                                display: 'flex',
                                gap: '10px',
                                flexDirection: 'row',
                              }}
                            >
                              <TextField
                                sx={{ flex: 1 }}
                                name={`planDetails[${planDetailsIndex}].preRoll.adTags.android_tv.url`}
                                label="Enter Add Tag for android tv"
                                value={
                                  values.planDetails[planDetailsIndex].preRoll
                                    .adTags.android_tv.url
                                }
                                onChange={handleChange}
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={
                                      values.planDetails[planDetailsIndex]
                                        .preRoll.adTags.android_tv.active
                                    }
                                    onChange={handleChange}
                                    name={`planDetails[${planDetailsIndex}].preRoll.adTags.android_tv.active`}
                                  />
                                }
                                label="Active ?"
                              />
                            </FormControl>
                          </Box>
                        </Box>
                      )}
                      {planDetails[
                        planDetailsIndex
                      ].preRoll.adTags.hasOwnProperty('amazon_fire') && (
                        <Box
                          className="planSetupField"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '20px',
                          }}
                        >
                          <HelpOutlineIcon />
                          <Typography
                            ml={5}
                            sx={{
                              fontWeight: 'bold',
                              width: '80px',
                              minWidth: '80px',
                            }}
                          >
                            Amazon fire:
                          </Typography>
                          <Box sx={{ flex: 1 }} ml={2}>
                            <FormControl
                              fullWidth
                              sx={{
                                display: 'flex',
                                gap: '10px',
                                flexDirection: 'row',
                              }}
                            >
                              <TextField
                                sx={{ flex: 1 }}
                                name={`planDetails[${planDetailsIndex}].preRoll.adTags.amazon_fire.url`}
                                label="Enter Add Tag for amazon fire"
                                value={
                                  values.planDetails[planDetailsIndex].preRoll
                                    .adTags.amazon_fire.url
                                }
                                onChange={handleChange}
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={
                                      values.planDetails[planDetailsIndex]
                                        .preRoll.adTags.amazon_fire.active
                                    }
                                    onChange={handleChange}
                                    name={`planDetails[${planDetailsIndex}].preRoll.adTags.amazon_fire.active`}
                                  />
                                }
                                label="Active ?"
                              />
                            </FormControl>
                          </Box>
                        </Box>
                      )}
                      {planDetails[
                        planDetailsIndex
                      ].preRoll.adTags.hasOwnProperty('fire_tv') && (
                        <Box
                          className="planSetupField"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '20px',
                          }}
                        >
                          <HelpOutlineIcon />
                          <Typography
                            ml={5}
                            sx={{
                              fontWeight: 'bold',
                              width: '80px',
                              minWidth: '80px',
                            }}
                          >
                            Fire tv:
                          </Typography>
                          <Box sx={{ flex: 1 }} ml={2}>
                            <FormControl
                              fullWidth
                              sx={{
                                display: 'flex',
                                gap: '10px',
                                flexDirection: 'row',
                              }}
                            >
                              <TextField
                                sx={{ flex: 1 }}
                                name={`planDetails[${planDetailsIndex}].preRoll.adTags.fire_tv.url`}
                                label="Enter Add Tag for fire tv"
                                value={
                                  values.planDetails[planDetailsIndex].preRoll
                                    .adTags.fire_tv.url
                                }
                                onChange={handleChange}
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={
                                      values.planDetails[planDetailsIndex]
                                        .preRoll.adTags.fire_tv.active
                                    }
                                    onChange={handleChange}
                                    name={`planDetails[${planDetailsIndex}].preRoll.adTags.fire_tv.active`}
                                  />
                                }
                                label="Active ?"
                              />
                            </FormControl>
                          </Box>
                        </Box>
                      )}
                      {planDetails[
                        planDetailsIndex
                      ].preRoll.adTags.hasOwnProperty('fire_stick') && (
                        <Box
                          className="planSetupField"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '20px',
                          }}
                        >
                          <HelpOutlineIcon />
                          <Typography
                            ml={5}
                            sx={{
                              fontWeight: 'bold',
                              width: '80px',
                              minWidth: '80px',
                            }}
                          >
                            Fire stick:
                          </Typography>
                          <Box sx={{ flex: 1 }} ml={2}>
                            <FormControl
                              fullWidth
                              sx={{
                                display: 'flex',
                                gap: '10px',
                                flexDirection: 'row',
                              }}
                            >
                              <TextField
                                sx={{ flex: 1 }}
                                name={`planDetails[${planDetailsIndex}].preRoll.adTags.fire_stick.url`}
                                label="Enter Add Tag for fire stick"
                                value={
                                  values.planDetails[planDetailsIndex].preRoll
                                    .adTags.fire_stick.url
                                }
                                onChange={handleChange}
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={
                                      values.planDetails[planDetailsIndex]
                                        .preRoll.adTags.fire_stick.active
                                    }
                                    onChange={handleChange}
                                    name={`planDetails[${planDetailsIndex}].preRoll.adTags.fire_stick.active`}
                                  />
                                }
                                label="Active ?"
                              />
                            </FormControl>
                          </Box>
                        </Box>
                      )}
                      {planDetails[
                        planDetailsIndex
                      ].preRoll.adTags.hasOwnProperty('roku') && (
                        <Box
                          className="planSetupField"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '20px',
                          }}
                        >
                          <HelpOutlineIcon />
                          <Typography
                            ml={5}
                            sx={{
                              fontWeight: 'bold',
                              width: '80px',
                              minWidth: '80px',
                            }}
                          >
                            Roku:
                          </Typography>
                          <Box sx={{ flex: 1 }} ml={2}>
                            <FormControl
                              fullWidth
                              sx={{
                                display: 'flex',
                                gap: '10px',
                                flexDirection: 'row',
                              }}
                            >
                              <TextField
                                sx={{ flex: 1 }}
                                name={`planDetails[${planDetailsIndex}].preRoll.adTags.roku.url`}
                                label="Enter Add Tag for roku"
                                value={
                                  values.planDetails[planDetailsIndex].preRoll
                                    .adTags.roku.url
                                }
                                onChange={handleChange}
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={
                                      values.planDetails[planDetailsIndex]
                                        .preRoll.adTags.roku.active
                                    }
                                    onChange={handleChange}
                                    name={`planDetails[${planDetailsIndex}].preRoll.adTags.roku.active`}
                                  />
                                }
                                label="Active ?"
                              />
                            </FormControl>
                          </Box>
                        </Box>
                      )}
                      {planDetails[
                        planDetailsIndex
                      ].preRoll.adTags.hasOwnProperty('roku_fallback') && (
                        <Box
                          className="planSetupField"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '20px',
                          }}
                        >
                          <HelpOutlineIcon />
                          <Typography
                            ml={5}
                            sx={{
                              fontWeight: 'bold',
                              width: '80px',
                              minWidth: '80px',
                            }}
                          >
                            Roku fallback:
                          </Typography>
                          <Box sx={{ flex: 1 }} ml={2}>
                            <FormControl
                              fullWidth
                              sx={{
                                display: 'flex',
                                gap: '10px',
                                flexDirection: 'row',
                              }}
                            >
                              <TextField
                                sx={{ flex: 1 }}
                                name={`planDetails[${planDetailsIndex}].preRoll.adTags.roku_fallback.url`}
                                label="Enter Add Tag for roku fallback"
                                value={
                                  values.planDetails[planDetailsIndex].preRoll
                                    .adTags.roku_fallback.url
                                }
                                onChange={handleChange}
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={
                                      values.planDetails[planDetailsIndex]
                                        .preRoll.adTags.roku_fallback.active
                                    }
                                    onChange={handleChange}
                                    name={`planDetails[${planDetailsIndex}].preRoll.adTags.roku_fallback.active`}
                                  />
                                }
                                label="Active ?"
                              />
                            </FormControl>
                          </Box>
                        </Box>
                      )}
                      {planDetails[
                        planDetailsIndex
                      ].preRoll.adTags.hasOwnProperty('windows10_desktop') && (
                        <Box
                          className="planSetupField"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '20px',
                          }}
                        >
                          <HelpOutlineIcon />
                          <Typography
                            ml={5}
                            sx={{
                              fontWeight: 'bold',
                              width: '80px',
                              minWidth: '80px',
                            }}
                          >
                            Windows10 desktop:
                          </Typography>
                          <Box sx={{ flex: 1 }} ml={2}>
                            <FormControl
                              fullWidth
                              sx={{
                                display: 'flex',
                                gap: '10px',
                                flexDirection: 'row',
                              }}
                            >
                              <TextField
                                sx={{ flex: 1 }}
                                name={`planDetails[${planDetailsIndex}].preRoll.adTags.windows10_desktop.url`}
                                label="Enter Add Tag for windows10 desktop"
                                value={
                                  values.planDetails[planDetailsIndex].preRoll
                                    .adTags.windows10_desktop.url
                                }
                                onChange={handleChange}
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={
                                      values.planDetails[planDetailsIndex]
                                        .preRoll.adTags.windows10_desktop.active
                                    }
                                    onChange={handleChange}
                                    name={`planDetails[${planDetailsIndex}].preRoll.adTags.windows10_desktop.active`}
                                  />
                                }
                                label="Active ?"
                              />
                            </FormControl>
                          </Box>
                        </Box>
                      )}
                      {planDetails[
                        planDetailsIndex
                      ].preRoll.adTags.hasOwnProperty('xbox') && (
                        <Box
                          className="planSetupField"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '20px',
                          }}
                        >
                          <HelpOutlineIcon />
                          <Typography
                            ml={5}
                            sx={{
                              fontWeight: 'bold',
                              width: '80px',
                              minWidth: '80px',
                            }}
                          >
                            Xbox:
                          </Typography>
                          <Box sx={{ flex: 1 }} ml={2}>
                            <FormControl
                              fullWidth
                              sx={{
                                display: 'flex',
                                gap: '10px',
                                flexDirection: 'row',
                              }}
                            >
                              <TextField
                                sx={{ flex: 1 }}
                                name={`planDetails[${planDetailsIndex}].preRoll.adTags.xbox.url`}
                                label="Enter Add Tag for xbox "
                                value={
                                  values.planDetails[planDetailsIndex].preRoll
                                    .adTags.xbox.url
                                }
                                onChange={handleChange}
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={
                                      values.planDetails[planDetailsIndex]
                                        .preRoll.adTags.xbox.active
                                    }
                                    onChange={handleChange}
                                    name={`planDetails[${planDetailsIndex}].preRoll.adTags.xbox.active`}
                                  />
                                }
                                label="Active ?"
                              />
                            </FormControl>
                          </Box>
                        </Box>
                      )}
                      {planDetails[
                        planDetailsIndex
                      ].preRoll.adTags.hasOwnProperty('lg_tv') && (
                        <Box
                          className="planSetupField"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '20px',
                          }}
                        >
                          <HelpOutlineIcon />
                          <Typography
                            ml={5}
                            sx={{
                              fontWeight: 'bold',
                              width: '80px',
                              minWidth: '80px',
                            }}
                          >
                            Lg tv:
                          </Typography>
                          <Box sx={{ flex: 1 }} ml={2}>
                            <FormControl
                              fullWidth
                              sx={{
                                display: 'flex',
                                gap: '10px',
                                flexDirection: 'row',
                              }}
                            >
                              <TextField
                                sx={{ flex: 1 }}
                                name={`planDetails[${planDetailsIndex}].preRoll.adTags.lg_tv.url`}
                                label="Enter Add Tag for lg tv "
                                value={
                                  values.planDetails[planDetailsIndex].preRoll
                                    .adTags.lg_tv.url
                                }
                                onChange={handleChange}
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={
                                      values.planDetails[planDetailsIndex]
                                        .preRoll.adTags.lg_tv.active
                                    }
                                    onChange={handleChange}
                                    name={`planDetails[${planDetailsIndex}].preRoll.adTags.lg_tv.active`}
                                  />
                                }
                                label="Active ?"
                              />
                            </FormControl>
                          </Box>
                        </Box>
                      )}
                      {planDetails[
                        planDetailsIndex
                      ].preRoll.adTags.hasOwnProperty('samsung_tv') && (
                        <Box
                          className="planSetupField"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '20px',
                          }}
                        >
                          <HelpOutlineIcon />
                          <Typography
                            ml={5}
                            sx={{
                              fontWeight: 'bold',
                              width: '80px',
                              minWidth: '80px',
                            }}
                          >
                            Samsung tv:
                          </Typography>
                          <Box sx={{ flex: 1 }} ml={2}>
                            <FormControl
                              fullWidth
                              sx={{
                                display: 'flex',
                                gap: '10px',
                                flexDirection: 'row',
                              }}
                            >
                              <TextField
                                sx={{ flex: 1 }}
                                name={`planDetails[${planDetailsIndex}].preRoll.adTags.samsung_tv.url`}
                                label="Enter Add Tag for samsung tv "
                                value={
                                  values.planDetails[planDetailsIndex].preRoll
                                    .adTags.samsung_tv.url
                                }
                                onChange={handleChange}
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={
                                      values.planDetails[planDetailsIndex]
                                        .preRoll.adTags.samsung_tv.active
                                    }
                                    onChange={handleChange}
                                    name={`planDetails[${planDetailsIndex}].preRoll.adTags.samsung_tv.active`}
                                  />
                                }
                                label="Active ?"
                              />
                            </FormControl>
                          </Box>
                        </Box>
                      )}
                      {planDetails[
                        planDetailsIndex
                      ].preRoll.adTags.hasOwnProperty('tivo') && (
                        <Box
                          className="planSetupField"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '20px',
                          }}
                        >
                          <HelpOutlineIcon />
                          <Typography
                            ml={5}
                            sx={{
                              fontWeight: 'bold',
                              width: '80px',
                              minWidth: '80px',
                            }}
                          >
                            Tivo:
                          </Typography>
                          <Box sx={{ flex: 1 }} ml={2}>
                            <FormControl
                              fullWidth
                              sx={{
                                display: 'flex',
                                gap: '10px',
                                flexDirection: 'row',
                              }}
                            >
                              <TextField
                                sx={{ flex: 1 }}
                                name={`planDetails[${planDetailsIndex}].preRoll.adTags.tivo.url`}
                                label="Enter Add Tag for tivo  "
                                value={
                                  values.planDetails[planDetailsIndex].preRoll
                                    .adTags.tivo.url
                                }
                                onChange={handleChange}
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={
                                      values.planDetails[planDetailsIndex]
                                        .preRoll.adTags.tivo.active
                                    }
                                    onChange={handleChange}
                                    name={`planDetails[${planDetailsIndex}].preRoll.adTags.tivo.active`}
                                  />
                                }
                                label="Active ?"
                              />
                            </FormControl>
                          </Box>
                        </Box>
                      )}
                      {planDetails[
                        planDetailsIndex
                      ].preRoll.adTags.hasOwnProperty('vizioTv') && (
                        <Box
                          className="planSetupField"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '20px',
                          }}
                        >
                          <HelpOutlineIcon />
                          <Typography
                            ml={5}
                            sx={{
                              fontWeight: 'bold',
                              width: '80px',
                              minWidth: '80px',
                            }}
                          >
                            ViziovTv:
                          </Typography>
                          <Box sx={{ flex: 1 }} ml={2}>
                            <FormControl
                              fullWidth
                              sx={{
                                display: 'flex',
                                gap: '10px',
                                flexDirection: 'row',
                              }}
                            >
                              <TextField
                                sx={{ flex: 1 }}
                                name={`planDetails[${planDetailsIndex}].preRoll.adTags.vizioTv.url`}
                                label="Enter Add Tag for Vizio Tv  "
                                value={
                                  values.planDetails[planDetailsIndex].preRoll
                                    .adTags.vizioTv.url
                                }
                                onChange={handleChange}
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={
                                      values.planDetails[planDetailsIndex]
                                        .preRoll.adTags.vizioTv.active
                                    }
                                    onChange={handleChange}
                                    name={`planDetails[${planDetailsIndex}].preRoll.adTags.vizioTv.active`}
                                  />
                                }
                                label="Active ?"
                              />
                            </FormControl>
                          </Box>
                        </Box>
                      )}
                    </>
                  )}
                  {/* Add tag end  */}

                  <Typography
                    variant="h6"
                    sx={{
                      marginTop: '30px',
                      marginBottom: '20px',
                    }}
                  >
                    Plan Info
                  </Typography>

                  {planDetails[planDetailsIndex].hasOwnProperty('title') && (
                    <Box
                      className="planSetupField"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px',
                      }}
                    >
                      <HelpOutlineIcon />
                      <Typography
                        ml={5}
                        sx={{
                          fontWeight: 'bold',
                          width: '80px',
                          minWidth: '80px',
                        }}
                      >
                        Title:
                      </Typography>
                      <Box sx={{ flex: 1 }} ml={2}>
                        <FormControl fullWidth>
                          <TextField
                            name={`planDetails[${planDetailsIndex}].title`}
                            label="Title"
                            value={values.planDetails[planDetailsIndex].title}
                            onChange={handleChange}
                          />
                        </FormControl>
                      </Box>
                    </Box>
                  )}

                  {planDetails[planDetailsIndex].hasOwnProperty(
                    'description'
                  ) && (
                    <Box
                      className="planSetupField"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px',
                      }}
                    >
                      <HelpOutlineIcon />
                      <Typography
                        ml={5}
                        sx={{
                          fontWeight: 'bold',
                          width: '80px',
                          minWidth: '80px',
                        }}
                      >
                        Description:
                      </Typography>
                      <Box sx={{ flex: 1 }} ml={2}>
                        <FormControl fullWidth>
                          <TextField
                            name={`planDetails[${planDetailsIndex}].description`}
                            label="Description"
                            value={
                              values.planDetails[planDetailsIndex].description
                            }
                            onChange={handleChange}
                            multiline
                            rows={4}
                          />
                        </FormControl>
                      </Box>
                    </Box>
                  )}
                  {planDetails[planDetailsIndex].hasOwnProperty('visible') && (
                    <Box
                      className="planSetupField"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px',
                      }}
                    >
                      <HelpOutlineIcon />
                      <Typography
                        ml={5}
                        sx={{
                          fontWeight: 'bold',
                          width: '80px',
                          minWidth: '80px',
                        }}
                      >
                        Status:
                      </Typography>
                      <Box sx={{ flex: 1 }} ml={2}>
                        <FormControl fullWidth>
                          <InputLabel id="Status">Select Status</InputLabel>
                          <Select
                            sx={{ minWidth: '114px' }}
                            labelId="Status"
                            id="status"
                            value={values.planDetails[planDetailsIndex].visible}
                            label="Select Status"
                            onChange={handleChange}
                            name={`planDetails[${planDetailsIndex}].visible`}
                          >
                            <MenuItem disabled>Status</MenuItem>
                            <MenuItem value={true}>Visble</MenuItem>
                            <MenuItem value={false}>Invisble</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Box>
                  )}

                  {planDetails[planDetailsIndex].hasOwnProperty(
                    'allowedPayMethods'
                  ) && (
                    <Box
                      className="planSetupField"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px',
                      }}
                    >
                      <HelpOutlineIcon />
                      <Typography
                        ml={5}
                        sx={{
                          fontWeight: 'bold',
                          width: '80px',
                          minWidth: '80px',
                        }}
                      >
                        Payment Methods Allowed:
                      </Typography>
                      <Box sx={{ flex: 1 }} ml={2}>
                        <FormControl fullWidth>
                          <InputLabel id="paymentAllowedMethods">
                            {/* Payment Allowed Methods */}
                          </InputLabel>
                          <Select
                            disabled={disableTextField}
                            labelId="paymentAllowedMethods"
                            id="paymentAllowedMethods"
                            multiple
                            value={
                              values.planDetails[planDetailsIndex]
                                .allowedPayMethods
                            }
                            name="allowedPayMethods"
                            onChange={(e) => {
                              handleCustomSelect(e, planDetailsIndex)
                            }}
                            input={
                              <OutlinedInput
                                id="select-multiple-chip"
                                label="Chip"
                              />
                            }
                            renderValue={(selected) => (
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexWrap: 'wrap',
                                  gap: 0.5,
                                }}
                              >
                                {selected.map((value) => (
                                  <Chip key={value} label={value} />
                                ))}
                              </Box>
                            )}
                            MenuProps={MenuProps}
                          >
                            {allowedPaymentMethodsStatic.map((name) => (
                              <MenuItem
                                key={name}
                                value={name}
                                style={getStyles(
                                  name,
                                  values.planDetails[planDetailsIndex]
                                    .allowedPayMethods,
                                  theme
                                )}
                              >
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </Box>
                  )}
                  {planDetails[planDetailsIndex].hasOwnProperty(
                    'carrierBillingProviders'
                  ) &&
                    type !== 'TVE' && (
                      <Box
                        className="planSetupField"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '20px',
                        }}
                      >
                        <HelpOutlineIcon />
                        <Typography
                          ml={5}
                          sx={{
                            fontWeight: 'bold',
                            width: '80px',
                            minWidth: '80px',
                          }}
                        >
                          Carrier Billing Payment Methods:
                        </Typography>
                        <Box sx={{ flex: 1 }} ml={2}>
                          <FormControl fullWidth>
                            <InputLabel id="carrierBillingProviders">
                              {/* Carrier Billing Payment Methods */}
                            </InputLabel>
                            <Select
                              disabled={disableTextField}
                              labelId="carrierBillingProviders"
                              id="carrierBillingProviders"
                              multiple
                              name="carrierBillingProviders"
                              value={
                                values.planDetails[planDetailsIndex]
                                  .carrierBillingProviders
                              }
                              onChange={(e) => {
                                handleCustomSelect(e, planDetailsIndex)
                              }}
                              input={
                                <OutlinedInput
                                  id="select-multiple-chip"
                                  label="Chip"
                                />
                              }
                              renderValue={(selected) => (
                                <Box
                                  sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 0.5,
                                  }}
                                >
                                  {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                  ))}
                                </Box>
                              )}
                              MenuProps={MenuProps}
                            >
                              {carrierBillingProvidersMap.map((name) => (
                                <MenuItem
                                  key={name}
                                  value={name}
                                  style={getStyles(
                                    name,
                                    values.planDetails[planDetailsIndex]
                                      .carrierBillingProviders,
                                    theme
                                  )}
                                >
                                  {name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      </Box>
                    )}

                  {planDetails[planDetailsIndex].hasOwnProperty(
                    'timweTnCHeading'
                  ) && (
                    <Box
                      className="planSetupField"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px',
                      }}
                    >
                      <HelpOutlineIcon />
                      <Typography
                        ml={5}
                        sx={{
                          fontWeight: 'bold',
                          width: '80px',
                          minWidth: '80px',
                        }}
                      >
                        Timwe TnC Heading : :
                      </Typography>
                      <Box sx={{ flex: 1 }} ml={2}>
                        <FormControl fullWidth>
                          <TextField
                            name={`planDetails[${planDetailsIndex}].timweTnCHeading`}
                            label="  Timwe TnC Heading"
                            value={
                              values.planDetails[planDetailsIndex]
                                .timweTnCHeading
                            }
                            onChange={handleChange}
                          />
                        </FormControl>
                      </Box>
                    </Box>
                  )}

                  {planDetails[planDetailsIndex].hasOwnProperty(
                    'timweTnCLink'
                  ) && (
                    <Box
                      className="planSetupField"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px',
                      }}
                    >
                      <HelpOutlineIcon />
                      <Typography
                        ml={5}
                        sx={{
                          fontWeight: 'bold',
                          width: '80px',
                          minWidth: '80px',
                        }}
                      >
                        Timwe TnC Link: :
                      </Typography>
                      <Box sx={{ flex: 1 }} ml={2}>
                        <FormControl fullWidth>
                          <TextField
                            name={`planDetails[${planDetailsIndex}].timweTnCLink`}
                            label="  Timwe TnC Link"
                            value={
                              values.planDetails[planDetailsIndex].timweTnCLink
                            }
                            onChange={handleChange}
                          />
                        </FormControl>
                      </Box>
                    </Box>
                  )}

                  {planDetails[planDetailsIndex].hasOwnProperty(
                    'tnCPoints'
                  ) && (
                    <Box
                      className="planSetupField"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px',
                      }}
                    >
                      <HelpOutlineIcon />
                      <Typography
                        ml={5}
                        sx={{
                          fontWeight: 'bold',
                          width: '80px',
                          minWidth: '80px',
                        }}
                      >
                        Add Tnc Points :
                      </Typography>
                      <Box sx={{ flex: 1 }} ml={2}>
                        <FormControl fullWidth>
                          <FieldArray
                            name={`planDetails[${planDetailsIndex}.tnCPoints]`}
                          >
                            {(props) => {
                              const { form, push, remove } = props
                              const { values } = form
                              const { planDetails } = values
                              const tncPoints =
                                planDetails[planDetailsIndex].tnCPoints

                              return (
                                <Box>
                                  {tncPoints.map((item, index) => {
                                    return (
                                      <Box
                                        key={`box-${index}`}
                                        sx={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: '10px',
                                        }}
                                      >
                                        <TextField
                                          fullWidth
                                          sx={{
                                            marginBottom: '10px',
                                          }}
                                          name={`planDetails[${planDetailsIndex}].tnCPoints[${index}].point`}
                                          label=" Point"
                                          value={
                                            values.planDetails[planDetailsIndex]
                                              .tnCPoints[index].point
                                          }
                                          onChange={handleChange}
                                        />
                                        {index === tncPoints.length - 1 ? (
                                          <Box
                                            sx={{
                                              cursor: 'pointer',
                                            }}
                                            onClick={() => {
                                              push(tncPointsObject)
                                            }}
                                          >
                                            <AddIcon />
                                          </Box>
                                        ) : (
                                          <Box
                                            sx={{
                                              cursor: 'pointer',
                                            }}
                                            onClick={() => {
                                              remove(index)
                                            }}
                                          >
                                            <MinimizeIcon />
                                          </Box>
                                        )}
                                      </Box>
                                    )
                                  })}
                                </Box>
                              )
                            }}
                          </FieldArray>
                        </FormControl>
                      </Box>
                    </Box>
                  )}

                  {planDetails[planDetailsIndex].hasOwnProperty(
                    'hidePlanPrice'
                  ) && (
                    <Box
                      className="planSetupField"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px',
                      }}
                    >
                      <HelpOutlineIcon />
                      <Typography
                        ml={5}
                        sx={{
                          fontWeight: 'bold',
                          width: '80px',
                          minWidth: '80px',
                        }}
                      >
                        Hide Plan Price :
                      </Typography>
                      <Box sx={{ flex: 1 }} ml={2}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                values.planDetails[planDetailsIndex]
                                  .hidePlanPrice
                              }
                              onChange={handleChange}
                              name={`planDetails[${planDetailsIndex}].hidePlanPrice`}
                            />
                          }
                          label=""
                        />
                      </Box>
                    </Box>
                  )}

                  {planDetails[planDetailsIndex].hasOwnProperty(
                    'allowedPayCountries'
                  ) && (
                    <Box
                      className="planSetupField"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px',
                      }}
                    >
                      <HelpOutlineIcon />
                      <Typography
                        ml={5}
                        sx={{
                          fontWeight: 'bold',
                          width: '80px',
                          minWidth: '80px',
                        }}
                      >
                        Payment Countries Allowed:
                      </Typography>
                      <Box sx={{ flex: 1 }} ml={2}>
                        <FormControl fullWidth>
                          <InputLabel id="allowedPayCountries">
                            {/* Carrier Billing Payment Methods */}
                          </InputLabel>
                          <Select
                            labelId="allowedPayCountries"
                            disabled={disableTextField}
                            id="allowedPayCountries"
                            multiple
                            name="allowedPayCountries"
                            value={
                              values.planDetails[planDetailsIndex]
                                .allowedPayCountries
                            }
                            onChange={(e) => {
                              handleCustomSelect(e, planDetailsIndex)
                            }}
                            input={
                              <OutlinedInput
                                id="select-multiple-chip"
                                label="Chip"
                              />
                            }
                            renderValue={(selected) => (
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexWrap: 'wrap',
                                  gap: 0.5,
                                }}
                              >
                                {selected.map((value) => (
                                  <Chip
                                    key={value}
                                    label={countriesJsonInKeyValuePair[value]}
                                  />
                                ))}
                              </Box>
                            )}
                            MenuProps={MenuProps}
                          >
                            {Countriesjson.map((item) => {
                              const value = Object.values(item)[0]
                              const key = Object.keys(item)[0]
                              return (
                                <MenuItem
                                  key={key}
                                  value={key}
                                  style={getStyles(
                                    value,
                                    values.planDetails[planDetailsIndex]
                                      .allowedPayCountries,
                                    theme
                                  )}
                                >
                                  {value}
                                </MenuItem>
                              )
                            })}
                          </Select>
                        </FormControl>
                      </Box>
                    </Box>
                  )}

                  {planDetails[planDetailsIndex].hasOwnProperty(
                    'allowedStreamCountries'
                  ) && (
                    <Box
                      className="planSetupField"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px',
                      }}
                    >
                      <HelpOutlineIcon />
                      <Typography
                        ml={5}
                        sx={{
                          fontWeight: 'bold',
                          width: '80px',
                          minWidth: '80px',
                        }}
                      >
                        Allowed Stream Countries:
                      </Typography>
                      <Box sx={{ flex: 1 }} ml={2}>
                        <FormControl fullWidth>
                          {/* <InputLabel sx={{position:'relative',zIndex:99}} id="allowedStreamCountries">
                        allowedStreamCountries
                        </InputLabel> */}
                          <Select
                            labelId="allowedStreamCountries"
                            id="allowedStreamCountries"
                            multiple
                            name="allowedStreamCountries"
                            value={
                              values.planDetails[planDetailsIndex]
                                .allowedStreamCountries
                            }
                            onChange={(e) => {
                              handleCustomSelect(e, planDetailsIndex)
                            }}
                            input={
                              <OutlinedInput
                                id="select-multiple-chip"
                                label="Chip"
                              />
                            }
                            renderValue={(selected) => (
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexWrap: 'wrap',
                                  gap: 0.5,
                                }}
                              >
                                {selected.map((value) => (
                                  <Chip
                                    key={value}
                                    label={countriesJsonInKeyValuePair[value]}
                                  />
                                ))}
                              </Box>
                            )}
                            MenuProps={MenuProps}
                          >
                            {Countriesjson.map((item) => {
                              const value = Object.values(item)[0]
                              const key = Object.keys(item)[0]
                              return (
                                <MenuItem
                                  key={key}
                                  value={key}
                                  style={getStyles(
                                    value,
                                    values.planDetails[planDetailsIndex]
                                      .allowedStreamCountries,
                                    theme
                                  )}
                                >
                                  {value}
                                </MenuItem>
                              )
                            })}
                          </Select>
                        </FormControl>
                      </Box>
                    </Box>
                  )}
                  {planDetails[planDetailsIndex].hasOwnProperty(
                    'featureDetails'
                  ) && (
                    <Box
                      className="planSetupField"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px',
                      }}
                    >
                      <HelpOutlineIcon />
                      <Typography
                        ml={5}
                        sx={{
                          fontWeight: 'bold',
                          width: '80px',
                          minWidth: '80px',
                        }}
                      >
                        Add Feature :
                      </Typography>
                      <Box sx={{ flex: 1 }} ml={2}>
                        <FormControl fullWidth>
                          <FieldArray
                            name={`planDetails[${planDetailsIndex}.featureDetails]`}
                          >
                            {(props) => {
                              const { form, push, remove } = props
                              const { values } = form
                              const { planDetails } = values
                              const featureDetails =
                                planDetails[planDetailsIndex].featureDetails

                              return (
                                <Box>
                                  {featureDetails.map((item, index) => {
                                    return (
                                      <Box
                                        key={`key-${index}`}
                                        sx={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: '10px',
                                        }}
                                      >
                                        <TextField
                                          fullWidth
                                          sx={{
                                            marginBottom: '10px',
                                          }}
                                          name={`planDetails[${planDetailsIndex}].featureDetails[${index}].textToDisplay`}
                                          label=" Enter Text"
                                          value={item.textToDisplay}
                                          onChange={handleChange}
                                        />
                                        <TextField
                                          fullWidth
                                          sx={{
                                            marginBottom: '10px',
                                          }}
                                          name={`planDetails[${planDetailsIndex}].featureDetails[${index}].value`}
                                          label=" Enter Number Or Y"
                                          value={item.value}
                                          onChange={handleChange}
                                        />
                                        {index === featureDetails.length - 1 ? (
                                          <Box
                                            sx={{
                                              cursor: 'pointer',
                                            }}
                                            onClick={() => {
                                              push(featureDetailsObject)
                                            }}
                                          >
                                            <AddIcon />
                                          </Box>
                                        ) : (
                                          <Box
                                            sx={{
                                              cursor: 'pointer',
                                            }}
                                            onClick={() => {
                                              remove(index)
                                            }}
                                          >
                                            <MinimizeIcon />
                                          </Box>
                                        )}
                                      </Box>
                                    )
                                  })}
                                </Box>
                              )
                            }}
                          </FieldArray>
                        </FormControl>
                      </Box>
                    </Box>
                  )}
                  {planDetails[planDetailsIndex].hasOwnProperty(
                    'isDefault'
                  ) && (
                    <Box
                      className="planSetupField"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px',
                      }}
                    >
                      <HelpOutlineIcon />
                      <Typography
                        ml={5}
                        sx={{
                          fontWeight: 'bold',
                          width: '80px',
                          minWidth: '80px',
                        }}
                      >
                        Default Plan:
                      </Typography>
                      <Box sx={{ flex: 1 }} ml={2}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                values.planDetails[planDetailsIndex].isDefault
                              }
                              onChange={handleChange}
                              name={`planDetails[${planDetailsIndex}].isDefault`}
                            />
                          }
                          label=""
                        />
                      </Box>
                    </Box>
                  )}

                  {planDetails[planDetailsIndex].hasOwnProperty(
                    'featurePlanIdentifier'
                  ) && (
                    <Box
                      className="planSetupField"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px',
                      }}
                    >
                      <HelpOutlineIcon />
                      <Typography
                        ml={5}
                        sx={{
                          fontWeight: 'bold',
                          width: '80px',
                          minWidth: '80px',
                        }}
                      >
                        Feature Plan:
                      </Typography>
                      <Box sx={{ flex: 1 }} ml={2}>
                        <FormControl>
                          <TextField
                            name={`planDetails[${planDetailsIndex}].featurePlanIdentifier`}
                            label="Feature Plan"
                            value={
                              values.planDetails[planDetailsIndex]
                                .featurePlanIdentifier
                            }
                            onChange={handleChange}
                            sx={{ marginRight: '20px' }}
                          />
                        </FormControl>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                values.planDetails[planDetailsIndex]
                                  .displayFeaturePlanIdentifier
                              }
                              onChange={handleChange}
                              name={`planDetails[${planDetailsIndex}].displayFeaturePlanIdentifier`}
                            />
                          }
                          label="Display As Featured Plan"
                        />
                      </Box>
                    </Box>
                  )}
                  {planDetails[planDetailsIndex].hasOwnProperty('paypalId') && (
                    <Box
                      className="planSetupField"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px',
                      }}
                    >
                      <HelpOutlineIcon />
                      <Typography
                        ml={5}
                        sx={{
                          fontWeight: 'bold',
                          width: '80px',
                          minWidth: '80px',
                        }}
                      >
                        Paypal Id :
                      </Typography>
                      <Box sx={{ flex: 1 }} ml={2}>
                        <FormControl fullWidth>
                          <TextField
                            name={`planDetails[${planDetailsIndex}].paypalId`}
                            label="Paypal Id"
                            value={
                              values.planDetails[planDetailsIndex].paypalId
                            }
                            onChange={handleChange}
                          />
                        </FormControl>
                      </Box>
                    </Box>
                  )}

                  {planDetails[planDetailsIndex].hasOwnProperty(
                    'strikeThroughPrice'
                  ) && (
                    <Box
                      className="planSetupField"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px',
                      }}
                    >
                      <HelpOutlineIcon />
                      <Typography
                        ml={5}
                        sx={{
                          fontWeight: 'bold',
                          width: '80px',
                          minWidth: '80px',
                        }}
                      >
                        Strikethrough Price :
                      </Typography>
                      <Box sx={{ flex: 1 }} ml={3}>
                        <FormControl>
                          <TextField
                            name={`planDetails[${planDetailsIndex}].strikeThroughPrice`}
                            label="strikeThroughPrice"
                            type="number"
                            value={
                              values.planDetails[planDetailsIndex]
                                .strikeThroughPrice
                            }
                            onChange={handleChange}
                            sx={{ marginRight: '20px' }}
                          />
                        </FormControl>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                values.planDetails[planDetailsIndex]
                                  .displayStrikeThroughPrice
                              }
                              onChange={handleChange}
                              name={`planDetails[${planDetailsIndex}].displayStrikeThroughPrice`}
                            />
                          }
                          label="Display As Strike Through Price"
                        />
                      </Box>
                    </Box>
                  )}

                  {planDetails[planDetailsIndex].hasOwnProperty(
                    'introductoryPrice'
                  ) && (
                    <Box
                      className="planSetupField"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px',
                      }}
                    >
                      <HelpOutlineIcon />
                      <Typography
                        ml={5}
                        sx={{
                          fontWeight: 'bold',
                          width: '80px',
                          minWidth: '80px',
                        }}
                      >
                        Introductory Price:
                      </Typography>
                      <Box sx={{ flex: 1 }} ml={2}>
                        <FormControl fullWidth>
                          <TextField
                            name={`planDetails[${planDetailsIndex}].introductoryPrice`}
                            label="Introductory Price"
                            type="number"
                            value={
                              values.planDetails[planDetailsIndex]
                                .introductoryPrice
                            }
                            onChange={handleChange}
                          />
                        </FormControl>
                      </Box>
                    </Box>
                  )}

                  {planDetails[planDetailsIndex].hasOwnProperty(
                    'noOfDaysExtended'
                  ) && (
                    <Box
                      className="planSetupField"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px',
                      }}
                    >
                      <HelpOutlineIcon />
                      <Typography
                        ml={5}
                        sx={{
                          fontWeight: 'bold',
                          width: '80px',
                          minWidth: '80px',
                        }}
                      >
                        No of Days to Extended:
                      </Typography>
                      <Box sx={{ flex: 1 }} ml={2}>
                        <FormControl fullWidth>
                          <TextField
                            name={`planDetails[${planDetailsIndex}].noOfDaysExtended`}
                            label=" No of Days  to Extended"
                            type="number"
                            value={
                              values.planDetails[planDetailsIndex]
                                .noOfDaysExtended
                            }
                            onChange={handleChange}
                          />
                        </FormControl>
                      </Box>
                    </Box>
                  )}

                  {planDetails[planDetailsIndex].hasOwnProperty(
                    'callToAction'
                  ) && (
                    <Box
                      className="planSetupField"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px',
                      }}
                    >
                      <HelpOutlineIcon />
                      <Typography
                        ml={5}
                        sx={{
                          fontWeight: 'bold',
                          width: '80px',
                          minWidth: '80px',
                        }}
                      >
                        Call To Action:
                      </Typography>
                      <Box sx={{ flex: 1 }} ml={2}>
                        <FormControl fullWidth>
                          <TextField
                            name={`planDetails[${planDetailsIndex}].callToAction`}
                            label=" Call To Action"
                            value={
                              values.planDetails[planDetailsIndex].callToAction
                            }
                            onChange={handleChange}
                          />
                        </FormControl>
                      </Box>
                    </Box>
                  )}

                  {planDetails[planDetailsIndex].hasOwnProperty(
                    'supportedDevices'
                  ) && (
                    <Box
                      className="planSetupField"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px',
                      }}
                    >
                      <HelpOutlineIcon />
                      <Typography
                        ml={5}
                        sx={{
                          fontWeight: 'bold',
                          width: '80px',
                          minWidth: '80px',
                        }}
                      >
                        Supported Devices:
                      </Typography>
                      <Box sx={{ flex: 1 }} ml={2}>
                        <FormControl fullWidth>
                          <InputLabel id="supportedDevices">
                            {/* Payment Allowed Methods */}
                          </InputLabel>
                          <Select
                            disabled={disableTextField}
                            labelId="supportedDevices"
                            id="supportedDevices"
                            multiple
                            value={
                              values.planDetails[planDetailsIndex]
                                .supportedDevices
                            }
                            name="supportedDevices"
                            onChange={(e) => {
                              handleCustomSelect(e, planDetailsIndex)
                            }}
                            input={
                              <OutlinedInput
                                id="supportedDevices"
                                label="supportedDevices"
                              />
                            }
                            renderValue={(selected) => (
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexWrap: 'wrap',
                                  gap: 0.5,
                                }}
                              >
                                {selected.map((value) => (
                                  <Chip key={value} label={value} />
                                ))}
                              </Box>
                            )}
                            MenuProps={MenuProps}
                          >
                            {devicesList.map((name) => (
                              <MenuItem
                                key={name}
                                value={name}
                                style={getStyles(
                                  name,
                                  values.planDetails[planDetailsIndex]
                                    .supportedDevices,
                                  theme
                                )}
                              >
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </Box>
                  )}
                </Box>
              )
            })}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  background: '-webkit-linear-gradient(top, #f9f9f9, #b5b5b5)',
                  padding: '10px 15px',
                  border: '1px solid  #ccc',
                  borderRadius: '7px',
                  alignItems: 'center',
                  gap: '5px',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  const intialPlanDetailsObject =
                    choosePlanDetailObjectIntial(type)
                  push(intialPlanDetailsObject)
                }}
              >
                <AddIcon />
                <Typography variant="h6">Add Additional Country</Typography>
              </Box>
            </Box>
          </Box>
        )
      }}
    </FieldArray>
  )
}

export default PlanInfo
