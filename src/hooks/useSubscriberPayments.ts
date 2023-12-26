import { useEffect, useState } from 'react'
import fetchHelper from 'src/helpers/fetchHelper'

import { useCookies } from 'react-cookie'
import { USER_PAYMENTS } from 'src/constants/urlConstants'
import useAnalyticsFilter from './useAnalyticsFilter'
import { dataDifferencePercentage } from 'src/helpers/analyticsHelper'

interface DT {
  startDate: string | undefined
  endDate: string | undefined
}

interface UserData {
  daterange: Date
  numentitled: number
  'pretax gross amount': number
  'currency type': number
  'tax amount': number
  'currency symbol': string
}

const useSubscriberPayments = () => {
  const [cookies] = useCookies()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({})
  const {
    formik,
    filterLoaded,
    previousPeriodStartDate,
    previousPeriodEndDate,
  } = useAnalyticsFilter()

  const getUserPayments = async ({ startDate, endDate }: DT) => {
    const data = await fetchHelper({
      url: USER_PAYMENTS,
      method: 'POST',
      headers: {
        'x-api-key': cookies.managementXApiKey,
        Authorization: cookies.accessToken,
      },
      data: {
        dimensions: ['Currency Type'],
        filters: {
          startDate,
          endDate,
        },
        site_uuid: cookies.siteId,
      },
    })
    return data
  }

  const getData = async () => {
    setLoading(true)
    const rawCurrentPaymentData: UserData[] = await getUserPayments({
      startDate: formik.values.dateRangeStart,
      endDate: formik.values.dateRangeEnd,
    })
    const prevPaymentData = await getUserPayments({
      startDate: previousPeriodStartDate,
      endDate: previousPeriodEndDate,
    })

    rawCurrentPaymentData?.sort(function (a, b) {
      return b['pretax gross amount'] - a['pretax gross amount']
    })

    const currentPaymentData = rawCurrentPaymentData?.filter((a) =>
      Boolean(a['currency type'])
    )

    const paymentData = currentPaymentData.map((item) => {
      const prev = prevPaymentData.find(
        (a: UserData) => a['currency type'] === item['currency type']
      )
      const previousValue = prev
        ? prev['pretax gross amount'] + prev['tax amount']
        : 0
      const currentValue = item['pretax gross amount'] + item['tax amount']
      const changePercentage =
        previousValue && dataDifferencePercentage(previousValue, currentValue)

      return {
        currency: item['currency type'],
        amount: currentValue.toFixed(2),
        symbol: item['currency symbol'] || '$',
        previousValue: prev
          ? prev['pretax gross amount'] + prev['tax amount']
          : 0,
        changePercentage: changePercentage.toFixed(2),
      }
    })

    setData(paymentData)

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

export default useSubscriberPayments
