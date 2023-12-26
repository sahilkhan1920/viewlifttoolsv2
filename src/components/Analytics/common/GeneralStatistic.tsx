import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import CountUp from 'react-countup'

interface GS {
  title?: string
  number?: number
  changePercentage?: number
  opposite?: boolean
}

const GeneralStatistic: React.FC<GS> = ({
  title = '',
  number = 0,
  changePercentage = 0,
  opposite = false,
}) => {
  const changePrefix = `${changePercentage > 0 ? '+' : ''}`
  let color = 'success.main'
  if (
    (changePercentage < 0 && !opposite) ||
    (changePercentage > 0 && opposite)
  ) {
    color = 'error.main'
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
        width: 'fit-content',
        height: 'fit-content',
        pl: 3,
        pb: 1,
      }}
    >
      <Typography
        variant="h5"
        color="primary"
        sx={{
          flex: 1,
        }}
        noWrap
      >
        {title}
      </Typography>
      <Box>
        <Typography
          component="span"
          variant="h4"
          sx={{
            borderRight: 'solid 3px #000',
            pr: 1,
          }}
        >
          <CountUp start={0} end={number} separator="," duration={1} />
        </Typography>
        <Typography
          variant="h5"
          color={color}
          component="span"
          sx={{
            pl: 1,
          }}
        >
          {changePrefix}
          <CountUp
            start={0}
            end={changePercentage}
            separator=","
            duration={1}
          />
          %
        </Typography>
      </Box>
    </Box>
  )
}

export default GeneralStatistic
