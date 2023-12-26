import { useRouter } from 'next/router'
import { Box } from '@mui/system'
import { getCookie } from 'src/helpers/queryHelpers'
import { useEffect } from 'react'

const UserProvider = ({ children }) => {
  const router = useRouter()

  useEffect(() => {
    const token = getCookie('accessToken')
    if (!token) {
      router.push('/')
    }
  }, [router])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        height: '100vh',
      }}
    >
      {children}
    </Box>
  )
}

export default UserProvider
