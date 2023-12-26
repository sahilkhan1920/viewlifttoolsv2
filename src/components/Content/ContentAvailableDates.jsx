import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DateTimePick from '../common/DateTimePick';
import { Autocomplete, Box, TextField } from '@mui/material';

export default function ContentAvailableDates({startDateTime, setStartDateTime, endDateTime, setEndDateTime, timeZoneList, timezone, handleAsyncDateChange}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div style={{paddingTop: "40px"}}>
      <Accordion 
        expanded={expanded === 'contentAvailabilityDates'} 
        onChange={handleChange('contentAvailabilityDates')}
        sx={{
            backgroundColor: "white"
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="contentAvailabilityDates"
          sx={{
            minHeight: "70px"
          }}
        >
          <Typography sx={{ width: '33%', flexShrink: 0, fontSize: "20px", fontWeight: 500, color: "#6f7276" }}>
            CONTENT AVAILABILITY DATES
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
            <DateTimePick label="Start Date Time" boxId="startDateTimeBox" id="startDateTime"
              value={startDateTime} 
              handleChange={setStartDateTime} 
              handleAsyncDateChange={handleAsyncDateChange}/>
            <DateTimePick label="End Date Time" boxId="endDateTimeBox" id="endDateTime" 
              value={endDateTime} 
              handleChange={setEndDateTime} 
              handleAsyncDateChange={handleAsyncDateChange}/>
            <Autocomplete
              id="timezone"
              options={timeZoneList.map((option) => option.text)}
              value={timezone}
              onChange={(e, val) => handleAsyncDateChange(val,"timezone")}
              renderInput={(params) => <TextField {...params} name="timezone" label="Timezone" />}
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
