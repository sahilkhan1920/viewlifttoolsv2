import * as React from 'react'
import Drawer from '@mui/material/Drawer'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import { Box } from '@mui/system'
import {
  AppBar,
  Autocomplete,
  Badge,
  Button,
  TextField,
  Typography,
} from '@mui/material'
import getQueryArray from 'src/helpers/queryHelpers'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import useHeaders from 'src/hooks/useHeaders'

export default function Filters({ data, loading }) {
  const [openDrawer, setOpenDrawer] = React.useState(false)
  const router = useRouter()
  const {
    page: {
      header: {
        filters,
        filters: { dimensions = [], defaultFilterValues = {} },
      },
    },
  } = useHeaders()
  const initialValues = defaultFilterValues
  const [formInitialValues, setFormInitialValues] =
    React.useState(initialValues)

  const filterDimensions = dimensions.reduce((acc, current) => {
    if (router.query[current]) {
      acc[current] = getQueryArray(router.query[current])
    }
    return acc
  }, {})

  const formik = useFormik({
    initialValues: formInitialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      const params = Object.keys(values).reduce((acc, current) => {
        if (values[current]) {
          acc[current] = values[current]
        }
        return acc
      }, {})

      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          ...params,
        },
      })
      handleVisibility()
    },
  })

  const others = Object.keys(defaultFilterValues).reduce((acc, item) => {
    acc[item] = router.query[item]
    return acc
  }, {})

  React.useEffect(() => {
    if (!router.isReady) return

    if (Object.keys(router.query).length > 0) {
      const val = {
        ...initialValues,
        ...filterDimensions,
        ...others,
      }
      setFormInitialValues(val)
      return
    }
    setFormInitialValues(initialValues)
  }, [router.query])

  const handleVisibility = React.useCallback(() => {
    setOpenDrawer(!openDrawer)
  }, [openDrawer])

  const getBadgeCount = () => {
    return Object.keys(formik.values).reduce((acc, current) => {
      if (formik.values[current].length > 0) {
        acc += 1
      }
      return acc
    }, 0)
  }

  return (
    <div>
      <Badge badgeContent={getBadgeCount()} color="primary">
        <Button
          variant="outlined"
          onClick={handleVisibility}
          disabled={loading}
        >
          Filters
        </Button>
      </Badge>

      {openDrawer && (
        <Drawer anchor="right" open={openDrawer} onClose={handleVisibility}>
          <AppBar
            position="relative"
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6">Filters</Typography>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleVisibility}
              color="inherit"
              sx={{
                width: 20,
              }}
            >
              <CloseIcon />
            </IconButton>
          </AppBar>
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gridGap: 20,
              flexWrap: 'wrap',
              mt: {
                xs: 2,
              },
              width: 400,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            noValidate
            autoComplete="off"
            onSubmit={formik.handleSubmit}
          >
            {filters.fields.map(({ key, title, type = 'select' }) => {
              if (type === 'select')
                return (
                  <Autocomplete
                    key={key}
                    multiple
                    onChange={(e, val) => formik.setFieldValue(key, val)}
                    disablePortal
                    options={data[key] || []}
                    defaultValue={formik.values[key]}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        onChange={(e) => console.log(e.target.value)}
                        id={key}
                        name={key}
                        label={title}
                      />
                    )}
                  />
                )

              return (
                <TextField
                  key={key}
                  id={key}
                  label={title}
                  sx={{ width: 300 }}
                  value={formik.values[key]}
                  onChange={formik.handleChange}
                />
              )
            })}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!formik.dirty}
            >
              Apply
            </Button>
          </Box>
        </Drawer>
      )}
    </div>
  )
}
