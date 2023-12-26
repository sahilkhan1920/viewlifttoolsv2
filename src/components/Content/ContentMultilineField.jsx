import React from 'react'
import TextField from '@mui/material/TextField';

const ContentMultilineField = ({value,handleChange,handleAutosave,id,label,width,marginTop,name,rows}) => {
  return (
    <TextField 
        required
        id= {id}
        label= {label} 
        variant= "outlined" 
        multiline
        rows={rows}
        value={value || ''}
        name={name}
        onChange={handleChange}
        onBlur={handleAutosave}
        sx={
            {
                width: {width},
                marginTop: {marginTop}
            }
        }
    />
  )
}

export default ContentMultilineField