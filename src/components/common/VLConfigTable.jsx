/* eslint-disable @typescript-eslint/no-unused-vars */
import { Checkbox, Grid, Typography } from '@mui/material'
import { get } from 'lodash'

const camelToNormalCase = (camelCaseString) => {
  // Insert space before every capital letter (except the first one)
  const normalCaseString = camelCaseString.replace(/([A-Z])/g, ' $1')

  // Split the string into an array of words
  const words = normalCaseString.split(' ')

  // Capitalize the first letter of each word and convert the rest to lowercase
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  )

  // Join the words back into a string
  return capitalizedWords.join(' ')
}

const VLConfigTable = (props) => {
  const { value, id, onChange, setFieldValue } = props
  if (!value) return
  return (
    <Grid container>
      <Grid item xs={12} container>
        <Grid xs={2}>
          <Typography variant="h6">Model</Typography>
        </Grid>
        {Object.keys(value).map((item) => (
          <Grid key={`item-${item}`} xs={2}>
            <Typography variant="h6">{camelToNormalCase(item)}</Typography>
          </Grid>
        ))}
      </Grid>
      {/* {Object.keys(Object.keys(value)[0]).map((item) => (
        <Grid key={`item-${item}`} xs={2}>
          <Typography variant="h6">{camelToNormalCase(item)}</Typography>
        </Grid>
      ))} */}
      {Object.keys(value[Object.keys(value)[0]]).map((item) => (
        <Grid key={`item-${item}`} xs={12} container>
          <Grid item xs={2}>
            {item}
          </Grid>
          {Object.keys(value).map((item2) => {
            const itemId = `${id}.${item2}.${item}`
            const fieldValue = get(value, `${item2}.${item}`)
            // console.log(`${item2}.${item}`, '=====>', fieldValue)
            return (
              <Grid item key={`item-${item2}`} xs={2}>
                <Checkbox
                  checked={fieldValue}
                  id={itemId}
                  name={itemId}
                  onChange={(e, val) => setFieldValue(itemId, val)}
                />
              </Grid>
            )
          })}
        </Grid>
      ))}
    </Grid>
  )
}

export default VLConfigTable
