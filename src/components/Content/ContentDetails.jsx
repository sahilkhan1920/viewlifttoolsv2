import { Box } from '@mui/material'
import React from 'react'
import moment from 'moment';
import { getTagName } from 'src/helpers/contentHelper'

const ContentDetails = ({contentDetails}) => {

    const addedDate = contentDetails.addedDate || contentDetails.uploadedDate;
    const updatedDate = contentDetails.updatedDate || contentDetails.updateDate;

  return (
    <Box
        sx={{
            width: "66%"
        }}
    >
        <Box 
            id="contentTitle"
            sx={{
                fontSize: '14px',
                fontWeight: '900',
                color: '#6f7276',
                textTransform: 'uppercase',
            }}
        >
            {contentDetails.title}
        </Box>
        <Box 
            sx={{
                display: 'flex',
                alignItems: 'center'
            }}
        >
            <Box component="span" 
                sx={{
                    backgroundColor: '#b9bfca',
                    border: 1,
                    borderColor: '#c1c7d0',
                    paddingY: '1px',
                    paddingX: '10px',
                    color: '#FFF',
                    marginRight: '8px',
                    textTransform: 'uppercase'
                }}
            >
                {getTagName(contentDetails)}
            </Box>
            {((contentDetails.contentStatus == "closed" || contentDetails.status == "closed") && !contentDetails.archivedDate) &&
                <Box 
                    sx={{
                        color: '#6f7276',
                        fontSize: '14px'
                    }} 
                    component="span"
                >
                    - Added on: {(moment(addedDate, 'YYYYMMDD').format('MM/DD/YYYY'))}
                </Box>
            }
            {((contentDetails.contentStatus == "open" || contentDetails.status == "open") && !contentDetails.archivedDate) &&
                <Box 
                    sx={{
                    color: '#6f7276',
                    fontSize: '14px'
                    }}
                >
                    - Published on: {(moment(contentDetails.publishDate, 'YYYYMMDD').format('MM/DD/YYYY'))}
                </Box>
            }
            {((contentDetails.contentStatus == "open" || contentDetails.status == "open") && !contentDetails.archivedDate) &&
                <Box 
                    sx={{
                    marginLeft: '10px',
                    color: '#6f7276',
                    fontSize: '14px'
                    }}
                >
                    - Updated on: {(moment(updatedDate, 'YYYYMMDD').format('MM/DD/YYYY'))}
                </Box>
            }
            {contentDetails.archivedDate &&
                <Box 
                    sx={{
                        color: '#6f7276',
                        fontSize: '14px'
                    }} 
                    component="span"
                >
                    - Archived on: {(moment(contentDetails.archivedDate, 'YYYYMMDD').format('MM/DD/YYYY'))}
                </Box>
            }
        </Box> 
    </Box>
  )
}

export default ContentDetails