import React, { useState } from 'react'
import Box from '@mui/material/Box'
import { Button, TextField, Typography } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Popup from '../common/Popup'
import ManageAcceptableOffer from '../ManageAcceptableOffer/ManageAcceptableOffer'
import FormHelperText from '@mui/material/FormHelperText'

const PlanDetailsField = ({
  values,
  handleChange,
  type,
  setAddedOffers,
  errors,
  touched,
  handleBlur,
  addOrEditPlan,
}) => {
  const [showManageAcceptableOffer, setShowManageAcceptableOffer] =
    useState(false)

  const handlePopUpChange = () => {
    setShowManageAcceptableOffer(false)
  }

  const getCurrentTimestamp = () => {
    return Date.now()
  }

  const disableTextField = addOrEditPlan === 'edit' ? true : false

  return (
    <Box
      className="planDetails"
      sx={{
        borderRadius: '10px',
        border: '1px solid #cfcfcf',
        padding: '20px 40px',
      }}
    >
      <Typography variant="h6">Plan Details</Typography>
      {values.hasOwnProperty('name') && (
        <Box
          className="planDetailsField"
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
              <Box>Title :</Box>
            </Box>
            <Box>
              <TextField
                label="Title"
                name="name"
                onBlur={handleBlur}
                value={values.name}
                onChange={handleChange}
                error={errors.name && touched.name}
                helperText={touched?.name && errors.name}
              />
            </Box>
          </Box>
        </Box>
      )}
      {values.hasOwnProperty('purchaseIdentifier') && (
        <Box
          className="planDetailsField"
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
              <Box>Purchase Identifier :</Box>
            </Box>
            <Box>
              <TextField
                disabled
                label="Purchase Identifier"
                name="purchaseIdentifier"
                value={
                  values?.identifier
                    ? values.identifier +
                      '_' +
                      getCurrentTimestamp() +
                      '_' +
                      'p'
                    : ''
                }
                onChange={handleChange}
              />
            </Box>
          </Box>
        </Box>
      )}
      {values.hasOwnProperty('rentIdentifier') && (
        <Box
          className="planDetailsField"
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
              <Box>Rent Identfier :</Box>
            </Box>
            <Box>
              <TextField
                disabled
                label="Rent Identfier "
                name="rentIdentifier"
                value={
                  values.identifier
                    ? values.identifier +
                      '_' +
                      getCurrentTimestamp() +
                      '_' +
                      'r'
                    : ''
                }
                onChange={handleChange}
              />
            </Box>
          </Box>
        </Box>
      )}
      {values.hasOwnProperty('identifier') && (
        <Box
          className="planDetailsField"
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
              <Box>Identifier :</Box>
            </Box>
            <Box>
              <TextField
                label="Identifier"
                name="identifier"
                disabled={disableTextField}
                value={values.identifier}
                onChange={handleChange}
                error={errors?.identifier && touched?.identifier ? true : false}
                onBlur={handleBlur}
                helperText={touched.identifier && errors.identifier}
              />
            </Box>
          </Box>
        </Box>
      )}
      {values.hasOwnProperty('providerId') && (
        <Box
          className="planDetailsField"
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
              <Box>TV Provider Id :</Box>
            </Box>
            <Box>
              <TextField
                label="tv providerId"
                name="providerId"
                disabled={disableTextField}
                value={values.providerId}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched && touched?.providerId && errors && errors?.providerId
                }
                helperText={
                  touched && touched?.providerId && errors && errors?.providerId
                }
              />
            </Box>
          </Box>
        </Box>
      )}
      {values.hasOwnProperty('description') && (
        <Box
          className="planDetailsField"
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
              <Box>Description :</Box>
            </Box>
            <Box>
              <TextField
                label="Description"
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.description && touched.description}
                helperText={touched.description && errors.description}
              />
            </Box>
          </Box>
        </Box>
      )}
      {values.hasOwnProperty('planDisplayOrder') && (
        <Box
          className="planDetailsField"
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
              <Box>Display Order :</Box>
            </Box>
            <Box>
              <TextField
                label="Display order"
                type="number"
                name="planDisplayOrder"
                value={values.planDisplayOrder}
                onChange={handleChange}
              />
            </Box>
          </Box>
        </Box>
      )}
      {values.hasOwnProperty('renewalCyclePeriodMultiplier') && (
        <Box
          className="planDetailsField"
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
              <Box>Multiplier :</Box>
            </Box>
            <Box>
              <TextField
                disabled={disableTextField}
                label="Multiplier"
                type="number"
                name="renewalCyclePeriodMultiplier"
                value={values.renewalCyclePeriodMultiplier}
                onChange={handleChange}
              />
            </Box>
          </Box>
        </Box>
      )}
      {values.hasOwnProperty('renewalCycleType') && (
        <Box
          className="planDetailsField"
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
              <Box>Billing Frequency :</Box>
            </Box>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-error-label">
                Select One
              </InputLabel>
              <Select
                sx={{ minWidth: '114px' }}
                labelId="billingFrequencyId"
                id="billingFrequencyId"
                value={values.renewalCycleType}
                label="Select One"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched?.renewalCycleType && errors?.renewalCycleType}
                name="renewalCycleType"
              >
                <MenuItem disabled>Type</MenuItem>
                <MenuItem value="YEAR">Yearly</MenuItem>
                <MenuItem value="MONTH">Monthly</MenuItem>
                <MenuItem value="WEEK">Weekly</MenuItem>
                <MenuItem value="DAILY">Daily</MenuItem>
              </Select>
              {touched?.renewalCycleType && errors?.renewalCycleType && (
                <FormHelperText sx={{ color: '#ff1744' }}>
                  {errors?.renewalCycleType}
                </FormHelperText>
              )}
            </FormControl>
          </Box>
        </Box>
      )}
      {values.hasOwnProperty('renewable') && (
        <Box
          className="planDetailsField"
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
              <Box>Recurring :</Box>
            </Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.renewable}
                  onChange={handleChange}
                  name="renewable"
                  disabled={disableTextField}
                />
              }
              label=""
            />
          </Box>
        </Box>
      )}
      {(type === 'SVOD' || type === 'TVOD') && (
        <Box
          className="planDetailsField"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <HelpOutlineIcon />
          <Box className="label&inputfield" sx={{ display: 'flex' }}>
            {setAddedOffers && (
              <Box>
                <Button
                  sx={{ width: '100%', marginBottom: '10px' }}
                  variant="contained"
                  onClick={() => {
                    setShowManageAcceptableOffer(true)
                  }}
                >
                  Manage Acceptable Offer
                </Button>

                {values?.addedOffers?.length > 0 && (
                  <Box>[ {values.addedOffers.length} ] acceptable offers</Box>
                )}
              </Box>
            )}
            {showManageAcceptableOffer && (
              <Popup
                heading="Manage Acceptable Offers"
                setPopup={handlePopUpChange}
                popUpOpen={showManageAcceptableOffer}
              >
                <ManageAcceptableOffer
                  setAddedOffers={setAddedOffers}
                  addedOffers={values?.addedOffers}
                  handlePopUpChange={handlePopUpChange}
                />
              </Popup>
            )}
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default PlanDetailsField
