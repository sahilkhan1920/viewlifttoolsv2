import { Card, CardProps, useTheme } from '@mui/material'

export default function UserPageCard({ children, sx, ...rest }: CardProps) {
  const { palette } = useTheme()
  return (
    <Card
      elevation={3}
      sx={{
        background: palette.background.default,
        gap: 2,
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '30rem',
        width: '100%',
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Card>
  )
}
