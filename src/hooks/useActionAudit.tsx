import { useCallback } from 'react'
import { useCookies } from 'react-cookie'
import fetchHelper from 'src/helpers/fetchHelper'
import { EventDataType } from 'src/types/AuditLogsType'

type AuditLogType = Pick<EventDataType, 'event_code' | 'event_comments' | 'event_name'> & { userId: string }
export default function useActionAudit() {
  const [cookies] = useCookies()

  const site = cookies.site
  const xapikey = cookies.managementXApiKey
  const Authorization = cookies.accessToken
  const session = 'user_id_c6d9bf45-5934-4b7e-8fbc-2d197d82105d1690535613528'
  //   const url = `https://tools.develop.monumentalsportsnetwork.com/${site}/users/logs/${userId}`

  const saveToAuditLog = useCallback(
    async (payload: AuditLogType): Promise<void> => {
      const res = await fetchHelper({
        method: 'POST',
        url: `https://tools.develop.monumentalsportsnetwork.com/${site}/users/logs/${payload.userId}`,
        // url: INVOKE_V2_API,
        data: {
          reason: payload.event_name,
          comment: payload.event_comments,
          actionType: payload.event_code,
          session,
        },
        headers: { xapikey, Authorization },
      })
      console.log(res)
      return res
    },
    [Authorization, site, xapikey, session]
  )

  return { saveToAuditLog }
}
