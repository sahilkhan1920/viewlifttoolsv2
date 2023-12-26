import { useFormik } from 'formik'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
const preferredFormat = 'YYYY-MM-DD'
const dateFormatDisplay = 'MM/DD/YYYY'

interface defaultValue {
  dateRangeStart?: string | undefined
  dateRangeEnd?: string | undefined
  timeFrame?: string | undefined
}

const initialValues: defaultValue = {
  dateRangeStart: moment().subtract('14', 'day').format(preferredFormat),
  dateRangeEnd: moment().format(preferredFormat),
  timeFrame: 'day',
}

const defaultValue: defaultValue = {}

const useAnalyticsFilter = () => {
  const router = useRouter()
  const [formInitialValues, setFormInitialValues] = useState(defaultValue)
  const [filterLoaded, setFilterLoaded] = useState(false)
  const formik = useFormik({
    initialValues: formInitialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      router.push({
        query: {
          ...values,
        },
      })
    },
  })

  useEffect(() => {
    if (!router.isReady) return

    if (Object.keys(router.query).length > 0) {
      setFormInitialValues({
        ...initialValues,
        ...router.query,
      })
      setFilterLoaded(true)
      return
    }
    setFilterLoaded(true)
    setFormInitialValues(initialValues)
  }, [router.query])

  const clearFilters = () => {
    router.push({
      query: {},
    })
  }

  const startDate = moment(formik.values.dateRangeStart)
  const endDate = moment(formik.values.dateRangeEnd)

  const dateDiff = endDate.diff(startDate, 'days')

  return {
    formik,
    maxDate: moment().format(preferredFormat),
    prevDate: moment(formik.values.dateRangeStart)
      .subtract(1, 'day')
      .format(preferredFormat),
    clearFilters,
    filterLoaded,
    dateDiff,
    preferredFormat,
    dateFormatDisplay,
    previousPeriodStartDate: moment(startDate)
      .subtract(dateDiff + 1, 'days')
      .format(preferredFormat),
    previousPeriodEndDate: moment(startDate)
      .subtract(1, 'days')
      .format(preferredFormat),
  }
}

export default useAnalyticsFilter
