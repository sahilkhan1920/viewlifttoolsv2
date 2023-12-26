import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'

export default function GameStates({
  handleAutosave,
  currentGameState,
  setCurrentGameState,
  defaultGameState,
  setDefaultGameState,
  preGameState,
  setPreGameState,
  liveGameState,
  setLiveGameState,
  postGameState,
  setPostGameState,
  endGameState,
  setEndGameState,
  handleAsyncDateChange,
}) {
  const [expanded, setExpanded] = React.useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <div style={{ paddingTop: '40px' }}>
      <Accordion
        expanded={expanded === 'gameStates'}
        onChange={handleChange('gameStates')}
        sx={{
          backgroundColor: 'white',
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="gameStates"
          sx={{
            minHeight: '70px',
          }}
        >
          <Typography sx={{ width: '33%', flexShrink: 0, fontSize: '20px', fontWeight: 500, color: '#6f7276' }}>GAME STATES</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ width: '100%' }}>
            <FormControl sx={{ width: '50%' }}>
              <InputLabel id="gameState-label">Current State</InputLabel>
              <Select
                labelId="gameState-label"
                id="gameState-select"
                value={currentGameState}
                label="Current State"
                name="currentState"
                onChange={(e) => {
                  setCurrentGameState(e.target.value)
                  handleAutosave(null, 'currentState', e.target.value)
                }}
              >
                <MenuItem value="">Select One...</MenuItem>
                <MenuItem value="default">DEFAULT</MenuItem>
                <MenuItem value="pre">PRE</MenuItem>
                <MenuItem value="live">LIVE</MenuItem>
                <MenuItem value="post">POST</MenuItem>
                <MenuItem value="end">GAME ENDED</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ width: '100%', marginTop: '40px', display: 'grid', gridTemplateColumns: 'auto auto', columnGap: '15px', rowGap: '15px' }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Default"
                  className="defaultStartDateTimeBox"
                  value={defaultGameState}
                  onChange={(newValue) => {
                    setDefaultGameState(newValue)
                    handleAsyncDateChange(newValue, 'defaultStartDateTimeBox')
                  }}
                  renderInput={(params) => <TextField id="defaultStartDateTime" {...params} />}
                />
                <DateTimePicker
                  label="Pre"
                  className="preStartDateTimeBox"
                  value={preGameState}
                  onChange={(newValue) => {
                    setPreGameState(newValue)
                    handleAsyncDateChange(newValue, 'preStartDateTimeBox')
                  }}
                  renderInput={(params) => <TextField id="preStartDateTime" {...params} />}
                />
                <DateTimePicker
                  label="Live"
                  className="liveStartDateTimeBox"
                  value={liveGameState}
                  onChange={(newValue) => {
                    setLiveGameState(newValue)
                    handleAsyncDateChange(newValue, 'liveStartDateTimeBox')
                  }}
                  renderInput={(params) => <TextField id="liveStartDateTime" {...params} />}
                />
                <DateTimePicker
                  label="Post"
                  className="postStartDateTimeBox"
                  value={postGameState}
                  onChange={(newValue) => {
                    setPostGameState(newValue)
                    handleAsyncDateChange(newValue, 'postStartDateTimeBox')
                  }}
                  renderInput={(params) => <TextField id="postStartDateTime" {...params} />}
                />
                <DateTimePicker
                  label="Game End"
                  className="gameEndDateTimeBox"
                  value={endGameState}
                  onChange={(newValue) => {
                    setEndGameState(newValue)
                    handleAsyncDateChange(newValue, 'gameEndDateTimeBox')
                  }}
                  renderInput={(params) => <TextField id="gameEndDateTime" {...params} />}
                />
              </LocalizationProvider>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
