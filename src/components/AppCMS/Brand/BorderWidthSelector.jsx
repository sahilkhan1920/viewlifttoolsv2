import { MenuItem, Select } from '@mui/material'

const BorderWidthSelector = ({ name, value, onChange }) => {
  const options = ['1px', '2px', '3px', '4px', '5px']

  return (
    <Select name={name} value={value} onChange={onChange}>
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  )
}

export default BorderWidthSelector
