import * as React from 'react'
import { Drawer, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import LeftMenu from 'src/components/LeftMenu'

const MenuDrawer = () => {
  const [openDrawer, setOpenDrawer] = React.useState(false)
  const handleVisibility = React.useCallback(() => {
    setOpenDrawer(!openDrawer)
  }, [openDrawer])

  return (
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleVisibility}
        color="primary"
        sx={{
          display: {
            xs: 'block',
            md: 'none',
          },
        }}
      >
        <MenuIcon />
      </IconButton>
      {openDrawer && (
        <Drawer anchor="left" open={openDrawer} onClose={handleVisibility}>
          <LeftMenu />
        </Drawer>
      )}
    </>
  )
}

export default MenuDrawer
