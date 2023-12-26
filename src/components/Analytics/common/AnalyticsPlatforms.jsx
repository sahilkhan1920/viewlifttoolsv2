import { Grid, IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import { createElement } from 'react'
import CountUp from 'react-countup'
import PlatformIconsMap from 'src/helpers/platformsIconMap'
import VLLoaderWrapper from 'src/components/common/VLLoaderWrapper'

const AnalyticsPlatforms = ({
  data,
  loading,
  platformSuffix,
  decimals = 0,
  icon = true,
}) => {
  const router = useRouter()
  const handlePlatformSelect = (name, checked) => {
    const {
      query: { selectedPlatform = [] },
    } = router
    let filterData = []
    if (typeof selectedPlatform === 'string') {
      filterData = [selectedPlatform]
    } else {
      filterData = [...selectedPlatform]
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
        selectedPlatform: filterData,
      },
    })
    return
  }

  return (
    <Box
      sx={{
        minHeight: '10em',
        position: 'relative',
      }}
    >
      <VLLoaderWrapper loading={loading}>
        <Grid container columnSpacing={2} sx={{ p: 2 }}>
          {data.map(({ platform, value, prefix }, index) => {
            const selected =
              Boolean(router.query.selectedPlatform?.includes(platform)) ||
              (!router.query.selectedPlatform && platform === 'All')
            const color = selected ? 'success.main' : 'primary.main'

            return (
              <Grid
                item
                container
                key={platform}
                direction="column"
                xs={4}
                md={1}
                rowSpacing={0}
                columnSpacing={0}
              >
                <Grid
                  item
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
                    sx={{
                      flexWrap: 'wrap',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                      color,
                    }}
                    onClick={() => handlePlatformSelect(platform, !selected)}
                  >
                    {icon &&
                      createElement(
                        PlatformIconsMap[platform]
                          ? PlatformIconsMap[platform]
                          : PlatformIconsMap.Android,
                        {
                          fontSize: 'large',
                          color: 'inherit',
                        },
                        null
                      )}
                    <Typography variant="h6">
                      <CountUp
                        start={0}
                        end={value}
                        separator=","
                        duration={1}
                        suffix={platformSuffix || ''}
                        prefix={prefix || ''}
                        decimals={decimals}
                      />
                    </Typography>
                    <Typography variant="subtitle2" noWrap>
                      {platform}
                    </Typography>
                  </IconButton>
                </Grid>
              </Grid>
            )
          })}
        </Grid>
      </VLLoaderWrapper>
    </Box>
  )
}

export default AnalyticsPlatforms
