import { Box, Button, Card, List, ListItem, useTheme } from '@mui/material'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useCookies } from 'react-cookie'
import dynamic from 'next/dynamic'

import fetchHelper from 'src/helpers/fetchHelper'
import { INVOKE_V2_API } from 'src/constants/urlConstants'
import VLTable from 'src/components/common/VLTable'
import CONFIG from '../../../../../pages/users/config.json'
import VLLoaderWrapper from 'src/components/common/VLLoaderWrapper'
import { PageSegmentTabType, PageSegmentType } from 'src/types/SearchType'

const AddPlanModal = dynamic(() => import('../../Modals').then((m) => m.AddPlanModal))
const AddPurchaseModal = dynamic(() => import('./AddPurchaseModal/AddPurchaseModal'))

export type BillingPurchaseTabPropType = {
  userId: string
  segment: PageSegmentType
}
type TableDataType = {
  date: string
  title: string
  transactionType: string
  orderNumber: string
  offer: string
}
const STYLES = {
  FLEX_ROW: {
    display: 'flex',
    alignItems: 'center',
  },
}

export default function BillingPurchaseTab({ userId, segment }: BillingPurchaseTabPropType) {
  const [cookies] = useCookies()
  const { palette } = useTheme()

  const tableRef = useRef<HTMLTableElement | null>(null)

  // const [billingData, setBillingData] = useState<SubscriptionInfoType[] | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState(segment.tabs?.filter((tab) => tab.showOnLoad)[0])
  const [resData, setResData] = useState<any[] | undefined>(undefined)
  const [addingPlan, setAddingPlan] = useState(false)
  const [addingPurchase, setAddingPurchase] = useState(false)

  function getButtonHandler(tab?: PageSegmentTabType) {
    if (!tab) return
    if (tab.key === 'oneTimePurchases') return setAddingPurchase(true)
    if (tab.key === 'subsAndEntitlement') return setAddingPlan(true)
  }

  const onTabChange = (tab: PageSegmentTabType) => {
    setActiveTab(segment.tabs?.filter(({ key }) => key === tab.key)[0])
  }

  const fetchBillingHistory = useMemo(async () => {
    if (!userId) return
    return await fetchHelper({
      url: INVOKE_V2_API,
      data: {
        body: {},
        method: 'GET',
        url: 'payments/billing-history',
        role: 'Customer Support',
        auth: {
          site: cookies.site,
          userId: '5897289a-26ce-48a2-862c-e25fb9690274',
        },
        query: { site: cookies.site },
      },
      method: 'POST',
      headers: {
        xapikey: cookies.managementXApiKey,
        Authorization: cookies.accessToken,
      },
    })
  }, [userId, cookies.site, cookies.managementXApiKey, cookies.accessToken])

  function prepareTableData() {
    if (!resData) return
    const _tableData: TableDataType[] = []
    resData.map((node) => {
      _tableData.push({
        date: Intl.DateTimeFormat(`en-IN`, { dateStyle: 'short' }).format(new Date(node.completedAt)),
        offer: 'N/A',
        orderNumber: node.gatewayChargeId,
        title: '-',
        transactionType: node.transactiontype,
      } satisfies TableDataType)
    })
    return _tableData
  }

  useEffect(() => {
    setLoading(true)
    fetchBillingHistory
      .then((res) => {
        if (new Object(res).hasOwnProperty('error')) return setResData(undefined)
        setResData(res.Items)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [fetchBillingHistory])

  return (
    <>
      <Card id="billing-details-card" sx={{ background: palette.background.default }}>
        <Box p={3}>
          <Box id="card-header" display="flex" alignItems="center" justifyContent="space-between" flex={1} marginBottom={3}>
            <List id="segment-bar" role="menubar" sx={{ ...STYLES.FLEX_ROW, flex: 1 }}>
              {segment?.tabs?.map((_tab) => (
                <ListItem
                  onClick={onTabChange.bind(null, _tab)}
                  role="menuitem"
                  key={_tab.key}
                  sx={{
                    padding: 0,
                  }}
                >
                  <Button
                    variant={activeTab?.key === _tab.key ? 'contained' : 'text'}
                    sx={{
                      width: '100%',
                      opacity: activeTab?.key === _tab.key ? 1 : 0.6,
                    }}
                  >
                    {_tab.label}
                  </Button>
                </ListItem>
              ))}
            </List>
            <Box id="card-header-actions" flex={1} display="flex" justifyContent="flex-end">
              <Button variant="contained" size="medium" sx={{ minWidth: '10rem' }} onClick={() => getButtonHandler(activeTab)}>
                {activeTab?.headerCtaButton?.label}
              </Button>
            </Box>
          </Box>
          <Box id="card-content">
            {/* //TODO: Need to move sub and entitlement and onetime purchase data in respective components. WIP, need data for that */}
            <VLLoaderWrapper type="inline" loading={loading}>
              <VLTable
                columns={CONFIG.tableColumns.BillingAndPurchaseTable}
                data={prepareTableData() ?? []}
                pagination
                rows={10}
                tableRef={tableRef}
              />
            </VLLoaderWrapper>
          </Box>
        </Box>
      </Card>
      {addingPlan ? (
        <AddPlanModal userId={userId} open={addingPlan} onClose={() => setAddingPlan(false)} onCancel={() => setAddingPlan(false)} />
      ) : (
        false
      )}
      {addingPurchase ? (
        <AddPurchaseModal userId={userId} open={addingPurchase} onClose={() => setAddingPurchase(false)} onCancel={() => setAddingPurchase(false)} />
      ) : (
        false
      )}
    </>
  )
}
