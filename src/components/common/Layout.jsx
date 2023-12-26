import Grid from '@mui/material/Grid'
import LeftMenu from 'src/components/LeftMenu'
import UserProvider from 'src/components/common/UserProvider'

const Layout = ({ children }) => {
  return (
    <UserProvider>
      <Grid
        container
        sx={{
          height: '100%',
        }}
      >
        <Grid
          item
          xs={12}
          md={2}
          sx={{
            // height: 'auto',
            display: {
              xs: 'none',
              md: 'block',
            },
          }}
        >
          <LeftMenu />
        </Grid>
        <Grid
          item
          md={10}
          xs={12}
          sx={{
            py: 1,
            overflow: 'scroll',
          }}
        >
          {children}
        </Grid>
      </Grid>
    </UserProvider>
  )
}

export default Layout
