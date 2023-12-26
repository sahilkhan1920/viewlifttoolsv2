/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button } from '@mui/material'
import React from 'react'
import logo from 'public/viewlift/unofficial-viewlift-logo.png'
import Image from 'next/image'
import moment from 'moment'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import CloseIcon from '@mui/icons-material/Close'

const ContentEditHeader = ({
  headerData,
  successAutosave,
  failedAutosave,
  setSucessAutosave,
  setFailedAutosave,
  contentButtonsAction,
  archiveContent,
  updateContent,
  publishDisabled,
  handleEditViewClose,
  showDuplicateContent
}) => {
  const [saveDisabled, setSaveDisabled] = React.useState(true)
  const [showSave, setShowSave] = React.useState(true)
  const [showReview, setShowReview] = React.useState(false)
  const [showSubmitReview, setShowSubmitReview] = React.useState(false)

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '70px',
        zIndex: 999,
        backgroundColor: '#e8e8e8',
      }}
    >
      <Box
        sx={{
          paddingX: 3,
          backgroundColor: 'primary.light',
          width: 'fit-content',
          display: 'flex',
        }}
      >
        <Image src={logo} width={70} alt="Logo" />
      </Box>
      {(headerData.contentStatus == 'closed' || headerData.status == 'closed') && headerData.isActive && (
        <Button
          id="contentArchive"
          data-label="contentArchive"
          variant="outlined"
          onClick={contentButtonsAction}
          sx={{
            width: 100,
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
          ARCHIVE
        </Button>
      )}
      {(headerData.contentStatus == 'closed' || headerData.status == 'closed') && !headerData.isActive && (
        <Button
          id="contentUnarchive"
          data-label="contentUnarchive"
          variant="outlined"
          onClick={contentButtonsAction}
          sx={{
            width: 100,
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
          UNARCHIVE
        </Button>
      )}
      {headerData.isActive && showDuplicateContent && (
        <Button
          id="contentDuplicate"
          variant="outlined"
          sx={{
            width: 100,
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
          DUPLICATE
        </Button>
      )}
      {(headerData.contentStatus == 'open' || headerData.status == 'open') && headerData.isActive && (
        <Button
          id="contentPreview"
          variant="outlined"
          sx={{
            width: 100,
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
          PREVIEW
        </Button>
      )}
      <Box sx={{ width: '300px', marginLeft: '18px', marginTop: '15px' }}>
        <Collapse in={successAutosave}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setSucessAutosave(false)
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
            severity="success"
            color="success"
          >
            Saved at {moment().format('hh:mm a')}
          </Alert>
        </Collapse>
      </Box>
      <Box sx={{ width: '300px', marginLeft: '18px', marginTop: '15px' }}>
        <Collapse in={failedAutosave}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setFailedAutosave(false)
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
            severity="error"
            color="error"
            id="autosaveFailed"
          >
            Autosave Failed!
          </Alert>
        </Collapse>
      </Box>
      <Box
        sx={{
          display: 'flex',
          position: 'absolute',
          right: '115px',
        }}
      >
        {(headerData.contentStatus == 'open' || headerData.status == 'open') && headerData.isActive && (
          <Button
            id="contentUnpublish"
            data-label="contentUnpublish"
            variant="outlined"
            sx={{
              width: 100,
              height: 35,
              marginLeft: '18px',
              fontWeight: 500,
              fontSize: '14px',
              '&:hover': {
                backgroundColor: 'primary.main',
                color: '#FFFFFF',
              },
            }}
            onClick={contentButtonsAction}
          >
            UNPUBLISH
          </Button>
        )}
        {showSave && (
          <Button
            id="contentSave"
            variant="outlined"
            sx={{
              width: 100,
              height: 35,
              marginLeft: '18px',
              fontWeight: 500,
              fontSize: '14px',
              '&:hover': {
                backgroundColor: 'primary.main',
                color: '#FFFFFF',
              },
            }}
            disabled={saveDisabled}
          >
            SAVE
          </Button>
        )}
        {(headerData.contentStatus == 'open' || headerData.status == 'open') && headerData.isActive && (
          <Button
            id="contentUpdate"
            data-label="contentUpdate"
            variant="contained"
            sx={{
              width: 100,
              height: 35,
              marginLeft: '18px',
              fontWeight: 500,
              fontSize: '14px',
              '&:hover': {
                backgroundColor: 'primary.main',
                color: '#FFFFFF',
              },
            }}
            onClick={contentButtonsAction}
          >
            UPDATE
          </Button>
        )}
        {(headerData.contentStatus == 'closed' || headerData.status == 'closed') && headerData.isActive && (
          <Button
            id="contentPublish"
            data-label="contentPublish"
            variant="contained"
            sx={{
              width: 100,
              height: 35,
              marginLeft: '18px',
              fontWeight: 500,
              fontSize: '14px',
              '&:hover': {
                backgroundColor: 'primary.main',
                color: '#FFFFFF',
              },
            }}
            disabled={publishDisabled}
            onClick={contentButtonsAction}
          >
            PUBLISH
          </Button>
        )}
        {showReview && (
          <Button
            id="contentReview"
            variant="contained"
            sx={{
              width: 100,
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
            REVIEW
          </Button>
        )}
        {showSubmitReview && (
          <Button
            id="contentSubmitReview"
            variant="outlined"
            sx={{
              width: 175,
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
            SUBMIT FOR REVIEW
          </Button>
        )}
      </Box>
      <Box
        sx={{
          position: 'absolute',
          right: 0,
          fontSize: '40px',
          color: '#ffffff',
          backgroundColor: 'black',
          width: '70px',
          height: '70px',
          padding: '16.5px',
          textAlign: 'center',
          cursor: 'pointer',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '35px',
            height: '35px',
            background: '#fff',
            borderRadius: '50%',
            fontSize: '18px',
            color: 'black',
          }}
        >
          <IconButton aria-label="close" onClick={handleEditViewClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}

export default ContentEditHeader
