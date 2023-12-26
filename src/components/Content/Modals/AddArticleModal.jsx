import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

export default function AddArticleModal({ createContent }) {
  return (
    <>
      <Typography
        id="article-modal-title"
        variant="h6"
        component="h2"
        sx={{ fontSize: '28px' }}
      >
        Add Article
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          marginTop: '80px',
        }}
      >
        <Button
          id="rssArticle"
          variant="outlined"
          sx={{
            width: 200,
            height: 35,
            fontWeight: 500,
            fontSize: '14px',
            '&:hover': {
              backgroundColor: 'primary.main',
              color: '#FFFFFF',
            },
          }}
        >
          RSS
        </Button>
        <Button
          id="createArticle"
          variant="outlined"
          onClick={createContent}
          sx={{
            width: 200,
            height: 35,
            fontWeight: 500,
            fontSize: '14px',
            '&:hover': {
              backgroundColor: 'primary.main',
              color: '#FFFFFF',
            },
          }}
        >
          Create Article
        </Button>
      </Box>
    </>
  )
}
