import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'

const ContentLanguageList = () => {
    const languages = [
        {
            "code":"en",
            "isLive":true,
            "name":"English",
            "localizedTitle":"en"
        },
        {
            "code":"hi",
            "isLive":true,
            "name":"Hindi",
            "localizedTitle":"hi"
        }
    ]
    const [language, setLanguage] = useState("English")
    const handleLocalizedLanguage = (e) => {
        setLanguage(e.target.value);
    }
  return (
    <FormControl sx={{ minWidth: 150 }}>
        <InputLabel id="localized-language-label">Localized Language</InputLabel>
        <Select
          labelId="localized-language-label"
          id="localized-language-select"
          value={language}
          label="Localized Language"
          onChange={handleLocalizedLanguage}
        >
          {
            languages.map((item) => (
                <MenuItem
                    key={item.localizedTitle}
                    value={item.name}
                >
                   {item.name}
                </MenuItem>
            ))
          }
        </Select>
    </FormControl>
  )
}

export default ContentLanguageList