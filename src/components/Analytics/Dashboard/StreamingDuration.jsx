import Grid from '@mui/material/Grid'
import GeneralStatistic from 'src/components/Analytics/common/GeneralStatistic'
import VLLoaderWrapper from 'src/components/common/VLLoaderWrapper'
import useStreamingDuration from 'src/hooks/useStreamingDuration'
import VLLineChart from 'src/components/common/charts/VLLineChart'
import useGoogleAnalytics from 'src/hooks/useGoogleAnalytics'
import VLBarChart from 'src/components/common/charts/VLBarChart'

// interface DatasetValues {
//   label: string
//   data: number[]
//   backgroundColor: string
//   borderColor: string
//   borderWidth: number
// }
// interface UserData {
//   currentTotal: number
//   change: number
//   chartData: {
//     datasets: DatasetValues[]
//     labels: string[]
//   }
// }
// interface StreamingDuration {
//   loading: boolean
//   data: UserData
// }

const StreamingDuration = () => {
  const { loading: loadingStreamingDuration, data: streamingDurationData } =
    useStreamingDuration()

  const { loading: loadingPageView, data: pageViewData } = useGoogleAnalytics()

  return (
    <Grid
      item
      container
      xs={12}
      sx={{
        p: 2,
        backgroundColor: 'background.paper',
        minHeight: '16em',
      }}
      alignItems="center"
      justifyContent="center"
    >
      <Grid
        item
        container
        xs={12}
        md={7}
        // justifyContent="center"
        // alignItems="center"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          position: 'relative',
          flexWrap: {
            sm: 'wrap',
            md: 'nowrap',
          },
          gridGap: 20,
        }}
      >
        <VLLoaderWrapper loading={loadingStreamingDuration}>
          <GeneralStatistic
            title="Total Streaming Duration"
            number={streamingDurationData.currentTotal}
            changePercentage={streamingDurationData.change}
          />
          <VLLineChart data={streamingDurationData.chartData} />
        </VLLoaderWrapper>
      </Grid>
      <Grid
        item
        container
        xs={12}
        md={5}
        justifyContent="center"
        sx={{
          p: 2,
          position: 'relative',
        }}
      >
        <VLLoaderWrapper loading={loadingPageView}>
          <VLBarChart data={pageViewData} />
        </VLLoaderWrapper>
      </Grid>
    </Grid>
  )
}

export default StreamingDuration
