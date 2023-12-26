import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box, FormControlLabel, FormGroup, Switch } from '@mui/material'
import ContentTextfield from 'src/components/Content/ContentTextfield'

export default function EventInfo({ formik, handleAutosave }) {
  const [expanded, setExpanded] = React.useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <div style={{ paddingTop: '40px' }}>
      <Accordion
        expanded={expanded === 'eventInfo'}
        onChange={handleChange('eventInfo')}
        sx={{
          backgroundColor: 'white',
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="eventInfo"
          sx={{
            minHeight: '70px',
          }}
        >
          <Typography sx={{ width: '33%', flexShrink: 0, fontSize: '20px', fontWeight: 500, color: '#6f7276' }}>EVENT INFO</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ width: '100%' }}>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
              }}
            >
              <ContentTextfield
                value={formik?.values?.ticketUrl}
                handleChange={formik.handleChange}
                handleAutosave={handleAutosave}
                id="ticketUrl"
                label="Tickets URL"
                width="100%"
                marginTop="0px"
                name="ticketUrl"
                required={false}
              />
              <ContentTextfield
                value={formik?.values?.rsvpUrl}
                handleChange={formik.handleChange}
                handleAutosave={handleAutosave}
                id="rsvpUrl"
                label="RSVP URL"
                width="100%"
                marginTop="0px"
                name="rsvpUrl"
                required={false}
              />
              <ContentTextfield
                value={formik?.values?.externalUrl}
                handleChange={formik.handleChange}
                handleAutosave={handleAutosave}
                id="externalUrl"
                label="External URL"
                width="100%"
                marginTop="0px"
                name="externalUrl"
                required={false}
              />
              <FormGroup sx={{width:"100%"}}>
                <FormControlLabel
                  control={<Switch checked={formik?.values?.privateEvent} name="privateEvent" onChange={(e) => handleAutosave(e)} />}
                  label="Private Event"
                />
              </FormGroup>
              <FormGroup sx={{width:"100%"}}>
                <FormControlLabel control={<Switch checked={formik?.values?.onSale} name="onSale" onChange={(e) => handleAutosave(e)} />} label="On Sale Now" />
              </FormGroup>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
