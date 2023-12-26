import { Box } from '@mui/system'
import VLLoaderWrapper from 'src/components/common/VLLoaderWrapper'
import VLTabPanel from 'src/components/common/VLTabPanel'
import useRealtimeData from 'src/hooks/useRealTimeData'
import { useState } from 'react'
import VLTable from 'src/components/common/VLTable'
import CommonHeader from 'src/components/Analytics/common/CommonHeader'
import useHeaders from 'src/hooks/useHeaders'
import VLDataviewSwitch from 'src/components/common/VLDataviewSwitch'
import usePlatforms from 'src/hooks/usePlatforms'
import AnalyticsPlatforms from '../common/AnalyticsPlatforms'

const RealStreamingUsersReport = () => {
  const [selectedTab, setSelectedTab] = useState(0)
  const onTabChange = (val) => {
    setSelectedTab(val)
  }
  const {
    page: { tabs },
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
        position: 'relative',
      }}
    >
      <CommonHeader />
      <AnalyticsPlatforms data={platformData} loading={loadingPlatforms} />
      <Box sx={{ width: '100%', height: '70%', position: 'relative' }}>
        <VLTabPanel tabs={tabs} onTabChange={onTabChange}>
          {tabs.map(({ key, columns }) => (
            <VLLoaderWrapper key={key} loading={loading}>
              <VLDataviewSwitch items={['table']}>
                <VLTable columns={columns} data={data} type="table" />
              </VLDataviewSwitch>
            </VLLoaderWrapper>
          ))}
        </VLTabPanel>
      </Box>
    </Box>
  )
}

export default RealStreamingUsersReport
