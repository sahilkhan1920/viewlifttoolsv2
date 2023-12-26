import { useEffect, useState } from 'react'
import fetchHelper from 'src/helpers/fetchHelper'
import moment from 'moment'

import { useCookies } from 'react-cookie'
import { USER_BEHAVIOUR } from 'src/constants/urlConstants'
import useAnalyticsFilter from './useAnalyticsFilter'
import { dataDifferencePercentage } from 'src/helpers/analyticsHelper'
import metricsMap from 'src/json/metricsMap.json'
import { DATE_FORMAT_DISPLAY } from 'src/constants/filterConstants'

interface DT {
  dateRangeStart: string | undefined
  dateRangeEnd: string | undefined
}

interface UserData {
  daterange: Date
  numentitled: number
  totalplayduration: number
}

interface Data {
  currentTotal: number
  change: number
  chartData: {
    datasets: DatasetValues[]
    labels: string[]
  }
}

interface DatasetValues {
  label: string
  data: number[]
  backgroundColor: string
  borderColor: string
  borderWidth: number
}

interface InitialReduceValues {
  datasets: DatasetValues[]
  labels: string[]
}

const initialData = {
  currentTotal: 0,
  change: 0,
  chartData: {
    datasets: [],
    labels: [],
  },
}

const getInitialValues = () => {
  const initialReduceValues: InitialReduceValues = {
    datasets: [
      {
        label: 'Steaming Users',
        data: [],
        backgroundColor: 'rgba(151,187,205,0.5)',
        borderColor: 'rgba(151,187,205,0.8)',
        borderWidth: 2,
      },
    ],
    labels: [],
  }
  return initialReduceValues
}

const useStreamingDuration = () => {
  const [cookies] = useCookies()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<Data>(initialData)
  const {
    formik,
    filterLoaded,
    previousPeriodStartDate,
    previousPeriodEndDate,
  } = useAnalyticsFilter()

  const getUserData = async ({ dateRangeStart, dateRangeEnd }: DT) => {
    const data = await fetchHelper({
      url: USER_BEHAVIOUR,
      method: 'POST',
      headers: {
        'x-api-key': cookies.managementXApiKey,
        Authorization: cookies.accessToken,
      },
      data: {
        dimensions: [formik.values.timeFrame],
        filters: {
          clientId: cookies.siteId,
          dateRangeEnd,
          dateRangeStart,
        },
        metrics: [metricsMap['streamingDuration']],
      },
    })
    return data
  }

  const getData = async () => {
    setLoading(true)
    const rawCurrentData = await getUserData({
      dateRangeStart: formik.values.dateRangeStart,
      dateRangeEnd: formik.values.dateRangeEnd,
    })
    const currentData: UserData[] = rawCurrentData?.sort(function (
      a: UserData,
      b: UserData
    ) {
      return moment(a.daterange).valueOf() - moment(b.daterange).valueOf()
    })
    const prevData = await getUserData({
      dateRangeStart: previousPeriodStartDate,
      dateRangeEnd: previousPeriodEndDate,
    })

    const chartData = currentData.reduce((acc, currentValue) => {
      acc.datasets[0].data.push(currentValue.totalplayduration / 60)
      acc.labels.push(
        moment(currentValue.daterange).format(DATE_FORMAT_DISPLAY)
      )
      return acc
    }, getInitialValues())

    const prevTotal = prevData?.reduce((acc: number, item: UserData) => {
      return acc + item.totalplayduration / 60
    }, 0)

    const currentTotal = currentData.reduce((acc, item) => {
      return acc + item.totalplayduration / 60
    }, 0)

    const change = Number(dataDifferencePercentage(prevTotal, currentTotal))

    setData({
      chartData,
      currentTotal,
      change,
    })

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
  }
}

export default useStreamingDuration
