import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import fetchHelper from 'src/helpers/fetchHelper'
import { useCookies } from 'react-cookie'

export default function VLAsyncAutoComplete({
  url,
  id,
  name,
  value,
  onChange,
  valueKey,
  labelKey,
  objKey,
}) {
  const [cookies] = useCookies()
  const [open, setOpen] = React.useState(false)
  const [options, setOptions] = React.useState([])
  const loading = open && options.length === 0

  React.useEffect(() => {
    let active = true

    if (!loading) {
      return undefined
    }

    ;(async () => {
      const result = await fetchHelper({
        url,
        method: 'GET',
        headers: {
          xapikey: cookies.managementXApiKey,
          Authorization: cookies.accessToken,
        },
      })
      console.log(result, objKey)

      if (active) {
        setOptions([...(result[objKey || 'content'] || [])])
      }
    })()

    return () => {
      active = false
    }
  }, [loading])

  React.useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  return (
    <Autocomplete
      id={id}
      name={name}
      multiple
      open={open}
      value={value || []}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      onChange={onChange}
      isOptionEqualToValue={(option, value) =>
        option[valueKey] === value[valueKey]
      }
      getOptionLabel={(option) => option[labelKey]}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Asynchronous"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  )
}
