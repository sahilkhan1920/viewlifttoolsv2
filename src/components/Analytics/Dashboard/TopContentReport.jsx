import Grid from '@mui/material/Grid'
import VLTable from 'src/components/common/VLTable'
import useTopPlans from 'src/hooks/useTopPlans'
import VLLoaderWrapper from '../../common/VLLoaderWrapper'
import useTopContents from 'src/hooks/useTopContents'
import useGoogleAnalytics from 'src/hooks/useGoogleAnalytics'

const TopContentReport = () => {
  const {
    loading: loadingTopPlans,
    data: topPlansData,
    columns: topPlansColumns,
  } = useTopPlans()

  const {
    loading: loadingTopContent,
    data: topContentData,
    columns: topContentColumns,
  } = useTopContents()

  const {
    loading: loadingTopPageViewContent,
    data: topViewContentData,
    columns: topViewContentColumns,
  } = useGoogleAnalytics('pageLocation')

  return (
    <Grid
      item
      container
      xs={12}
      sx={{
        pt: 1,
        position: 'relative',
        minHeight: '16em',
      }}
    >
      <Grid
        item
        container
        xs={12}
        md={4}
        sx={{
          p: 1,
          position: 'relative',
          justifyContent: 'center',
        }}
      >
        <VLLoaderWrapper loading={loadingTopPlans}>
          <VLTable
            data={topPlansData}
            columns={topPlansColumns}
            pagination={false}
          />
        </VLLoaderWrapper>
      </Grid>
      <Grid
        item
        container
        xs={12}
        md={4}
        sx={{
          p: 1,
          position: 'relative',
          justifyContent: 'center',
        }}
      >
        <VLLoaderWrapper loading={loadingTopContent}>
          <VLTable
            data={topContentData}
            columns={topContentColumns}
            pagination={false}
          />
        </VLLoaderWrapper>
      </Grid>
      <Grid
        item
        container
        xs={12}
        md={4}
        sx={{
          p: 1,
          position: 'relative',
          justifyContent: 'center',
        }}
      >
        <VLLoaderWrapper loading={loadingTopPageViewContent}>
          <VLTable
            data={topViewContentData}
            columns={topViewContentColumns}
            pagination={false}
          />
        </VLLoaderWrapper>
      </Grid>
    </Grid>
  )
}

export default TopContentReport
