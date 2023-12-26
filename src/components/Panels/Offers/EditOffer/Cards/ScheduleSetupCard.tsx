import { Box, Typography } from '@mui/material'
import CardContainer from './Card'
import { MonetizationOfferType } from 'src/types/MonetizationOfferType'

export type ScheduleAndSetupCardPropType = {
  cardTitle: string
  data: MonetizationOfferType | undefined
}
export default function ScheduleSetupCard({ data, cardTitle }: ScheduleAndSetupCardPropType) {
  return (
    <CardContainer>
      <Typography variant="button">{cardTitle}</Typography>
      <Box id="field-container" display="flex" alignItems="center" flex={1} justifyContent="center" gap={3}>
        <Typography>Make Available</Typography>
        <Box id="field-group" display="flex" flexDirection="column" gap={0.5}>
          <Typography variant="button">From</Typography>
          <input type="date" value={data?.scheduleDetails.scheduledFromDate} />
        </Box>
        <Box id="field-group" display="flex" flexDirection="column" gap={0.5}>
          <Typography variant="button">To</Typography>
          <input type="date" />
        </Box>
      </Box>
    </CardContainer>
  )
}
