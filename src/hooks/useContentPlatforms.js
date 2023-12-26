import { useEffect, useState } from 'react'
import fetchHelper from 'src/helpers/fetchHelper'

import { useCookies } from 'react-cookie'

import { useRouter } from 'next/router'
import { transformContentOverviewPlatforms } from 'src/helpers/analyticsHelper'
import useHeaders from './useHeaders'
import { VIDEO_ENGAGEMENT } from 'src/constants/urlConstants'

const useContentPlatforms = () => {
  const router = useRouter()
  const [cookies] = useCookies()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const {
    filterValues,
    page: { defaultMetrics },
  } = useHeaders()

  const selectedMetrics = router.query.metrics || defaultMetrics

  const getPlatforms = async () => {
    setLoading(true)
    const queryParams = {
      filters: {
        clientId: cookies.siteId,
        ...filterValues,
      },
      dimensions: ['platform', 'day'],
      metrics: [selectedMetrics],
    }
    const result = await fetchHelper({
      url: VIDEO_ENGAGEMENT,
      method: 'POST',
      headers: {
        'x-api-key': cookies.managementXApiKey,
        Authorization: cookies.accessToken,
      },
      data: queryParams,
    })

    setData(transformContentOverviewPlatforms(result, selectedMetrics))
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

export default useContentPlatforms
