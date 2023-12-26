import { Button, Checkbox, Grid, TextField, Typography } from '@mui/material'
import VLAsyncAutoComplete from 'src/components/common/VLAsyncAutoComplete'
import { LANGUAGE_LIST } from 'src/constants/urlConstants'

const LocalizationLanguages = ({ value, id, onChange }) => {
  return (
    <Grid container>
      <Grid
        container
        item
        xs={6}
        sx={{
          border: 'solid 1px red',
        }}
      >
        <Grid item container xs={12}>
          <Grid item xs={4}>
            <Typography variant="subtitle2">Language</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle2">Live</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle2">Localized Title</Typography>
          </Grid>
        </Grid>
        {value?.languages?.map((item, index) => (
          <Grid item container xs={12} key={item.code}>
            <Grid item xs={4}>
              {item.name}
            </Grid>
            <Grid item xs={4}>
              <Checkbox
                id={`${id}.languages.${index}.isLive`}
                name={`${id}.languages.${index}.isLive`}
                onChange={onChange}
                checked={item.isLive}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id={`${id}.languages.${index}.localizedTitle`}
                name={`${id}.languages.${index}.localizedTitle`}
                size="small"
                value={item.localizedTitle}
                onChange={onChange}
                sx={{
                  width: 150,
                }}
              ></TextField>
            </Grid>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Typography>
            The default Language will be required in Content pages and will be
            first language users see.
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        item
        xs={6}
        sx={{
          border: 'solid 1px yellow',
        }}
      >
        <Grid item container>
          <Grid item xs={8}>
            <VLAsyncAutoComplete
              url={LANGUAGE_LIST}
              valueKey="codeName"
              labelKey="name"
            />
          </Grid>
          <Grid item xs={4}>
            <Button>Add Language</Button>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              These Language Names will be presented to you on Content pages in
              the CMS as well as to your users as a language selection.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default LocalizationLanguages
