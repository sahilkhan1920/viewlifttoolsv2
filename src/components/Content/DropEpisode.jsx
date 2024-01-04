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

  console.log(episodes, "sahil check 2");

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
          width: 400,
          overflowY: 'auto',
          border: '1px',
        }}
      >
        {episodes.length > 0 ? (
  episodes.map((episode, episodeIndex) => (
    <div key={episode.id} style={{ position: 'relative', marginBottom: '10px', border: '1px ' }}>
      <p>Episode {episodeIndex + 1}</p>
      <p>{episode.title}</p>
      <div
        style={{
          position: 'absolute',
          bottom: '5px',
          right: '5px',
          zIndex: 999,
          width: '30px',
          height: '30px',
          padding: '3px',
          backgroundColor: 'white',
          textAlign: 'center',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={() => handleEpisodeDeletion(index, episodeIndex)}
      >
        <DeleteIcon />
      </div>
    </div>
  ))
) : (
  <p>No episodes have been added</p>
)}

        
      </Box>
    </div>
  );
};

export default DropEpisode;
