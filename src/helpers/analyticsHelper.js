import moment from 'moment'
import _, { groupBy, sortBy, uniq, uniqBy, map, get, orderBy } from 'lodash'
import { DATE_FORMAT_DISPLAY } from 'src/constants/filterConstants'

export const dataDifferencePercentage = (previousData = 0, currentData = 0) => {
  if (!previousData) return 'N/A'

  return Math.round(((currentData - previousData) / previousData) * 100)
}

export const transformGAData = (data) => {
  const sortedData = orderBy(data, (row) =>
    get(row, 'dimensionValues[0].value')
  )
  const labels = map(sortedData, (item) => {
    const dateValue = get(item, 'dimensionValues[0].value')
    return dateValue ? moment(dateValue, 'YYYYMMDD').format('MM/DD/YYYY') : null
  })

  const chartData = {
    label: 'Total Page Views',
    data: map(sortedData, (item) => get(item, 'metricValues[0].value')),
    backgroundColor: 'rgba(151,187,205,0.5)',
    borderColor: 'rgba(151,187,205,0.8)',
    borderWidth: 2,
  }

  return { datasets: [chartData], labels }
}

export const topViewTableData = (data) => {
  const sortedData = orderBy(data, (row) =>
    get(row, `Number(metricValues[0].value)`)
  ).map((item) => {
    return {
      page: get(item, 'dimensionValues[0].value'),
      views: get(item, 'metricValues[0].value'),
    }
  })
  const totalViews = sortedData.reduce((acc, item) => {
    return acc + Number(item.views)
  }, 0)
  // console.log('totalViews ==>', totalViews)

  const actualData = sortedData.slice(0, 6).map((item) => ({
    ...item,
    precentageData: ((item.views / totalViews) * 100).toFixed(2),
  }))
  return actualData
  // console.log(sortedData)
  // const sortedData = orderBy(data, row => get(row, 'dimensionValues[0].value'));
  // const labels = map(sortedData, item => {
  //   const dateValue = get(item, 'dimensionValues[0].value');
  //   return dateValue ? moment(dateValue, 'YYYYMMDD').format('MM/DD/YYYY') : null;
  // });

  // const chartData = {
  //   label: 'Total Page Views',
  //   data: map(sortedData, item => get(item, 'metricValues[0].value')),
  //   backgroundColor: 'rgba(151,187,205,0.5)',
  //   borderColor: 'rgba(151,187,205,0.8)',
  //   borderWidth: 2,
  // }

  // return { datasets: [chartData], labels };
}

export const transformTopContentData = (res = [], tabData) => {
  const aa = res.reduce((acc, current) => {
    const index = acc.findIndex(
      (b) => b[tabData.titleKey] === current[tabData.titleKey]
    )
    if (index >= 0) {
      acc[index] = {
        ...acc[index],
        currentActive:
          Number(current.numuniquestreams) + Number(acc[index].currentActive),
      }
    } else {
      acc.push({
        ...current,
        currentActive: current.numuniquestreams,
      })
    }
    return acc
  }, [])

  const totalActive = aa.reduce((acc, current) => {
    return acc + parseInt(current.currentActive)
  }, 0)

  const withPercentage = aa.map((a) => {
    return {
      ...a,
      precentageData: `${Number(
        ((a.currentActive / totalActive) * 100).toFixed(2)
      )} %`,
      title: `${a.seseriestitle || ''} / ${a.videotitle || ''}`,
    }
  })

  return withPercentage.sort((a, b) => b.currentActive - a.currentActive)
}

export const transformContentLevelQOSData = (res = [], tabData) => {
  const { titleKey } = tabData
  const aa = res.reduce((acc, current) => {
    const index = acc.findIndex((b) => b[titleKey] === current[titleKey])
    if (index >= 0) {
      acc[index] = {
        ...acc[index],
        currentActive:
          Number(current.numuniquestreams) + Number(acc[index].currentActive),
      }
    } else {
      acc.push({
        [titleKey]: current[titleKey],
        currentActive: Number(current.numuniquestreams),
        buffRatio: (
          Number(current.bufferingduration) /
          (Number(current.bufferingduration) + Number(current.playduration))
        ).toFixed(2),
        ttfb: (
          Number(current.tottimetofirstbyte) / Number(current.numplays)
        ).toFixed(2),
        avgResolution: (
          Number(current.resolutionheighttimesplayduration) /
          Number(current.playduration)
        ).toFixed(2),
        failedStart: (
          (Number(current.numfailedtostart) / Number(current.numplays)) *
          100
        ).toFixed(2),
        playsDropped: (
          (Number(current.numdroppedstream) / Number(current.numplays)) *
          100
        ).toFixed(2),
      })
    }
    return acc
  }, [])

  return aa.sort((a, b) => b.totalActive - a.totalActive)
}

export const transformRealStreamingUsersData = (res = []) => {
  const sortedResult = res?.sort(
    (a, b) => b.numuniquestreams - a.numuniquestreams
  )
  let total = 0
  const chartData = sortedResult?.reduce(
    (acc, currentValue) => {
      acc.datasets[0].data.push(currentValue.numuniquestreams)
      acc.labels.push(currentValue.platform)
      total += currentValue.numuniquestreams
      return acc
    },
    {
      datasets: [
        {
          label: 'Platforms',
          data: [],
          backgroundColor: 'rgba(151,187,205,0.5)',
          borderColor: 'rgba(151,187,205,0.8)',
          borderWidth: 2,
        },
      ],
      labels: [],
    }
  )

  const tableData = sortedResult.map((a) => {
    return {
      ...a,
      precentageData: `${Number(
        ((a.numuniquestreams / total) * 100).toFixed(2)
      )} %`,
    }
  })
  return {
    data: [
      {
        numuniquestreams: chartData?.total,
        platform: 'All',
      },
      ...sortedResult,
    ],
    chartData,
    tableData,
  }
}

export const transformPlatforms = (res = []) => {
  const result = res
    .sort((a, b) => b.numuniquestreams - a.numuniquestreams)
    .slice(0, 6)
  const platformsWithAll = [
    {
      platform: 'All',
      value: res?.reduce((acc, c) => acc + c.numuniquestreams, 0),
    },
    ...result.map((item) => ({
      ...item,
      value: item.numuniquestreams,
    })),
  ]
  return platformsWithAll
}

export const transformPlans = (res = []) => {
  const result = res
    .sort((a, b) => b.numregistered - a.numregistered)
    .slice(0, 6)
    .map((item) => ({
      subscriptionplan: item.subscriptionplan,
      value: item.numregistered,
    }))
  const plansWithAll = [
    {
      subscriptionplan: 'All',
      value: res?.reduce((acc, c) => acc + c.numregistered, 0),
    },
    ...result,
  ]
  return plansWithAll
}

export const transformChurnPlans = (res = [], selectedMetrics) => {
  const data = res.reduce((acc, current) => {
    const plan = current.subscriptionplan || 'No Plan'

    const value =
      selectedMetrics === 'allnumentitled'
        ? current.numentitled + current.numreentitled
        : current[selectedMetrics]

    if (!acc[plan]) {
      acc[plan] = {
        subscriptionplan: plan,
        value: value,
      }
      return acc
    }
    acc[plan].value += value
    return acc
  }, {})
  const arr = []

  for (var plan in data) {
    arr.push(data[plan])
  }

  const plansWithAll = [
    {
      subscriptionplan: 'All',
      value: arr?.reduce((acc, c) => acc + c.value, 0),
    },
    ...arr.sort((a, b) => b.value - a.value).slice(0, 6),
  ]
  return plansWithAll
}
export const transformAcqisitionPlans = (res = [], selectedMetrics) => {
  const data = res.reduce((acc, current) => {
    const plan = current.subscriptionplan || 'No Plan'

    const value =
      selectedMetrics === 'allnumentitled'
        ? current.numentitled + current.numreentitled
        : current[selectedMetrics]

    if (!acc[plan]) {
      acc[plan] = {
        subscriptionplan: plan,
        value: value,
      }
      return acc
    }
    acc[plan].value += value
    return acc
  }, {})
  const arr = []

  for (var plan in data) {
    arr.push(data[plan])
  }

  const plansWithAll = [
    {
      subscriptionplan: 'All',
      value: arr?.reduce((acc, c) => acc + c.value, 0),
    },
    ...arr.sort((a, b) => b.value - a.value).slice(0, 6),
  ]
  return plansWithAll
}

export const transformFilters = (res = [], fields) => {
  const result = fields.reduce((acc, current) => {
    const items = uniq(
      res.map((item) => item[current.identifier]).filter(Boolean)
    )

    const data = sortBy(items, (item) => item.toLowerCase())

    return {
      ...acc,
      [current.key]: data,
    }
  }, {})
  return result
}

const chooseColorCode = (index) => {
  const colorSetOverall = [
    '#F7464A',
    '#46BFBD',
    '#ffd420',
    '#4D5360',
    '#53a03b',
    '#84d4d4',
    '#b0ccda',
    '#fbe15e',
    '#ab7fb6',
  ]
  return colorSetOverall[index % colorSetOverall.length]
}

export const transformAudienceOverViewOverAll = (
  data,
  tab,
  selectedMetrics,
  dateFormat
) => {
  const initials = {
    datasets: [],
    labels: [],
  }
  const columns = tab?.columns?.find(
    (item) => item.value === selectedMetrics
  ).columns
  const chartData = columns?.reduce((acc, current, index) => {
    if (current.onlyTable) return acc
    const color = chooseColorCode(index)
    acc.datasets.push({
      label: current.title,
      data: data.map((item) => item[current.value]),
      backgroundColor: color,
      borderColor: color,
      borderWidth: 2,
    })
    if (acc.labels.length === 0) {
      acc.labels = data.map((item) =>
        moment(item.actualdaterange).format(dateFormat)
      )
    }
    return acc
  }, initials)
  const tableRows = data.map(
    (item) => ({
      ...item,
      actualdaterange: moment(item.actualdaterange).format(dateFormat),
    }),
    []
  )

  const tableData = {
    columns,
    tableRows,
  }
  return { chartData, tableData }
}

export const transformAudienceOverViewAcquistionCampaign = (
  data,
  tab,
  selectedMetrics,
  dateFormat
) => {
  const labels = []

  const columns = tab?.metrics?.find(
    (item) => item.value === selectedMetrics
  ).columns

  const updatedData = data.reduce((acc, current) => {
    if (!current[tab.valueKey]) return acc
    if (!labels.includes(moment(current.actualdaterange).format(dateFormat))) {
      labels.push(moment(current.actualdaterange).format(dateFormat))
    }
    if (!acc[current[tab.valueKey]]) {
      acc[current[tab.valueKey]] = {
        label: current[tab.valueKey],
        data: [current[selectedMetrics]],
        total: current[selectedMetrics],
      }
      return acc
    }
    acc[current[tab.valueKey]].data.push(current[selectedMetrics])
    acc[current[tab.valueKey]].total += current[selectedMetrics]
    return acc
  }, {})

  const arr = []

  for (var dimensionName in updatedData) {
    arr.push(updatedData[dimensionName])
  }
  const r = arr.sort((a, b) => b.total - a.total).slice(0, 4)

  const initials = {
    datasets: [],
    labels: labels,
  }

  const chartData = r.reduce((acc, current, index) => {
    const color = chooseColorCode(index)
    acc.datasets.push({
      label: current.label,
      data: current.data,
      backgroundColor: color,
      borderColor: color,
      borderWidth: 2,
    })
    return acc
  }, initials)

  const tableRows = data.map(
    (item) => ({
      ...item,
      actualdaterange: moment(item.actualdaterange).format(dateFormat),
    }),
    []
  )
  const tableData = {
    columns: [
      {
        key: 'actualdaterange',
        title: 'Date',
        value: 'actualdaterange',
        onlyTable: true,
      },
      {
        key: tab.valueKey,
        title: tab.title,
        value: tab.valueKey,
      },
      ...columns,
    ],
    tableRows,
  }

  return { chartData, tableData }
}

export const transformAudienceAcquisitionOverall = (
  data,
  tab,
  selectedMetrics,
  dateFormat
) => {
  const sorted = data.sort((a, b) => {
    return moment(a.daterange).valueOf() - moment(b.daterange).valueOf()
  })

  const updateData = sorted.map((item) => {
    return {
      ...item,
      allnumentitled: item.numentitled + item.numreentitled,
    }
  }, [])

  const initials = {
    datasets: [],
    labels: [],
  }

  const chartData = tab?.columns?.reduce((acc, current, index) => {
    if (current.onlyTable) return acc
    acc.datasets.push({
      label: current.title,
      data: updateData.map((item) => item[current.value]),
      backgroundColor: chooseColorCode(index),
      borderColor: chooseColorCode(index),
      borderWidth: 2,
    })
    if (acc.labels.length === 0) {
      acc.labels = updateData.map((item) =>
        moment(item.daterange).format(dateFormat)
      )
    }
    return acc
  }, initials)

  const tableRows = data.map(
    (item) => ({
      ...item,
      allnumentitled: item.numentitled + item.numreentitled,
      daterange: moment(item.daterange).format(dateFormat),
    }),
    []
  )
  const tableData = {
    columns: [
      {
        key: 'daterange',
        title: 'Date',
        value: 'daterange',
        onlyTable: true,
      },
      ...tab.columns,
    ],
    tableRows,
  }
  return { chartData, tableData }
}

export const transformAudienceAcquisitionOthers = (
  data,
  tab,
  selectedMetrics,
  dateFormat
) => {
  const sorted = data.sort((a, b) => {
    return moment(a.daterange).valueOf() - moment(b.daterange).valueOf()
  })

  const updateData = sorted.map((item) => {
    return {
      ...item,
      allnumentitled: item.numentitled + item.numreentitled,
    }
  }, [])

  const labels = []
  const columns = tab?.metrics?.find(
    (item) => item.value === selectedMetrics
  ).columns

  const updatedData = updateData.reduce((acc, current) => {
    if (!current[tab.valueKey]) return acc
    if (!labels.includes(moment(current.daterange).format(dateFormat))) {
      labels.push(moment(current.daterange).format(dateFormat))
    }
    if (!acc[current[tab.valueKey]]) {
      acc[current[tab.valueKey]] = {
        label: current[tab.valueKey],
        data: [current[selectedMetrics]],
        total: current[selectedMetrics],
      }
      return acc
    }
    acc[current[tab.valueKey]].data.push(current[selectedMetrics])
    acc[current[tab.valueKey]].total += current[selectedMetrics]
    return acc
  }, {})

  const arr = []

  for (var dimensionName in updatedData) {
    arr.push(updatedData[dimensionName])
  }
  const r = arr.sort((a, b) => b.total - a.total).slice(0, 4)

  const initials = {
    datasets: [],
    labels: labels,
  }

  const chartData = r.reduce((acc, current, index) => {
    acc.datasets.push({
      label: current.label,
      data: current.data,
      backgroundColor: chooseColorCode(index),
      borderColor: chooseColorCode(index),
      borderWidth: 2,
    })
    return acc
  }, initials)

  const tableRows = data.map(
    (item) => ({
      ...item,
      daterange: moment(item.daterange).format(dateFormat),
    }),
    []
  )
  const tableData = {
    columns: [
      {
        key: 'daterange',
        title: 'Date',
        value: 'daterange',
        onlyTable: true,
      },
      {
        key: tab.valueKey,
        title: tab.title,
        value: tab.valueKey,
      },
      ...columns,
    ],
    tableRows,
  }

  return { chartData, tableData }
}
export const transformAudienceChurn = (
  data,
  tab,
  selectedMetrics,
  dateFormat
) => {
  const sorted = data.sort((a, b) => {
    return moment(a.daterange).valueOf() - moment(b.daterange).valueOf()
  })

  const updatedData = tab.columns.reduce((acc, item) => {
    acc[item.title] = []
    return acc
  }, {})

  const labels = []

  const rs = sorted.reduce((acc, current) => {
    labels.push(moment(current.daterange).format(dateFormat))
    updatedData['Churn'].push(current.numattrited)
    updatedData['Voluntary Churn'].push(current.voluntaryattrited)
    updatedData['Involuntary Churn'].push(current.involuntaryattrited)
    return updatedData
  }, updatedData)

  const datasets = Object.keys(rs).reduce((acc, current, index) => {
    acc.push({
      label: current,
      data: rs[current],
      backgroundColor: chooseColorCode(index),
      borderColor: chooseColorCode(index),
      borderWidth: 2,
    })
    return acc
  }, [])

  const tableRows = sorted.map(
    (item) => ({
      ...item,
      daterange: moment(item.daterange).format(dateFormat),
    }),
    []
  )
  const tableData = {
    columns: [
      {
        key: 'daterange',
        title: 'Date',
        value: 'daterange',
        onlyTable: true,
      },
      ...tab.columns,
    ],
    tableRows,
  }

  return { chartData: { datasets, labels }, tableData }
}

export const transformAudienceChurnOthers = (
  data,
  tab,
  selectedMetrics,
  dateFormat
) => {
  const sorted = data.sort((a, b) => {
    return moment(a.daterange).valueOf() - moment(b.daterange).valueOf()
  })
  const formatted = sorted.map((item) => ({
    ...item,
    numsubswatchedvideo: item.numsubswatchedvideo || 0,
    subscriptionplan: item.subscriptionplan || '(No Subscription Plan)',
    paymenthandler: item.paymenthandler || '(No Payment Handler)',
    countryofsubscription: item.countryofsubscription || '(No Country)',
    numattrited: item.numattrited || 0,
  }))
  const filtered = formatted.filter((item) => item[tab.valueKey])
  const groupedByDate = groupBy(filtered, 'daterange')
  const dataArr = new Array(Object.keys(groupedByDate).length)
  let updatedData = filtered.reduce((acc, current) => {
    if (!acc[current[tab.valueKey]]) {
      acc[current[tab.valueKey]] = {
        total: current[selectedMetrics],
        data: new Array(dataArr.length).fill(0),
      }
      return acc
    }
    acc[current[tab.valueKey]].total += current[selectedMetrics]
    return acc
  }, {})

  Object.keys(groupedByDate).forEach((item, index) => {
    groupedByDate[item].forEach((val) => {
      updatedData[val[tab.valueKey]].data[index] = val[selectedMetrics]
    })
  })
  const test = _(updatedData)
    .toPairs()
    .orderBy([1].total, ['desc'])
    .fromPairs()
    .value()

  const datasets = Object.keys(test)
    .slice(0, 5)
    .reduce((acc, current, index) => {
      acc.push({
        label: current,
        data: updatedData[current].data,
        backgroundColor: chooseColorCode(index),
        borderColor: chooseColorCode(index),
        borderWidth: 2,
        total: updatedData[current].total,
      })
      return acc
    }, [])
  const tableRows = sorted.map(
    (item) => ({
      ...item,
      daterange: moment(item.daterange).format(dateFormat),
    }),
    []
  )
  const column = tab?.metrics?.find((item) => item.value === selectedMetrics)

  const tableData = {
    columns: [
      {
        key: 'daterange',
        title: 'Date',
        value: 'daterange',
        onlyTable: true,
      },
      {
        key: tab.valueKey,
        title: tab.title,
        value: tab.valueKey,
      },
      column,
    ],
    tableRows,
  }

  return {
    chartData: {
      datasets: datasets.sort((a, b) => b.total - a.total),
      labels: Object.keys(groupedByDate).map((item) =>
        moment(item).format(dateFormat)
      ),
    },
    tableData,
  }
}

const commonTransformVideoEngagement = (data) => {
  const sorted = data.sort((a, b) => {
    return moment(a.daterange).valueOf() - moment(b.daterange).valueOf()
  })
  const updated = sorted.map((item) => {
    const percentageStreamingUsersSub = Math.round(
      (item.numsubactives / item.numactives) * 100
    )
    const percentageStreamingUsersReg = Math.round(
      (item.numregactives / item.numactives) * 100
    )
    const percentageRegActive = Math.round(
      (item.numregactives / item.numregistered) * 100
    )
    const percentageActiveSub = Math.round(
      (item.numsubactives / item.numentitled) * 100
    )

    const playsPerActiveUser = Number(item.numplays / item.numactives)
    const playDurationPerActiveUser =
      item.totalregplayduration / item.numactives / 60

    return {
      ...item,
      daterange: moment(item.daterange).format(DATE_FORMAT_DISPLAY),
      numactives: item.numactives,
      numsubactives: item.numsubactives,
      numregactives: item.numregactives,
      percentageStreamingUsersSub: percentageStreamingUsersSub || 0,
      percentageStreamingUsersReg: percentageStreamingUsersReg || 0,
      percentageActiveSub,
      percentageRegActive,
      playsPerActiveUser: isFinite(playsPerActiveUser) ? playsPerActiveUser : 0,
      playDurationPerActiveUser: isFinite(playDurationPerActiveUser)
        ? playDurationPerActiveUser
        : 0,
    }
  })

  return updated
}

export const transformVideoEngagementOverall = (
  data,
  tab,
  selectedMetrics,
  metrics
) => {
  const transformed = commonTransformVideoEngagement(data)
  const datasetsObj = transformed.reduce((acc, current) => {
    metrics.forEach((item, index) => {
      const value = current[item.value]
      const color = chooseColorCode(index)
      if (!acc[item.value]) {
        acc[item.value] = {
          label: item.label,
          backgroundColor: color,
          borderColor: color,
          borderWidth: 2,
          data: [value],
        }
        return acc
      }
      acc[item.value].data.push(value)
      return acc
    })

    return acc
  }, {})

  const datasets = Object.keys(datasetsObj).map((item) => datasetsObj[item])

  const columns = metrics.map((item) => ({
    ...item,
    value: item.value,
  }))

  const tableData = {
    columns: [
      {
        key: 'daterange',
        title: 'Date',
        value: 'daterange',
        onlyTable: true,
      },
      ...columns,
    ],
    tableRows: transformed,
  }

  return {
    tableData,
    chartData: {
      datasets,
      labels: transformed.map((item) =>
        moment(item.daterange).format(DATE_FORMAT_DISPLAY)
      ),
    },
  }
}

export const transformVideoEngagementCampaign = (
  data,
  tab,
  selectedMetrics,
  metrics
) => {
  const transformed = commonTransformVideoEngagement(data)
  const groupedData = groupBy(transformed, tab.valueKey)
  const selectedMetricsObj = metrics.find(
    (item) => item.value === selectedMetrics
  )
  const datasets = Object.keys(groupedData)
    .map((item) => {
      const total = groupedData[item].reduce(
        (acc, current) => acc + Number(current['numactives']),
        0
      )
      return {
        label: item || '(No Campaign)',
        data: groupedData[item].map((item) => item[selectedMetrics]),
        total,
      }
    })
    .sort((a, b) => b.total - a.total)
    .slice(0, 5)
    .map((item, index) => ({
      ...item,
      backgroundColor: chooseColorCode(index),
      borderColor: chooseColorCode(index),
      borderWidth: 2,
    }))

  const tableData = {
    columns: [
      {
        key: 'daterange',
        title: 'Date',
        value: 'daterange',
        onlyTable: true,
      },
      {
        key: tab.valueKey,
        title: tab.title,
        value: tab.valueKey,
      },
      {
        key: selectedMetrics,
        title: selectedMetricsObj.title,
        value: selectedMetrics,
      },
      // ...columns,
    ],
    tableRows: transformed,
  }
  return {
    chartData: {
      datasets,
      labels: uniq(
        transformed.map((item) =>
          moment(item.daterange).format(DATE_FORMAT_DISPLAY)
        )
      ),
    },
    tableData,
  }
}

export const transformBehaviourPlatforms = (
  data = [],
  selectedMetrics,
  numerator,
  denominator,
  platformSuffix
) => {
  const transformed = commonTransformVideoEngagement(data)
  const grouped = groupBy(transformed, 'platform')
  const total = {
    [numerator]: 0,
    [denominator]: 0,
    [selectedMetrics]: 0,
  }
  const result = Object.keys(grouped)
    .filter((a) => a)
    .map((platform) => {
      const items = grouped[platform]
      const value = items.reduce(
        (acc, current) => {
          acc[numerator] += current[numerator]
          acc[denominator] += current[denominator]
          acc[selectedMetrics] += current[selectedMetrics]
          total[numerator] += current[numerator]
          total[denominator] += current[denominator]
          total[selectedMetrics] += current[selectedMetrics]
          return acc
        },
        {
          [numerator]: 0,
          [denominator]: 0,
          [selectedMetrics]: 0,
        }
      )

      return { platform, ...value }
    })
    .sort(
      (a, b) =>
        b[numerator || selectedMetrics] - a[numerator || selectedMetrics]
    )

  const withPercentage = result.map((item) => {
    // const value =
    let value

    if (numerator) {
      if (platformSuffix) {
        value = Math.round((item[numerator] / item[denominator]) * 100)
      } else {
        value = item[numerator] / item[denominator]
      }
    } else {
      value = item[selectedMetrics]
    }

    return {
      ...item,
      value,
    }
  })

  const platformsWithAll = [
    {
      platform: 'All',
      value: numerator
        ? Math.round((total[numerator] / total[denominator]) * 100)
        : total[selectedMetrics],
    },
    ...withPercentage,
  ]

  return platformsWithAll
}

export const transformContentOverviewPlatforms = (
  data = [],
  selectedMetrics
) => {
  const grouped = groupBy(data, 'platform')
  let total = 0
  const result = Object.keys(grouped)
    .filter((a) => a)
    .map((platform) => {
      const items = grouped[platform]
      const value = items.reduce((acc, current) => {
        let platformValue = current[selectedMetrics.toLowerCase()]
        if (selectedMetrics === 'totalPlayDuration') {
          platformValue /= 60
        }
        acc += platformValue
        total += platformValue
        return acc
      }, 0)
      return { platform, value }
    })
    .sort((a, b) => b.value - a.value)

  return [
    {
      platform: 'All',
      value: total,
    },
    ...result,
  ]
}

export const transformPlatformsOthers = (
  data,
  tab,
  selectedMetrics,
  metrics
) => {
  const selectedMetricsObj = metrics.find(
    (item) => item.value === selectedMetrics
  )
  const transformed = data
    .sort((a, b) => {
      return moment(a.daterange).valueOf() - moment(b.daterange).valueOf()
    })
    .map((item) => ({
      daterange: moment(item.daterange).format(DATE_FORMAT_DISPLAY),
      platform: item.platform,
      campaign: item.campaign || '(No campaign)',
      subscriptionplan: item.subscriptionplan || '(No subscriptionplan)',
      value:
        selectedMetricsObj.value === 'totalPlayDuration'
          ? item[selectedMetricsObj.valueKey] / 60
          : item[selectedMetricsObj.valueKey],
    }))

  const grouped = groupBy(transformed, tab.valueKey)

  const labels = uniqBy(transformed, 'daterange').map(
    ({ daterange }) => daterange
  )

  const datasets = Object.keys(grouped)
    .map((item) => ({
      label: item,
      data: labels.map((label) => {
        const result = grouped[item].find(
          ({ daterange }) => daterange === label
        )
        return result?.value || 0
      }),
      total: grouped[item].reduce((acc, current) => acc + current.value, 0),
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5)
    .map((item, index) => {
      return {
        ...item,
        backgroundColor: chooseColorCode(index),
        borderColor: chooseColorCode(index),
        borderWidth: 2,
      }
    })

  const tableData = {
    columns: [
      {
        key: 'daterange',
        title: 'Date',
        value: 'daterange',
        onlyTable: true,
      },
      {
        key: tab.valueKey,
        title: tab.title,
        value: tab.valueKey,
      },
      {
        key: selectedMetrics,
        title: selectedMetricsObj.title,
        value: 'value',
      },
    ],
    tableRows: transformed,
  }

  return {
    chartData: {
      datasets,
      labels,
    },
    tableData,
  }
}

export const transformTopContent = (
  data,
  tab,
  selectedMetrics,
  metrics,
  columns
) => {
  const selectedMetricsObj = metrics.find(
    (item) => item.value === selectedMetrics
  )

  const sorted = data
    .sort(
      (a, b) => b[selectedMetricsObj.valueKey] - a[selectedMetricsObj.valueKey]
    )
    .filter((item) =>
      item.mediatype ? item.mediatype === tab.mediatype : true
    )

  const grouped = groupBy(sorted, tab.groupBy)

  const res = Object.keys(grouped).map((item, index) => {
    const aa = grouped[item].reduce(
      (acc, current) => {
        acc.numplays += current.numplays
        acc.avgVideoRunTime += current.totalvideolength / current.numplays / 60
        acc.avgPlayDuration += current.totalplayduration / current.numplays / 60
        acc.totalplayduration += current.totalplayduration / 60
        var formattedVal = Math.round(
          (current.totalplayduration / current.totalvideolength) * 100
        )
        if (formattedVal > 100) {
          formattedVal = 100
        }
        acc.percentagePlayThrough += formattedVal

        acc.title = current.title
        acc.seriestitle = current.seriestitle
        acc.tagtype = current.tagtype
        return acc
      },
      {
        seriestitle: '',
        title: '',
        numplays: 0,
        tagtype: '',
        avgVideoRunTime: 0,
        avgPlayDuration: 0,
        totalplayduration: 0,
        percentagePlayThrough: 0,
      }
    )

    return {
      title:
        tab.key === 'SERIES_CONTENT_TITLE'
          ? `${aa.seriestitle}/${aa.title}`
          : item,
      mediatype: tab.title,
      tagtype: aa.tagtype,
      rank: index + 1,
      numplays: aa.numplays,
      avgVideoRunTime: aa.avgVideoRunTime.toFixed(1),
      avgPlayDuration: aa.avgPlayDuration.toFixed(1),
      totalplayduration: aa.totalplayduration.toFixed(1),
      percentagePlayThrough: `${aa.percentagePlayThrough}%`,
    }
  })

  const [first, ...rest] = columns

  const tableData = {
    columns: [
      first,
      {
        key: 'title',
        title: tab.title,
        value: 'title',
      },
      {
        key: tab.key === 'TAGS' ? 'tagtype' : 'mediatype',
        title: tab.key === 'TAGS' ? 'Tag Type' : 'Content Type',
        value: tab.key === 'TAGS' ? 'tagtype' : 'mediatype',
      },
      ...rest,
    ],
    tableRows: res,
  }

  return {
    tableData,
  }
}

export const transformVideoWatchThrough = (data) => {
  const maxRunTime = 120
  const sorted = data
    .sort((a, b) => a.minuteruntime - b.minuteruntime)
    .filter((a) => a.minuteruntime > 0 && a.minuteruntime < maxRunTime)

  return {
    chartData: {
      datasets: [
        {
          label: '# of Plays',
          data: sorted.map(({ numpings }) => numpings),
          backgroundColor: chooseColorCode(0),
          borderColor: chooseColorCode(0),
          borderWidth: 2,
        },
      ],
      labels: sorted.map(({ minuteruntime }) => minuteruntime),
    },
  }
}

export const transformQOSPlatforms = (
  data,
  {
    numerator,
    denominator,
    avg: isAvg,
    value: selectedPrimaryMetrics,
    units,
    allCalculation,
  },
  { platformIdentifier }
) => {
  let sumNumerator = 0
  let sumDenominator = 0
  const uniqueplatformValues = _(data)
    .filter((d) => d[platformIdentifier] !== null)
    .groupBy((d) => d[platformIdentifier])
    .map((values, platform) => {
      const numeratorSum = _.sumBy(values, numerator) || 0
      const denominatorSum = _.sumBy(values, denominator) || 1
      const a = isAvg
        ? (numeratorSum / (denominatorSum + numeratorSum)) * units
        : (numeratorSum / denominatorSum) * units

      return {
        platform,
        platformName: platform,
        daterange: values[0].daterange,
        [numerator]: numeratorSum,
        [denominator]: denominatorSum || 1,
        [selectedPrimaryMetrics]: a,
      }
    })
    .tap((platforms) => {
      sumNumerator = _.sumBy(platforms, numerator)
      sumDenominator =
        allCalculation === 'weighted' ? _.sumBy(platforms, denominator) : 1
    })
    .orderBy((d) =>
      allCalculation === 'weighted' ? -d[denominator] : -d[numerator]
    )
    .value()
    .slice(0, 5)

  const totalReportingViews = isAvg
    ? (sumNumerator / (sumDenominator + sumNumerator)) * units
    : (sumNumerator / sumDenominator) * units

  const platformsWithAll = [
    {
      platform: 'All',
      value: totalReportingViews,
    },
    ...uniqueplatformValues.map((item) => ({
      ...item,
      value: item[selectedPrimaryMetrics],
    })),
  ]

  return platformsWithAll
}

export const transformQOSOverall = (
  data,
  { numerator, denominator, label, units, key, symbol, decimal }
) => {
  const sorted = data?.sort((a, b) => {
    return moment(a.daterange).valueOf() - moment(b.daterange).valueOf()
  })
  const res = sorted.map((item) => {
    const value = (item[numerator] / (item[denominator] || 1)) * units

    return {
      ...item,
      value: value?.toFixed(decimal),
      daterange: moment(item.daterange).format(DATE_FORMAT_DISPLAY),
      columnValue: `${value?.toFixed(decimal)}${symbol}`,
    }
  })

  const chartData = {
    datasets: [
      {
        label,
        data: res.map(({ value }) => value),
        backgroundColor: chooseColorCode(0),
        borderColor: chooseColorCode(0),
        borderWidth: 2,
      },
    ],
    labels: res.map(({ daterange }) => daterange),
  }

  const tableData = {
    columns: [
      {
        key: 'daterange',
        title: 'Date',
        value: 'daterange',
        onlyTable: true,
      },
      {
        key,
        title: label,
        value: 'columnValue',
      },
    ],
    tableRows: res,
  }

  return { chartData, tableData }
}
export const transformQOSPlatformsTab = (
  data,
  { numerator, denominator, label, units, key, symbol, decimal },
  tab
) => {
  console.log('tab ==>', tab)
  const sorted = data
    .sort((a, b) => {
      return moment(a.daterange).valueOf() - moment(b.daterange).valueOf()
    })
    .map((item) => {
      const value = (item[numerator] / (item[denominator] || 1)) * units
      return {
        ...item,
        daterange: moment(item.daterange).format(DATE_FORMAT_DISPLAY),
        value: value?.toFixed(decimal),
        columnValue: `${value?.toFixed(decimal)}${symbol}`,
      }
    })

  const datasets = _(sorted)
    .filter((d) => d[tab.platformIdentifier] !== null)
    .groupBy((d) => d[tab.platformIdentifier])
    .map((values, platform, o) => {
      const mapped = values.map((item) => {
        const value = (item[numerator] / (item[denominator] || 1)) * units
        return {
          ...item,
          value: value?.toFixed(decimal),
          columnValue: `${value?.toFixed(decimal)}${symbol}`,
        }
      })

      return {
        label: platform,
        data: mapped.map(({ value }) => value),
        backgroundColor: chooseColorCode(Object.keys(o).indexOf(platform)),
        borderColor: chooseColorCode(Object.keys(o).indexOf(platform)),
        borderWidth: 2,
      }
    })
    .value()

  const chartData = {
    datasets: datasets.slice(0, 5),
    labels: Object.keys(groupBy(sorted, 'daterange')),
  }

  const tableData = {
    columns: [
      {
        key: 'daterange',
        title: 'Date',
        value: 'daterange',
        onlyTable: true,
      },
      {
        key: tab.key,
        title: tab.title,
        value: tab.platformIdentifier,
      },
      {
        key,
        title: label,
        value: 'columnValue',
      },
    ],
    tableRows: sorted,
  }

  return {
    chartData,
    tableData,
  }
}

export const transformQOSDOOverall = (data, selectedDataMetrics) => {
  const mapped = data.map((item) => {
    return {
      ...item,
      value: `${Math.round(item[selectedDataMetrics.graphValue] * 100)}`,
      tableValue: `${Number(item[selectedDataMetrics.graphValue]).toFixed(2)}%`,
    }
  })

  const datasets = [
    {
      label: selectedDataMetrics.label,
      data: mapped.map(({ value }) => value),
      backgroundColor: chooseColorCode(0),
      borderColor: chooseColorCode(0),
      borderWidth: 2,
    },
  ]

  const chartData = {
    datasets,
    labels: data.map((item) => item[selectedDataMetrics.graphLabel]),
  }

  const tableData = {
    columns: [
      {
        key: 'range',
        title: 'Range',
        value: selectedDataMetrics.graphLabel,
      },
      {
        key: selectedDataMetrics,
        title: selectedDataMetrics.label,
        value: 'tableValue',
      },
    ],
    tableRows: mapped,
  }

  return { chartData, tableData }
}

export const transformQOSDOPlatform = (data, selectedDataMetrics, tab) => {
  console.log(tab)
  const mapped = data
    .filter((item) => item[tab.platformIdentifier])
    .map((item) => {
      return {
        ...item,
        value: `${Math.round(item[selectedDataMetrics.graphValue] * 100)}`,
        tableValue: `${Number(item[selectedDataMetrics.graphValue]).toFixed(
          2
        )}%`,
      }
    })
  const grouped = groupBy(mapped, tab.platformIdentifier)

  const datasets = Object.keys(grouped)
    .slice(0, 5)
    .map((item, index) => {
      return {
        label: item,
        data: grouped[item].map((item) => item.value),
        backgroundColor: chooseColorCode(index),
        borderColor: chooseColorCode(index),
        borderWidth: 2,
      }
    })

  const chartData = {
    datasets,
    labels: Object.keys(groupBy(data, selectedDataMetrics.graphLabel)),
  }

  const tableData = {
    columns: [
      {
        key: 'range',
        title: 'Range',
        value: selectedDataMetrics.graphLabel,
      },
      {
        key: selectedDataMetrics,
        title: selectedDataMetrics.label,
        value: 'tableValue',
      },
    ],
    tableRows: mapped,
  }

  return { chartData, tableData }
}

export const transformQOSContent = (data, selectedDataMetrics, tab) => {
  const mapped = data.map((item) => {
    const {
      bufferingduration,
      seriestitle,
      videotitle,
      tottimetofirstbyte,
      numplays,
      resolutionheighttimesplayduration,
      playduration,
      numfailedtostart,
      numdroppedstream,
    } = item
    const bufferingratio = `${(
      (bufferingduration / (bufferingduration + playduration)) *
      100
    ).toFixed(2)}%`

    const avgTTFB = (tottimetofirstbyte / numplays).toFixed(2)
    const avgResolution = (
      resolutionheighttimesplayduration / playduration
    ).toFixed(2)

    const failureRate = `${((numfailedtostart / numplays) * 100).toFixed(2)}%`
    const droppedRate = `${((numdroppedstream / numplays) * 100).toFixed(2)}%`

    return {
      ...item,
      seriesvideo: `${seriestitle} / ${videotitle}`,
      bufferingratio,
      avgTTFB,
      avgResolution,
      failureRate,
      droppedRate,
    }
  })
  const tableData = {
    columns: [
      {
        key: 'top_dim_rank',
        title: 'Rank',
        value: 'top_dim_rank',
      },
      {
        key: tab.key,
        title: tab.title,
        value: tab.identifier,
      },
      {
        key: 'numplays',
        title: 'Number of Streams',
        value: 'numplays',
      },
      {
        key: 'bufferingRatio',
        title: 'Buffering Ratio',
        value: 'bufferingratio',
      },
      {
        key: 'avgTTFB',
        title: 'Avg. TTFB',
        value: 'avgTTFB',
      },
      {
        key: 'avgResolution',
        title: 'Avg. Resolution',
        value: 'avgResolution',
      },
      {
        key: 'failureRate',
        title: '% of Plays Failed to Start',
        value: 'failureRate',
      },
      {
        key: 'droppedRate',
        title: '% of Plays Dropped',
        value: 'droppedRate',
      },
    ],
    tableRows: mapped,
  }

  return { tableData }
}

export const transformPaymentsPlatform = (
  data,
  selectedDataMetrics,
  platforms
) => {
  const sorted = data
    .sort(
      (a, b) =>
        b[selectedDataMetrics.identifier] - a[selectedDataMetrics.identifier]
    )
    .slice(0, 5)
    .map((item) => ({
      platform: item[platforms.platformKey],
      value: item[selectedDataMetrics.identifier],
      prefix: item['currency symbol'],
    }))

  return sorted
}
export const transformPayments = (data, selectedDataMetrics) => {
  const datasets = [
    {
      label: '',
      data: data.map((item) => item[selectedDataMetrics.identifier]),
      backgroundColor: chooseColorCode(0),
      borderColor: chooseColorCode(0),
      borderWidth: 2,
    },
  ]

  const chartData = {
    datasets,
    labels: data.map((item) => item['day_start']),
  }

  const tableData = {
    columns: [
      {
        key: 'date',
        title: 'Date',
        value: 'day_start',
      },
      {
        key: selectedDataMetrics.key,
        title: selectedDataMetrics.label,
        value: selectedDataMetrics.identifier,
      },
    ],
    tableRows: data,
  }

  return { chartData, tableData }
}

export const transforPaymentsOthers = (data, selectedDataMetrics, tab) => {
  const grouped = groupBy(data, tab.identifier)

  const datasets = Object.keys(grouped)
    .map((item) => {
      const data = grouped[item].map(
        (item) => item[selectedDataMetrics.identifier]
      )
      return {
        label: item,
        data,
        total: data.reduce((acc, item) => acc + item),
      }
    })
    .sort((a, b) => b.total - a.total)
    .slice(0, 5)
    .map((item, index) => ({
      ...item,
      backgroundColor: chooseColorCode(index),
      borderColor: chooseColorCode(index),
      borderWidth: 2,
    }))
  console.log(datasets)

  const chartData = {
    datasets,
    labels: Object.keys(groupBy(data, 'day_start')),
  }

  const tableData = {
    columns: [
      {
        key: 'date',
        title: 'Date',
        value: 'day_start',
      },
      {
        key: selectedDataMetrics.key,
        title: selectedDataMetrics.label,
        value: selectedDataMetrics.identifier,
      },
    ],
    tableRows: data,
  }

  return { chartData, tableData }
}

export const transformUserlifetimePlans = (data) => {
  const sorted = data
    .sort((a, b) => b.nativecurrencyamount - a.nativecurrencyamount)
    .slice(0, 5)
    .map((item) => ({
      platform: item.subscriptionplan,
      value: item.nativecurrencyamount,
    }))

  return sorted
}
