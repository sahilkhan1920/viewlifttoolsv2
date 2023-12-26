import { Box, Button, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import { useEffect, useMemo, useState } from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { useCookies } from 'react-cookie'

import { UserPageCard } from 'src/components/Card'
import fetchHelper from 'src/helpers/fetchHelper'
import { INVOKE_V2_API } from 'src/constants/urlConstants'
import { SubscriptionType } from './SubscriptionTypes'
import VLLoaderWrapper from 'src/components/common/VLLoaderWrapper'
import ApplyOffer from './ApplyOffer/ApplyOffer'
import useCopyToClipboard from 'src/hooks/useCopyToClipboard'

const AddPlanModal = dynamic(() => import('../../../Modals').then((component) => component.AddPlanModal))
const ApplyRedemptionCode = dynamic(() => import('./ApplyRedemptionCode').then((m) => m.ApplyRedemptionCode))

export default function SubscriptionPlansSection({ userId }: { userId: string }) {
  const { copy } = useCopyToClipboard()
  const [addingPlan, setAddingPlan] = useState(false)
  const [tableData, setTableData] = useState<{ field: string; value: string | number; allowCopy?: boolean }[] | undefined>(undefined)
  const [cookies] = useCookies()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const site = cookies.site
  const xapikey = cookies.managementXApiKey
  const Authorization = cookies.accessToken

  const fetchSubscriptions = useMemo(async () => {
    return await fetchHelper({
      method: 'POST',
      url: INVOKE_V2_API,
      data: {
        url: 'subscription/user',
        method: 'GET',
        role: 'Customer Support',
        auth: {
          site,
          userId,
        },
        query: {
          site,
        },
      },
      headers: {
        xapikey,
        Authorization,
      },
    })
  }, [site, xapikey, Authorization, userId])

  useEffect(() => {
    setLoading(true)
    fetchSubscriptions
      .then((res) => {
        if (new Object(res).hasOwnProperty('error')) {
          setError(res.error)
          return setTableData(undefined)
        }
        const { subscriptionInfo, subscriptionPlanInfo } = res as SubscriptionType
        const __data = [
          {
            field: 'Plan Name',
            value: subscriptionPlanInfo.description,
          },
          {
            field: 'Plan Price',
            value: subscriptionInfo.preTaxAmount,
          },
          {
            field: 'Status',
            value: subscriptionInfo.subscriptionStatus,
          },
          {
            field: 'End Date',
            value: subscriptionInfo.subscriptionEndDate,
          },
          {
            field: 'Country',
            value: subscriptionInfo.countryCode,
          },
          {
            field: 'Receipt ID',
            value: subscriptionInfo?.paymentUniqueId ? subscriptionInfo.paymentUniqueId : 'N/A',
            allowCopy: true,
          },
          {
            field: 'Payment Unique ID',
            value: subscriptionInfo?.paymentUniqueId ? subscriptionInfo.paymentUniqueId : 'N/A',
            allowCopy: true,
          },
          {
            field: 'Transaction ID',
            value: 'N/A',
          },
          {
            field: 'Payment Handler',
            value: subscriptionInfo.paymentHandlerDisplayName,
          },
          {
            field: 'Registered Via',
            value: subscriptionInfo.platform,
          },
          {
            field: 'Registered On',
            value: subscriptionInfo.subscriptionStartDate
              ? Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'medium' }).format(new Date(subscriptionInfo.subscriptionStartDate))
              : '-',
          },
          {
            field: 'Cancelled On',
            value: subscriptionInfo.subscriptionEndDate
              ? Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'medium' }).format(new Date(subscriptionInfo.subscriptionEndDate))
              : '-',
          },
        ]
        setTableData(__data)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [fetchSubscriptions])

  return (
    <>
      <Box id="subscription-plan" paddingY={5}>
        <Box display="flex" id="section-header" alignItems={'center'} marginBottom={5}>
          <Typography variant="h6" flex={1}>
            Subscription Plans
          </Typography>
          <Box display="flex" flex={1.5} flexWrap="wrap" gap={3}>
            <ApplyRedemptionCode site={site} xapikey={xapikey} Authorization={Authorization} userId={userId} />
            <Box gap={1} display="flex" flex={2}>
              <Button fullWidth variant="outlined" onClick={() => setAddingPlan(true)}>
                ADD PLAN
              </Button>
              <Button fullWidth variant="outlined">
                UPDATE PLAN
              </Button>
            </Box>
          </Box>
        </Box>
        <VLLoaderWrapper type="inline" loading={loading}>
          <Grid container>
            <Grid item maxWidth="30rem" width="100%">
              {!tableData || error ? (
                <UserPageCard>
                  <Typography>{error}</Typography>
                </UserPageCard>
              ) : (
                <UserPageCard>
                  <Box id="card-header" flex={1} display="flex" flexDirection="column" gap={2}>
                    <Typography flex={1} variant="h5">
                      Annually
                    </Typography>
                    <Button fullWidth variant="contained">
                      Cancel Subscription
                    </Button>
                    <Button fullWidth variant="outlined">
                      Revert Subscription
                    </Button>
                  </Box>
                  <Box id="card-sub-details">
                    <TableContainer sx={{ width: '30rem' }}>
                      <Table size="small">
                        <TableBody sx={{ outline: '1px solid' }}>
                          {tableData.map(({ field, value, allowCopy }) => (
                            <TableRow key={field} sx={{ display: 'flex' }}>
                              <TableCell
                                sx={{
                                  width: '10rem',
                                  textOverflow: 'ellipsis',
                                  lineClamp: 1,
                                  paddingLeft: 0,
                                }}
                              >
                                {field}
                              </TableCell>
                              <TableCell
                                sx={{
                                  width: '18rem',
                                  whiteSpace: 'nowrap',
                                  textOverflow: 'ellipsis',
                                  overflow: 'hidden',
                                  lineClamp: 1,
                                  display: 'flex',
                                  alignItems: 'center',
                                }}
                              >
                                <Typography
                                  sx={{ width: '15rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', lineClamp: 1 }}
                                  variant="body1"
                                >
                                  {value}
                                </Typography>
                                {allowCopy === true ? <ContentCopyIcon sx={{ cursor: 'pointer' }} onClick={() => copy(value.toString())} /> : false}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                  <ApplyOffer userId={userId} />
                </UserPageCard>
              )}
            </Grid>
          </Grid>
        </VLLoaderWrapper>
        {addingPlan ? (
          <AddPlanModal userId={userId} open={addingPlan} onClose={() => setAddingPlan(false)} onCancel={() => setAddingPlan(false)} />
        ) : (
          false
        )}
      </Box>
    </>
  )
}
