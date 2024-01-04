import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DropEpisode from '../DropEpisode';



export default function SeasonGroup({ seasonGroup, setSeasonGroup, handleAutosave ,handleEpisodeDrop,handleEpisodeDeletion,handleSeasonGroup}) {
  const updateFieldValue = (index, field, value) => {
    const updatedFieldValues = [...seasonGroup];
    updatedFieldValues[index][field] = value;
    setSeasonGroup(updatedFieldValues);
  };

  const handleDeleteField = (index) => {
    const updatedFieldValues = seasonGroup.filter((_, i) => i !== index);
    setSeasonGroup(updatedFieldValues);
    handleAutosave(null, 'seasonGroup', updatedFieldValues);
  };


  return (
    <div style={{ paddingTop: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
      <Button
        id="addSeasonBlock"
        variant="outlined"
        onClick={handleSeasonGroup}
        sx={{
          width: 150,
          height: 35,
          marginBottom: '20px',
          marginLeft: '18px',
          fontWeight: 500,
          fontSize: '14px',
          '&:hover': {
            backgroundColor: 'primary.main',
            color: '#FFFFFF',
          },
        }}
      >
        + New Season
      </Button>

      {seasonGroup.map((item, index) => (
        <Accordion key={index} sx={{ marginBottom: '20px', background: 'inherit' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ width: '100%', justifyContent: 'center', background: 'inherit' }}>
            <Typography variant="h6" sx={{ color: 'inherit' }}>
              Season {index + 1}
            </Typography>
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
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '15px',
                  width: '100%',
                }}
              >
                <TextField
                  id={`seasonName-${index}`}
                  label="Name"
                  value={item.name || ''}
                  onChange={(e) => updateFieldValue(index, 'name', e.target.value)}
                  onBlur={() => handleAutosave(null, 'seasonGroup', seasonGroup)}
                  variant="outlined"
                  sx={{
                    width: '50%',
                    marginTop: '0px',
                    '& .MuiInputBase-input': { height: '20px' },
                  }}
                />

                <TextField
                  id={`seasonPurchase-${index}`}
                  label="Purchase"
                  value={item.purchase || ''}
                  onChange={(e) => updateFieldValue(index, 'purchase', e.target.value)}
                  onBlur={() => handleAutosave(null, 'seasonGroup', seasonGroup)}
                  variant="outlined"
                  sx={{
                    width: '50%',
                    marginTop: '0px',
                    '& .MuiInputBase-input': { height: '20px' },
                  }}
                />
              </Box>

              <TextField
                id={`seasonDescription-${index}`}
                label="Description"
                value={item.description || ''}
                onChange={(e) => updateFieldValue(index, 'description', e.target.value)}
                onBlur={() => handleAutosave(null, 'seasonGroup', seasonGroup)}
                variant="outlined"
                sx={{
                  width: '100%',
                  marginTop: '0px',
                  '& .MuiInputBase-input': { height: '20px' },
                }}
              />
              <DropEpisode handleEpisodeDrop={handleEpisodeDrop} 
              episodes={seasonGroup[index]?.episodes?.length ? seasonGroup[index].episodes : []}
              index={index}
              handleEpisodeDeletion={handleEpisodeDeletion}
              />

              {index !== 0 && (
                <div
                  className="delete-seasonBlock"
                  onClick={() => handleDeleteField(index)}
                  style={{
                    cursor: 'pointer',
                  }}
                >
                  <DeleteIcon />
                </div>
              )}
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

