import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box, Button, FormGroup, Switch, TextField } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'

export default function LiveStreams({
  cloudfrontProgress,
  startLiveStream,
  stopLiveStream,
  showChooseArchive,
  showPrimaryInput,
  showSecondaryInput,
  primaryLiveInput,
  secondaryLiveInput,
  channelState,
  isDVR,
  liveWorkflowStatus,
  liveWorkflowMessage,
  startLiveDisabled,
  stopLiveDisabled,
  showDVR,
  stopLiveEvent,
  startLiveEvent,
  mediaLiveAlerts,
  handleAutosave,
  thirdPartyLive,
}) {
  const [expanded, setExpanded] = React.useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }))

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }))

  return (
    <div style={{ paddingTop: '40px' }}>
      <Accordion
        expanded={expanded === 'liveStreams'}
        onChange={handleChange('liveStreams')}
        sx={{
          backgroundColor: 'white',
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="liveStreams"
          sx={{
            minHeight: '70px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Typography sx={{ width: '33%', flexShrink: 0, fontSize: '20px', fontWeight: 500, color: '#6f7276' }}>LIVE STREAMS</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginRight: '20px',
              }}
            >
              {liveWorkflowStatus && <Typography sx={{ fontSize: '16px', fontWeight: 500, color: 'red' }}>{liveWorkflowMessage}</Typography>}
              {cloudfrontProgress && <Typography sx={{ fontSize: '16px', fontWeight: 500, color: 'red' }}>Cloudfront loading...</Typography>}
              {showChooseArchive && (
                <Button
                  id="chooseArchiveVersion"
                  variant="contained"
                  sx={{
                    width: 220,
                    height: 35,
                    marginLeft: '18px',
                    fontWeight: 500,
                    fontSize: '14px',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      color: '#FFFFFF',
                    },
                  }}
                >
                  CHOOSE ARCHIVE VERSION
                </Button>
              )}
              {startLiveStream && (
                <Button
                  id="startLiveStream"
                  variant="contained"
                  disabled={startLiveDisabled}
                  onClick={startLiveEvent}
                  sx={{
                    width: 180,
                    height: 35,
                    marginLeft: '18px',
                    fontWeight: 500,
                    fontSize: '14px',
                    backgroundColor: 'green',
                    color: '#fff',
                    border: '1px solid green',
                    borderColor: startLiveDisabled ? '#6f7276' : 'green',
                    '&:hover': {
                      backgroundColor: 'green',
                      color: '#FFFFFF',
                      border: '1px solid green',
                    },
                  }}
                >
                  START LIVE STREAM
                </Button>
              )}
              {stopLiveStream && (
                <Button
                  id="stopLiveStream"
                  variant="contained"
                  disabled={stopLiveDisabled}
                  onClick={stopLiveEvent}
                  sx={{
                    width: 180,
                    height: 35,
                    marginLeft: '18px',
                    fontWeight: 500,
                    fontSize: '14px',
                    backgroundColor: 'red',
                    color: '#fff',
                    border: '1px solid red',
                    borderColor: stopLiveDisabled ? '#6f7276' : 'red',
                    '&:hover': {
                      backgroundColor: 'red',
                      color: '#FFFFFF',
                      border: '1px solid red',
                    },
                  }}
                >
                  STOP LIVE STREAM
                </Button>
              )}
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          {!thirdPartyLive && (
            <Box>
              {(showPrimaryInput || showSecondaryInput) && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                  }}
                >
                  <TextField
                    id="livePrimaryInput"
                    label="Primary Input"
                    name="livePrimaryInput"
                    value={primaryLiveInput}
                    variant="outlined"
                    sx={{
                      width: '100%',
                      visibility: !showPrimaryInput ? 'hidden' : 'visible',
                      '& .MuiInputBase-input': { height: '20px' },
                    }}
                  />
                  <TextField
                    id="liveSecondaryInput"
                    label="Secondary Input"
                    name="liveSecondaryInput"
                    value={secondaryLiveInput}
                    variant="outlined"
                    sx={{
                      width: '100%',
                      visibility: !showSecondaryInput ? 'hidden' : 'visible',
                      '& .MuiInputBase-input': { height: '20px' },
                    }}
                  />
                </Box>
              )}
              <Box
                sx={{
                  marginTop: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography component={'label'} sx={{ fontWeight: 500, color: '#6f7276' }}>
                  Status
                </Typography>
                {showDVR && (
                  <FormGroup>
                    <FormControlLabel control={<Switch checked={isDVR} name="isDvrEnabled" onChange={(e) => handleAutosave(e)} />} label="isDVR" />
                  </FormGroup>
                )}
              </Box>
              <Box
                sx={{
                  marginTop: showDVR ? '-10px' : '0px',
                }}
              >
                <Typography component={'label'} sx={{ fontSize: '14px', color: '#6f7276' }}>
                  Channel State:{' '}
                  <Typography component={'span'} sx={{ color: '#0C5177' }}>
                    {channelState}
                  </Typography>
                </Typography>
              </Box>
              {mediaLiveAlerts?.length == 0 ? (
                <Typography component={'div'} sx={{ fontWeight: 500, color: '#6f7276', marginTop: '15px' }}>
                  No Media Live Alerts Available
                </Typography>
              ) : (
                <TableContainer component={Paper} sx={{ marginTop: '15px' }}>
                  <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="center">Time</StyledTableCell>
                        <StyledTableCell align="center">State</StyledTableCell>
                        <StyledTableCell align="center">Pipeline</StyledTableCell>
                        <StyledTableCell align="center">Type</StyledTableCell>
                        <StyledTableCell align="center">Message</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {mediaLiveAlerts.map((row, index) => (
                        <StyledTableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <StyledTableCell component="th" scope="row" align="center">
                            {row.timeUtc}
                          </StyledTableCell>
                          <StyledTableCell align="center">{row.state}</StyledTableCell>
                          <StyledTableCell align="center">{row.pipeline}</StyledTableCell>
                          <StyledTableCell align="center">{row.type}</StyledTableCell>
                          <StyledTableCell align="center">{row.message}</StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Box>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
