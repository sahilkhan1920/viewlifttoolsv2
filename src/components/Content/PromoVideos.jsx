import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ContentSelect2 from './ContentSelect2'
import { Box } from '@mui/material'

export default function PromoVideos({ formik, handleFocus, handleInputChange, handleSelectChange, options, autocompleteInputValue, handleAutocompleteClose }) {
  const [expanded, setExpanded] = React.useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <div style={{ paddingTop: '40px' }}>
      <Accordion
        expanded={expanded === 'promoVideos'}
        onChange={handleChange('promoVideos')}
        sx={{
          backgroundColor: 'white',
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="promoVideos"
          sx={{
            minHeight: '70px',
          }}
        >
          <Typography sx={{ width: '33%', flexShrink: 0, fontSize: '20px', fontWeight: 500, color: '#6f7276' }}>PROMO VIDEOS</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{
              width: '100%',
            }}
          >
            <ContentSelect2
              value={formik.values.promoVideos}
              handleFocus={handleFocus}
              handleInputChange={handleInputChange}
              handleChange={handleSelectChange}
              options={options}
              id="promoVideos"
              placeholder="Select Promo Videos"
              name="promoVideos"
              autocompleteInputValue={autocompleteInputValue}
              handleAutocompleteClose={handleAutocompleteClose}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
