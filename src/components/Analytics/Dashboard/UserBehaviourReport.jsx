import Grid from '@mui/material/Grid'
import GeneralStatistic from 'src/components/Analytics/common/GeneralStatistic'
import VLBarChart from 'src/components/common/charts/VLBarChart'
import useAcquisitions from 'src/hooks/useAcquisitions'
import useChurn from 'src/hooks/useChurn'
import useStreamingUsers from 'src/hooks/useStreamingUsers'
import VLLoaderWrapper from 'src/components/common/VLLoaderWrapper'

// interface UserData {
//   currentTotal?: number
//   change?: number
//   chartData?: {
//     datasets: {
//       label: string
//       data: number[]
//       backgroundColor: string
//       borderColor: string
//       borderWidth: number
//     }[]
//     labels: string[]
//   }
// }
// interface UserBehaviour {
//   loading: boolean
//   data: UserData
// }

const UserBehaviourReport = () => {
  const { loading: loadingAcquisitions, data: acquisitionsData } =
    useAcquisitions()
  const { loading: loadingChurn, data: churnData } = useChurn()
  const { loading: loadingSubscribers, data: subscribedUserData } =
    useStreamingUsers()

  return (
    <Grid
      item
      container
      xs={12}
      sx={{
        p: 2,
        position: 'relative',
        minHeight: '16em',
      }}
      alignItems="stretch"
    >
      <Grid
        item
        container
        xs={12}
        md={4}
        sx={{
          position: 'relative',
        }}
      >
        <VLLoaderWrapper loading={loadingAcquisitions}>
          <GeneralStatistic
            title="Acquisitions"
            number={acquisitionsData.currentTotal}
            changePercentage={acquisitionsData.change}
          />
          <VLBarChart data={acquisitionsData.chartData} />
        </VLLoaderWrapper>
      </Grid>
      <Grid item container xs={12} md={4} sx={{ position: 'relative' }}>
        <VLLoaderWrapper loading={loadingChurn}>
          <GeneralStatistic
            title="Churn"
            number={churnData.currentTotal}
            changePercentage={churnData.change}
            opposite
          />
          <VLBarChart data={churnData.chartData} />
        </VLLoaderWrapper>
      </Grid>
      <Grid item container xs={12} md={4} sx={{ position: 'relative' }}>
        <VLLoaderWrapper loading={loadingSubscribers}>
          <GeneralStatistic
            title="Streaming Users"
            number={subscribedUserData.currentTotal}
            changePercentage={subscribedUserData.change}
          />
          <VLBarChart data={subscribedUserData.chartData} />
        </VLLoaderWrapper>
      </Grid>
    </Grid>
  )
}

export default UserBehaviourReport
