/* eslint-disable react/prop-types */
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CountUp from 'react-countup'

const style = {
  currency: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  amount: {
    fontSize: '20px',
    fontWeight: 400,
  },
  change: {
    fontSize: '20px',
    fontWeight: 400,
    color: 'red',
  },
}

interface PS {
  currency?: string
  symbol?: string
  amount?: number
  changePercentage?: number
}

const PaymentStatistic: React.FC<PS> = ({
  currency = '',
  symbol = '',
  amount = 0,
  changePercentage = 0,
}) => {
  const changeStyle = {
    ...style.change,
    color: changePercentage >= 0 ? '#00B523' : 'red',
  }
  const changePrefix = `${changePercentage >= 0 ? '+' : ''}`
  return (
    <Box>
      <Typography sx={style.currency}>{currency}:</Typography>
      <Typography sx={style.amount}>
        {symbol}
        <CountUp
          start={0}
          end={amount}
          separator=","
          duration={1}
          decimals={2}
        />
      </Typography>
      {changePercentage && (
        <Typography sx={changeStyle}>
          {changePrefix}
          <CountUp
            start={0}
            end={changePercentage}
            separator=","
            duration={1}
            decimals={2}
          />
          %
        </Typography>
      )}
    </Box>
  )
}

export default PaymentStatistic
