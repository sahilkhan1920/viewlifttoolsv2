import { useState, useEffect } from 'react'
import fetchHelper from '../helpers/fetchHelper'
import { useRouter } from 'next/router'
import currencyJson from 'src/json/currency.json'
import frequencyJson from 'src/json/frequencyJson.json'
import EditIcon from '@mui/icons-material/Edit'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import { INVOKE_V2_API } from 'src/constants/urlConstants'
import { useCookies } from 'react-cookie'

const usePlanss = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const router = useRouter()
  const [cookies] = useCookies()

  const getPlans = async ({
    site = cookies.site,
    limit = 10,
    migrationEnabled = true,
    offset = 0,
    sortBy = 'planDisplayOrder',
    sortOrder = 'asc',
    status = 1,
  }) => {
    setLoading(true)
    const url = INVOKE_V2_API

    const query = {
      site: site,
      limit: limit,
      migrationEnabled: migrationEnabled,
      offset: offset,
      sortBy: sortBy,
      sortOrder: sortOrder,
      status: status,
    }

    const result = await fetchHelper({
      url: url,
      data: {
        url: '/subscription/plans',
        method: 'GET',
        role: 'Subscriptions & Offers',
        auth: {
          site: site,
          isServerToken: true,
        },
        query: query,
        body: {},
      },

      method: 'POST',
      headers: {
        Authorization: cookies.accessToken,
        xApiKey: cookies.managementXApiKey,
      },
    })
    setLoading(false)

    setData(result?.plans)
  }

  useEffect(() => {
    if (!router.isReady) return
    getPlans({})
  }, [])

  const handlePrev = ({
    allVisible,
    lastClickedSortedOption,
    setOffSet,
    offSet,
  }) => {
    getPlans({
      status: allVisible ? allVisible : 1,
      ...lastClickedSortedOption.current,
      offset: offSet - 10,
    })
    setOffSet((prev) => prev - 10)
  }

  const handleNext = ({
    allVisible,
    lastClickedSortedOption,
    offSet,
    setOffSet,
  }) => {
    getPlans({
      status: allVisible ? allVisible : 1,
      ...lastClickedSortedOption.current,
      offset: offSet + 10,
    })
    setOffSet((prev) => prev + 10)
  }

  const refineTableDataForPlans = (data) => {
    if (data && data.length === 0) {
      return []
    }
    const refined = data?.map((item) => {
      let country = ''
      let visible = ''
      let recurringPaymentAmountAll = ''
      let renewable = item?.renewable ? 'Recurring' : 'Non-recurring'
      let scheduledFromDate = new Date(item.scheduledFromDate)
      let ddmmyyDate = item?.scheduledFromDate
        ? `${
            scheduledFromDate?.getMonth() + 1
          }/${scheduledFromDate?.getDate()}/${scheduledFromDate?.getFullYear()}`
        : 'Na'

      item?.planDetails?.forEach((currentItem, i) => {
        let visibletext = currentItem.visible ? 'visible' : 'invisble'

        if (i === 0) {
          country = currentItem?.countryCode
          visible = visibletext
          recurringPaymentAmountAll =
            currencyJson[currentItem.recurringPaymentCurrencyCode] +
            currentItem.recurringPaymentAmount
        } else {
          country = country + ',' + currentItem?.countryCode
          visible = visible + ',' + visibletext
          recurringPaymentAmountAll =
            recurringPaymentAmountAll +
            ',' +
            currencyJson[currentItem.recurringPaymentCurrencyCode] +
            currentItem.recurringPaymentAmount
        }
      })
      return {
        ...item,
        allCountry: country || 'Na',
        allVisible: visible || 'Na',
        scheduledFromDateFormatted: ddmmyyDate || 'Na',
        recurringPaymentAmountAll: recurringPaymentAmountAll || 'Na',
        renewalCycleType: frequencyJson[item.renewalCycleType] || 'Na',
        renewable: renewable || 'Na',
        planEditFunction: () => <EditIcon />,
        versionHistoryFunction: () => <AccessTimeIcon />,
      }
    })

    return refined
  }

  const actionListObject = ({ setShowVersionHistory }) => {
    return {
      planEditFunction: ({ id, item }) => {
        router.push({
          pathname: 'ui-plansNew/edit',
          query: { type: item.monetizationModel, id: id },
        })
      },
      versionHistoryFunction: () => {
        setShowVersionHistory(true)
      },
    }
  }

  const headerActionsAndIconObject = ({
    nameOrder,
    lastClickedSortedOption,
    setNameOrder,
    offSet,
    descriptionOrder,
    setdescriptionOrder,
    allCountryOrder,
    setAllCountryOrder,
    selectForHeaderVisible,
    monetizationModelOrder,
    setMonetizationModelOrder,
    dateOrder,
    setDateOrder,
    frequency,
    setFrequency,
  }) => {
    return {
      name: {
        action: () => {
          if (nameOrder) {
            setNameOrder(false)
            lastClickedSortedOption.current = {
              sortBy: 'name',
              sortOrder: 'asc',
            }
            getPlans({ sortBy: 'name', sortOrder: 'asc', offset: offSet })
          } else {
            lastClickedSortedOption.current = {
              sortBy: 'name',
              sortOrder: 'desc',
            }
            getPlans({ sortBy: 'name', sortOrder: 'desc', offset: offSet })
            setNameOrder(true)
          }
        },
        icon: nameOrder ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />,
      },
      description: {
        action: () => {
          if (descriptionOrder) {
            lastClickedSortedOption.current = {
              sortBy: 'identifier',
              sortOrder: 'asc',
            }
            getPlans({ sortBy: 'identifier', sortOrder: 'asc', offset: offSet })
            setdescriptionOrder(false)
          } else {
            lastClickedSortedOption.current = {
              sortBy: 'identifier',
              sortOrder: 'desc',
            }
            getPlans({
              sortBy: 'identifier',
              sortOrder: 'desc',
              offset: offSet,
            })
            setdescriptionOrder(true)
          }
        },
        icon: descriptionOrder ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />,
      },
      allCountry: {
        action: () => {
          if (allCountryOrder) {
            lastClickedSortedOption.current = {
              sortBy: 'countryCode',
              sortOrder: 'asc',
            }
            getPlans({
              sortBy: 'countryCode',
              sortOrder: 'asc',
              offset: offSet,
            })
            setAllCountryOrder(false)
          } else {
            lastClickedSortedOption.current = {
              sortBy: 'countryCode',
              sortOrder: 'desc',
            }
            getPlans({
              sortBy: 'countryCode',
              sortOrder: 'desc',
              offset: offSet,
            })
            setAllCountryOrder(true)
          }
        },
        icon: descriptionOrder ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />,
      },
      allVisible: {
        icon: selectForHeaderVisible(),
      },

      monetizationModel: {
        action: () => {
          if (monetizationModelOrder) {
            lastClickedSortedOption.current = {
              sortBy: 'monetizationModel',
              sortOrder: 'asc',
            }
            getPlans({ sortBy: 'monetizationModel', sortOrder: 'asc' })
            setMonetizationModelOrder(false)
          } else {
            lastClickedSortedOption.current = {
              sortBy: 'monetizationModel',
              sortOrder: 'desc',
            }
            getPlans({ sortBy: 'monetizationModel', sortOrder: 'desc' })
            setMonetizationModelOrder(true)
          }
        },
        icon: monetizationModelOrder ? (
          <ArrowDropUpIcon />
        ) : (
          <ArrowDropDownIcon />
        ),
      },
      scheduledFromDateFormatted: {
        action: () => {
          if (dateOrder) {
            lastClickedSortedOption.current = {
              sortBy: 'scheduleStartDate',
              sortOrder: 'asc',
            }
            getPlans({ sortBy: 'scheduleStartDate', sortOrder: 'asc' })
            setDateOrder(false)
          } else {
            lastClickedSortedOption.current = {
              sortBy: 'scheduleStartDate',
              sortOrder: 'desc',
            }
            getPlans({ sortBy: 'scheduleStartDate', sortOrder: 'desc' })
            setDateOrder(true)
          }
        },
        icon: dateOrder ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />,
      },
      renewalCycleType: {
        action: () => {
          if (frequency) {
            lastClickedSortedOption.current = {
              sortBy: 'renewalCycleType',
              sortOrder: 'asc',
            }
            getPlans({ sortBy: 'renewalCycleType', sortOrder: 'asc' })
            setFrequency(false)
          } else {
            lastClickedSortedOption.current = {
              sortBy: 'renewalCycleType',
              sortOrder: 'desc',
            }
            setFrequency(true)
          }
        },
        icon: frequency ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />,
      },
    }
  }

  return {
    loading,
    data,
    getPlans,
    handlePrev,
    handleNext,
    refineTableDataForPlans,
    actionListObject,
    headerActionsAndIconObject,
  }
}

export default usePlanss
