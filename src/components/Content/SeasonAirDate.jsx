import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DateTimePick from '../common/DateTimePick';
import { Autocomplete, Box, TextField } from '@mui/material';

export default function SeasonAirDate({seasonAirDateTime, setSeasonAirDateTime, timeZoneList, seasonAirTimezone, handleAsyncDateChange}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div style={{paddingTop: "40px"}}>
      <Accordion 
        expanded={expanded === 'seasonAirDate'} 
        onChange={handleChange('seasonAirDate')}
        sx={{
            backgroundColor: "white"
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="seasonAirDate"
          sx={{
            minHeight: "70px"
          }}
        >
          <Typography sx={{ width: '33%', flexShrink: 0, fontSize: "20px", fontWeight: 500, color: "#6f7276" }}>
            SEASON AIR DATE
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box 
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "15px"
            }}
          >
            <DateTimePick label="Season Air Date" boxId="seasonAirDateBox" id="seasonAirDateTime"
              value={seasonAirDateTime} 
              handleChange={setSeasonAirDateTime} 
              handleAsyncDateChange={handleAsyncDateChange}/>
            <Autocomplete
              id="seasonAirTimezone"
              options={timeZoneList.map((option) => option.text)}
              value={seasonAirTimezone}
              onChange={(e, val) => handleAsyncDateChange(val,"seasonAirTimezone")}
              renderInput={(params) => <TextField {...params} name="seasonAirTimezone" label="Season Air Timezone" />}
              sx={{
                width: "250px"
              }}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}