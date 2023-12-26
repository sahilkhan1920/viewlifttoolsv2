import { SearchOutlined } from '@mui/icons-material'
import { Box, InputAdornment, OutlinedInput, OutlinedInputProps } from '@mui/material'

export default function SortedTableHeaderSearchBar({ id, placeholder, value, onChange, startAdornment, sx, ...rest }: OutlinedInputProps) {
  return (
    <Box p={1}>
      <OutlinedInput
        id={id}
        size="small"
        type="text"
        fullWidth
        placeholder={placeholder ?? 'Search...'}
        startAdornment={
          startAdornment ? (
            startAdornment
          ) : (
            <InputAdornment position="start">
              <SearchOutlined />
            </InputAdornment>
          )
        }
        sx={{ maxWidth: '30rem', '& fieldset': { border: 'none' }, ...sx }}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </Box>
  )
}
