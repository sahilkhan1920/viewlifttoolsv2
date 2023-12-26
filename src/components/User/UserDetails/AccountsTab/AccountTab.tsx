import { Box, Divider } from '@mui/material'
import { PersonalInfoSection } from './PersonalInfoSection'
import { SubscriptionPlansSection } from './SubscriptionPlansSection'
import { PaymentMethodsSection } from './PaymentMethodsSection'
import { PreferenceSection } from './PreferenceSection'
import { memo } from 'react'

export default memo(function AccountTab({ userId, fetchUserIdentity }: { userId: string; fetchUserIdentity: Promise<unknown> }) {
  return (
    <Box id="accounts-tab">
      <PersonalInfoSection userIdentity={fetchUserIdentity} userId={userId} />
      <Divider />
      <SubscriptionPlansSection userId={userId} />
      <Divider />
      <PaymentMethodsSection userId={userId} />
      <Divider />
      <PreferenceSection userId={userId} userIdentity={fetchUserIdentity} />
      <Divider />
    </Box>
  )
})
