import { useEffect, useState } from 'react'
import fetchHelper from 'src/helpers/fetchHelper'

import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import getQueryArray from 'src/helpers/queryHelpers'
import useHeaders from './useHeaders'

const useQOSPlatforms = ({ tab }) => {
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
      platformTransform,
      header: { filters: { dimensions = [] } = {} },
    },
    isMounted,
  } = useHeaders()

  const filterDimensions = dimensions.reduce((acc, current) => {
    if (router.query[current]) {
      acc[current] = getQueryArray(router.query[current])
    }
    return acc
  }, {})

  const customFilters = {
    ...filterDimensions,
  }

  const selectedMetrics = router.query.metrics || defaultMetrics

  const selectedDataMetrics = metrics.find(
    (item) => item.value === selectedMetrics
  )

  const queryParams = {
    dimensions: [tab.platformDimension],
    filters: {
      clientId: cookies.siteId,
      ...filterValues,
      ...customFilters,
    },
    topDimension: { dimension: [''], byMetric: ['numplays'] },
  }

  if (tab.topRank) {
    queryParams.bucketType = ['bufferingratio']
    queryParams.topRank = { byMetric: ['numFirstFrame'] }

    delete queryParams.topDimension
  }

  const getTabData = async () => {
    setLoading(true)

    const data = await fetchHelper({
      url: dataUrl,
      method: 'POST',
      headers: {
        'x-api-key': cookies.managementXApiKey,
        Authorization: cookies.accessToken,
      },
      data: queryParams,
    })

    setData(platformTransform(data, selectedDataMetrics, tab))
    setLoading(false)
  }

  useEffect(() => {
    if (!filterLoaded || !isMounted) return
    getTabData()
  }, [filterLoaded, router.query, tab, isMounted])

  return {
    loading,
    data,
    metrics,
    selectedMetrics,
    selectedDataMetrics,
  }
}

export default useQOSPlatforms
