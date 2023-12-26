import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Box, IconButton, MenuItem, Select, TextField } from '@mui/material'
import VLImagePreview from 'src/components/common/VLImagePreview'
import SaveIcon from '@mui/icons-material/Save'
import { useTheme } from '@mui/material/styles'
import { useRef } from 'react'

const ImageSelector = ({
  images,
  onChange,
  label,
  dataObj,
  fieldKey,
  preview,
  save,
  backgroundChange,
}) => {
  const theme = useTheme()
  const textBoxRef = useRef(null)

  if (!dataObj) return

  const name = dataObj?.imageURI?.split('/').pop()
  dataObj.heading = label
  dataObj.footerText = name

  return (
    <Box
      direction="column"
      sx={{
        width: '100%',
        color: theme.palette.primary.main,
      }}
    >
      <Typography variant="h6" color="primary">
        {label}
      </Typography>
      <Stack
        direction="row"
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Select
          name={`${fieldKey}.imageURI`}
          value={dataObj?.imageURI}
          onChange={onChange}
          size="small"
          sx={{
            width: '12em',
          }}
        >
          {images.map((image) => (
            <MenuItem key={image.Key} value={image.imageURI}>
              {image.name}
            </MenuItem>
          ))}
        </Select>
        {preview && <VLImagePreview imageObj={dataObj} />}
        {backgroundChange && (
          <>
            <TextField
              name={`${fieldKey}.background`}
              value={dataObj?.background || '#ffffff'}
              type="color"
              onChange={onChange}
              sx={{
                width: '50px',
                mr: 1,
              }}
              inputRef={textBoxRef}
            />
            <Typography variant="subtitle1">Background</Typography>
          </>
        )}
        {save && (
          <IconButton color="inherit">
            <SaveIcon />
          </IconButton>
        )}
      </Stack>
    </Box>
  )
}

export default ImageSelector
