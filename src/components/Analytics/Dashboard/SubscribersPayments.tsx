import { Grid, Typography } from '@mui/material'
import PaymentStatistic from 'src/components/Analytics/common/PaymentStatistic'

interface PaymentData {
  currency: string
  symbol: string
  amount: number
  changePercentage: number
}

const SubscribersPayments = ({ data }: { data: PaymentData[] }) => {
  return (
    <Grid
      container
      item
      rowSpacing={1}
      sx={{
        maxHeight: '16em',
        overflowY: 'scroll',
      }}
    >
      <Grid item xs={12}>
        <Typography variant="h5" color="primary">
          Payments
        </Typography>
      </Grid>
      {data.map((item) => (
        <Grid item xs={4} key={item.currency}>
          <PaymentStatistic
            currency={item.currency}
            symbol={item.symbol}
            amount={item.amount}
            changePercentage={item.changePercentage}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default SubscribersPayments
