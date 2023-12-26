import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box, Button } from '@mui/material'
import ScheduleModal from './Modals/ScheduleModal'

export default function ScheduleSection({ showScheduleButton, setShowScheduleButton, createScheduleButton, setCreateScheduleButton, pageData }) {
  const [expanded, setExpanded] = React.useState(false)
  const [scheduleModal, setScheduleModal] = React.useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const openScheduleModal = () => {
    setScheduleModal(true)
  }

  const closeScheduleModal = () => {
    setScheduleModal(false)
  }

  return (
    <div style={{ paddingTop: '40px' }}>
      <Accordion
        expanded={expanded === 'scheduleSection'}
        onChange={handleChange('scheduleSection')}
        sx={{
          backgroundColor: 'white',
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="scheduleSection"
          sx={{
            minHeight: '70px',
          }}
        >
          <Typography sx={{ width: '33%', flexShrink: 0, fontSize: '20px', fontWeight: 500, color: '#6f7276' }}>SCHEDULE</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '15px',
            }}
          >
            {showScheduleButton && (
              <Button
                id="showSchedule"
                variant="outlined"
                onClick={openScheduleModal}
                sx={{
                  width: 200,
                  height: 35,
                  fontWeight: 500,
                  fontSize: '14px',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: '#FFFFFF',
                  },
                }}
              >
                SHOW SCHEDULE
              </Button>
            )}
            {createScheduleButton && (
              <Button
                id="createSchedule"
                variant="outlined"
                onClick={openScheduleModal}
                sx={{
                  width: 200,
                  height: 35,
                  fontWeight: 500,
                  fontSize: '14px',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: '#FFFFFF',
                  },
                }}
              >
                CREATE SCHEDULE
              </Button>
            )}
            <ScheduleModal
              open={scheduleModal}
              close={closeScheduleModal}
              pageData={pageData}
              schedule={pageData?.schedule}
              setShowScheduleButton={setShowScheduleButton}
              setCreateScheduleButton={setCreateScheduleButton}
              disableEvent={true}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
