import { useEffect, useState } from 'react'
import fetchHelper from 'src/helpers/fetchHelper'

import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import filtersMap from 'src/helpers/filtersMap'
import moment from 'moment'
import { useFormik } from 'formik'
import { transformFilters } from 'src/helpers/analyticsHelper'

// interface FormValues {
//   [key: string]: string
// }
// interface UseHeaders {
//   page: {
//     header: {

//     }
//     tabs: {
//       key: string
//       columns: object[]
//     }[]
//   }
//   formik: FormikProps<FormValues>
//   filterLoaded: boolean
//   maxDate: string
//   clearFilters: () => void
//   disabledClearFilter: boolean
//   disableApply: boolean
//   filtersData: null | object[]
//   loadingFilters: boolean
//   filterValues: object
// }

// interface Initial {
//   [key: string]: string[]
// }

const useHeaders = (getFilters = false) => {
  const router = useRouter()
  const [cookies, setCookie] = useCookies()
  const [loading, setLoading] = useState(true)
  const [filtersData, setFiltersData] = useState(null)
  const { query, pathname, isReady } = router
  const page = filtersMap[pathname]
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const {
    dataUrl,
    header: {
      defaultRange,
      timeFrameSelector,
      dateRangeSelector,
      filters,
      filters: { dimensions, metrics, fields, queryData = {} } = {},
      dateFormat,
      title,
    },
  } = page

  const formik = useFormik({
    initialValues: {
      ...defaultRange,
      ...router.query,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log('values =>', values)
      setCookie('dateRangeStart', values.dateRangeStart)
      setCookie('dateRangeEnd', values.dateRangeEnd)
      setCookie('timeFrame', values.timeFrame)
      router.push({
        query: {
          ...values,
        },
      })
    },
  })

  const clearFilters = () => {
    router.push({
      query: {},
    })
  }

  let filterValues = {}
  if (timeFrameSelector) {
    if (router.query.timeframeUnit === 'today') {
      filterValues = {
        dateRangeStart: defaultRange.dateRangeStart,
        dateRangeEnd: defaultRange.dateRangeEnd,
      }
    } else {
      filterValues = {
        pastTimeframe:
          Number(router?.query?.pastTimeframe) || defaultRange.pastTimeframe,
      }
    }
  }
  if (dateRangeSelector) {
    filterValues = {
      dateRangeStart:
        router.query.dateRangeStart || defaultRange.dateRangeStart,
      dateRangeEnd: router.query.dateRangeEnd || defaultRange.dateRangeEnd,
    }
  }
  const getData = async () => {
    setLoading(true)
    const queryParams = {
      filters: {
        clientId: cookies.siteId,
        ...filterValues,
      },
      dimensions: dimensions,
      ...queryData,
    }

    if (metrics) {
      queryParams.metrics = metrics
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
    setFiltersData(transformFilters(data, fields))
    setLoading(false)
  }

  useEffect(() => {
    if (!isReady || !getFilters || !filters || !isMounted) return
    getData()
  }, [router.query, getFilters, isMounted])

  return {
    page,
    formik,
    filterLoaded: router.isReady,
    maxDate: moment().format(dateFormat),
    clearFilters,
    disabledClearFilter: Object.keys(query).length === 0,
    disableApply: !formik.dirty,
    filtersData,
    loadingFilters: loading,
    filterValues,
    isMounted,
    title,
  }
}

export default useHeaders
