import { useEffect, useState } from 'react'
import fetchHelper from 'src/helpers/fetchHelper'
import moment from 'moment'
import { get, head } from 'lodash'

import { useCookies } from 'react-cookie'
import { USER_BASE } from 'src/constants/urlConstants'
import useAnalyticsFilter from './useAnalyticsFilter'
import metricsMap from 'src/json/metricsMap.json'
import { dataDifferencePercentage } from 'src/helpers/analyticsHelper'
import { DATE_FORMAT_DISPLAY } from 'src/constants/filterConstants'

interface DT {
  dateRangeStart: string | undefined
  dateRangeEnd: string | undefined
}

interface UserData {
  daterange: Date
  numentitled: number
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

const getInitialValues = () => {
  const initialReduceValues: InitialReduceValues = {
    datasets: [
      {
        label: 'Subscribers',
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

interface Data {
  prevSub: number
  currentSub: number
  subscriberChange: number
  subText: string
  subValue: number
  dateDiff: number
  positiveTrend: boolean
  chartData: object
}

const initialData = {
  prevSub: 0,
  currentSub: 0,
  subscriberChange: 0,
  subText: '',
  subValue: 0,
  dateDiff: 0,
  positiveTrend: false,
  chartData: getInitialValues(),
}

const useSubscriberReport = () => {
  const [cookies] = useCookies()
  const [loading, setLoading] = useState(true)
  const [subData, setSubData] = useState<Data>(initialData)
  const { formik, filterLoaded, prevDate, dateDiff } = useAnalyticsFilter()

  const getUserBase = async ({ dateRangeStart, dateRangeEnd }: DT) => {
    const data = await fetchHelper({
      url: USER_BASE,
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
        metrics: [metricsMap['subscribedUsers']],
      },
    })
    return data
  }

  const getData = async () => {
    setLoading(true)
    const currentData: UserData[] = await getUserBase({
      dateRangeStart: formik.values.dateRangeStart,
      dateRangeEnd: formik.values.dateRangeEnd,
    })
    const prevData = await getUserBase({
      dateRangeStart: prevDate,
      dateRangeEnd: prevDate,
    })

    // const [{ numentitled: prevSub }] = prevData
    const prevSub = get(head(prevData), ['numentitled'])
    console.log(prevSub)

    const [{ numentitled: currentSub = 0 } = {}] = currentData.slice(-1)

    const subscriberChange = Number(
      dataDifferencePercentage(prevSub, currentSub)
    )

    const positiveTrend = subscriberChange >= 0

    const chartData = currentData.reduce((acc, currentValue) => {
      acc.datasets[0].data.push(currentValue.numentitled)
      acc.labels.push(
        moment(currentValue.daterange).format(DATE_FORMAT_DISPLAY)
      )
      return acc
    }, getInitialValues())
    setSubData({
      prevSub,
      currentSub,
      subscriberChange,
      subText: `${positiveTrend ? '+' : ''}${subscriberChange}%`,
      subValue: 50 + Number(subscriberChange) / 2,
      dateDiff,
      positiveTrend,
      chartData,
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
    subData,
  }
}

export default useSubscriberReport
