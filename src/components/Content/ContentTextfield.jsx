import React from 'react'
import TextField from '@mui/material/TextField'

const ContentTextfield = ({ value, handleChange, handleAutosave, id, label, width, marginTop, name, required }) => {
  return (
    <TextField
      required={required || false}
      id={id}
      label={label}
      value={value || ''}
      name={name}
      onChange={handleChange}
      onBlur={(e) => handleAutosave(e)}
      variant="outlined"
      sx={{
        width: { width },
        marginTop: { marginTop },
        '& .MuiInputBase-input': { height: '20px' },
      }}
    />
  )
}

export default ContentTextfield
