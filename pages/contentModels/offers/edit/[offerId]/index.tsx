import { useEffect, useMemo, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'

import VLLoaderWrapper from 'src/components/common/VLLoaderWrapper'
import { INVOKE_V2_API } from 'src/constants/urlConstants'
import fetchHelper from 'src/helpers/fetchHelper'

import PageConfig from './config.json'

import { NameAndDescriptionCard, MarketingCard, PriceAndSetupCard, ScheduleSetupCard } from 'src/components/Panels/Offers/EditOffer/Cards'
import { MonetizationOfferType } from 'src/types/MonetizationOfferType'

type HeaderActionType = 'cancel' | 'save'

export default function EditOffer() {
  const { query, replace } = useRouter()
  const { offerId } = query as { offerId: string }
  const [cookies] = useCookies()

  const [loading, setLoading] = useState(false)
  const [dataForId, setDataForId] = useState<MonetizationOfferType | undefined>(undefined)

  const url = INVOKE_V2_API
  const xapikey = cookies.managementXApiKey
  const Authorization = cookies.accessToken
  const site = cookies.site
  const { header } = PageConfig

  const offerDetailsForId = useMemo(async () => {
    return fetchHelper({
      method: 'POST',
      url,
      headers: {
        xapikey,
        Authorization,
      },
      data: {
        url: `/subscription/offer/${offerId}`,
        method: 'GET',
        role: 'Subscriptions & Offers',
        auth: {
          site,
          isServerToken: true,
        },
        query: {
          site,
        },
        body: {},
      },
    })
  }, [Authorization, offerId, site, xapikey, url])

  const onSavingEditedData = async () => {
    const res = await fetchHelper({
      method: 'POST',
      url: 'https://tools.develop.monumentalsportsnetwork.com/msndev/offer/snapshot/create',
      data: {
        marketing: {
          cookieValidDays: '30',
          campaignType: '',
        },
        scheduleDetails: {
          scheduledFromDate: '2023-01-04T11:49:00.000Z',
          scheduledToDate: null,
        },
        offerDetails: {
          offerLimit: {
            promotionCodes: ['7DAYSFREETRIAL'],
            offerLimitType: 'UNLIMITED',
          },
          reduceCharge: {},
          freeTrial: {
            renewalCycleMultiplier: '7',
            renewalCycleType: 'DAY',
          },
          freeTrialUntil: {},
          offerStrategyType: 'FREE_TRIAL',
        },
        name: '7 days free trial',
        description: '7 days free trial',
        status: 'UnExpired',
        offerId: 'ea3b024e-d66f-4093-bfbb-8bdd0242234f',
        method: 'PUT',
        site: 'msndev',
      },
      headers: {
        xapikey,
        Authorization,
      },
    })
    console.log(res)
  }

  const executeHeaderAction = (actionType: HeaderActionType) => {
    switch (actionType) {
      case 'save':
        onSavingEditedData()
        break

      default:
        replace({ pathname: '/contentModels', query: { tab: 'Offers' } })
        break
    }
  }
  useEffect(() => {
    if (offerId)
      offerDetailsForId
        .then((res) => {
          setDataForId(res)
        })
        .catch(console.error)
        .finally(() => setLoading(false))

    return () => setLoading(false)
  })

  return (
    <VLLoaderWrapper loading={loading}>
      <Box paddingY={5} paddingX={2} maxWidth={1500} margin={'0 auto'} display="flex" flexDirection="column" gap={4}>
        <Box id="page-header" display="flex" justifyContent="space-between">
          <Typography variant="h5">{header.title}</Typography>
          <Box id="actions-container" display="flex" gap={2}>
            {header.actions.map(({ id, label }) => (
              <Button key={id} variant={id === 'save' ? 'contained' : 'outlined'} onClick={executeHeaderAction.bind(null, id as HeaderActionType)}>
                {label}
              </Button>
            ))}
          </Box>
        </Box>
        <Box id="card-container" display="flex" gap={2}>
          <Box id="container-col" flex={1} gap={2} display="flex" flexDirection="column">
            <NameAndDescriptionCard cardTitle="Name and Description" data={dataForId} />
            <MarketingCard cardTitle="Marketing" data={dataForId} />
          </Box>
          <Box id="container-col" flex={1} gap={2} display="flex" flexDirection="column">
            <PriceAndSetupCard cardTitle="Price And Setup" data={dataForId} />
            <ScheduleSetupCard cardTitle="Schedule Set Up" data={dataForId} />
          </Box>
        </Box>
      </Box>
    </VLLoaderWrapper>
  )
}
