import { Box, Container, Typography } from '@mui/material'

import styles from '../../styles/users.module.css'

import { SearchBar } from 'src/components/User'
import CONFIG from './config.json'
import UserProvider from 'src/components/common/UserProvider'

export default function Users() {
  return (
    <UserProvider>
      <main className={`${styles.usersPage}`}>
        <Container className={`${styles.contentWrapper}`}>
          <SearchBar dropdownListConfig={CONFIG.searchFilterOptionsDropdown} placeholder={CONFIG.searchInputPlaceholderText} />
          <Box>
            <em>
              <Typography variant="caption">{CONFIG.searchInfoText}</Typography>
            </em>
          </Box>
        </Container>
      </main>
    </UserProvider>
  )
}
