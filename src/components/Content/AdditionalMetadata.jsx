import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box, Button, TextField } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

export default function AdditionalMetadata({ additionalMetadata, setAdditionalMetadata, handleAdditionalMetadata, handleAutosave }) {
  const [expanded, setExpanded] = React.useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const updateFieldValue = (index, field, value) => {
    const updatedFieldValues = [...additionalMetadata]
    updatedFieldValues[index][field] = value
    setAdditionalMetadata(updatedFieldValues)
  }

  const handleDeleteField = (index) => {
    const updatedFieldValues = additionalMetadata.filter((_, i) => i !== index)
    setAdditionalMetadata(updatedFieldValues)
    handleAutosave(null, 'additionalMetadata', updatedFieldValues)
  }

  return (
    <div style={{ paddingTop: '40px' }}>
      <Accordion
        expanded={expanded === 'additionalMetadata'}
        onChange={handleChange('additionalMetadata')}
        sx={{
          backgroundColor: 'white',
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="additionalMetadata"
          sx={{
            minHeight: '70px',
          }}
        >
          <Typography sx={{ width: '33%', flexShrink: 0, fontSize: '20px', fontWeight: 500, color: '#6f7276' }}>ADDITIONAL METADATA</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Box
              className="additional-metadata-block"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                width: '100%',
              }}
            >
              {additionalMetadata.map((item, index) => (
                <Box key={index} className={`metadata-column column-${index}`}>
                  <Box
                    className="meta-block"
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: '15px',
                    }}
                  >
                    <TextField
                      id={`metadataName-${index}`}
                      label="Name"
                      value={item.name || ''}
                      onChange={(e) => updateFieldValue(index, 'name', e.target.value)}
                      onBlur={() => handleAutosave(null, 'additionalMetadata', additionalMetadata)}
                      variant="outlined"
                      sx={{
                        width: '100%',
                        marginTop: '0px',
                        '& .MuiInputBase-input': { height: '20px' },
                      }}
                    />
                    <TextField
                      id={`metadataValue-${index}`}
                      label="Value"
                      value={item.value || ''}
                      onChange={(e) => updateFieldValue(index, 'value', e.target.value)}
                      onBlur={() => handleAutosave(null, 'additionalMetadata', additionalMetadata)}
                      variant="outlined"
                      sx={{
                        width: '100%',
                        marginTop: '0px',
                        '& .MuiInputBase-input': { height: '20px' },
                      }}
                    />
                    {index != 0 ? (
                      <div
                        className="delete-metadataBlock"
                        data-index={index}
                        onClick={() => handleDeleteField(index)}
                        style={{
                          cursor: 'pointer',
                        }}
                      >
                        <DeleteIcon />
                      </div>
                    ) : (
                      <div
                        className="delete-metadataBlock"
                        data-index={index}
                        style={{
                          visibility: 'hidden',
                        }}
                      >
                        <DeleteIcon />
                      </div>
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
            <Button
              id="addMetadataBlock"
              variant="outlined"
              onClick={handleAdditionalMetadata}
              sx={{
                width: 150,
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
              Add Metadata
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
