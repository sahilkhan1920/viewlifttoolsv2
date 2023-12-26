import { Box, Typography, Button, Modal, ModalProps, TextField, useTheme, Autocomplete, Select, MenuItem } from '@mui/material'
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { useCookies } from 'react-cookie'

const Popup = dynamic(() => import('src/components/common/Popup'))

import CONFIG from '../../../../../pages/users/config.json'
import COUNTRIES from 'src/json/countries.json'
import fetchHelper from 'src/helpers/fetchHelper'
import { INVOKE_V2_API } from 'src/constants/urlConstants'
import { PlanType } from 'src/types/PlanType'
import useAddPlanHandler, { AddPlanDataType, PaymentHandlerList } from 'src/hooks/Users/useAddPlanHandler'

export type AddPlanPropType = Pick<ModalProps, 'open' | 'onClose'> & {
  onCancel: Dispatch<SetStateAction<boolean>>
  userId: string
}
export default function AddPlan({ open, onClose, onCancel, userId }: AddPlanPropType) {
  const { palette } = useTheme()
  const [cookies] = useCookies()
  const { values, setFieldValue, handleChange, handleSubmit, errors, setFieldError } = useAddPlanHandler({ userId })

  const [planList, setPlanList] = useState<PlanType[] | []>([])
  const [showConfirmation, setShowConfirmation] = useState(false)

  const { title, cta, confirmation } = CONFIG.addNewPlanModal

  const xapikey = cookies.managementXApiKey
  const Authorization = cookies.accessToken
  const site = cookies.site

  const getSubscriptionPlans = useMemo(async () => {
    return await fetchHelper({
      url: INVOKE_V2_API,
      data: {
        url: '/subscription/plans',
        method: 'GET',
        role: 'Customer Support',
        auth: {
          site: site,
          isServerToken: true,
        },
        query: { site },
        body: {},
      },
      method: 'POST',
      headers: {
        Authorization,
        xapikey,
      },
    })
  }, [xapikey, site, Authorization])

  useEffect(() => {
    getSubscriptionPlans.then((res) => {
      setPlanList(res)
    })
    return () => {}
  }, [getSubscriptionPlans])

  useEffect(() => {
    if (errors.error) setShowConfirmation(true)
  }, [errors.error])

  return (
    <>
      <Modal open={open} onClose={onClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ background: 'white' }} flex={1} maxWidth={'30rem'}>
          <Box p={1} bgcolor={palette.primary.dark}>
            <Typography variant="h6" color={palette.primary.contrastText}>
              {title}
            </Typography>
          </Box>
          <Box paddingY={3} paddingX={2} display="flex" flexDirection="column" gap={2}>
            <form onSubmit={handleSubmit}>
              <Box paddingX={2} display="flex" flexDirection="column" gap={2} maxHeight="35rem" overflow={'scroll'}>
                <Box display="flex" flexDirection="column" gap={1} id="paymentHandlerContainer">
                  <Typography variant="body1">Payment Handler</Typography>
                  <Select
                    id="paymentHandler"
                    name="paymentHandler"
                    value={values.paymentHandler}
                    onChange={(e) => {
                      setFieldError('paymentHandler', '')
                      handleChange(e)
                    }}
                    fullWidth
                    size="small"
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    {PaymentHandlerList.map(({ label, value }) => (
                      <MenuItem key={value} value={value}>
                        {label}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
                <Box display="flex" flexDirection="column" gap={1} id="countryContainer">
                  <Typography variant="body1">Select a country</Typography>
                  <Autocomplete
                    size="small"
                    key="country"
                    id="country"
                    options={COUNTRIES}
                    openOnFocus={false}
                    renderInput={(args) => <TextField {...args} name="country" value={values.country} placeholder={'Country'} />}
                    onChange={(_, v) => {
                      setFieldError('country', '')
                      setFieldValue('country', v?.value)
                    }}
                  />
                </Box>
                <Box display="flex" flexDirection="column" gap={1} id="planContainer">
                  <Typography variant="body1">Subscription Plan</Typography>
                  <Select
                    id="plan"
                    name="plan"
                    value={values.plan}
                    onChange={(e) => {
                      setFieldError('plan', '')
                      handleChange(e)
                    }}
                    fullWidth
                    size="small"
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    {planList.map(({ id, name, identifier }) => (
                      <MenuItem key={id} value={identifier}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
                {values.paymentHandler === 'none' ? (
                  false
                ) : (
                  <Box display="flex" flexDirection="column" gap={1} id="receiptContainer">
                    <Typography>{values.paymentHandler === 'prepaid' ? 'Prepaid Code' : 'Receipt'}</Typography>
                    <TextField
                      fullWidth
                      id="receipt"
                      value={(values as AddPlanDataType).receipt}
                      onChange={(e) => {
                        setFieldError('receipt', '')
                        handleChange(e)
                      }}
                      size="small"
                    />
                  </Box>
                )}
              </Box>
              <Box display="flex" gap={5} id="modal-actions" paddingTop={4}>
                <Button fullWidth variant="outlined" onClick={onCancel.bind(null, false)}>
                  {cta.cancel.label}
                </Button>
                <Button fullWidth variant="contained" type="submit">
                  {cta.confirm.label}
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Modal>
      {showConfirmation ? (
        <Popup popUpOpen={showConfirmation} setPopup={setShowConfirmation} heading={errors.error ? 'Failed to Add Plan' : confirmation.title}>
          <Box p={2} display="flex" flexDirection="column" gap={2}>
            <Typography>{errors.error ?? confirmation.text}</Typography>
            <Button variant="contained" onClick={() => setShowConfirmation(false)} sx={{ margin: '0 0 0 auto' }}>
              Close
            </Button>
          </Box>
        </Popup>
      ) : (
        false
      )}
    </>
  )
}
