import { Box, BoxProps, useTheme } from '@mui/material'
export default function CardContainer({ children, ...rest }: BoxProps) {
  const { palette } = useTheme()
  return (
    <Box
      sx={{ padding: 2, background: 'white', borderRadius: '0.4rem', border: `1px solid ${palette.background.paper}` }}
      display="flex"
      flexDirection="column"
      gap={2}
      {...rest}
    >
      {children}
    </Box>
  )
}
