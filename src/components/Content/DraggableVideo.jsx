import { Box } from '@mui/material';
import { useDrag } from 'react-dnd';

const VideoItem = ({ videoId, videoTitle, isReordering }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'ITEM',
    item: { videoId, videoTitle, isReordering },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <Box
      ref={dragRef} 
      sx={{
        width: "100%", height: 40, padding: "5px 10px", border: "1px solid #ccc", color: "#6f7276",
        overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", borderRadius: "3px",
        opacity: isDragging ? 0.5 : 1, cursor: 'move'
      }}
    >
      {videoTitle}
    </Box>
  );
};

export default VideoItem