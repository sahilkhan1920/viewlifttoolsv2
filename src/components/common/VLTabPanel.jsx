import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { Box } from '@mui/system'
import { useAppContext } from 'src/contexts/AppContext'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const VLTabPanel = ({ tabs, children, onTabChange = () => null }) => {
  const {
    data: { currentTab },
    updateData,
  } = useAppContext()
  const handleChange = (event, newValue) => {
    onTabChange(newValue)
    console.log(tabs[newValue].key)
    updateData({
      currentTab: newValue,
      selectedContent: tabs[newValue].key,
    })
  }

  return (
    <>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          maxWidth: '100vw',
        }}
      >
        <Tabs
          value={currentTab}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map(({ key, title }, index) => (
            <Tab key={key} label={title} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>
      {tabs.map(({ key }, index) => {
        return (
          <TabPanel key={key} value={currentTab} index={index}>
            {children[currentTab]}
          </TabPanel>
        )
      })}
    </>
  )
}

export default VLTabPanel
