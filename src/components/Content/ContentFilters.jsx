import { useEffect, useState } from 'react'
import { Box, Button, Checkbox } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Fade from '@mui/material/Fade'
import contentData from 'src/json/contentData.json'
import Menu from '@mui/material/Menu'
import IconButton from '@mui/material/IconButton'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const ContentFilters = ({
  contentFilterStatus,
  handleContentFilterStatus,
  handleSelectAll,
  selected,
  handleContentSelect,
}) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const [selectAll, setSelectAll] = useState(false)
  const handleSelectAllLocal = () => {
    setSelectAll(!selectAll)
  }

  useEffect(() => {
    handleSelectAll(selectAll)
  }, [selectAll])
  const [contentSelect, setContentSelect] = useState('')
  const onContentSelect = (val) => {
    setContentSelect(val)
    handleClose()
  }
  useEffect(() => {
    handleContentSelect(contentSelect)
  }, [contentSelect])

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '40px 40px',
        gap: '25px',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          width: '90%',
        }}
      >
        <Checkbox checked={selectAll} onChange={handleSelectAllLocal} />
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <KeyboardArrowDownIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {contentData.contentStatus.map((item) => (
            <MenuItem
              data-value={item.value}
              key={item.key}
              selected={item.value === contentSelect}
              onClick={() => onContentSelect(item.value)}
            >
              {item.title}
            </MenuItem>
          ))}
        </Menu>

        <Fade in={Boolean(selected.length)}>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            {contentData.actions.map((item) => (
              <Button key={item.title} variant="outlined" size="large">
                {item.title}
              </Button>
            ))}
          </Box>
        </Fade>
      </Box>
      <FormControl sx={{ minWidth: 150 }}>
        <Select
          value={contentFilterStatus}
          onChange={handleContentFilterStatus}
          displayEmpty
        >
          {contentData.filterStatus.map((item) => (
            <MenuItem value={item.key} key={item.key}>
              {item.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default ContentFilters
