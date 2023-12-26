import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function ContentLoader({top,left}) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress 
        sx={{
          position: 'absolute',
          top: top ? top : '50%',
          left: left ? left : '50%',
        }}
      />
    </Box>
  );
}