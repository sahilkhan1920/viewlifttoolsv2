import { useEffect, useState } from 'react'
import fetchHelper from 'src/helpers/fetchHelper'

import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import getQueryArray from 'src/helpers/queryHelpers'
import useHeaders from './useHeaders'

const useBehaviour = ({ tab }) => {
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
      header: { filters: { dimensions = [] } = {}, period },
    },
    isMounted,
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

  const dimensionUpdated = [...tab.dimensions]

  if (period) {
    dimensionUpdated.push(router.query.timeFrame || 'day')
  }

  const { tabDataUrl } = tab

  const queryData = {}

  if (tab.queryData) {
    queryData.bucketType = [selectedDataMetrics.bucketType]
    queryData.byMetric = [selectedDataMetrics.byMetric]
    queryData.topDimension = {
      dimension: [tab.key],
      byMetric: [selectedDataMetrics.byMetric],
    }
  }

  if (tab.topRank) {
    queryData.bucketType = ['bufferingratio']
    queryData.topRank = { byMetric: ['numFirstFrame'] }

    delete queryData.topDimension
  }

  const queryParams = {
    dimensions: dimensionUpdated,
    filters: {
      clientId: cookies.siteId,
      ...filterValues,
      ...filterDimensions,
    },
    topDimension: { dimension: tab.dimensions, byMetric: ['numplays'] },
    ...queryData,
  }

  const getTabData = async () => {
    setLoading(true)

    const data = await fetchHelper({
      url: tabDataUrl || dataUrl,
      method: 'POST',
      headers: {
        'x-api-key': cookies.managementXApiKey,
        Authorization: cookies.accessToken,
      },
      data: queryParams,
    })

    setData(tab?.transform(data, selectedDataMetrics, tab))
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

export default useBehaviour
