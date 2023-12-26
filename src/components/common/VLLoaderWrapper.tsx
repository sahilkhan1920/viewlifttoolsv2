import React from 'react'
import { Box, CircularProgress } from '@mui/material'

type LoaderProps = {
  loading: boolean
  type?: 'inline' | 'overlay'
  fullWidth?: boolean
}

const OVERLAY_STYLE = {
  position: 'absolute',
  top: '30%',
  left: '50%',
}
const INLINE_STYLE = {
  position: 'relative',
}
const VLLoaderWrapper: React.FC<React.PropsWithChildren<LoaderProps>> = ({ loading, children, type = 'overlay', fullWidth = true }) => {
  if (loading)
    return (
      <Box width={fullWidth ? '100%' : 'fit-content'} display="flex" alignItems="center" justifyContent="center">
        <CircularProgress sx={type === 'inline' ? INLINE_STYLE : OVERLAY_STYLE} />
      </Box>
    )

  return <>{children}</>
}

export default VLLoaderWrapper
