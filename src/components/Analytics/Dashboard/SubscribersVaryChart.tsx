import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import CountUp from 'react-countup'

ChartJS.register(ArcElement, Tooltip, Legend)
interface Data {
  prevSub: number
  currentSub: number
  subValue: number
  subText: string
  dateDiff: number
  positiveTrend: boolean
}
interface SC {
  subData: Data
}

const SubscribersVaryChart: React.FC<SC> = ({
  subData: { prevSub, currentSub, subValue, subText, dateDiff, positiveTrend },
}) => {
  const fillColor = positiveTrend ? '#00B523' : 'red'

  const data = {
    labels: ['P', 'R'],
    datasets: [
      {
        data: [subValue, 50],
        backgroundColor: [fillColor, '#F4F4F4'],
      },
    ],
  }

  return (
    <Box
      sx={{
        minHeight: '14em',
        width: '13em',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          border: 'solid 2px #767676',
          height: 60,
          left: '50%',
          position: 'relative',
          top: 50,
        }}
      ></Box>
      <Typography
        variant="h5"
        align="center"
        color="primary"
        sx={{
          position: 'absolute',
          width: '100%',
        }}
      >
        Subscribers
      </Typography>
      <Typography
        variant="caption"
        align="center"
        color="primary"
        component="div"
        sx={{
          position: 'absolute',
          width: '100%',
          top: 30,
        }}
      >
        <CountUp start={0} end={prevSub} separator="," duration={1} />
      </Typography>
      <Doughnut
        data={data}
        options={{
          rotation: 270, // start angle in degrees
          circumference: 180, // sweep angle in degrees,
          events: [],
          layout: {
            padding: 0,
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
      />
      <Typography
        variant="h5"
        align="center"
        component="div"
        sx={{
          position: 'absolute',
          width: '100%',
          bottom: 60,
          color: fillColor,
        }}
      >
        {subText}
      </Typography>
      <Typography
        variant="h4"
        align="center"
        component="div"
        sx={{
          position: 'absolute',
          width: '100%',
          bottom: 20,
        }}
      >
        <CountUp start={0} end={currentSub} separator="," duration={1} />
      </Typography>
      <Typography
        variant="caption"
        align="center"
        component="div"
        sx={{
          position: 'absolute',
          width: '100%',
          bottom: 0,
          mt: 5,
        }}
      >
        vs. previous {dateDiff} Day(s)
      </Typography>
    </Box>
  )
}

export default SubscribersVaryChart
