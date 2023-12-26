import Grid from '@mui/material/Grid'
import SubscribersVaryChart from './SubscribersVaryChart'
import SubscribersPayments from './SubscribersPayments'
import useSubscriberReport from 'src/hooks/useSubscriberReport'
import VLLoaderWrapper from 'src/components/common/VLLoaderWrapper'
import useSubscriberPayments from 'src/hooks/useSubscriberPayments'
import VLBarChart from 'src/components/common/charts/VLBarChart'

const SubscribersReport = () => {
  const { loading: loadingSubscribers, subData } = useSubscriberReport()
  const { loading: loadingPayments, data: paymentData } =
    useSubscriberPayments()

  return (
    <Grid
      item
      container
      xs={12}
      sx={{
        backgroundColor: 'background.paper',
        p: 2,
        minHeight: '16em',
      }}
      alignItems="stretch"
    >
      <Grid
        item
        container
        xs={12}
        md={2}
        justifyContent="center"
        sx={{ position: 'relative' }}
      >
        <VLLoaderWrapper loading={loadingSubscribers}>
          <SubscribersVaryChart subData={subData} />
        </VLLoaderWrapper>
      </Grid>
      <Grid
        item
        container
        xs={12}
        md={4}
        justifyContent="center"
        alignItems="center"
        sx={{ position: 'relative' }}
      >
        <VLLoaderWrapper loading={loadingSubscribers}>
          <VLBarChart data={subData.chartData} />
        </VLLoaderWrapper>
      </Grid>
      <Grid
        item
        container
        xs={12}
        md={6}
        justifyContent="center"
        sx={{ position: 'relative' }}
      >
        <VLLoaderWrapper loading={loadingPayments}>
          <SubscribersPayments data={paymentData} />
        </VLLoaderWrapper>
      </Grid>
    </Grid>
  )
}

export default SubscribersReport
