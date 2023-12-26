import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { useAppContext } from 'src/contexts/AppContext'
import AddArticleModal from './AddArticleModal'
import AddPlaylistModal from './AddPlaylistModal'
import AddLiveModal from './AddLiveModal'
import AddGameEventModal from './AddGameEventModal'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 500,
  minHeight: 300,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  borderRadius: '5px',
  textAlign: 'center',
}

export default function AddContentModal({ open, handleClose, createContent, handleLiveEventModal }) {
  const {
    data: { selectedContent },
  } = useAppContext()
  return (
    <div>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          {selectedContent === 'article' && <AddArticleModal createContent={createContent} />}
          {selectedContent === 'videoplaylist' && <AddPlaylistModal createContent={createContent} />}
          {selectedContent === 'event' && <AddGameEventModal createContent={createContent} />}
          {selectedContent === 'live' && <AddLiveModal handleLiveEventModal={handleLiveEventModal} />}
        </Box>
      </Modal>
    </div>
  )
}
