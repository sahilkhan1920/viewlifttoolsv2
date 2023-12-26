import { Box } from '@mui/system'
import VLLoaderWrapper from '../../common/VLLoaderWrapper'
import VLTabPanel from '../../common/VLTabPanel'
import useRealtimeData from 'src/hooks/useRealTimeData'
import { useState } from 'react'
import VLTable from '../../common/VLTable'
import CommonHeader from '../common/CommonHeader'
import useHeaders from 'src/hooks/useHeaders'
import VLDataviewSwitch from 'src/components/common/VLDataviewSwitch'
import AnalyticsPlatforms from '../common/AnalyticsPlatforms'
import usePlatforms from 'src/hooks/usePlatforms'

const ContentLevelQOS = () => {
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
    enhanced: true,
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

export default ContentLevelQOS
