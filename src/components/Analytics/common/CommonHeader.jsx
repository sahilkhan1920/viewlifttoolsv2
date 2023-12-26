import { useState } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import useHeaders from 'src/hooks/useHeaders'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import Filters from './Filters'
import MenuDrawer from 'src/components/common/MenuDrawer'

const CommonHeader = () => {
  const [open, setOpen] = useState(false)

  const handleTimeFrameChange = (e) => {
    const target = e.target
    formik.setFieldValue('timeFrame', target.value)
  }

  const {
    page: {
      header: {
        title,
        period,
        dateRangeSelector,
        timeFrameSelector,
        filters,
        metrics,
      },
    },
    formik,
    maxDate,
    clearFilters,
    disabledClearFilter,
    disableApply,
    filtersData,
    loadingFilters,
  } = useHeaders(true)

  return (
    <Grid
      item
      container
      xs={12}
      md={12}
      sx={{
        p: {
          xs: 0,
          md: 2,
        },
        height: 'auto',
      }}
      rowSpacing={1}
      direction="row"
      justifyContent="space-between"
    >
      <Grid
        container
        item
        justifyContent="space-between"
        alignItems="center"
        sx={{
          px: {
            xs: 0,
            md: 2,
          },
        }}
        xs="auto"
      >
        <MenuDrawer />
        <Typography variant="h4" color="primary.main" sx={{ maxWidth: '15ch' }}>
          {title}
        </Typography>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
          onClick={() => setOpen(!open)}
        >
          <FilterAltIcon
            sx={{
              display: {
                xs: 'block',
                md: 'none',
              },
            }}
          />
        </IconButton>
      </Grid>
      <Grid
        item
        rowSpacing={2}
        container
        justifyContent="flex-end"
        alignItems="center"
        xs="auto"
        sx={{
          display: {
            md: 'flex',
            xs: open ? 'flex' : 'none',
          },
          backgroundColor: {
            xs: 'background.paper',
            md: 'background.default',
          },
          mt: {
            xs: 1,
          },
          p: {
            xs: 2,
          },
          maxWidth: '100%',
        }}
      >
        <Box
          component="form"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gridGap: 20,
            flexWrap: 'no-wrap',
            mt: {
              xs: 2,
            },
            flexWrap: 'wrap',
          }}
          noValidate
          autoComplete="off"
          onSubmit={formik.handleSubmit}
        >
          {period && (
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
              id="timeFrame"
              onClick={handleTimeFrameChange}
            >
              <Button
                value="day"
                color={formik?.values?.timeFrame === 'day' ? 'primary' : 'info'}
              >
                Day
              </Button>
              <Button
                value="week"
                color={
                  formik?.values?.timeFrame === 'week' ? 'primary' : 'info'
                }
              >
                Week
              </Button>
              <Button
                value="month"
                color={
                  formik?.values?.timeFrame === 'month' ? 'primary' : 'info'
                }
              >
                Month
              </Button>
            </ButtonGroup>
          )}

          {dateRangeSelector && (
            <>
              <TextField
                id="dateRangeStart"
                type="date"
                size="small"
                label="Report From"
                variant="outlined"
                value={formik.values.dateRangeStart}
                inputProps={{ max: maxDate }}
                onChange={formik.handleChange}
              />
              <TextField
                id="dateRangeEnd"
                type="date"
                size="small"
                label="To"
                value={formik.values.dateRangeEnd}
                inputProps={{ max: maxDate }}
                onChange={formik.handleChange}
              />
            </>
          )}
          {timeFrameSelector && (
            <>
              <TextField
                id="pastTimeframe"
                name="pastTimeframe"
                size="small"
                label="Time Frame"
                variant="outlined"
                value={formik.values.pastTimeframe}
                onChange={formik.handleChange}
                disabled={formik.values.timeframeUnit === 'today'}
              />
              <Select
                labelId="timeframe-unit-label"
                id="timeframeUnit"
                name="timeframeUnit"
                value={formik.values.timeframeUnit}
                onChange={formik.handleChange}
                size="small"
              >
                <MenuItem value="minutes">Minutes</MenuItem>
                <MenuItem value="today">Today</MenuItem>
              </Select>
            </>
          )}
          {metrics && (
            <FormControl>
              <InputLabel id="metrics-label">Metrics</InputLabel>
              <Select
                labelId="metrics-label"
                id="metrics"
                name="metrics"
                label="Metrics"
                value={formik.values.metrics}
                onChange={formik.handleChange}
                size="small"
              >
                {metrics.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={disableApply}
          >
            Apply
          </Button>
          {filters && <Filters data={filtersData} loading={loadingFilters} />}
          <Button
            variant="contained"
            color="primary"
            disabled={disabledClearFilter}
            onClick={clearFilters}
          >
            Clear
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default CommonHeader
