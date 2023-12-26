import React, { useRef, useState } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  Typography,
} from '@mui/material'
import SettingsIcon from 'public/cms2/settings.png'
import EyeIcon from 'public/cms2/eye.png'
import Image from 'next/image'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const ContentTile = ({
  id,
  name,
  tag,
  updatedDate,
  updateDate,
  publishedDate,
  addedDate,
  archivedDate,
  contentStatus,
  isActive,
  reviewStatus,
  icon,
  guid,
  apiType,
  handleSelect,
  checked,
  handleSettingsClick
}) => {
  const [accordionOpen, setAccordionOpen] = useState(false)
  const iconRef = useRef()

  const handleMouseEnter = () => {
    iconRef.current.style.display = 'block'
  }
  const hanldeMouseLeave = () => {
    iconRef.current.style.display = 'none'
  }
  const handleListButton = (e) => {
    console.log(e)
    // const contentStatus =  e.target.getAttribute("data-status")
  }

  return (
    <Accordion
      sx={{ margin: 0, padding: 0 }}
      expanded={accordionOpen}
      data-id={guid}
      data-api-type={apiType}
    >
      <AccordionSummary
        sx={{
          '& .MuiAccordionSummary-content': { margin: 0, padding: 0 },
          padding: 0,
        }}
        expandIcon={
          <ExpandMoreIcon
            sx={{ width: 50 }}
            onClick={() => setAccordionOpen(!accordionOpen)}
          />
        }
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Box
          onMouseEnter={handleMouseEnter}
          onMouseLeave={hanldeMouseLeave}
          sx={{
            width: '100%',
            height: 100,
            padding: 2,
            margin: 0,
            borderColor: '#ddd',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '40%',
            }}
          >
            <Checkbox
              sx={{ marginRight: 3 }}
              checked={Boolean(checked)}
              onChange={() => {
                handleSelect(id)
              }}
            />
            <Box sx={{ marginRight: 3 }}>
              <Image src={icon} height={30} width={40} alt="Logo" />
            </Box>
            <Box>
              <Box
                sx={{
                  fontSize: '14px',
                  fontWeight: '900',
                  color: '#6f7276',
                  textTransform: 'uppercase',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  width: {
                    xs: 10,
                  },
                }}
              >
                {name}
              </Box>
              <Box
                sx={{
                  width: '485px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Box
                  component="span"
                  sx={{
                    backgroundColor: '#b9bfca',
                    border: 1,
                    borderColor: '#c1c7d0',
                    paddingY: '1px',
                    paddingX: '10px',
                    color: '#FFF',
                    marginRight: '8px',
                    textTransform: 'uppercase',
                  }}
                >
                  {tag}
                </Box>
                {isActive && (
                  <Box
                    sx={{
                      color: '#6f7276',
                      fontSize: '14px',
                    }}
                    component="span"
                  >
                    {contentStatus == 'open'
                      ? `- Published on: ${publishedDate}`
                      : `- Added on: ${addedDate}`}
                  </Box>
                )}
                {isActive &&
                  contentStatus == 'open' &&
                  (updatedDate || updateDate) && (
                    <Box
                      sx={{
                        marginLeft: '10px',
                        color: '#6f7276',
                        fontSize: '14px',
                      }}
                    >
                      - Updated on: {updatedDate || updateDate}
                    </Box>
                  )}
                {!isActive && (
                  <Box
                    sx={{
                      color: '#6f7276',
                      fontSize: '14px',
                    }}
                    component="span"
                  >
                    - Archived on: {archivedDate}
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
          <Box
            ref={iconRef}
            sx={{
              display: 'none',
            }}
          >
            <Image
              style={{ cursor: 'pointer' }}
              src={SettingsIcon}
              height={30}
              width={30}
              alt="Settings"
              onClick={handleSettingsClick}
            />
            <Image
              style={{ cursor: 'pointer' }}
              src={EyeIcon}
              height={30}
              width={30}
              alt="Eye"
            />
          </Box>
          <Box>
            {isActive && reviewStatus != 'inReview' && (
              <Button
                sx={{
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: '#FFFFFF',
                  },
                }}
                variant="outlined"
                onClick={handleListButton}
                data-status={contentStatus}
              >
                {contentStatus == 'open' ? 'Update' : 'Publish'}
              </Button>
            )}
            {!isActive && reviewStatus != 'inReview' && (
              <Button
                sx={{
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: '#FFFFFF',
                  },
                }}
                variant="outlined"
                onClick={handleListButton}
                data-status={!isActive ? 'archived' : contentStatus}
              >
                Unarchive
              </Button>
            )}
            {reviewStatus == 'inReview' && (
              <Button
                sx={{
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: '#FFFFFF',
                  },
                }}
                variant="outlined"
                onClick={handleListButton}
                data-status={reviewStatus}
              >
                Review
              </Button>
            )}
            <Button
              sx={{
                display: 'none',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: '#FFFFFF',
                },
              }}
              variant="outlined"
              onClick={handleListButton}
            >
              Submit For Review
            </Button>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Please click on settings icon for more info.
        </Typography>
      </AccordionDetails>
    </Accordion>
  )
}

export default ContentTile
