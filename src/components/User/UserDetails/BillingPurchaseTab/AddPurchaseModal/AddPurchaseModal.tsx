import { Box, Typography, Button, Modal, ModalProps, TextField, useTheme, Select, MenuItem } from '@mui/material'
import { Dispatch, SetStateAction, useState } from 'react'
import dynamic from 'next/dynamic'

const Popup = dynamic(() => import('src/components/common/Popup'))

import CONFIG from '../../../../../../pages/users/config.json'
import useAddPurchaseHandler, {
  PaymentHandlerList,
  PurchaseTypeList,
  ContentTypeList,
  VideoQualityList,
  IOSHandlerFieldType,
  PrepaidHandlerFieldType,
  MobilePaymentHandlerFieldType,
  StripeHandlerFieldType,
} from 'src/hooks/Users/useAddPurchaseHandler'

export type AddPurchasePropType = Pick<ModalProps, 'open' | 'onClose'> & {
  onCancel: Dispatch<SetStateAction<boolean>>
  userId: string
}
export default function AddPurchase({ userId, open, onClose, onCancel }: AddPurchasePropType) {
  const { palette } = useTheme()
  const { values, handleSubmit, handleChange } = useAddPurchaseHandler({ userId })

  const [showConfirmation, setShowConfirmation] = useState(false)

  const { title, cta, confirmation } = CONFIG.addNewPlanModal

  return (
    <>
      <Modal open={open} onClose={onClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ background: 'white' }} flex={1} maxWidth={'30rem'}>
          <Box p={1} bgcolor={palette.primary.dark}>
            <Typography variant="h6" color={palette.primary.contrastText}>
              {title}
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <Box paddingY={3} paddingX={2} display="flex" flexDirection="column" gap={2} maxHeight="35rem" overflow={'scroll'}>
              <Box display="flex" flexDirection="column" gap={1} id="paymentHandlerContainer">
                <Typography variant="body1">Payment Handler</Typography>
                <Select
                  id="paymentHandler"
                  name="paymentHandler"
                  value={values.paymentHandler}
                  onChange={handleChange}
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
              <Box display="flex" flexDirection="column" gap={1} id="purchaseTypeContainer">
                <Typography variant="body1">Purchase Type</Typography>
                <Select
                  id="purchaseType"
                  name="purchaseType"
                  value={values.purchaseType}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  {PurchaseTypeList.map(({ label, value }) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              {values.paymentHandler === 'none' ? (
                false
              ) : (
                <>
                  {values?.paymentHandler === 'prepaid' ? (
                    <Box display="flex" flexDirection="column" gap={1} id="couponCodeContainer">
                      <Typography>Coupon Code</Typography>
                      <TextField
                        fullWidth
                        id="couponCode"
                        value={(values as PrepaidHandlerFieldType).couponCode}
                        onChange={handleChange}
                        size="small"
                      />
                    </Box>
                  ) : (
                    <>
                      <Box display="flex" flexDirection="column" gap={1} id="contentIdContainer">
                        <Typography>Content ID</Typography>
                        <TextField
                          fullWidth
                          id="contentId"
                          value={(values as MobilePaymentHandlerFieldType).contentId}
                          onChange={handleChange}
                          size="small"
                        />
                      </Box>
                      <Box display="flex" flexDirection="column" gap={1} id="contentTypeContainer">
                        <Typography variant="body1">Content Type</Typography>
                        <Select
                          id="contentType"
                          name="contentType"
                          value={(values as MobilePaymentHandlerFieldType).contentType}
                          onChange={handleChange}
                          fullWidth
                          size="small"
                          inputProps={{ 'aria-label': 'Without label' }}
                        >
                          {ContentTypeList.map(({ label, value }) => (
                            <MenuItem key={value} value={value}>
                              {label}
                            </MenuItem>
                          ))}
                        </Select>
                      </Box>
                      <Box display="flex" flexDirection="column" gap={1} id="seasonIdContainer">
                        <Typography>Season ID (optional)</Typography>
                        <TextField
                          fullWidth
                          id="seasonId"
                          value={(values as MobilePaymentHandlerFieldType).contentId}
                          onChange={handleChange}
                          size="small"
                        />
                      </Box>
                      <Box display="flex" flexDirection="column" gap={1} id="seriesIdContainer">
                        <Typography>Series ID (optional)</Typography>
                        <TextField
                          fullWidth
                          id="seriesId"
                          value={(values as MobilePaymentHandlerFieldType).seriesId}
                          onChange={handleChange}
                          size="small"
                        />
                      </Box>
                      <Box display="flex" flexDirection="column" gap={1} id="videoQualityContainer">
                        <Typography variant="body1">Video Quality</Typography>
                        <Select
                          id="videoQuality"
                          name="videoQuality"
                          value={(values as MobilePaymentHandlerFieldType).videoQuality}
                          onChange={handleChange}
                          fullWidth
                          size="small"
                          inputProps={{ 'aria-label': 'Without label' }}
                        >
                          {VideoQualityList.map(({ label, value }) => (
                            <MenuItem key={value} value={value}>
                              {label}
                            </MenuItem>
                          ))}
                        </Select>
                      </Box>
                      {values.paymentHandler !== 'stripe' ? (
                        <Box display="flex" flexDirection="column" gap={1} id="receiptContainer">
                          <Typography>Receipt</Typography>
                          <TextField
                            fullWidth
                            id="receipt"
                            value={(values as MobilePaymentHandlerFieldType).receipt}
                            onChange={handleChange}
                            size="small"
                          />
                        </Box>
                      ) : (
                        false
                      )}
                      {values.paymentHandler === 'ios' ? (
                        <>
                          <Box display="flex" flexDirection="column" gap={1} id="paymentUniqueIdContainer">
                            <Typography>Payment Unique ID</Typography>
                            <TextField
                              fullWidth
                              id="paymentUniqueId"
                              value={(values as IOSHandlerFieldType).paymentUniqueId}
                              onChange={handleChange}
                              size="small"
                            />
                          </Box>
                          <Box display="flex" flexDirection="column" gap={1} id="planIdContainer">
                            <Typography>Plan Identifier</Typography>
                            <TextField fullWidth id="planId" value={(values as IOSHandlerFieldType).planId} onChange={handleChange} size="small" />
                          </Box>
                        </>
                      ) : (
                        false
                      )}
                      {values.paymentHandler === 'stripe' ? (
                        <>
                          <Box display="flex" flexDirection="column" gap={1} id="amountContainer">
                            <Typography>Amount</Typography>
                            <TextField
                              fullWidth
                              id="amount"
                              value={(values as StripeHandlerFieldType).receipt}
                              onChange={handleChange}
                              size="small"
                            />
                          </Box>
                          <Box display="flex" flexDirection="column" gap={1} id="stripeRequestIdContainer">
                            <Typography>Stripe Request ID</Typography>
                            <TextField
                              fullWidth
                              id="stripeRequestId"
                              value={(values as StripeHandlerFieldType).stripeRequestId}
                              onChange={handleChange}
                              size="small"
                            />
                          </Box>
                          <Box display="flex" flexDirection="column" gap={1} id="stripeTokenContainer">
                            <Typography>Stripe Token</Typography>
                            <TextField
                              fullWidth
                              id="stripeToken"
                              value={(values as StripeHandlerFieldType).stripeToken}
                              onChange={handleChange}
                              size="small"
                            />
                          </Box>
                        </>
                      ) : (
                        false
                      )}
                    </>
                  )}
                </>
              )}
              <Box display="flex" gap={5} id="modal-actions" paddingTop={2}>
                <Button fullWidth variant="outlined" onClick={onCancel.bind(null, false)}>
                  {cta.cancel.label}
                </Button>
                <Button fullWidth variant="contained" type="submit">
                  {cta.confirm.label}
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Modal>
      {showConfirmation ? (
        <Popup popUpOpen={showConfirmation} setPopup={setShowConfirmation} heading={confirmation.title}>
          <Box p={2} display="flex" flexDirection="column" gap={2}>
            <Typography>{confirmation.text}</Typography>
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
