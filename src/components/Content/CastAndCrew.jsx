import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';
import { WithContext as ReactTags } from 'react-tag-input';
import styles from '../../../styles/ReactTags.module.css';

export default function CastAndCrew({director, handleDirectorAddition, handleDirectorDeletion, starring, handleStarringAddition, handleStarringDeletion}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div style={{paddingTop: "40px"}}>
      <Accordion 
        expanded={expanded === 'castAndCrew'} 
        onChange={handleChange('castAndCrew')}
        sx={{
            backgroundColor: "white"
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="castAndCrew"
          sx={{
            minHeight: "70px"
          }}
        >
          <Typography sx={{ width: '33%', flexShrink: 0, fontSize: "20px", fontWeight: 500, color: "#6f7276" }}>
            CAST AND CREW
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "baseline"
            }}
          >
            <Box
              sx={{
                flex: 1,
                marginRight: "20px"
              }}
            >
              <Typography component='label' sx={{fontSize: "14px"}}>Cast</Typography>
              <Box
                sx={{
                  width: "100%",
                  height: "108px",
                  pointerEvents: "all",
                  border: "1px solid #CCC",
                  padding: "5px",
                  borderRadius: "4px",
                  overflowY: "auto"
                }}
              >
                <ReactTags
                  name='starring'
                  tags={starring}
                  handleAddition={handleStarringAddition}
                  handleDelete={handleStarringDeletion}
                  placeholder="Add Keywords..."
                  classNames={{
                    tags: `${styles.tagsContainer}`,
                    selected: `${styles.selected}`,
                    tagInputField: `${styles.tagInputField}`,
                    editTagInputField: `${styles.tagInputField}`,
                    tag: `${styles.tagItem}`,
                    remove: `${styles.tagRemove}`,
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                flex: 1
              }}
            > 
              <Typography component='label' sx={{fontSize: "14px"}}>Director</Typography>
              <Box
                sx={{
                  width: "100%",
                  height: "108px",
                  pointerEvents: "all",
                  border: "1px solid #CCC",
                  padding: "5px",
                  borderRadius: "4px",
                  overflowY: "auto"
                }}
              >
                <ReactTags
                  name='director'
                  tags={director}
                  handleAddition={handleDirectorAddition}
                  handleDelete={handleDirectorDeletion}
                  placeholder="Add Keywords..."
                  classNames={{
                    tags: `${styles.tagsContainer}`,
                    selected: `${styles.selected}`,
                    tagInputField: `${styles.tagInputField}`,
                    editTagInputField: `${styles.tagInputField}`,
                    tag: `${styles.tagItem}`,
                    remove: `${styles.tagRemove}`,
                  }}
                />
              </Box>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}