import React from 'react';
import { useDrop } from 'react-dnd';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/material';

const DropEpisode = ({ episodes, index, handleEpisodeDrop, handleEpisodeDeletion }) => {
  const [, drop] = useDrop(() => ({
    accept: 'ITEM',
    drop: (item) => {
      const newEpisode = {
        id: item.videoId,
        title: item.videoTitle,
      };
      handleEpisodeDrop(index, newEpisode);
    },
  }));

  // console.log(episodes, "sahil check 2");

  return (
    <div
      ref={drop}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          minHeight: '50px',
          width: 470,
          overflowY: 'auto',
          border: '1px',
        }}
      >
        {episodes.length > 0 ? (
  episodes.map((episode, episodeIndex) => (
    <div
    key={episode.id}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '10px',
      border: '1px solid #ccc',
      padding: '10px',
      width: '100%',
      height:'40px'
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-between', width:'320px' }}>
      <p style={{ marginRight: '10px' }}>Ep{episodeIndex + 1}</p>
      <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {episode.title.length > 30 ? `${episode.title.slice(0, 30)}...` : episode.title}
      </p>
    </div>
    <div style={{ cursor: 'pointer' }} onClick={() => handleEpisodeDeletion(index, episodeIndex)}>
      <DeleteIcon />
    </div>
  </div>
  
  ))
) : (
  <h4>No episodes have been added</h4>
)}

        
      </Box>
    </div>
  );
};

export default DropEpisode;
