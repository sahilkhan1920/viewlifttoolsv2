import Box from '@mui/material/Box'
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
)

interface DatasetValues {
  label: string
  data: number[]
  backgroundColor: string
  borderColor: string
  borderWidth: number
}

interface Data {
  data: {
    datasets: DatasetValues[]
    labels: string[]
  }
  options?: {
    legend: boolean
  }
}

const VLLineChart: React.FC<Data> = ({
  data,
  options = {
    legend: false,
  },
}) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Line
        data={data}
        options={{
          plugins: {
            legend: {
              position: 'top',
              display: options.legend,
            },
          },
        }}
      />
    </Box>
  )
}

export default VLLineChart
