import { Button, Grid, Typography } from '@mui/material'
import { useCookies } from 'react-cookie'

const Template = () => {
  const [cookies] = useCookies()
  const openTemplateBuilder = () => {
    if (cookies.user && cookies.tbHostUrl) {
      window.location.href = `${cookies.tbHostUrl}?token=${cookies.user}`
    }
  }
  return (
    <Grid
      container
      direction={'column'}
      sx={{
        position: 'relative',
      }}
    >
      <Grid
        item
        xs={12}
        sx={{
          p: 5,
          minHeight: '50vh',
        }}
      >
        <Typography variant="h3">Sports Template</Typography>
        <Typography
          variant="subtitle1"
          sx={{
            mt: 4,
            maxWidth: '45ch',
          }}
        >
          The Sports Template has specific pages and modules related to sports products. If you would like to change templates, please contact your
          Account Manager at Viewlift.
        </Typography>
        <Button
          variant="contained"
          sx={{
            mt: 10,
            px: 10,
            py: 2,
            fontSize: '1em',
          }}
          onClick={openTemplateBuilder}
        >
          Edit Template
        </Button>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          flex: 1,
          background: '#F1F1F1',
          p: 5,
          minHeight: '50vh',
        }}
      >
        <Typography variant="h5">ABOUT TEMPLATES</Typography>
        <Typography
          variant="subtitle1"
          sx={{
            mt: 4,
            maxWidth: '45ch',
          }}
        >
          Templates are pre-designed web pages that you can use to insert your own text and images. Templates include a preset font, style,
          formatting, tables, graphics and other elements commonly found on a web page.
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            mt: 4,
            maxWidth: '45ch',
            fontWeight: 500,
            color: '#868686',
            fontStyle: 'italic',
          }}
        >
          NOTE: Once a Template is selected, you cannot change it without the help of ViewLift. Please contact your Project Manager for further
          instructions.
        </Typography>
      </Grid>
      <Grid
        item
        sx={{
          position: 'absolute',
          right: '5em',
          top: '5em',
          width: '60%',
          height: '550px',
        }}
      >
        <iframe
          data-src="https://develop.monumentalsportsnetwork.com"
          width="100%"
          height="100%"
          src="https://develop.monumentalsportsnetwork.com"
        ></iframe>
      </Grid>
      <Grid
        item
        sx={{
          position: 'absolute',
          right: '2em',
          top: '30em',
          width: '300px',
          height: '550px',
          borderRadius: '10px',
          boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)',
        }}
      >
        <iframe
          data-src="https://develop.monumentalsportsnetwork.com"
          width="100%"
          height="100%"
          src="https://develop.monumentalsportsnetwork.com"
        ></iframe>
      </Grid>
    </Grid>
  )
}

export default Template
