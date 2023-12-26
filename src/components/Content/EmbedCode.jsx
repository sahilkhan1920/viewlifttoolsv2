import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { TextField } from '@mui/material'

export default function EmbedCode({ embedCode }) {
  const [expanded, setExpanded] = React.useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <div style={{ paddingTop: '40px' }}>
      <Accordion
        expanded={expanded === 'embedCode'}
        onChange={handleChange('embedCode')}
        sx={{
          backgroundColor: 'white',
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="embedCode"
          sx={{
            minHeight: '70px',
          }}
        >
          <Typography sx={{ width: '33%', flexShrink: 0, fontSize: '20px', fontWeight: 500, color: '#6f7276' }}>EMBED</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            required
            id="embedCode"
            label="Embed Code"
            value={embedCode || ''}
            name="embedCode"
            variant="outlined"
            sx={{
              width: '100%',
              '& .MuiInputBase-input': { height: '20px' },
            }}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
