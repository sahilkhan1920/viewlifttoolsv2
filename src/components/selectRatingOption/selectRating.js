import React from 'react';
import { FormControl,MenuItem, Select } from '@mui/material'
import { ratingOptions } from '../../constants/ratingOption';

const SelectRatingComponent = ({value, formik, name, id,handleAutosave,selectedRating,setSelectedRating}) => {
   
    
    return (
        <FormControl sx={{ minWidth: 400 }}>
              Rating
            <Select
                name={name}
                id={id}
                value={selectedRating}
                onChange={(e) => {
                    setSelectedRating(e.target.value)
                    handleAutosave(null, name, e.target.value)
                }}
            >
                {ratingOptions.map(option => (
                    <MenuItem key={option.value} value={option.value} >
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
            </FormControl>
             );
};

export default SelectRatingComponent;