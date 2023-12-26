import { useEffect, useState } from 'react'
import fetchHelper from 'src/helpers/fetchHelper'

import { useCookies } from 'react-cookie'
import { VIDEO_ENGAGEMENT } from 'src/constants/urlConstants'
import useAnalyticsFilter from './useAnalyticsFilter'
import columns from 'src/json/topContentsColumns.json'
import metricsMap from 'src/json/metricsMap.json'

interface DT {
  dateRangeStart: string | undefined
  dateRangeEnd: string | undefined
}

interface UserData {
  daterange: Date
  numplays: number
  totalplayduration?: number | string
  videotitle: string
}

interface TableData {
  videotitle: string
  totalplayduration?: number | string
  numplays: number
  precentageData?: number | string
}

interface InitialReduceValues {
  totalPlays: number
  totalStreaming: number
}

const initialReduceValues: InitialReduceValues = {
  totalPlays: 0,
  totalStreaming: 0,
}

const useTopContents = () => {
  const [cookies] = useCookies()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<TableData[]>([])
  const { formik, filterLoaded } = useAnalyticsFilter()

  const getUserData = async ({ dateRangeStart, dateRangeEnd }: DT) => {
    const data = await fetchHelper({
      url: VIDEO_ENGAGEMENT,
      method: 'POST',
      headers: {
        'x-api-key': cookies.managementXApiKey,
        Authorization: cookies.accessToken,
      },
      data: {
        dimensions: ['videoTitle'],
        filters: {
          clientId: cookies.siteId,
          dateRangeEnd: dateRangeEnd,
          dateRangeStart: dateRangeStart,
        },
        metrics: [metricsMap.topContents],
      },
    })
    return data
  }

  const getData = async () => {
    setLoading(true)
    const rawCurrentData: UserData[] = await getUserData({
      dateRangeStart: formik.values.dateRangeStart,
      dateRangeEnd: formik.values.dateRangeEnd,
    })
    const currentData = rawCurrentData?.sort(function (a, b) {
      return b.numplays - a.numplays
    })

    const topPlans = currentData?.slice(0, 5).map((item) => ({
      ...item,
      totalplayduration: (
        Number(item.totalplayduration) /
        item.numplays /
        60
      ).toFixed(1),
    }))

    const topData = topPlans?.reduce((acc, item) => {
      acc.totalPlays += item.numplays
      acc.totalStreaming += Number(item.totalplayduration)

      return acc
    }, initialReduceValues)

    const allData = currentData?.reduce(
      (acc, item) => {
        acc.totalPlays += item.numplays
        acc.totalStreaming += Number(item.totalplayduration)

        return acc
      },
      {
        totalPlays: 0,
        totalStreaming: 0,
      }
    )

    const otherData = {
      totalPlays: allData?.totalPlays - topData?.totalPlays,
      totalStreaming: allData?.totalStreaming / allData?.totalStreaming / 60,
    }

    const topDataWithPercentage =
      topPlans?.map((item) => ({
        videotitle: item.videotitle,
        totalplayduration: Number(item.totalplayduration),
        numplays: item.numplays,
        precentageData: ((item.numplays / allData.totalPlays) * 100).toFixed(2),
      })) || []

    const otherRow = {
      videotitle: 'All Others',
      totalplayduration: otherData.totalStreaming.toFixed(2),
      numplays: otherData.totalPlays,
      precentageData: (
        (otherData?.totalPlays / allData?.totalPlays) *
        100
      ).toFixed(2),
    }

    const tableData = [...topDataWithPercentage, otherRow]

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

export default useTopContents
