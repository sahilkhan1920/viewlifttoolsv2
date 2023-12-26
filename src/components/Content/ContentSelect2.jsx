import React from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { Box } from '@mui/material'

const ContentSelect2 = ({ value, handleInputChange, handleFocus, handleChange, options, id, placeholder, name, autocompleteInputValue, handleAutocompleteClose, height = '125px' }) => {
  return (
    <Box
      sx={{
        height: {height},
        overflowY: 'auto',
        border: '1px solid #c4c4c4',
        borderRadius: '4px',
      }}
    >
      <Autocomplete
        multiple
        id={id}
        inputValue={autocompleteInputValue}
        options={options || []}
        getOptionLabel={(option) => option ? (option.title || option.name || option.type) : ''}
        onChange={(e, val) => handleChange(id, val)}
        onFocus={(e) => {
          if (handleFocus) {
            handleFocus(e, name)
          }
        }}
        onClose={() => {
          if (handleAutocompleteClose) {
            handleAutocompleteClose()
          }
        }}
        value={value || []}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            onChange={(e) => {
              if (handleInputChange) {
                handleInputChange(e, name)
              }
            }}
            name={name}
            placeholder={placeholder}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: '0',
                },
              },
            }}
          />
        )}
      />
    </Box>
  )
}

export default ContentSelect2
