import { useEffect, useState } from 'react'
import fetchHelper from 'src/helpers/fetchHelper'

import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import getQueryArray from 'src/helpers/queryHelpers'
import useHeaders from './useHeaders'

const useBehaviour = (tab) => {
  const router = useRouter()
  const [cookies] = useCookies()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const {
    filterLoaded,
    filterValues,
    page: {
      dataUrl,
      defaultMetrics,
      metrics,
      header: { filters: { dimensions = [] } = {} },
    },
  } = useHeaders()

  const filterDimensions = dimensions.reduce((acc, current) => {
    if (router.query[current]) {
      acc[current] = getQueryArray(router.query[current])
    }
    return acc
  }, {})

  const selectedPlan = getQueryArray(router.query.selectedPlan)

  const customFilters = {
    ...filterDimensions,
  }

  if (selectedPlan.length > 0) {
    customFilters.selectedPlan = selectedPlan
  }

  const selectedMetrics = router.query.metrics || defaultMetrics
  // console.log('selectedMetrics ==>', selectedMetrics)

  const selectedDataMetrics = metrics.find(
    (item) => item.value === selectedMetrics
  )

  const { metrics: dataMetrics, platformSuffix } = selectedDataMetrics

  const getTabData = async () => {
    setLoading(true)
    const queryParams = {
      filters: {
        clientId: cookies.siteId,
        ...filterValues,
        ...customFilters,
      },
      dimensions: [...tab.dimensions, router.query.timeFrame || 'day'],
      metrics: [dataMetrics],
    }
    const data = await fetchHelper({
      url: dataUrl,
      method: 'POST',
      headers: {
        'x-api-key': cookies.managementXApiKey,
        Authorization: cookies.accessToken,
      },
      data: queryParams,
    })
    const transformedData = tab.transform(data, tab, selectedMetrics, metrics)
    setData(transformedData)
    setLoading(false)
  }

  useEffect(() => {
    if (!filterLoaded) return
    getTabData()
  }, [filterLoaded, router.query, tab])

  return {
    loading,
    data,
    metrics,
    selectedMetrics,
    platformSuffix,
  }
}

export default useBehaviour
