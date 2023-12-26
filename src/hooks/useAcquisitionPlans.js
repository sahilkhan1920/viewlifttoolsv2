import { useEffect, useState } from 'react'
import fetchHelper from 'src/helpers/fetchHelper'

import { useCookies } from 'react-cookie'

import { useRouter } from 'next/router'
import { transformAcqisitionPlans } from 'src/helpers/analyticsHelper'
import useHeaders from './useHeaders'
import getQueryArray from 'src/helpers/queryHelpers'
import moment from 'moment'

const useAcquisitionPlans = () => {
  const router = useRouter()
  const [cookies] = useCookies()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const {
    page: {
      dataUrl,
      header: { dateFormat, filters: { dimensions = [] } = {} },
    },
  } = useHeaders()

  const filterDimensions = dimensions.reduce((acc, current) => {
    if (router.query[current]) {
      acc[current] = getQueryArray(router.query[current])
    }
    return acc
  }, {})

  const getPlans = async () => {
    setLoading(true)
    const queryParams = {
      filters: {
        clientId: cookies.siteId,
        ...filterDimensions,
        dateRangeStart: moment().subtract('14', 'day').format(dateFormat),
        dateRangeEnd: moment().format(dateFormat),
      },
      dimensions: ['subscriptionPlan', router.query.timeFrame || 'day'],
      metrics: ['numSubsWatchedVideo'],
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

    setData(transformAcqisitionPlans(result, 'allnumentitled'))
    setLoading(false)
  }

  useEffect(() => {
    if (!router.isReady) return
    getPlans()
  }, [router.query])

  return {
    loading,
    data,
  }
}

export default useAcquisitionPlans
