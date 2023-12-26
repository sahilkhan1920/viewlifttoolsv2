import { useEffect, useState } from 'react'
import fetchHelper from 'src/helpers/fetchHelper'

import { useCookies } from 'react-cookie'
import {
  REALTIME_CONTENT,
  REALTIME_CONTENT_ENHANCED,
} from 'src/constants/urlConstants'
import { useRouter } from 'next/router'
import getQueryArray from 'src/helpers/queryHelpers'
import useHeaders from './useHeaders'

// interface Props {
//   tab: {
//     dimensions: string[]
//     metrics?: string[]
//   }
//   transform: () => void
//   enhanced?: boolean
// }

// interface Filters {
//   [key: string]: string[]
// }

const useRealtimeData = ({ tab, transform, enhanced, platforms }) => {
  const router = useRouter()
  const [cookies] = useCookies()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const { filterLoaded, filterValues } = useHeaders()
  const {
    query: {
      selectedPlatform = [],
      videoTitle = [],
      seriesTitle = [],
      genre = [],
    },
  } = router

  const customFilters = {
    videoTitle: getQueryArray(videoTitle),
    seriesTitle: getQueryArray(seriesTitle),
    genre: getQueryArray(genre),
  }

  if (!platforms) {
    customFilters.platform = getQueryArray(selectedPlatform)
  }

  const getUserData = async () => {
    const queryParams = {
      filters: {
        clientId: cookies.siteId,
        ...filterValues,
        ...customFilters,
      },
      dimensions: tab.dimensions,
      metrics: tab.metrics,
    }
    return await fetchHelper({
      url: enhanced ? REALTIME_CONTENT_ENHANCED : REALTIME_CONTENT,
      method: 'POST',
      headers: {
        'x-api-key': cookies.managementXApiKey,
        Authorization: cookies.accessToken,
      },
      data: queryParams,
    })
  }

  const getTabData = async () => {
    setLoading(true)
    const res = await getUserData(tab)

    setData(transform(res, tab))
    setLoading(false)
  }

  useEffect(() => {
    if (!filterLoaded) return
    getTabData()
  }, [filterLoaded, router.query, tab])

  return {
    loading,
    data,
  }
}

export default useRealtimeData
