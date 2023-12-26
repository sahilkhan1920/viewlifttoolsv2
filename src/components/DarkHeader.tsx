import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Image from 'next/image'
import logo from 'public/viewlift/unofficial-viewlift-logo.png'

const DarkHeader = () => (
  <AppBar position="static" color="secondary">
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
  </AppBar>
)

export default DarkHeader
