import { useEffect, useState } from 'react'
import fetchHelper from 'src/helpers/fetchHelper'

import { useCookies } from 'react-cookie'
import { USER_BASE } from 'src/constants/urlConstants'
import useAnalyticsFilter from './useAnalyticsFilter'
import columns from 'src/json/topPlansColumns.json'
import metricsMap from 'src/json/metricsMap.json'

interface DT {
  dateRangeStart: string | undefined
  dateRangeEnd: string | undefined
}
interface UserData {
  daterange: Date
  numentitled: number
  numentitledfreetrial: number
  numentitledpaid: number
  totalplayduration: number
  numplays: number
  subscriptionplan: string
}

interface TableData {
  subscriptionplan: string
  numentitled?: number | string
  precentageData?: number | string
}

const useTopPlans = () => {
  const [cookies] = useCookies()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<TableData[]>([])
  const { formik, filterLoaded } = useAnalyticsFilter()

  const getUserData = async ({ dateRangeStart, dateRangeEnd }: DT) => {
    const data = await fetchHelper({
      url: USER_BASE,
      method: 'POST',
      headers: {
        'x-api-key': cookies.managementXApiKey,
        Authorization: cookies.accessToken,
      },
      data: {
        dimensions: ['subscriptionPlan'],
        filters: {
          clientId: cookies.siteId,
          dateRangeEnd: dateRangeEnd,
          dateRangeStart: dateRangeStart,
        },
        metrics: [metricsMap['topPlans']],
      },
    })
    return data
  }

  const getData = async () => {
    setLoading(true)
    const rawCurrentData: UserData[] = await getUserData({
      dateRangeStart: formik.values.dateRangeEnd,
      dateRangeEnd: formik.values.dateRangeEnd,
    })
    const currentData = rawCurrentData?.sort(function (a, b) {
      return b.numentitled - a.numentitled
    })

    const topPlans = currentData?.slice(0, 5)

    const topPlansData = topPlans?.reduce(
      (acc, item) => {
        acc.total += item.numentitled
        acc.freeUsersTotal += item.numentitledfreetrial
        acc.paidUsersTotal += item.numentitledpaid

        return acc
      },
      {
        total: 0,
        freeUsersTotal: 0,
        paidUsersTotal: 0,
      }
    )

    const allPlansData = currentData?.reduce(
      (acc, item) => {
        acc.total += item.numentitled
        acc.freeUsersTotal += item.numentitledfreetrial
        acc.paidUsersTotal += item.numentitledpaid

        return acc
      },
      {
        total: 0,
        freeUsersTotal: 0,
        paidUsersTotal: 0,
      }
    )

    const otherPlansData = {
      total: allPlansData?.total - topPlansData?.total,
      freeUsersTotal:
        allPlansData?.freeUsersTotal - topPlansData?.freeUsersTotal,
      paidUsersTotal:
        allPlansData?.paidUsersTotal - topPlansData?.paidUsersTotal,
    }

    const topPlansWithPercentage =
      topPlans?.map((item) => ({
        subscriptionplan: item.subscriptionplan,
        numentitled: item.numentitled,
        precentageData: ((item.numentitled / allPlansData.total) * 100).toFixed(
          2
        ),
      })) || []

    const otherPlansRow = {
      subscriptionplan: 'All Others',
      numentitled: otherPlansData.total,
      precentageData: (
        (otherPlansData?.total / allPlansData?.total) *
        100
      ).toFixed(2),
    }

    const tableData = [...topPlansWithPercentage, otherPlansRow]

    setData(tableData)

    setLoading(false)
  }

  useEffect(() => {
    if (
      !filterLoaded ||
      Object.keys(formik.values).length === 0 ||
      !cookies.siteId ||
      !cookies.accessToken
    )
      return

    getData()
  }, [filterLoaded, formik.values, cookies])

  return {
    loading,
    data,
    columns,
  }
}

export default useTopPlans
