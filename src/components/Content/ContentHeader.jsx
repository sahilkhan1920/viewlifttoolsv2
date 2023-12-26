import React from 'react'
import { Box, TextField, Button } from '@mui/material'
import Typography from '@mui/material/Typography'
import AddContentModal from './Modals/AddContentModal'
import { useAppContext } from 'src/contexts/AppContext'
import useContentModal from 'src/hooks/Content/useContentModal'
import ThirdPartyLiveModal from './Modals/ThirdPartyLiveModal'
import SelfServiceLiveModal from './Modals/SelfServiceLiveModal'
import ScheduleModal from './Modals/ScheduleModal'

const ContentHeader = () => {
  const {
    data: { selectedContent },
  } = useAppContext()

  const { open, openModal, createContent, thirdPartyLiveModal, selfServiceLiveModal, handleLiveEventModal, closeLiveEventModal, closeModal, scheduleModal } =
    useContentModal()

  const { updateData } = useAppContext()

  const onKeywordSearch = (e) => {
    updateData({
      contentSearchKeyword: e.target.value,
    })
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          padding: '40px 0px 30px 40px',
          alignItems: 'center',
          gap: '75px',
        }}
      >
        <Typography variant="h2" color="primary">
          Content
        </Typography>
        <TextField
          id="searchContent"
          label="Search Content"
          variant="outlined"
          sx={{
            width: 600,
          }}
          onChange={(e) => onKeywordSearch(e)}
        />
        <Button
          variant="contained"
          sx={{
            width: 200,
            fontWeight: 700,
            fontSize: '16px',
          }}
          onClick={openModal}
        >
          ADD {selectedContent ? selectedContent.toUpperCase() : 'NEW'}
        </Button>
      </Box>
      <AddContentModal open={open} handleClose={closeModal} createContent={createContent} handleLiveEventModal={handleLiveEventModal} />
      {thirdPartyLiveModal && <ThirdPartyLiveModal open={thirdPartyLiveModal} close={closeLiveEventModal} />}
      {selfServiceLiveModal && <SelfServiceLiveModal open={selfServiceLiveModal} close={closeLiveEventModal} />}
      {scheduleModal && <ScheduleModal open={scheduleModal} close={closeModal} listTemplate="POST" />}
    </Box>
  )
}

export default ContentHeader
