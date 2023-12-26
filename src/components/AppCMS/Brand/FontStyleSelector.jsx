import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { indexOf, sortBy, without } from 'lodash'

const FontStyleSelector = ({ name, value = [], setFieldValue }) => {
  const toggleFont = (e) => {
    const fontStyle = e.target.dataset.fontStyle
    const index = indexOf(value, fontStyle)
    let val
    if (index !== -1) {
      // Value is present in the array, so remove it
      const updatedArray = without(value, fontStyle)
      val = sortBy(updatedArray)
    } else {
      // Value is not present in the array, so add it
      const updatedArray = _.concat(value, fontStyle)
      val = sortBy(updatedArray)
    }
    setFieldValue(name, val)
  }
  return (
    <Stack
      direction="row"
      sx={{
        display: 'flex',
        gridGap: 5,
        pl: 1,
        pt: 1,
        button: {
          height: '80%',
          maxHeight: '40px',
        },
      }}
    >
      <Button
        variant={value.includes('bold') ? 'contained' : 'outlined'}
        sx={{
          minWidth: '10px',
          height: '55px',
        }}
        onClick={toggleFont}
        data-font-style="bold"
      >
        B
      </Button>
      <Button
        variant={value.includes('italic') ? 'contained' : 'outlined'}
        sx={{
          minWidth: '10px',
          height: '55px',
        }}
        onClick={toggleFont}
        data-font-style="italic"
      >
        I
      </Button>
      <Button
        variant={value.includes('underline') ? 'contained' : 'outlined'}
        sx={{
          minWidth: '10px',
          height: '55px',
        }}
        onClick={toggleFont}
        data-font-style="underline"
      >
        U
      </Button>
    </Stack>
  )
}

export default FontStyleSelector
