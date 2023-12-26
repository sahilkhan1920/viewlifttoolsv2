import { useEffect, useState } from 'react'
import { transformGAData, topViewTableData } from 'src/helpers/analyticsHelper'
import useAnalyticsFilter from './useAnalyticsFilter'
import columns from 'src/json/topPageViewsColumns.json'
import { GA_DATA_URL } from 'src/constants/urlConstants'

const useGoogleAnalytics = (selectedDimension = 'date') => {
  const { formik, filterLoaded } = useAnalyticsFilter()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const getUserData = async () => {
    setLoading(true)
    const res = await fetch(GA_DATA_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        propertyId: 349001696,
        payload: {
          requests: [
            {
              dateRanges: [
                {
                  startDate: formik.values.dateRangeStart,
                  endDate: formik.values.dateRangeEnd,
                },
              ],
              dimensions: [
                {
                  name: selectedDimension,
                },
              ],
              metrics: [
                {
                  name: 'eventCount',
                },
              ],
            },
          ],
        },
      }),
    })
    const result = await res.json()
    if (selectedDimension === 'date') {
      setData(transformGAData(result?.reports[0].rows))
    } else {
      setData(topViewTableData(result?.reports[0].rows))
    }
    setLoading(false)
  }

  useEffect(() => {
    if (!filterLoaded || Object.keys(formik.values).length === 0) return

    getUserData()
  }, [filterLoaded, formik.values])

  return {
    loading: loading,
    data,
    columns,
  }
}

export default useGoogleAnalytics
