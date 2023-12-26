import { OutlinedInput, Select, Typography } from '@mui/material'
import CardContainer from './Card'
import FieldGroup from '../FieldGroup/FieldGroup'
import { MonetizationOfferType } from 'src/types/MonetizationOfferType'

export type NameAndDescriptionCardPropType = {
  cardTitle: string
  data: MonetizationOfferType | undefined
}
export default function NameAndDescriptionCard({ cardTitle, data }: NameAndDescriptionCardPropType) {
  return (
    <CardContainer>
      <Typography variant="button">{cardTitle}</Typography>
      <FieldGroup
        showHelperIcon
        helperText="Offer name"
        fieldTitle="OfferName"
        fieldSubText="Required"
        field={<OutlinedInput size="small" fullWidth value={data?.name} />}
      />
      <FieldGroup
        showHelperIcon
        helperText="Offer Description"
        fieldTitle="Offer Description"
        fieldSubText="Required"
        field={<OutlinedInput multiline minRows={5} size="small" fullWidth value={data?.description} />}
      />
      <FieldGroup
        helperText="Offer status"
        fieldTitle="Status"
        fieldSubText="Required"
        field={<Select value={data?.status} fullWidth size="small" />}
      />
    </CardContainer>
  )
}
