import { useCallback, useEffect, useMemo, useState } from 'react'
import { Box, Button, Container, List, ListItem, Typography, useTheme } from '@mui/material'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import CONFIG from '../../config.json'
import UserProvider from 'src/components/common/UserProvider'
import VLLoaderWrapper from 'src/components/common/VLLoaderWrapper'
import { PAGE_SEGMENT_KEYS, PageSegmentType } from 'src/types/SearchType'
import { useCookies } from 'react-cookie'
import fetchHelper from 'src/helpers/fetchHelper'
import { INVOKE_V2_API } from 'src/constants/urlConstants'
import { UserDetailType } from 'src/types/UserDetail'

const AccountTab = dynamic(() => import('src/components/User').then((component) => component.AccountTab), {
  loading: ({ isLoading }) => <VLLoaderWrapper loading={isLoading ?? false} />,
})
const BillingAndPurchase = dynamic(() => import('src/components/User').then((component) => component.BillingPurchaseTab), {
  loading: ({ isLoading }) => <VLLoaderWrapper loading={isLoading ?? false} />,
})
const OffersTab = dynamic(() => import('src/components/User').then((component) => component.OffersTab), {
  loading: ({ isLoading }) => <VLLoaderWrapper loading={isLoading ?? false} />,
})
const AuditLogsTab = dynamic(() => import('src/components/User').then((component) => component.AuditLogTab), {
  loading: ({ isLoading }) => <VLLoaderWrapper loading={isLoading ?? false} />,
})
const ActivityWatchListTab = dynamic(() => import('src/components/User').then((component) => component.ActivityWatchListTab), {
  loading: ({ isLoading }) => <VLLoaderWrapper loading={isLoading ?? false} />,
})
const DevicesTab = dynamic(() => import('src/components/User').then((component) => component.DevicesTab), {
  loading: ({ isLoading }) => <VLLoaderWrapper loading={isLoading ?? false} />,
})
const EndSessionModal = dynamic(() => import('src/components/User').then((component) => component.EndSessionModal), {
  loading: ({ isLoading }) => <VLLoaderWrapper loading={isLoading ?? false} />,
})
const AddNoteModal = dynamic(() => import('src/components/User/Modals').then((component) => component.AddNoteModal), {
  loading: ({ isLoading }) => <VLLoaderWrapper loading={isLoading ?? false} />,
})

const STYLES = {
  FLEX_ROW: {
    display: 'flex',
    alignItems: 'center',
  },
}

export default function UserDetail() {
  const { palette } = useTheme()
  const { query } = useRouter()
  const [cookies] = useCookies()

  const [activeSegment, setActiveSegment] = useState<PageSegmentType>(CONFIG.segments[0])
  const [pageTitle, setPageTitle] = useState('')
  const [showEndSessionModal, setShowEndSessionModal] = useState(false)
  const [addingNote, setAddingNote] = useState(false)

  const _userId = query.userId as string

  const generateSessionToken = useCallback(() => {
    const _oldToken = sessionStorage.getItem('sessionToken')
    if (!_oldToken) return sessionStorage.setItem('sessionToken', `user_id_${_userId}${new Date().getTime()}`)
    return
  }, [_userId])

  function onSegmentChange(segment: PageSegmentType) {
    return setActiveSegment(segment)
  }

  const fetchUserIdentity = useMemo(async () => {
    return await fetchHelper({
      method: 'POST',
      url: INVOKE_V2_API,
      data: {
        url: 'identity/user',
        method: 'GET',
        role: 'Customer Support',
        auth: {
          site: cookies.site,
          userId: _userId,
        },
        query: {
          site: cookies.site,
          userId: _userId,
        },
      },
      headers: {
        xapikey: cookies.managementXApiKey,
        Authorization: cookies.accessToken,
      },
    })
  }, [cookies.managementXApiKey, cookies.accessToken, cookies.site, _userId])

  useEffect(() => {
    fetchUserIdentity.then((res) => {
      setPageTitle((res as UserDetailType).name ?? (res as UserDetailType).email)
    })
  }, [pageTitle, fetchUserIdentity])

  useEffect(() => {
    generateSessionToken()
  }, [_userId, generateSessionToken])

  return (
    <>
      <UserProvider>
        <Container maxWidth="xl" id="page-container" sx={{ padding: 0 }}>
          <Box
            id="page-header"
            marginTop={2}
            sx={{
              ...STYLES.FLEX_ROW,
              justifyContent: 'space-between',
            }}
          >
            <VLLoaderWrapper loading={!pageTitle} type="inline" fullWidth={false}>
              <Typography variant="h2">{pageTitle}</Typography>
            </VLLoaderWrapper>
            <Box id="header-cta" sx={{ ...STYLES.FLEX_ROW, gap: 2 }}>
              <Button variant="outlined" size="large" onClick={() => setAddingNote(true)}>
                Add Note
              </Button>
              <Button variant="contained" size="large" onClick={() => setShowEndSessionModal(true)}>
                Save and End Session
              </Button>
            </Box>
          </Box>
          <List id="segment-bar" role="menubar" sx={{ ...STYLES.FLEX_ROW }}>
            {CONFIG.segments.map((_segment) => (
              <ListItem
                onClick={onSegmentChange.bind(null, _segment)}
                role="menuitem"
                key={_segment.key}
                sx={{
                  width: '100%',
                  margin: '1rem 0 0 0',
                  padding: '0.5rem',
                  background: palette.background.paper,
                }}
              >
                <Button
                  variant={activeSegment.key === _segment.key ? 'contained' : 'text'}
                  sx={{
                    width: '100%',
                    opacity: activeSegment.key === _segment.key ? 1 : 0.6,
                  }}
                >
                  {_segment.label}
                </Button>
              </ListItem>
            ))}
          </List>
          {activeSegment.key === PAGE_SEGMENT_KEYS.ACCOUNT ? <AccountTab userId={_userId} fetchUserIdentity={fetchUserIdentity} /> : false}
          {activeSegment.key === PAGE_SEGMENT_KEYS.BILLING_PURCHASE ? <BillingAndPurchase userId={_userId} segment={activeSegment} /> : false}
          {activeSegment.key === PAGE_SEGMENT_KEYS.OFFERS ? <OffersTab userId={_userId} /> : false}
          {activeSegment.key === PAGE_SEGMENT_KEYS.ACTIVITY_WATCHLIST ? <ActivityWatchListTab userId={_userId} /> : false}
          {activeSegment.key === PAGE_SEGMENT_KEYS.DEVICES ? <DevicesTab userId={_userId} /> : false}
          {activeSegment.key === PAGE_SEGMENT_KEYS.AUDIT_LOG ? <AuditLogsTab userId={_userId} /> : false}
        </Container>
      </UserProvider>
      {showEndSessionModal ? (
        <EndSessionModal
          userId={_userId}
          open={showEndSessionModal}
          onClose={() => setShowEndSessionModal(false)}
          onCancel={setShowEndSessionModal}
        />
      ) : (
        false
      )}
      {addingNote ? (
        <AddNoteModal
          fetchUserIdentity={fetchUserIdentity}
          userId={_userId}
          open={addingNote}
          onClose={() => setAddingNote(false)}
          onCancel={setAddingNote}
        />
      ) : (
        false
      )}
    </>
  )
}
