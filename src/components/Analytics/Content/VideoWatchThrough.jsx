import { Box } from '@mui/system'
import { useState } from 'react'
import VLLoaderWrapper from 'src/components/common/VLLoaderWrapper'
import VLTabPanel from 'src/components/common/VLTabPanel'
import useHeaders from 'src/hooks/useHeaders'
import useVideoWatchThrough from 'src/hooks/useVideoWatchThrough'
import CommonHeader from '../common/CommonHeader'
import useContentPlatforms from 'src/hooks/useContentPlatforms'
import AnalyticsPlatforms from '../common/AnalyticsPlatforms'
import VLDataviewSwitch from 'src/components/common/VLDataviewSwitch'
import VLLineChart from 'src/components/common/charts/VLLineChart'

const VideoWatchThrough = () => {
  const [selectedTab, setSelectedTab] = useState(0)
  const onTabChange = (val) => {
    setSelectedTab(val)
  }
  const {
    page: { tabs, metrics },
  } = useHeaders()

  const { data, loading, selectedMetrics } = useVideoWatchThrough(
    tabs[selectedTab]
  )
  const { loading: loadingPlatforms, data: platformData } =
    useContentPlatforms()

  console.log('data ==>', data)

  return (
    <Box
      sx={{
        height: '80%',
        width: '100%',
        position: 'relative',
      }}
    >
      <CommonHeader />
      <AnalyticsPlatforms data={platformData} loading={loadingPlatforms} />
      <Box sx={{ width: '100%', height: '70%', position: 'relative' }}>
        <VLTabPanel tabs={tabs} onTabChange={onTabChange}>
          {tabs.map((tab) => {
            return (
              <VLLoaderWrapper key={tab.key} loading={loading}>
                <VLDataviewSwitch
                  metrics={metrics}
                  items={['graph']}
                  selectedMetrics={selectedMetrics}
                >
                  <VLLineChart
                    data={data?.chartData}
                    options={{
                      legend: true,
                    }}
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

export default VideoWatchThrough
