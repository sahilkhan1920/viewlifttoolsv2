import { Grid, IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import CountUp from 'react-countup'
import VLLoaderWrapper from 'src/components/common/VLLoaderWrapper'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import getQueryArray from 'src/helpers/queryHelpers'

const Plans = ({ loading, data }) => {
  const router = useRouter()
  const handlePlanSelect = (name, checked) => {
    const {
      query: { selectedPlan = [] },
    } = router
    let filterData = []
    if (typeof selectedPlan === 'string') {
      filterData = [selectedPlan]
    } else {
      filterData = [...selectedPlan]
    }

    if (name === 'All') {
      filterData = []
    } else {
      filterData = filterData.filter((a) => a !== 'All')
      if (checked) {
        filterData.push(name)
      } else {
        filterData = filterData.filter((a) => a !== name)
      }
    }
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        selectedPlan: filterData,
      },
    })
    return
  }

  const plansInQuery = getQueryArray(router.query.selectedPlan)

  return (
    <Box
      sx={{
        minHeight: '10em',
        position: 'relative',
      }}
    >
      <VLLoaderWrapper loading={loading}>
        <Grid
          container
          columnSpacing={2}
          sx={{
            p: 2,
            gridGap: {
              xs: 0,
              md: 10,
            },
          }}
        >
          {data.map(({ subscriptionplan, value }, index) => {
            const selected =
              Boolean(plansInQuery?.includes(subscriptionplan)) ||
              (plansInQuery.length === 0 && subscriptionplan === 'All')
            const color = selected ? 'success.main' : 'primary.main'

            return (
              <Grid
                item
                key={subscriptionplan}
                direction="column"
                xs={4}
                md={1}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderRight: index === 0 ? 'solid 1px #ccc' : '',
                    minWidth: 'fit-content',
                    justifyContent: 'center',
                  }}
                >
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                    // disableFocusRipple
                    disableRipple
                    sx={{
                      flexWrap: 'wrap',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                      color,
                    }}
                    onClick={() =>
                      handlePlanSelect(subscriptionplan, !selected)
                    }
                  >
                    <CalendarMonthIcon fontSize="large" color="inherit" />
                    <Typography variant="h6">
                      <CountUp
                        start={0}
                        end={value}
                        separator=","
                        duration={1}
                      />
                    </Typography>
                    <Typography variant="subtitle2" noWrap>
                      {subscriptionplan}
                    </Typography>
                  </IconButton>
                </Box>
              </Grid>
            )
          })}
        </Grid>
      </VLLoaderWrapper>
    </Box>
  )
}

export default Plans
