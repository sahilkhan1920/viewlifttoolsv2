import { OutlinedInput, Typography, useTheme } from '@mui/material'
import CardContainer from './Card'
import FieldGroup from '../FieldGroup/FieldGroup'
import { MonetizationOfferType } from 'src/types/MonetizationOfferType'

export type MarketingCardPropType = {
  cardTitle: string
  data: MonetizationOfferType | undefined
}
export default function MarketingCard({ data, cardTitle }: MarketingCardPropType) {
  const { palette } = useTheme()
  return (
    <CardContainer
      sx={{ padding: 2, background: 'white', borderRadius: '0.4rem', border: `1px solid ${palette.background.paper}` }}
      display="flex"
      flexDirection="column"
      gap={2}
    >
      <Typography variant="button">{cardTitle}</Typography>
      <FieldGroup
        showHelperIcon
        helperText="Cookie (Days)"
        fieldTitle="Cookie (Days): "
        field={<OutlinedInput size="small" fullWidth value={data?.marketing.cookieValidDays} />}
      />
      <FieldGroup
        fieldTitle="Campaign Type: "
        field={<OutlinedInput size="small" fullWidth placeholder="Enter a campaign type" value={data?.marketing.campaignType} />}
      />
    </CardContainer>
  )
}
