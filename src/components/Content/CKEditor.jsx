import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import dynamic from 'next/dynamic';

const DynamicEditor = dynamic(() => import('./ContentEditor'), {
  ssr: false,
});

export default function CKEditor({value,ckEditorDataSave}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div style={{paddingTop: "40px"}}>
      <Accordion 
        expanded={expanded === 'ckeditor'} 
        onChange={handleChange('ckeditor')}
        sx={{
            backgroundColor: "white"
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="ckeditor"
          sx={{
            minHeight: "70px"
          }}
        >
          <Typography sx={{ width: '33%', flexShrink: 0, fontSize: "20px", fontWeight: 500, color: "#6f7276" }}>
            EDITOR
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DynamicEditor value={value} ckEditorDataSave={ckEditorDataSave} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
