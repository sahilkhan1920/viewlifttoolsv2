import { useEffect, useState } from 'react'
import fetchHelper from 'src/helpers/fetchHelper'

import { useCookies } from 'react-cookie'

import { useRouter } from 'next/router'
import useHeaders from './useHeaders'
import getQueryArray from 'src/helpers/queryHelpers'

const usePaymentsPlatforms = () => {
  const router = useRouter()
  const [cookies] = useCookies()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const {
    filterValues,
    page: {
      dataUrl,
      defaultMetrics,
      metrics,
      header: { filters: { dimensions = [] } = {} },
      platforms,
    },
  } = useHeaders()

  const filterDimensions = dimensions.reduce((acc, current) => {
    if (router.query[current]) {
      acc[current] = getQueryArray(router.query[current])
    }
    return acc
  }, {})

  const selectedMetrics = router.query.metrics || defaultMetrics

  const selectedDataMetrics = metrics.find(
    (item) => item.value === selectedMetrics
  )
  const {
    dateRangeStart: startDate,
    dateRangeEnd: endDate,
    ...otherFilterValues
  } = filterValues

  const getPlatforms = async () => {
    setLoading(true)
    const queryParams = {
      site_uuid: cookies.siteId,
      filters: {
        ...otherFilterValues,
        startDate,
        endDate,
        ...filterDimensions,
        ...platforms.queryData.filters,
      },
      ...platforms.queryData.others,
    }
    const result = await fetchHelper({
      url: dataUrl,
      method: 'POST',
      headers: {
        'x-api-key': cookies.managementXApiKey,
        Authorization: cookies.accessToken,
      },
      data: queryParams,
    })

    setData(platforms.transform(result, selectedDataMetrics, platforms))
    setLoading(false)
  }

  useEffect(() => {
    if (!router.isReady) return
    getPlatforms()
  }, [router.query])

  return {
    loading,
    data,
  }
}

export default usePaymentsPlatforms
