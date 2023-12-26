import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContentTextfield from 'src/components/Content/ContentTextfield'
import ContentMultilineField from 'src/components/Content/ContentMultilineField'
import { Box } from '@mui/material';
import { WithContext as ReactTags } from 'react-tag-input';
import styles from '../../../styles/ReactTags.module.css';

export default function ContentSeo({formik,handleAutosave,seoKeywords,handleSeoKeywordsAddition,handleSeoKeywordsDeletion}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div style={{paddingTop: "40px"}}>
      <Accordion 
        expanded={expanded === 'contentSeo'} 
        onChange={handleChange('contentSeo')}
        sx={{
            backgroundColor: "white"
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="contentSeo"
          sx={{
            minHeight: "70px"
          }}
        >
          <Typography sx={{ width: '33%', flexShrink: 0, fontSize: "20px", fontWeight: 500, color: "#6f7276" }}>
            SEO
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
              <ContentTextfield
                value={formik?.values?.seoTitle}
                handleChange={formik.handleChange}
                handleAutosave={handleAutosave}
                id="seoTitle" label="Title" width='100%' marginTop='0px' name="seoTitle"
                required={false}
              />
              <Box
                sx={{
                  width: "100%",
                  height: "108px",
                  pointerEvents: "all",
                  border: "1px solid #CCC",
                  padding: "5px",
                  borderRadius: "4px",
                  overflowY: "auto",
                  marginTop: "15px"
                }}
              >
                <ReactTags
                  name='seoKeywordsInput'
                  tags={seoKeywords}
                  handleAddition={handleSeoKeywordsAddition}
                  handleDelete={handleSeoKeywordsDeletion}
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
              <ContentTextfield
                value={formik?.values?.seoRedirectUrl}
                handleChange={formik.handleChange}
                handleAutosave={handleAutosave}
                id="seoRedirectUrl" label="Redirect Url" width='100%' marginTop='15px' name="seoRedirectUrl"
                required={false}
              />
              <ContentTextfield
                value={formik?.values?.seoRedirectCode}
                handleChange={formik.handleChange}
                handleAutosave={handleAutosave}
                id="seoRedirectCode" label="Redirect Code" width='100%' marginTop='15px' name="seoRedirectCode"
                required={false}
              />
            </Box>
            <Box
              sx={{
                flex: 1
              }}
            > 
              <ContentTextfield
                value={formik?.values?.seoH1Title}
                handleChange={formik.handleChange}
                handleAutosave={handleAutosave}
                id="seoH1Title" label="H1 Title" width='100%' marginTop='0px' name="seoH1Title"
                required={false}
              />
              <ContentTextfield
                value={formik?.values?.seoH2Title}
                handleChange={formik.handleChange}
                handleAutosave={handleAutosave}
                id="seoH2Title" label="H2 Title" width='100%' marginTop='15px' name="seoH2Title"
                required={false}
              />
              <ContentMultilineField
                value={formik?.values?.seoDescription}
                handleChange={formik.handleChange}
                handleAutosave={handleAutosave}
                id="seoDescription" label="Description" width='100%' marginTop='15px' name="seoDescription" rows={4}
              />
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
