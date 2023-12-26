import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import TableRowsIcon from '@mui/icons-material/TableRows'
import EqualizerIcon from '@mui/icons-material/Equalizer'
import DownloadIcon from '@mui/icons-material/Download'
import { Children, cloneElement, createElement, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useDownloadExcel } from 'react-export-table-to-excel'

// interface Props {
//   children: React.ReactNode[]
//   metrics:
// }

// const VLDataviewSwitch: React.FC<React.PropsWithChildren<Props>> = ({
const IconsMap = {
  graph: EqualizerIcon,
  table: TableRowsIcon,
}

const VLDataviewSwitch = ({
  children,
  metrics,
  selectedMetrics,
  items,
  csvFileName = 'Users',
}) => {
  const tableRef = useRef(null)
  const [selectedView, setSelectedView] = useState(0)
  const router = useRouter()
  console.log('csvFileName==>', csvFileName)

  const handleMetricsChange = (e) => {
    router.push({
      query: {
        ...router.query,
        metrics: e.target.value,
      },
    })
  }
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: csvFileName?.toLowerCase().replaceAll(' ', '_'),
    sheet: csvFileName || 'Users',
  })
  return (
    <Box
      sx={{
        position: 'relative',
        pt: 5,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2,
          position: 'absolute',
          right: 0,
          top: 0,
          alignItems: 'center',
          gridGap: 5,
        }}
        component="form"
      >
        {metrics && (
          <FormControl
            sx={{
              width: 250,
            }}
          >
            <InputLabel id="metrics-label">Metrics</InputLabel>
            <Select
              labelId="metrics-label"
              id="metrics"
              name="metrics"
              label="Metrics"
              size="small"
              value={selectedMetrics}
              onChange={handleMetricsChange}
            >
              {metrics?.map((item) => (
                <MenuItem key={item.key} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {items?.map((item, index) => (
          <IconButton
            key={item}
            color="primary"
            onClick={() => setSelectedView(index)}
          >
            {createElement(
              IconsMap[item],
              {
                color: selectedView === index ? 'primary' : 'secondary',
                sx: {
                  cursor: 'pointer',
                },
              },
              null
            )}
          </IconButton>
        ))}
        <IconButton color="primary" onClick={() => onDownload()}>
          <DownloadIcon />
        </IconButton>
      </Box>
      {Children.map(children, (item, index) => {
        const props = {}
        if (item.props.type === 'table') {
          props.tableRef = tableRef
        }
        return (
          <Box
            key={item.props.id}
            sx={{
              mt: 2,
              display: index === selectedView ? 'block' : 'none',
            }}
          >
            {cloneElement(item, props)}
          </Box>
        )
      })}
    </Box>
  )
}

export default VLDataviewSwitch
