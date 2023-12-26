import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DateTimePick from '../common/DateTimePick';
import { Autocomplete, Box, TextField } from '@mui/material';

export default function ContentAirDate({airDateTime, setAirDateTime, timeZoneList, airTimezone, handleAsyncDateChange}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div style={{paddingTop: "40px"}}>
      <Accordion 
        expanded={expanded === 'contentAirDate'} 
        onChange={handleChange('contentAirDate')}
        sx={{
            backgroundColor: "white"
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="contentAirDate"
          sx={{
            minHeight: "70px"
          }}
        >
          <Typography sx={{ width: '33%', flexShrink: 0, fontSize: "20px", fontWeight: 500, color: "#6f7276" }}>
            AIR DATE
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
            <DateTimePick label="Air Date Time" boxId="airDateTimeBox" id="airDateTime"
              value={airDateTime} 
              handleChange={setAirDateTime} 
              handleAsyncDateChange={handleAsyncDateChange}/>
            <Autocomplete
              id="airTimezone"
              options={timeZoneList.map((option) => option.text)}
              value={airTimezone}
              onChange={(e, val) => handleAsyncDateChange(val,"airTimezone")}
              renderInput={(params) => <TextField {...params} name="airTimezone" label="Air Timezone" />}
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