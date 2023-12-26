import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ContentMultilineField from 'src/components/Content/ContentMultilineField'
import { Box } from '@mui/material'
import ContentSelect2 from './ContentSelect2'

export default function CustomField({ formik, handleAutosave, handleFocus, handleInputChange, handleSelectChange, options, autocompleteInputValue, handleAutocompleteClose }) {
  const [expanded, setExpanded] = React.useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <div style={{ paddingTop: '40px' }}>
      <Accordion
        expanded={expanded === 'customField'}
        onChange={handleChange('customField')}
        sx={{
          backgroundColor: 'white',
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="customField"
          sx={{
            minHeight: '70px',
          }}
        >
          <Typography sx={{ width: '33%', flexShrink: 0, fontSize: '20px', fontWeight: 500, color: '#6f7276' }}>CUSTOM FIELD</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'baseline',
            }}
          >
            <Box
              sx={{
                flex: 1,
                marginRight: '20px',
              }}
            >
              <ContentMultilineField
                value={formik?.values?.longDescription}
                handleChange={formik.handleChange}
                handleAutosave={handleAutosave}
                id="longDescription"
                label="Long Description"
                width="100%"
                marginTop="0px"
                name="longDescription"
                rows={4}
              />
            </Box>
            {!formik.values.isLiveStream && (
              <Box
                sx={{
                  flex: 1,
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                  }}
                >
                  <ContentSelect2
                    value={formik.values.optionalTags}
                    handleFocus={handleFocus}
                    handleInputChange={handleInputChange}
                    handleChange={handleSelectChange}
                    options={options}
                    id="optionalTags"
                    placeholder="Select Optional Tags"
                    name="optionalTags"
                    autocompleteInputValue={autocompleteInputValue}
                    handleAutocompleteClose={handleAutocompleteClose}
                  />
                </Box>
              </Box>
            )}
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
