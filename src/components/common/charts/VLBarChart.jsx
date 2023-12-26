import Box from '@mui/material/Box'
import {
  Chart as ChartJS,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(BarController, BarElement, CategoryScale, LinearScale)

// interface Data {
//   data: {
//     datasets: {
//       [key: string]: string | number
//     }[]
//     labels: string[]
//   }
// }

const VLBarChart = ({
  data,
  options = {
    legend: false,
  },
}) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Bar
        data={data}
        options={{
          plugins: {
            legend: {
              display: options.legend,
            },
          },
        }}
      />
    </Box>
  )
}

export default VLBarChart
