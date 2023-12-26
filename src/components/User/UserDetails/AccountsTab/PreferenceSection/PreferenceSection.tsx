import { Box, Button, Switch, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import { ChangeEvent, memo, useState } from 'react'
import { useCookies } from 'react-cookie'

import { UserPageCard } from 'src/components/Card'
import { INVOKE_V2_API } from 'src/constants/urlConstants'
import fetchHelper from 'src/helpers/fetchHelper'
import useActionAudit from 'src/hooks/useActionAudit'

const ChangePinModal = dynamic(() => import('./ChangePin').then((modal) => modal.ChangePin))

export default memo(function PreferenceSection({ userId }: { userId: string; userIdentity: Promise<unknown> }) {
  const [cookies] = useCookies()

  //TODO: Need to move identity/user call to single place to share data between all sections
  const [switchValue, setSwitchValue] = useState(false)
  const [showChangePinModal, setShowChangePinModal] = useState(false)
  const { saveToAuditLog } = useActionAudit()

  function onSwitchValueChange(_: ChangeEvent<HTMLInputElement>, checked: boolean) {
    setSwitchValue(checked)
    callParentalControlService(checked)
  }

  async function callParentalControlService(isParentalControlOn: boolean) {
    await fetchHelper({
      method: 'POST',
      url: INVOKE_V2_API,
      data: {
        url: 'identity/parental',
        method: 'PUT',
        role: 'Customer Support',
        auth: {
          site: cookies.site,
          userId,
        },
        query: {
          site: cookies.site,
        },
        body: {
          parentalControl: isParentalControlOn,
        },
      },
      headers: {
        xapikey: cookies.managementXApiKey,
        Authorization: cookies.accessToken,
      },
    })
    await saveToAuditLog({
      userId,
      event_comments: `Changed Parental Control to ${isParentalControlOn}`,
      event_code: 'parentalControl',
      event_name: 'parentalControl',
    })
  }

  const closeChangePinModal = () => setShowChangePinModal(false)
  const openChangePinModal = () => setShowChangePinModal(true)

  return (
    <>
      <Box paddingY={5}>
        <Box id="section-header" display="flex" alignItems="center" justifyContent="space-between" marginBottom={2}>
          <Typography variant="h6">Preferences</Typography>
        </Box>
        <UserPageCard>
          <Box id="card-header" display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6">Parental Control</Typography>
            <Switch value={switchValue} onChange={onSwitchValueChange} id="parental-control-switch" />
          </Box>
          <Box id="card-actions" flexDirection="column" display="flex" gap={2} marginTop={1}>
            <Button variant="contained" onClick={openChangePinModal}>
              CHANGE PIN
            </Button>
          </Box>
        </UserPageCard>
      </Box>
      {showChangePinModal ? (
        <ChangePinModal onCancel={closeChangePinModal} onClose={closeChangePinModal} open={showChangePinModal} userId={userId} />
      ) : (
        false
      )}
    </>
  )
})
