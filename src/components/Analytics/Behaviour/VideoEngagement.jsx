import { Box } from '@mui/system'
import { useState } from 'react'
import VLLoaderWrapper from 'src/components/common/VLLoaderWrapper'
import VLTabPanel from 'src/components/common/VLTabPanel'
import useHeaders from 'src/hooks/useHeaders'
import useBehaviour from 'src/hooks/useBehaviour'
import useBehaviourPlatforms from 'src/hooks/useBehaviourPlatforms'
import CommonHeader from '../common/CommonHeader'
import VLLineChart from 'src/components/common/charts/VLLineChart'
import VLDataviewSwitch from 'src/components/common/VLDataviewSwitch'
import VLTable from 'src/components/common/VLTable'
import AnalyticsPlatforms from '../common/AnalyticsPlatforms'

const VideoEngagement = () => {
  const [selectedTab, setSelectedTab] = useState(0)
  const onTabChange = (val) => {
    setSelectedTab(val)
  }
  const {
    page: { tabs },
  } = useHeaders()

  const { data, loading, selectedMetrics, metrics, platformSuffix } =
    useBehaviour(tabs[selectedTab])

  const { data: platformData, loading: loadingPlatforms } =
    useBehaviourPlatforms()

  return (
    <Box
      sx={{
        height: '80%',
        width: '100%',
        position: 'relative',
      }}
    >
      <CommonHeader />
      <AnalyticsPlatforms
        data={platformData}
        loading={loadingPlatforms}
        platformSuffix={platformSuffix}
      />
      <Box sx={{ width: '100%', height: '70%', position: 'relative' }}>
        <VLTabPanel tabs={tabs} onTabChange={onTabChange}>
          {tabs.map((tab) => {
            return (
              <VLLoaderWrapper key={tab.key} loading={loading || !data}>
                <VLDataviewSwitch
                  metrics={metrics}
                  selectedMetrics={selectedMetrics}
                  items={['graph', 'table']}
                >
                  <VLLineChart
                    data={data?.chartData}
                    options={{
                      legend: true,
                    }}
                  />

                  <VLTable
                    data={data?.tableData?.tableRows}
                    columns={data?.tableData?.columns}
                    type="table"
                  />
                </VLDataviewSwitch>
              </VLLoaderWrapper>
            )
          })}
        </VLTabPanel>
      </Box>
    </Box>
  )
}

export default VideoEngagement
