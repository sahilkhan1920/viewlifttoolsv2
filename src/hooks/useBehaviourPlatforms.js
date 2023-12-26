import { useEffect, useState } from 'react'
import fetchHelper from 'src/helpers/fetchHelper'

import { useCookies } from 'react-cookie'

import { useRouter } from 'next/router'
import { transformBehaviourPlatforms } from 'src/helpers/analyticsHelper'
import useHeaders from './useHeaders'
import getQueryArray from 'src/helpers/queryHelpers'

const useBehaviourPlatforms = () => {
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
    metrics: dataMetrics,
    numerator,
    denominator,
    platformSuffix,
  } = selectedDataMetrics
  // console.log(numerator, denominator)

  const getPlatforms = async () => {
    setLoading(true)
    const queryParams = {
      filters: {
        clientId: cookies.siteId,
        ...filterValues,
        ...filterDimensions,
      },
      dimensions: ['platform', 'day'],
      metrics: [dataMetrics],
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

    setData(
      transformBehaviourPlatforms(
        result,
        selectedMetrics,
        numerator,
        denominator,
        platformSuffix
      )
    )
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

export default useBehaviourPlatforms
