import moment from 'moment'
import { PREFFERED_DATE_FORMAT } from 'src/constants/filterConstants'
import {
  QOS,
  QOS_BUCKET,
  QOS_VIDEO_LEVEL_REPORT,
} from 'src/constants/urlConstants'
import {
  transformQOSContent,
  transformQOSDOOverall,
  transformQOSDOPlatform,
  transformQOSOverall,
  transformQOSPlatforms,
  transformQOSPlatformsTab,
} from './analyticsHelper'
import useQOSOverall from 'src/hooks/useQOSOverall'

const dateRangeSelectorDefaultValues = {
  dateRangeStart: moment().subtract('14', 'day').format(PREFFERED_DATE_FORMAT),
  dateRangeEnd: moment().format(PREFFERED_DATE_FORMAT),
  timeFrame: 'day',
}

const qosOverallMetrics = [
  {
    value: 'bufferingRatio',
    key: 'bufferingRatio',
    label: 'Buffering Ratio',
    title: 'Buffering Ratio',
    numerator: 'bufferingduration',
    denominator: 'playduration',
    allCalculation: 'weighted',
    avg: true,
    decimal: 1,
    symbol: '%',
    units: 100,
    bucketType: 'bufferingratio',
    byMetric: 'numstreams',
    graphLabel: 'bufferingratiolabel',
    graphValue: 'percentageofstreams',
  },
  {
    value: 'timeToFirstByte',
    key: 'timeToFirstByte',
    label: 'Time to First Byte',
    title: 'Time to First Byte',
    numerator: 'tottimetofirstbyte',
    denominator: 'numplays',
    units: 1,
    allCalculation: 'weighted',
    symbol: '',
    decimal: 1,
    avg: false,
    bucketType: 'ttfirstframe',
    byMetric: 'numttfirstframe',
    graphLabel: 'ttfirstframelabel',
    graphValue: 'percentageofttfirstframe',
  },
  {
    value: 'numDroppedStreams',
    key: 'numDroppedStreams',
    label: '# of Dropped Streams',
    title: '# of Dropped Streams',
    numerator: 'numdroppedstream',
    denominator: 1,
    units: 1,
    allCalculation: 'sum',
    symbol: '',
    decimal: 0,
    avg: false,
  },
  {
    value: 'numFailedStreamStarts',
    key: 'numFailedStreamStarts',
    label: '# of Failed Stream Starts',
    title: '# of Failed Stream Starts',
    numerator: 'numfailedtostart',
    denominator: 1,
    units: 1,
    allCalculation: 'sum',
    symbol: '',
    decimal: 0,
    avg: false,
  },
  {
    value: 'avgResolution',
    key: 'avgResolution',
    label: 'Average Resolution',
    title: 'Average Resolution',
    numerator: 'resolutionheighttimesplayduration',
    denominator: 'playduration',
    units: 1,
    allCalculation: 'weighted',
    symbol: '',
    decimal: 1,
    avg: false,
    bucketType: 'resolutionheight',
    byMetric: 'playduration',
    graphLabel: 'resolutionheightlabel',
    graphValue: 'percentageplayduration',
  },
]

const qosDistributionMetrics = [
  qosOverallMetrics[0],
  qosOverallMetrics[1],
  qosOverallMetrics[4],
]

const qosDeviceInfoFields = [
  {
    key: 'os',
    identifier: 'os',
    title: 'Operating System',
  },
  {
    key: 'browserFamily',
    identifier: 'browserfamily',
    title: 'Browser',
  },
  {
    key: 'deviceName',
    identifier: 'devicename',
    title: 'Device name',
  },
]

const qosGeographyFields = [
  {
    key: 'city',
    identifier: 'city',
    title: 'City',
  },
  {
    key: 'subDivision',
    identifier: 'subdivision',
    title: 'Country Subdivision',
  },
  {
    key: 'countryName',
    identifier: 'countryname',
    title: 'Country',
  },
]

const qosISPFields = [
  {
    key: 'ispName',
    identifier: 'ispname',
    title: 'ISP',
  },
  {
    key: 'ispOrganization',
    identifier: 'isporganization',
    title: 'Organization',
  },
  {
    key: 'platform',
    identifier: 'platform',
    title: 'Platform',
  },
]

const qosContentFields = [
  {
    key: 'videoTitle',
    identifier: 'videotitle',
    title: 'Video Title',
  },
  {
    key: 'seriesTitle',
    identifier: 'seriestitle',
    title: 'Series Title',
  },
  {
    key: 'genre',
    identifier: 'genre',
    title: 'Genre',
  },
]

const qosMap = {
  '/ui-analytics/qos-overall': {
    dataUrl: QOS,
    defaultMetrics: 'bufferingRatio',
    hook: useQOSOverall,
    header: {
      title: 'Quality Of Service - Overall',
      dateRangeSelector: true,
      period: true,
      dateFormat: PREFFERED_DATE_FORMAT,
      defaultRange: {
        ...dateRangeSelectorDefaultValues,
      },
      filters: {
        dimensions: ['platform'],
        metrics: [''],
        fields: [
          {
            key: 'platform',
            identifier: 'platform',
            title: 'Platform',
          },
        ],
      },
    },
    platformTransform: transformQOSPlatforms,
    metrics: qosOverallMetrics,
    tabs: [
      {
        key: 'overall',
        title: 'Overall',
        dimensions: [],
        platformDimension: 'platform',
        platformIdentifier: 'platform',
        transform: transformQOSOverall,
      },
      {
        key: 'platform',
        title: 'Platform',
        dimensions: ['platform'],
        platformDimension: 'platform',
        platformIdentifier: 'platform',
        transform: transformQOSPlatformsTab,
      },
    ],
  },
  '/ui-analytics/qos-device-info': {
    dataUrl: QOS,
    defaultMetrics: 'bufferingRatio',
    hook: useQOSOverall,
    header: {
      title: 'Quality Of Service - Device Info',
      dateRangeSelector: true,
      dateFormat: PREFFERED_DATE_FORMAT,
      period: true,
      defaultRange: {
        ...dateRangeSelectorDefaultValues,
      },
      filters: {
        dimensions: qosDeviceInfoFields.map((item) => item.key),
        metrics: [''],
        fields: qosDeviceInfoFields,
      },
    },
    platformTransform: transformQOSPlatforms,
    metrics: qosOverallMetrics,
    tabs: qosDeviceInfoFields.map((item) => ({
      key: item.key,
      title: item.title,
      dimensions: [item.key],
      platformDimension: item.key,
      platformIdentifier: item.identifier,
      transform: transformQOSPlatformsTab,
    })),
  },
  '/ui-analytics/qos-geography': {
    dataUrl: QOS,
    defaultMetrics: 'bufferingRatio',
    hook: useQOSOverall,
    header: {
      title: 'Quality Of Service - Geography',
      dateRangeSelector: true,
      period: true,
      dateFormat: PREFFERED_DATE_FORMAT,
      defaultRange: {
        ...dateRangeSelectorDefaultValues,
      },
      filters: {
        dimensions: qosGeographyFields.map((item) => item.key),
        metrics: [''],
        fields: qosGeographyFields,
      },
    },
    platformTransform: transformQOSPlatforms,
    metrics: qosOverallMetrics,
    tabs: qosGeographyFields.map((item) => ({
      key: item.key,
      title: item.title,
      dimensions: [item.key],
      platformDimension: item.key,
      platformIdentifier: item.identifier,
      transform: transformQOSPlatformsTab,
    })),
  },
  '/ui-analytics/qos-isp': {
    dataUrl: QOS,
    defaultMetrics: 'bufferingRatio',
    hook: useQOSOverall,
    header: {
      title: 'Quality Of Service - ISP',
      dateRangeSelector: true,
      period: true,
      dateFormat: PREFFERED_DATE_FORMAT,
      defaultRange: {
        ...dateRangeSelectorDefaultValues,
      },
      filters: {
        dimensions: qosISPFields.map((item) => item.key),
        metrics: [''],
        fields: qosISPFields,
      },
    },
    platformTransform: transformQOSPlatforms,
    metrics: qosOverallMetrics,
    tabs: qosISPFields.map((item) => ({
      key: item.key,
      title: item.title,
      dimensions: [item.key],
      transform: transformQOSPlatformsTab,
      platformDimension: item.key,
      platformIdentifier: item.identifier,
    })),
  },
  '/ui-analytics/qos-distribution-overview': {
    dataUrl: QOS,
    defaultMetrics: 'bufferingRatio',
    hook: useQOSOverall,
    header: {
      title: 'Quality Of Service - Distribution Overview',
      dateRangeSelector: true,
      dateFormat: PREFFERED_DATE_FORMAT,
      defaultRange: {
        ...dateRangeSelectorDefaultValues,
      },
      filters: {
        dimensions: ['platform'],
        metrics: [''],
        fields: [
          {
            key: 'platform',
            identifier: 'platform',
            title: 'Platform',
          },
        ],
      },
    },
    platformTransform: transformQOSPlatforms,
    metrics: qosDistributionMetrics,
    chartType: 'bar',
    tabs: [
      {
        tabDataUrl: QOS_BUCKET,
        key: 'overall',
        title: 'Overall',
        dimensions: [],
        platformDimension: 'platform',
        platformIdentifier: 'platform',
        transform: transformQOSDOOverall,
        queryData: true,
      },
      {
        tabDataUrl: QOS_BUCKET,
        key: 'platform',
        title: 'Platform',
        dimensions: ['platform'],
        platformDimension: 'platform',
        platformIdentifier: 'platform',
        transform: transformQOSDOPlatform,
        queryData: true,
      },
    ],
  },
  '/ui-analytics/qos-distribution-device': {
    dataUrl: QOS,
    defaultMetrics: 'bufferingRatio',
    hook: useQOSOverall,
    header: {
      title: 'Quality Of Service - Device Info',
      dateRangeSelector: true,
      dateFormat: PREFFERED_DATE_FORMAT,
      defaultRange: {
        ...dateRangeSelectorDefaultValues,
      },
      filters: {
        dimensions: qosDeviceInfoFields.map((item) => item.key),
        metrics: [''],
        fields: qosDeviceInfoFields,
      },
    },
    chartType: 'bar',
    platformTransform: transformQOSPlatforms,
    metrics: qosDistributionMetrics,
    tabs: qosDeviceInfoFields.map((item) => ({
      tabDataUrl: QOS_BUCKET,
      key: item.key,
      title: item.title,
      dimensions: [item.key],
      transform: transformQOSDOPlatform,
      platformDimension: item.key,
      platformIdentifier: item.identifier,
      queryData: true,
    })),
  },
  '/ui-analytics/qos-content': {
    dataUrl: QOS_VIDEO_LEVEL_REPORT,
    defaultMetrics: 'bufferingRatio',
    hook: useQOSOverall,
    header: {
      title: 'Quality Of Service - Content Level',
      dateRangeSelector: true,
      dateFormat: PREFFERED_DATE_FORMAT,
      defaultRange: {
        ...dateRangeSelectorDefaultValues,
      },
      filters: {
        dimensions: qosContentFields.map((item) => item.key),
        metrics: [''],
        fields: qosContentFields,
        queryData: {
          bucketType: ['bufferingratio'],
          topRank: {
            byMetric: ['numFirstFrame'],
          },
        },
      },
    },
    platformTransform: transformQOSPlatforms,
    metrics: qosOverallMetrics,
    tabItems: ['table'],
    tabs: [
      ...qosContentFields.map((item) => ({
        key: item.key,
        title: item.title,
        identifier: item.identifier,
        dimensions: [item.key],
        transform: transformQOSContent,
        platformDimension: 'platform',
        platformIdentifier: 'platform',
        topRank: true,
      })),
      {
        key: 'seriesVideo',
        title: 'Series/Video',
        identifier: 'seriesvideo',
        dimensions: ['videoTitle', 'seriesTitle'],
        transform: transformQOSContent,
        platformDimension: 'platform',
        platformIdentifier: 'platform',
        topRank: true,
      },
    ],
  },
}

export default qosMap
