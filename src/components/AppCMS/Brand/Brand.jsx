import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import themeImg from 'public/app-cms1/theme-thumb.png'
import customTheme from 'public/app-cms1/custom-theme.png'
import Image from 'next/image'
import VLTabPanel from 'src/components/common/VLTabPanel'
import WebContent from './WebContent'
import useBrand from './useBrand'
import LogoNImages from './LogoNImages'
import VersionHistoryTable from '../Settings/VersionHistoryTable'
import VLLoaderWrapper from 'src/components/common/VLLoaderWrapper'

const tabs = [
  {
    key: 'web',
    title: 'Web (Default)',
  },
  {
    key: 'apps',
    title: 'Apps',
  },
  {
    key: 'ott',
    title: 'OTT',
  },
]

const Brand = () => {
  const { formik, loading, handleInputChange } = useBrand()

  return (
    <Container>
      <Typography
        variant="h5"
        color="primary"
        align="center"
        sx={{
          m: 2,
        }}
      >
        Brand
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <Accordion
          sx={{
            background: '#FBFCFE',
            borderTop: 'solid 2px #016690',
            borderRadius: 0,
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Theme</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack
              direction="row"
              justifyContent="space-around"
              sx={{
                gridGap: 10,
              }}
            >
              {[
                {
                  name: 'Sky theme',
                  image: themeImg,
                },
                {
                  name: 'Fire theme',
                  image: themeImg,
                },
                {
                  name: 'Custom theme',
                  image: customTheme,
                },
              ].map((item, index) => {
                return (
                  <Box
                    key={`item-${index}`}
                    sx={{
                      flex: 1,
                      display: 'flex',
                      bordeRadius: '6px',
                      justifyContent: 'center',
                      alignItems: 'center',
                      border: 'solid 2px #e8eaee',
                      borderRadius: 1,
                      background: '#fff',
                      padding: '30px 0',
                      margin: '0 0 25px 0',
                      position: 'relative',
                      flexDirection: 'column',
                    }}
                  >
                    <Image src={item.image} width={300} alt="Logo" />
                    <Typography variant="h5" color="primary">
                      {item.name}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        width: 250,
                      }}
                    >
                      Select
                    </Button>
                  </Box>
                )
              })}
            </Stack>
            <VLTabPanel tabs={tabs} onTabChange={() => console.log('clicked')}>
              <Box
                sx={{
                  padding: 2,
                  position: 'relative',
                }}
              >
                <VLLoaderWrapper loading={loading}>
                  <WebContent
                    type="default"
                    fieldKey="theme"
                    formik={formik}
                    handleInputChange={handleInputChange}
                  />
                </VLLoaderWrapper>
              </Box>
              <Box
                sx={{
                  padding: 2,
                  position: 'relative',
                }}
              >
                <VLLoaderWrapper loading={loading}>
                  <WebContent
                    type="apps"
                    fieldKey="themeApps"
                    formik={formik}
                    handleInputChange={handleInputChange}
                  />
                </VLLoaderWrapper>
              </Box>
              <Box
                sx={{
                  padding: 2,
                  position: 'relative',
                }}
              >
                <VLLoaderWrapper loading={loading}>
                  <WebContent
                    type="ott"
                    fieldKey="themeOtt"
                    formik={formik}
                    handleInputChange={handleInputChange}
                  />
                </VLLoaderWrapper>
              </Box>
            </VLTabPanel>
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{
            background: '#FBFCFE',
            borderTop: 'solid 2px #016690',
            borderRadius: 0,
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Logo & Icons</Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              padding: 0,
            }}
          >
            <VLLoaderWrapper loading={loading}>
              <LogoNImages
                formik={formik}
                handleInputChange={handleInputChange}
              />
            </VLLoaderWrapper>
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{
            background: '#FBFCFE',
            borderTop: 'solid 2px #016690',
            borderRadius: 0,
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Version History</Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              padding: 0,
            }}
          >
            <VersionHistoryTable />
          </AccordionDetails>
        </Accordion>
        <Divider
          sx={{
            mt: 5,
          }}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{
            width: 235,
            height: '49px',
            display: 'block',
            float: 'right',
            margin: '29px 0 30px 0',
          }}
        >
          Save
        </Button>
      </Box>
    </Container>
  )
}

export default Brand
