import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ContentTextfield from 'src/components/Content/ContentTextfield'

export default function AdvancedOptions({ formik, handleAutosave }) {
  const [expanded, setExpanded] = React.useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <div style={{ paddingTop: '40px' }}>
      <Accordion
        expanded={expanded === 'advancedOptions'}
        onChange={handleChange('advancedOptions')}
        sx={{
          backgroundColor: 'white',
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="advancedOptions"
          sx={{
            minHeight: '70px',
          }}
        >
          <Typography sx={{ width: '33%', flexShrink: 0, fontSize: '20px', fontWeight: 500, color: '#6f7276' }}>ADVANCED OPTIONS</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ContentTextfield
            id="skipRecapStartTime"
            label="Skip Recap Start Time (in seconds)"
            name="skipRecapStartTime"
            variant="outlined"
            width="100%"
            marginTop="0px"
            value={formik.values.skipRecapStartTime}
            handleChange={formik.handleChange}
            handleAutosave={handleAutosave}
            required={false}
          />
          <ContentTextfield
            id="skipRecapEndTime"
            label="Skip Recap End Time (in seconds)"
            name="skipRecapEndTime"
            variant="outlined"
            width="100%"
            marginTop="15px"
            value={formik.values.skipRecapEndTime}
            handleChange={formik.handleChange}
            handleAutosave={handleAutosave}
            required={false}
          />
          <ContentTextfield
            id="skipIntroStartTime"
            label="Skip Intro Start Time (in seconds)"
            name="skipIntroStartTime"
            variant="outlined"
            width="100%"
            marginTop="15px"
            value={formik.values.skipIntroStartTime}
            handleChange={formik.handleChange}
            handleAutosave={handleAutosave}
            required={false}
          />
          <ContentTextfield
            id="skipIntroEndTime"
            label="Skip Intro End Time (in seconds)"
            name="skipIntroEndTime"
            variant="outlined"
            width="100%"
            marginTop="15px"
            value={formik.values.skipIntroEndTime}
            handleChange={formik.handleChange}
            handleAutosave={handleAutosave}
            required={false}
          />
          <ContentTextfield
            id="playNextTime"
            label="Play Next Time (in seconds)"
            name="playNextTime"
            variant="outlined"
            width="100%"
            marginTop="15px"
            value={formik.values.playNextTime}
            handleChange={formik.handleChange}
            handleAutosave={handleAutosave}
            required={false}
          />
          <ContentTextfield
            id="clevertapPopupTime"
            label="Clevertap Popup Time (in seconds)"
            name="clevertapPopupTime"
            variant="outlined"
            width="100%"
            marginTop="15px"
            value={formik.values.clevertapPopupTime}
            handleChange={formik.handleChange}
            handleAutosave={handleAutosave}
            required={false}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
