import { OutlinedInput, Select, Typography } from '@mui/material'
import CardContainer from './Card'
import { MonetizationOfferType } from 'src/types/MonetizationOfferType'
import FieldGroup from '../FieldGroup/FieldGroup'

export type PriceAndSetupCardPropType = {
  cardTitle: string
  data: MonetizationOfferType | undefined
}
export default function PriceAndSetupCard({ data, cardTitle }: PriceAndSetupCardPropType) {
  return (
    <CardContainer>
      <Typography variant="button">{cardTitle}</Typography>
      <FieldGroup fieldTitle="Offer Strategy" fieldSubText="Required" field={<Select fullWidth size="small" />} />
      <FieldGroup
        fieldTitle="Offer Strategy"
        fieldSubText="Required"
        showHelperIcon
        helperText="Period type"
        field={<Select fullWidth size="small" />}
      />
      <FieldGroup
        fieldTitle="Multiplier"
        fieldSubText="Required"
        field={
          <OutlinedInput size="small" fullWidth placeholder="Offer multiplier type" value={data?.offerDetails.freeTrial.renewalCycleMultiplier} />
        }
      />
      <FieldGroup fieldTitle="Offer Limit" fieldSubText="Required" field={<Select fullWidth size="small" />} />
    </CardContainer>
  )
}
