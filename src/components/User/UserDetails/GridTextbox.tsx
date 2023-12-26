import {
  Grid,
  OutlinedInput,
  OutlinedInputProps,
  Typography,
} from '@mui/material'

const STYLES = {
  FLEX_ROW: {
    display: 'flex',
    alignItems: 'center',
  },
}
export default function GridTextbox({
  name,
  type,
  value,
  onChange,
  startAdornment,
  ...rest
}: OutlinedInputProps) {
  return (
    <Grid
      xs={4}
      item
      id="form-field"
      position="relative"
      sx={{
        ...STYLES.FLEX_ROW,
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 0.5,
        padding: 1,
      }}
    >
      <Typography variant="subtitle1">{name}</Typography>
      <OutlinedInput
        id={name}
        size="small"
        fullWidth
        type={type}
        placeholder={'Search...'}
        startAdornment={startAdornment}
        value={value}
        // value={keyword}
        onChange={onChange}
        {...rest}
      />
    </Grid>
  )
}
