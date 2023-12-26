import { Box, Button, Autocomplete, Typography, TextField } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

import { INVOKE_V2_API } from 'src/constants/urlConstants'
import fetchHelper from 'src/helpers/fetchHelper'
import { Offer } from '../OfferType'
import VLLoaderWrapper from 'src/components/common/VLLoaderWrapper'

export type ApplyOfferPropType = {
  userId: string
}
export default function ApplyOffer({ userId }: ApplyOfferPropType) {
  const [cookies] = useCookies()
  const [loading, setLoading] = useState(false)
  const [offers, setOffers] = useState<Offer[] | undefined>(undefined)

  const getOffersForUser = useCallback(async () => {
    return await fetchHelper({
      method: 'POST',
      url: INVOKE_V2_API,
      data: {
        url: 'subscription/offers',
        method: 'GET',
        role: 'Customer Support',
        auth: {
          site: cookies.site,
          isServerToken: true,
        },
        query: {
          site: cookies.site,
        },
      },
      headers: {
        xapikey: cookies.managementXApiKey,
        Authorization: cookies.accessToken,
      },
    })
  }, [cookies.managementXApiKey, cookies.accessToken, cookies.site])

  useEffect(() => {
    setLoading(true)
    getOffersForUser()
      .then((res) => {
        if (new Object(res).hasOwnProperty('error')) return setOffers(undefined)
        delete res.status
        return setOffers(res)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [getOffersForUser, userId])

  return (
    <VLLoaderWrapper loading={loading} type="inline">
      <Box id="card-footer" display="flex" flexDirection="column" gap={1}>
        <Typography variant="body1">Apply Offer</Typography>
        <Box display="flex" gap={1}>
          <Autocomplete
            fullWidth
            size="small"
            options={offers ?? []}
            renderInput={(args) => <TextField {...args} placeholder="Enter offer code..." />}
            getOptionLabel={({ name }) => name}
          />
          <Button variant="contained" size="medium" sx={{ minWidth: '10rem' }}>
            Apply
          </Button>
        </Box>
      </Box>
    </VLLoaderWrapper>
  )
}
