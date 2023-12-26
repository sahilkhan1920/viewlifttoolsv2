import { Box, Button, OutlinedInput } from '@mui/material'
import { ChangeEvent, useRef } from 'react'
import { INVOKE_V2_API } from 'src/constants/urlConstants'
import fetchHelper from 'src/helpers/fetchHelper'
import { MonetizationModel } from 'src/types/PlanType'

export type ApplyRedemptionCodePropType = {
  site: string
  xapikey: string
  Authorization: string
  userId: string
}

export default function ApplyRedemptionCode({ site, userId, xapikey, Authorization }: ApplyRedemptionCodePropType) {
  const redemptionCodeRef = useRef<HTMLInputElement | null>(null)

  async function onApplyRedemptionCode() {
    if (!redemptionCodeRef?.current) return
    const res = await fetchHelper({
      method: 'POST',
      url: INVOKE_V2_API,
      data: {
        url: '/subscription/offer/validate',
        method: 'POST',
        role: 'Customer Support',
        auth: { site, userId },
        query: { site, monetizationModel: MonetizationModel.TVOD },
        body: { offerCode: redemptionCodeRef.current.value.trim() },
      },
      headers: {
        xapikey,
        Authorization,
      },
    })
    if (res.status !== 200) return alert(res.message)
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    if (!redemptionCodeRef.current) return
    redemptionCodeRef.current.value = e.target.value
  }

  return (
    <Box flex={2} gap={1} display="flex">
      <OutlinedInput
        value={redemptionCodeRef.current?.value}
        onChange={handleInputChange}
        ref={redemptionCodeRef}
        size="small"
        fullWidth
        placeholder="Enter TVOD redemption code"
        sx={{ minWidth: '20rem', width: '100%' }}
      />
      <Button variant="contained" sx={{ minWidth: '10rem' }} onClick={onApplyRedemptionCode}>
        APPLY
      </Button>
    </Box>
  )
}
