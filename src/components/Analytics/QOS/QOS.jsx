import { Box } from '@mui/system'
import { useState } from 'react'
import VLLoaderWrapper from 'src/components/common/VLLoaderWrapper'
import VLTabPanel from 'src/components/common/VLTabPanel'
import useHeaders from 'src/hooks/useHeaders'
import useQOSPlatforms from 'src/hooks/useQOSPlatforms'
import CommonHeader from '../common/CommonHeader'
import VLLineChart from 'src/components/common/charts/VLLineChart'
import VLDataviewSwitch from 'src/components/common/VLDataviewSwitch'
import VLTable from 'src/components/common/VLTable'
import AnalyticsPlatforms from '../common/AnalyticsPlatforms'
import VLBarChart from 'src/components/common/charts/VLBarChart'

const QOS = () => {
  const [selectedTab, setSelectedTab] = useState(0)
  const onTabChange = (val) => {
    setSelectedTab(val)
  }
  const {
    page: { tabs, hook, chartType = 'line', tabItems = ['graph', 'table'] },
  } = useHeaders()

  const { data, loading, selectedMetrics, metrics } = hook({
    tab: tabs[selectedTab],
  })
  const {
    data: platformData,
    loading: loadingPlatforms,
    selectedDataMetrics,
  } = useQOSPlatforms({
    tab: tabs[selectedTab],
    platform: true,
  })

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
        platformSuffix={selectedDataMetrics?.symbol}
        decimals={selectedDataMetrics?.decimal}
      />
      <Box sx={{ width: '100%', height: '70%', position: 'relative' }}>
        <VLTabPanel tabs={tabs} onTabChange={onTabChange}>
          {tabs.map((tab) => {
            return (
              <VLLoaderWrapper key={tab.key} loading={loading || !data}>
                <VLDataviewSwitch
                  metrics={metrics}
                  items={tabItems}
                  selectedMetrics={selectedMetrics}
                >
                  {tabItems.map((item) => {
                    const chartProps = {
                      key: item,
                      data: data?.chartData,
                      options: {
                        legend: true,
                      },
                    }
                    return item === 'graph' ? (
                      chartType === 'line' ? (
                        <VLLineChart {...chartProps} />
                      ) : (
                        <VLBarChart {...chartProps} />
                      )
                    ) : (
                      <VLTable
                        key={item}
                        data={data?.tableData?.tableRows}
                        columns={data?.tableData?.columns}
                        type="table"
                      />
                    )
                  })}
                </VLDataviewSwitch>
              </VLLoaderWrapper>
            )
          })}
        </VLTabPanel>
      </Box>
    </Box>
  )
}

export default QOS
