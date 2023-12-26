import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ContentSelect2 from './ContentSelect2'
import { Box } from '@mui/material'

export default function LicenseBlock({ formik, handleFocus, handleSelectChange, options }) {
  const [expanded, setExpanded] = React.useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <div style={{ paddingTop: '40px' }}>
      <Accordion
        expanded={expanded === 'licenseBlock'}
        onChange={handleChange('licenseBlock')}
        sx={{
          backgroundColor: 'white',
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="licenseBlock"
          sx={{
            minHeight: '70px',
          }}
        >
          <Typography sx={{ width: '33%', flexShrink: 0, fontSize: '20px', fontWeight: 500, color: '#6f7276' }}>LICENSE</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{
              width: '100%',
            }}
          >
            <ContentSelect2
              value={formik.values.licenses}
              handleFocus={handleFocus}
              handleChange={handleSelectChange}
              options={options}
              id="licenses"
              placeholder="Select License"
              name="licenses"
            />
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
