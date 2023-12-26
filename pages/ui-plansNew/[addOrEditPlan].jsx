import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { Button, TextField, Typography } from '@mui/material'
import { Formik, Form } from 'formik'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import moment from 'moment'
import PlanDetailsField from 'src/components/AddNewPlan/PlanDetailsField'
import FeatureDetails from 'src/components/AddNewPlan/FeatureDetails'
import MetaData from 'src/components/AddNewPlan/MetaData'
import PlanInfo from 'src/components/AddNewPlan/PlanInfo'
import CurrencymapJson from 'src/json/currencyMap.json'
import {
  createPlanIntialObjectHelper,
  preFillData,
} from 'src/helpers/createPlanIntialObjectHelper'
import chooseValidationScheme from 'src/helpers/chooseValidationSchemeForNewPlan'
import useSpecificPlanData from 'src/hooks/useSpecificPlanData'
import useCreatePlanOrEditPlan from 'src/hooks/useCreatePlanOrEditPlan'
import VLLoaderWrapper from 'src/components/common/VLLoaderWrapper'
import Popup from 'src/components/common/Popup'

const PlanAddOrEdit = () => {
  const router = useRouter()
  const { addOrEditPlan = '', type = '', id = false } = router.query

  const { data, loading, getSpecificPlanData } = useSpecificPlanData()

  const {
    loading: planSubmitLoading,
    handlePlanSubmit,
    planSubmitted,
    setPlanSubmitted,
  } = useCreatePlanOrEditPlan()

  const [scheduledFromDate, setScheduledFromDate] = useState()
  const [scheduledToDate, setscheduledToDate] = useState(null)
  const [dateNever, setDateNever] = useState(true)

  const handleChangeDateFrom = (newValue) => {
    setScheduledFromDate(moment(newValue).format('lll'))
  }
  const handleChangeDateTo = (newValue) => {
    setscheduledToDate(moment(newValue).format('lll'))
  }
  const intialValue = useMemo(() => {
    if (data) {
      return preFillData(data)
    } else {
      return createPlanIntialObjectHelper(type)
    }
  }, [data, type])

  useEffect(() => {
    if (id) {
      getSpecificPlanData({ id })
    }
  }, [id])

  useEffect(() => {
    if (data?.scheduledFromDate) {
      setScheduledFromDate(data?.scheduledFromDate)
    }
  }, [data])

  return (
    <Box>
      <VLLoaderWrapper loading={loading || planSubmitLoading} />

      <Box sx={{ padding: '40px' }}>
        {intialValue && (
          <Formik
            enableReinitialize={true}
            initialValues={intialValue}
            validationSchema={chooseValidationScheme(type)}
            onSubmit={(values) => {
              handlePlanSubmit({
                values,
                addOrEditPlan,
                type,
                scheduledFromDate,
                scheduledToDate,
              })
            }}
          >
            {(props) => {
              const {
                values,
                handleChange,
                setFieldValue,
                touched,
                handleSubmit,
                handleBlur,
                errors,
                setTouched,
              } = props

              const setAddedOffers = (arrayOfAddedOffers) => {
                setFieldValue('addedOffers', arrayOfAddedOffers)
              }

              const handleChangeForCountryToAlsoSetCountryCode = (
                e,
                currentPlanIndex
              ) => {
                const { value, name } = e.target
                const filterArray = values.planDetails.map(
                  (planItem, index) => {
                    if (index === currentPlanIndex) {
                      if (name.includes('countryCode')) {
                        return {
                          ...planItem,
                          countryCode: value,
                          recurringPaymentCurrencyCode: CurrencymapJson[value],
                        }
                      } else {
                        return { ...planItem, [name]: value }
                      }
                    } else {
                      return planItem
                    }
                  }
                )

                setFieldValue('planDetails', filterArray)
              }

              const handleBlurForCountryToAlsoSetCountryCode = (e, index) => {
                const planetailsTocuhedFresh = touched?.planDetails
                  ? [...touched.planDetails]
                  : []
                for (let i = 0; i <= index; i++) {
                  if (i == index) {
                    planetailsTocuhedFresh[index] = {
                      ...planetailsTocuhedFresh[index],
                      countryCode: true,
                    }
                  }
                  // removed else because it was manupulating untouched planDetails array items which was not necessarry
                  // else {
                  //   planetailsTocuhedFresh[i] = {...planetailsTocuhedFresh[index]}
                  // }
                }
                setTouched({ ...touched, planDetails: planetailsTocuhedFresh })
              }

              const handleCustomSelect = (e, i) => {
                const { value, name } = e.target
                const filter = values.planDetails.map((item, index) => {
                  if (index === i) {
                    return {
                      ...item,
                      [name]: [...value],
                    }
                  } else {
                    return item
                  }
                })
                setFieldValue('planDetails', filter)
              }

              return (
                <Form onSubmit={handleSubmit}>
                  {planSubmitted && (
                    <Popup
                      heading={
                        addOrEditPlan === 'add' ? 'Add  Plan' : 'Edit Plan'
                      }
                      popUpOpen={planSubmitted}
                      setPopup={setPlanSubmitted}
                    >
                      <Typography variant="h5" component="h1" gutterBottom>
                        {values && values?.name} has been successfully updated.
                      </Typography>
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{ marginTop: '10px' }}
                        onClick={() => {
                          router.back()
                        }}
                      >
                        Okay
                      </Button>
                    </Popup>
                  )}

                  <Box
                    className="addOrEditPlanHeader"
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Box className="addOrEditPlanHeaderText" sx={{ flex: 1 }}>
                      <Typography variant="h6">
                        {addOrEditPlan === 'add' ? 'Add New Plan' : 'Edit Plan'}
                        <Box
                          sx={{
                            display: 'inline',
                            background: '#ccc',
                            padding: '7px 10px',
                            borderRadius: '4px',
                            marginLeft: '5px',
                          }}
                        >
                          {type}
                        </Box>
                      </Typography>
                    </Box>
                    <Box className="addOrEditPlanHeaderActions">
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{ marginRight: '10px' }}
                      >
                        Okay
                      </Button>
                      <Button color="grey" variant="contained">
                        Cancel
                      </Button>
                    </Box>
                    <Box></Box>
                  </Box>
                  <Box>
                    <Grid
                      container
                      rowSpacing={1}
                      columnSpacing={{ xs: 1, sm: 2, md: 2 }}
                      sx={{ marginTop: '40px' }}
                    >
                      <Grid item xs={12} sm={12} md={5}>
                        <PlanDetailsField
                          values={values}
                          handleChange={handleChange}
                          type={type}
                          touched={touched}
                          errors={errors}
                          handleBlur={handleBlur}
                          setAddedOffers={setAddedOffers}
                          addOrEditPlan={addOrEditPlan}
                        />

                        {(type === 'SVOD' ||
                          type === 'TVOD' ||
                          type === 'FREE' ||
                          type === 'AVOD') && (
                          <FeatureDetails
                            values={values}
                            handleChange={handleChange}
                            setFieldValue={setFieldValue}
                            touched={touched}
                            errors={errors}
                            handleBlur={handleBlur}
                            addOrEditPlan={addOrEditPlan}
                            type={type}
                          />
                        )}

                        {values?.metadata && (
                          <MetaData
                            handleChange={handleChange}
                            values={values}
                            touched={touched}
                            errors={errors}
                          />
                        )}
                      </Grid>
                      <Grid item xs={12} sm={12} md={7}>
                        {values.hasOwnProperty('planDetails') && (
                          <PlanInfo
                            data={data}
                            values={values}
                            handleChange={handleChange}
                            handleChangeForCountryToAlsoSetCountryCode={
                              handleChangeForCountryToAlsoSetCountryCode
                            }
                            handleCustomSelect={handleCustomSelect}
                            type={type}
                            handleBlurForCountryToAlsoSetCountryCode={
                              handleBlurForCountryToAlsoSetCountryCode
                            }
                            touched={touched}
                            errors={errors}
                            handleBlur={handleBlur}
                            addOrEditPlan={addOrEditPlan}
                          />
                        )}

                        {type !== 'FREE' && (
                          <Box
                            sx={{
                              border: '1px solid #cfcfcf',
                              padding: '20px 40px',
                              marginBottom: '20px',
                              marginTop: '20px',
                              borderRadius: '4px',
                            }}
                          >
                            <Typography variant="h6">
                              Schedule Set Up
                            </Typography>
                            <Box sx={{ display: 'flex', gap: '20px' }}>
                              <Typography>Make Available from</Typography>
                              <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DateTimePicker
                                  value={scheduledFromDate}
                                  minDate={moment('01/01/2015').toDate()}
                                  maxDate={moment('12/31/2070').toDate()}
                                  onChange={handleChangeDateFrom}
                                  renderInput={(params) => (
                                    <TextField {...params} />
                                  )}
                                />
                                <DateTimePicker
                                  disabled={dateNever ? true : false}
                                  value={scheduledToDate}
                                  minDate={moment('01/01/2015').toDate()}
                                  maxDate={moment('12/31/2070').toDate()}
                                  onChange={handleChangeDateTo}
                                  renderInput={(params) => (
                                    <TextField {...params} />
                                  )}
                                />
                              </LocalizationProvider>
                            </Box>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={dateNever}
                                  onChange={() => {
                                    setDateNever((prev) => !prev)
                                  }}
                                  name="dateNever"
                                />
                              }
                              label="Never"
                            />
                          </Box>
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                </Form>
              )
            }}
          </Formik>
        )}
      </Box>
    </Box>
  )
}

export default PlanAddOrEdit
