import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import Image from 'next/image'
import logo from 'public/viewlift/unofficial-viewlift-logo.png'
import useTabs from 'src/hooks/useTabs'
import useLogin from 'src/hooks/useLogin'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { Divider, Link as MUILink } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

function ResponsiveAppBar() {
  const router = useRouter()
  const [cookies] = useCookies()
  const { allTabs } = useTabs()
  const { handleLogout } = useLogin()
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const [desktopLogo, setDesktopLogo] = React.useState(null)

  React.useEffect(() => {
    setDesktopLogo(cookies.desktopLogo)
  }, [cookies, router])

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'background.paper',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Box
        sx={{
          paddingX: 3,
          backgroundColor: 'primary.light',
          width: 'fit-content',
          display: 'flex',
        }}
      >
        <Image src={logo} width={65} alt="Logo" />
      </Box>
      <Toolbar
        disableGutters
        sx={{
          color: 'primary.main',
          display: 'flex',
          flex: 1,
          pl: 2,
          justifyContent: 'flex-end',
        }}
      >
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            {allTabs.map(({ key, title, route }) => (
              <MenuItem key={key} onClick={handleCloseNavMenu}>
                <NextLink
                  key={key}
                  href={route}
                  passHref
                  style={{ textDecoration: 'none' }}
                  legacyBehavior
                >
                  <MUILink
                    variant="body2"
                    color={router.pathname === route ? 'primary' : 'secondary'}
                    sx={{
                      textDecoration:
                        router.pathname === route ? 'underline' : 'none',
                    }}
                  >
                    <Typography variant="subtitle1">{title}</Typography>
                  </MUILink>
                </NextLink>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Box
          sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', gridGap: 20 } }}
        >
          {allTabs.map(({ key, title, route }) => (
            <NextLink
              key={key}
              href={route}
              passHref
              style={{ textDecoration: 'none' }}
              legacyBehavior
            >
              <MUILink
                variant="body2"
                color={router.pathname === route ? 'primary' : 'secondary'}
                sx={{
                  textDecoration:
                    router.pathname === route ? 'underline' : 'none',
                }}
              >
                <Typography variant="subtitle1">{title}</Typography>
              </MUILink>
            </NextLink>
          ))}
        </Box>
        <Box
          sx={{
            flexGrow: 0,
            backgroundColor: 'secondary.main',
            height: '100%',
            display: 'flex',
            width: '10em',
            justifyContent: 'center',
          }}
        >
          <Tooltip>
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{
                p: 0,
                display: 'flex',
                justifyContent: 'space-between',
                gridGap: 10,
              }}
            >
              {desktopLogo && (
                <Image src={desktopLogo} width={85} height={45} alt="Logo" />
              )}
              <Divider
                orientation="vertical"
                sx={{
                  color: '#fff',
                  borderColor: '#fff',
                }}
              />
              <ArrowDropDownIcon
                sx={{
                  color: '#fff',
                }}
              />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center">Change Password</Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
export default ResponsiveAppBar
