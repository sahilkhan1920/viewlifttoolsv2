import { Box } from '@mui/system'
import { useState } from 'react'
import VLLoaderWrapper from 'src/components/common/VLLoaderWrapper'
import VLTabPanel from 'src/components/common/VLTabPanel'
import useHeaders from 'src/hooks/useHeaders'
import useAudience from 'src/hooks/useAudience'
import useChurnPlans from 'src/hooks/useChurnPlans'
import CommonHeader from '../common/CommonHeader'
import Plans from './Plans'
import VLLineChart from 'src/components/common/charts/VLLineChart'
import VLDataviewSwitch from 'src/components/common/VLDataviewSwitch'
import VLTable from 'src/components/common/VLTable'
import VLBarChart from 'src/components/common/charts/VLBarChart'

const AudienceChurn = () => {
  const [selectedTab, setSelectedTab] = useState(0)
  const onTabChange = (val) => {
    setSelectedTab(val)
  }
  const {
    page: { tabs },
  } = useHeaders()

  // console.log('defaultMetrics ==>', defaultMetrics)

  const { data, loading, selectedMetrics } = useAudience(tabs[selectedTab])
  const { data: plansData, loading: loadingPlans } = useChurnPlans()
  return (
    <Box
      sx={{
        height: '80%',
        width: '100%',
        position: 'relative',
      }}
    >
      <CommonHeader />
      <Plans data={plansData} loading={loadingPlans} />
      <Box sx={{ width: '100%', height: '70%', position: 'relative' }}>
        <VLTabPanel tabs={tabs} onTabChange={onTabChange}>
          {tabs.map((tab) => {
            return (
              <VLLoaderWrapper key={tab.key} loading={loading || !data}>
                <VLDataviewSwitch
                  metrics={tab?.metrics}
                  selectedMetrics={selectedMetrics}
                  items={['graph', 'table']}
                >
                  {tab.lineChart ? (
                    <VLLineChart data={data?.chartData} />
                  ) : (
                    <VLBarChart data={data?.chartData} />
                  )}

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

export default AudienceChurn
