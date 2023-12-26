import VLBarChart from 'src/components/common/charts/VLBarChart'
import { Box } from '@mui/system'
import VLLoaderWrapper from 'src/components/common/VLLoaderWrapper'
import useRealtimeData from 'src/hooks/useRealTimeData'
import VLTabPanel from 'src/components/common/VLTabPanel'
import CommonHeader from '../common/CommonHeader'
import VLTable from 'src/components/common/VLTable'
import useHeaders from 'src/hooks/useHeaders'
import VLDataviewSwitch from 'src/components/common/VLDataviewSwitch'
import { useState } from 'react'
import AnalyticsPlatforms from '../common/AnalyticsPlatforms'
import usePlatforms from 'src/hooks/usePlatforms'

const RealStreamingUsersReport = () => {
  const [selectedTab, setSelectedTab] = useState(0)
  const onTabChange = (val) => {
    setSelectedTab(val)
  }
  const {
    page: { tabs },
    title,
  } = useHeaders()
  const { loading, data } = useRealtimeData({
    tab: tabs[selectedTab],
    transform: tabs[selectedTab].transform,
  })

  const { data: platformData, loading: loadingPlatforms } = usePlatforms()

  return (
    <Box
      sx={{
        height: '80%',
        width: '100%',
      }}
    >
      <CommonHeader />
      <AnalyticsPlatforms data={platformData} loading={loadingPlatforms} />
      <Box sx={{ width: '100%', height: '70%', position: 'relative' }}>
        {tabs && (
          <VLTabPanel tabs={tabs} onTabChange={onTabChange}>
            {tabs?.map(({ key, columns }) => (
              <VLLoaderWrapper key={key} loading={loading || !data} table graph>
                <VLDataviewSwitch
                  items={['graph', 'table']}
                  csvFileName={title}
                >
                  <VLBarChart data={data?.chartData} id="streaming-chart" />
                  <VLTable
                    type="table"
                    id="streaming-table"
                    data={data?.tableData}
                    columns={columns}
                  />
                </VLDataviewSwitch>
              </VLLoaderWrapper>
            ))}
          </VLTabPanel>
        )}
      </Box>
    </Box>
  )
}

export default RealStreamingUsersReport
