import * as React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Box, TextField } from '@mui/material';

export default function DateTimePick({ label, boxId, id, value, handleChange, handleAsyncDateChange }) {

    return (
        <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    label={label}
                    className={boxId}
                    value={dayjs(value)}
                    onChange={(newValue) => handleChange(newValue)}
                    onClose={(val) => {
                        setTimeout(() => {
                            handleAsyncDateChange(val,boxId)
                        }, 1000)
                    }
                    }
                    renderInput={(params) => <TextField id={id} {...params} onBlur={(e) => handleAsyncDateChange(e,boxId)}/>}
                />
            </LocalizationProvider>
        </Box>
    );
}