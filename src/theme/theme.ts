import { Roboto } from '@next/font/google'
import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

import colors from './colors.json'

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
})

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      light: colors.GreenBlue,
      main: colors.DarkCerulean,
    },
    secondary: {
      main: '#000',
      light: colors.OliveBlack,
    },
    success: {
      main: colors.DarkPastelGreen,
    },
    error: {
      main: red.A400,
    },
    text: {
      // primary: colors.White,
      // secondary: colors.Black,
    },
    info: {
      main: colors.White,
    },
    background: {
      default: colors.White,
      paper: colors.AntiFlashWhite,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          height: '100vh',
        },
      },
    },
  },
})

export default theme
