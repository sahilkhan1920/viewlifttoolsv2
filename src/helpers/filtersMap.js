import moment from 'moment'
import {
  DATE_FORMAT_WITH_TIME,
  PREFFERED_DATE_FORMAT,
} from 'src/constants/filterConstants'
import {
  CHANGE_IN_USER_BASE,
  COHORT_ANALYSIS,
  DTL_VIDEO_ENGAGEMENT,
  LTV_ENHANCED,
  REALTIME_CONTENT,
  REALTIME_CONTENT_ENHANCED,
  USER_BASE,
  USER_BEHAVIOUR,
  USER_PAYMENTS,
  VIDEO_ENGAGEMENT,
} from 'src/constants/urlConstants'
import {
  transformAudienceAcquisitionOthers,
  transformAudienceAcquisitionOverall,
  transformAudienceChurn,
  transformAudienceChurnOthers,
  transformAudienceOverViewAcquistionCampaign,
  transformAudienceOverViewOverAll,
  transformContentLevelQOSData,
  transformPayments,
  transformPaymentsPlatform,
  transformPlatformsOthers,
  transformRealStreamingUsersData,
  transformTopContent,
  transformTopContentData,
  transformVideoEngagementCampaign,
  transformVideoEngagementOverall,
  transformVideoWatchThrough,
  transforPaymentsOthers,
} from './analyticsHelper'

import qosMap from './qosMap'

const dateRangeSelectorDefaultValues = {
  dateRangeStart: moment().subtract('14', 'day').format(PREFFERED_DATE_FORMAT),
  dateRangeEnd: moment().format(PREFFERED_DATE_FORMAT),
  timeFrame: 'day',
}

const timeFrameSelectorDefaultValues = {
  pastTimeframe: 30,
  timeframeUnit: 'minutes',
  dateRangeStart: moment().format(DATE_FORMAT_WITH_TIME),
  dateRangeEnd: moment().add(1, 'days').format(DATE_FORMAT_WITH_TIME),
}

// interface Filters {
//   dimensions?: string[]
//   metrics?: string[]
//   dataUrl?: string
//   fields?: object[]
// }

// interface Map {
//   [key: string]: {
//     header: {
//       title: string
//       period?: boolean
//       defaultRange: typeof dateRangeSelectorDefaultValues &
//         typeof timeFrameSelectorDefaultValues
//       timeFrameSelector?: boolean
//       dateRangeSelector?: boolean
//       filters?: Filters
//       dateFormat?: string
//     }
//     tabs?: {
//       key: string
//       columns: object[]
//     }[][]
//   }
// }

const realTimeFields = [
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

const realTimeDimensions = ['videoTitle', 'seriesTitle', 'genre']

const audienceOverviewFields = [
  {
    key: 'campaign',
    identifier: 'campaign',
    title: 'Campaign',
    dimension: 'campaign',
  },
  {
    key: 'subscriptionPlan',
    identifier: 'subscriptionplan',
    title: 'Subscription Plan',
    dimension: 'subscriptionPlan',
  },
  {
    key: 'paymentHandler',
    identifier: 'paymenthandler',
    title: 'Payment Handler',
    dimension: 'paymentHandler',
  },
  {
    key: 'countryOfSubscription',
    identifier: 'countryofsubscription',
    title: 'Country',
    dimension: 'countryOfSubscription',
  },
  {
    key: 'planIdentifier',
    identifier: 'planidentifier',
    title: 'Plan Identifier',
    dimension: 'planIdentifier',
  },
  {
    key: 'campaignSource',
    identifier: 'campaignsource',
    title: 'Campaign Source',
    dimension: 'campaignSource',
  },
  {
    key: 'campaignMedium',
    identifier: 'campaignmedium',
    title: 'Campaign Medium',
    dimension: 'campaignMedium',
  },
]
const audienceAcquisitionFields = [
  {
    key: 'campaign',
    identifier: 'campaign',
    title: 'Campaign',
    dimension: 'campaign',
  },
  {
    key: 'subscriptionPlan',
    identifier: 'subscriptionplan',
    title: 'Subscription Plan',
    dimension: 'subscriptionPlan',
  },
  {
    key: 'paymentHandler',
    identifier: 'paymenthandler',
    title: 'Payment Handler',
    dimension: 'paymentHandler',
  },
  {
    key: 'countryOfSubscription',
    identifier: 'countryofsubscription',
    title: 'Country',
    dimension: 'countryOfSubscription',
  },
  {
    key: 'planIdentifier',
    identifier: 'planidentifier',
    title: 'Plan Identifier',
    dimension: 'planIdentifier',
  },
  {
    key: 'offerCode',
    identifier: 'offercode',
    title: 'Offer Code',
    dimension: 'offerCode',
  },
  {
    key: 'campaignSource',
    identifier: 'campaignsource',
    title: 'Campaign Source',
    dimension: 'campaignSource',
  },
  {
    key: 'campaignMedium',
    identifier: 'campaignmedium',
    title: 'Campaign Medium',
    dimension: 'campaignMedium',
  },
]
const userLifeTimeFields = [
  {
    key: 'campaign',
    identifier: 'campaign',
    title: 'Campaign',
    dimension: 'campaign',
  },
  {
    key: 'subscriptionPlan',
    identifier: 'subscriptionplan',
    title: 'Subscription Plan',
    dimension: 'subscriptionPlan',
  },
  {
    key: 'paymentHandler',
    identifier: 'paymenthandler',
    title: 'Payment Handler',
    dimension: 'paymentHandler',
  },
  {
    key: 'countryOfSubscription',
    identifier: 'countryofsubscription',
    title: 'Country',
    dimension: 'countryOfSubscription',
  },
  {
    key: 'planIdentifier',
    identifier: 'planidentifier',
    title: 'Plan Identifier',
    dimension: 'planIdentifier',
  },
  {
    key: 'campaignSource',
    identifier: 'campaignsource',
    title: 'Campaign Source',
    dimension: 'campaignSource',
  },
  {
    key: 'campaignMedium',
    identifier: 'campaignmedium',
    title: 'Campaign Medium',
    dimension: 'campaignMedium',
  },
  {
    key: 'offerName',
    identifier: 'offername',
    title: 'Offer',
    dimension: 'offerName',
  },
  {
    key: 'offerCode',
    identifier: 'offercode',
    title: 'Offer Code',
    dimension: 'offerCode',
  },
]

const commonColumnsAudienceOverall = [
  {
    key: 'actualdaterange',
    title: 'Date',
    value: 'actualdaterange',
    onlyTable: true,
  },
  {
    key: 'numregistered',
    title: 'Registered Users',
    value: 'numregistered',
  },
  {
    key: 'numentitled',
    title: 'Subscribed Users',
    value: 'numentitled',
  },
  {
    key: 'numactives',
    title: 'Active Users',
    value: 'numactives',
  },
  {
    key: 'numregactives',
    title: 'Active Registered Users',
    value: 'numregactives',
  },
  {
    key: 'numsubactives',
    title: 'Active Subscribed User',
    value: 'numsubactives',
  },
]
const commonAudienceMetricsDataSets = [
  {
    label: 'Registered Users',
    value: 'numregistered',
    columns: commonColumnsAudienceOverall,
  },
  {
    label: 'Subscribed Users',
    value: 'numentitled',
    columns: [
      {
        key: 'actualdaterange',
        title: 'Date',
        value: 'actualdaterange',
        onlyTable: true,
      },
      {
        key: 'numentitledfreetrial',
        title: 'Free Trial Users',
        value: 'numentitledfreetrial',
      },
      {
        key: 'numentitledpaid',
        title: 'Paid Users',
        value: 'numentitledpaid',
      },
      {
        key: 'numentitled',
        title: 'Subscribed Users',
        value: 'numentitled',
      },
    ],
  },
  {
    label: 'Active Users',
    value: 'numactives',
    columns: commonColumnsAudienceOverall,
  },
  {
    label: 'Active Registered Users',
    value: 'numregactives',
    columns: commonColumnsAudienceOverall,
  },
  {
    label: 'Active Subscribed User',
    value: 'numsubactives',
    columns: commonColumnsAudienceOverall,
  },
]

const metricsAcquistionCampaign = [
  {
    label: 'Registered Users',
    value: 'numregistered',
    columns: [
      {
        key: 'numregistered',
        title: 'Registered Users',
        value: 'numregistered',
      },
    ],
  },
  {
    label: 'Subscribed Users',
    value: 'numentitled',
    columns: [
      {
        key: 'numentitled',
        title: 'Subscribed Users',
        value: 'numentitled',
      },
    ],
  },
  {
    label: 'Subscribed Paid Users',
    value: 'numentitledpaid',
    columns: [
      {
        key: 'numentitledpaid',
        title: 'Subscribed Paid Users',
        value: 'numentitledpaid',
      },
    ],
  },
  {
    label: 'Subscribed Free Trial Users',
    value: 'numentitledfreetrial',
    columns: [
      {
        key: 'numentitledfreetrial',
        title: 'Subscribed Free Trial Users',
        value: 'numentitledfreetrial',
      },
    ],
  },
  {
    label: 'Active Users',
    value: 'numactives',
    columns: [
      {
        key: 'numactives',
        title: 'Active Users',
        value: 'numactives',
      },
    ],
  },
  {
    label: 'Active Registered Users',
    value: 'numregactives',
    columns: [
      {
        key: 'numregactives',
        title: 'Active Registered Users',
        value: 'numregactives',
      },
    ],
  },
  {
    label: 'Active Subscribed User',
    value: 'numsubactives',
    columns: [
      {
        key: 'numsubactives',
        title: 'Active Subscribed User',
        value: 'numsubactives',
      },
    ],
  },
]

const metricsAcquistion = [
  {
    label: 'Newly Registered',
    value: 'numregistered',
    columns: [
      {
        key: 'numregistered',
        title: 'Registered Users',
        value: 'numregistered',
      },
    ],
  },
  {
    label: 'All Subscribed',
    value: 'allnumentitled',
    columns: [
      {
        key: 'allnumentitled',
        title: 'All Subscribed',
        value: 'allnumentitled',
      },
    ],
  },
  {
    label: 'Newly Subscribed',
    value: 'numentitled',
    columns: [
      {
        key: 'numentitled',
        title: 'Newly Subscribed',
        value: 'numentitled',
      },
    ],
  },
  {
    label: 'Re-Subscribed',
    value: 'numreentitled',
    columns: [
      {
        key: 'numreentitled',
        title: 'Re-Subscribed',
        value: 'numreentitled',
      },
    ],
  },
]
const overallMetricsAcquistion = [
  {
    key: 'numregistered',
    title: 'Registered Users',
    value: 'numregistered',
  },
  {
    key: 'allnumentitled',
    title: 'All Subscribed',
    value: 'allnumentitled',
  },
  {
    key: 'numentitled',
    title: 'Newly Subscribed',
    value: 'numentitled',
  },
  {
    key: 'numreentitled',
    title: 'Re-Subscribed',
    value: 'numreentitled',
  },
]

const overallMetricsChurn = [
  {
    key: 'numattrited',
    title: 'Churn',
    value: 'numattrited',
    label: 'Churn',
  },
  {
    key: 'voluntaryattrited',
    title: 'Voluntary Churn',
    value: 'voluntaryattrited',
    label: 'Voluntary Churn',
  },
  {
    key: 'involuntaryattrited',
    title: 'Involuntary Churn',
    value: 'involuntaryattrited',
    label: 'Involuntary Churn',
  },
]

const behaviourFields = [
  {
    key: 'campaign',
    identifier: 'campaign',
    title: 'Campaign',
    dimension: 'campaign',
  },
  {
    key: 'subscriptionPlan',
    identifier: 'subscriptionplan',
    title: 'Subscription Plan',
    dimension: 'subscriptionPlan',
  },
  {
    key: 'platform',
    identifier: 'platform',
    title: 'Platform',
    dimension: 'platform',
  },
]

const behaviourMetrics = [
  {
    value: 'numactives',
    key: 'numactives',
    label: 'Streaming Users (Overall)',
    title: 'Streaming Users (Overall)',
    metrics: 'registeredMetrics',
  },
  {
    value: 'numsubactives',
    key: 'numsubactives',
    label: 'Subscribed Streaming Users',
    title: 'Subscribed Streaming Users',
    metrics: 'subscribedMetrics',
  },
  {
    value: 'numregactives',
    key: 'registeredMetrics',
    label: 'Registered Streaming Users',
    title: 'Registered Streaming Users',
    metrics: 'registeredMetrics',
  },
  {
    value: 'percentageStreamingUsersSub',
    key: 'percentageStreamingUsersSub',
    label: '% of Streaming Users that are Subscribed',
    title: '% of Streaming Users that are Subscribed',
    metrics: 'subscribedMetrics',
    numerator: 'numsubactives',
    denominator: 'numactives',
    platformSuffix: '%',
  },
  {
    value: 'percentageStreamingUsersReg',
    key: 'percentageStreamingUsersReg',
    label: '% of Streaming Users that are Registered',
    title: '% of Streaming Users that are Registered',
    metrics: 'registeredMetrics',
    numerator: 'numregactives',
    denominator: 'numactives',
    platformSuffix: '%',
  },
  {
    value: 'percentageActiveSub',
    key: 'percentageActiveSub',
    label: '% of Subscribers Active',
    title: '% of Subscribers Active',
    metrics: 'subscribedMetrics',
    numerator: 'numsubactives',
    denominator: 'numentitled',
    platformSuffix: '%',
  },
  {
    value: 'percentageRegActive',
    key: 'percentageRegActive',
    label: '% of Registered Users Active',
    title: '% of Registered Users Active',
    metrics: 'registeredMetrics',
    numerator: 'numregactives',
    denominator: 'numregistered',
    platformSuffix: '%',
  },
  {
    value: 'playsPerActiveUser',
    key: 'playsPerActiveUser',
    label: 'Plays per Active User',
    title: 'Plays per Active User',
    metrics: 'registeredMetrics',
    numerator: 'numplays',
    denominator: 'numactives',
  },
  {
    value: 'playDurationPerActiveUser',
    key: 'playDurationPerActiveUser',
    label: 'Play Duration per Active User',
    title: 'Play Duration per Active User',
    metrics: 'registeredMetrics',
    numerator: 'totalplayduration',
    denominator: 'numactives',
  },
]

const commonColumnsRealTopContent = [
  {
    key: 'currentActive',
    title: 'VIEWS',
    value: 'currentActive',
  },
  {
    key: 'percentage',
    title: '%',
    value: 'precentageData',
  },
]

const commonColumnsContentLevelQOS = [
  {
    key: 'currentActive',
    title: '# VIEWS',
    value: 'currentActive',
  },
  {
    key: 'buffRatio',
    title: 'BUFFERING RATIO',
    value: 'buffRatio',
  },
  {
    key: 'ttfb',
    title: 'Avg. TTFB',
    value: 'ttfb',
  },
  {
    key: 'avgResolution',
    title: 'Avg. Resolution',
    value: 'avgResolution',
  },
  {
    key: 'failedStart',
    title: '% of Plays Failed to Start',
    value: 'failedStart',
  },
  {
    key: 'playsDropped',
    title: '% of Plays Dropped',
    value: 'playsDropped',
  },
]

const contentOverviewMetrics = [
  {
    value: 'numPlays',
    key: 'numPlays',
    label: 'Number of Streams',
    title: 'Number of Streams',
    valueKey: 'numplays',
  },
  {
    value: 'totalPlayDuration',
    key: 'totalPlayDuration',
    label: 'Total Stream Duration',
    title: 'Total Stream Duration',
    valueKey: 'totalplayduration',
  },
]
const topCotentMetrics = [
  {
    value: 'numPlays',
    key: 'numPlays',
    label: 'Plays',
    title: 'Plays',
    valueKey: 'numplays',
  },
  {
    value: 'avgVideoRunTime',
    key: 'avgVideoRunTime',
    label: 'Avg. Video Run-Time',
    title: 'Avg. Video Run-Time',
    valueKey: 'avgVideoRunTime',
  },
  {
    value: 'avgPlayDuration',
    key: 'avgPlayDuration',
    label: 'Avg. Play Duration',
    title: 'Avg. Play Duration',
    valueKey: 'avgPlayDuration',
  },
]

const videoWatchThroughMetrics = [
  {
    value: 'numPlays',
    key: 'numPlays',
    label: '# of Plays',
    title: '# of Plays',
    valueKey: 'numplays',
  },
  {
    value: 'percentagePlays',
    key: 'percentagePlays',
    label: '% of Plays',
    title: '% of Plays',
    valueKey: 'percentagePlays',
  },
]
const paymentMetrics = [
  {
    value: 'grossTransactionAmount',
    key: 'grossTransactionAmount',
    label: 'Gross Transaction Amount',
    title: 'Gross Transaction Amount',
    identifier: 'gross amount',
  },
  {
    value: 'numberOfTransactions',
    key: 'numberOfTransactions',
    label: 'Number of Transactions',
    identifier: 'number of transactions',
  },
]

const commonColumnsTopContent = [
  {
    key: 'rank',
    title: 'Rank',
    value: 'rank',
  },
  {
    key: 'numplays',
    title: 'Plays',
    value: 'numplays',
  },
  {
    key: 'avgVideoRunTime',
    title: 'Avg. Video Run-Time',
    value: 'avgVideoRunTime',
  },
  {
    key: 'avgPlayDuration',
    title: 'Avg. Play Duration',
    value: 'avgPlayDuration',
  },
  {
    key: 'totalplayduration',
    title: 'Total Play Duration',
    value: 'totalplayduration',
  },
  {
    key: 'percentagePlayThrough',
    title: '% Play-Through',
    value: 'percentagePlayThrough',
  },
]

const filtersMap = {
  '/ui-analytics': {
    header: {
      title: 'Dashboard',
      period: true,
      dateRangeSelector: true,
      dateFormat: PREFFERED_DATE_FORMAT,
      defaultRange: dateRangeSelectorDefaultValues,
    },
  },
  '/ui-analytics/real-streaming-users': {
    dataUrl: REALTIME_CONTENT,
    header: {
      title: 'Streaming Users',
      timeFrameSelector: true,
      dateFormat: DATE_FORMAT_WITH_TIME,
      defaultRange: timeFrameSelectorDefaultValues,
    },
    tabs: [
      {
        key: 'PLATFORM',
        title: 'PLATFORM',
        dimensions: ['platform'],
        transform: transformRealStreamingUsersData,
        columns: [
          {
            key: 'platform',
            title: 'PLATFORM',
            value: 'platform',
          },
          {
            key: 'numuniquestreams',
            title: '# Users',
            value: 'numuniquestreams',
          },
          {
            key: 'percentage',
            title: '%',
            value: 'precentageData',
          },
        ],
      },
    ],
  },
  '/ui-analytics/real-top-content': {
    dataUrl: REALTIME_CONTENT,
    header: {
      title: 'Top Content',
      timeFrameSelector: true,
      dateFormat: DATE_FORMAT_WITH_TIME,
      defaultRange: timeFrameSelectorDefaultValues,
      filters: {
        dimensions: realTimeDimensions,
        fields: realTimeFields,
      },
    },
    tabs: [
      {
        key: 'VIDEO_TITLE',
        title: 'VIDEO TITLE',
        dimensions: ['platform', 'videoTitle'],
        metrics: ['numUsersWatching'],
        titleKey: 'videotitle',
        transform: transformTopContentData,
        columns: [
          {
            key: 'videotitle',
            title: 'VIDEO TITLE',
            value: 'videotitle',
          },
          ...commonColumnsRealTopContent,
        ],
      },
      {
        key: 'SERIES_TITLE',
        title: 'SERIES TITLE',
        dimensions: ['platform', 'seriesTitle'],
        metrics: ['numUsersWatching'],
        titleKey: 'seriestitle',
        transform: transformTopContentData,
        columns: [
          {
            key: 'seriestitle',
            title: 'SERIES/VIDEO',
            value: 'seriestitle',
          },
          ...commonColumnsRealTopContent,
        ],
      },
      {
        key: 'GENRE',
        title: 'GENRE',
        dimensions: ['platform', 'genre'],
        metrics: ['numUsersWatching'],
        titleKey: 'genre',
        transform: transformTopContentData,
        columns: [
          {
            key: 'genre',
            title: 'GENRE',
            value: 'genre',
          },
          ...commonColumnsRealTopContent,
        ],
      },
      {
        key: 'SERIES_VIDEO',
        title: 'SERIES/VIDEO',
        dimensions: ['platform', 'videoTitle', 'seriesTitle'],
        metrics: ['numUsersWatching'],
        titleKey: 'seriestitle',
        transform: transformTopContentData,
        columns: [
          {
            key: 'seriesvideotitle',
            title: 'SERIES/VIDEO',
            value: 'title',
          },
          ...commonColumnsRealTopContent,
        ],
      },
      {
        key: 'PLATFORM',
        title: 'PLATFORM',
        dimensions: ['platform'],
        metrics: ['numUsersWatching'],
        titleKey: 'platform',
        transform: transformTopContentData,
        columns: [
          {
            key: 'platform',
            title: 'PLATFORM',
            value: 'platform',
          },
          ...commonColumnsRealTopContent,
        ],
      },
    ],
  },
  '/ui-analytics/content-level-qos': {
    dataUrl: REALTIME_CONTENT_ENHANCED,
    header: {
      title: 'Content Level QOS',
      timeFrameSelector: true,
      dateFormat: DATE_FORMAT_WITH_TIME,
      defaultRange: timeFrameSelectorDefaultValues,
      filters: {
        dimensions: realTimeDimensions,
        fields: realTimeFields,
      },
    },
    tabs: [
      {
        key: 'VIDEO_TITLE',
        title: 'VIDEO TITLE',
        dimensions: ['platform', 'videoTitle'],
        metrics: ['numUsersWatching'],
        titleKey: 'videotitle',
        transform: transformContentLevelQOSData,
        columns: [
          {
            key: 'videotitle',
            title: 'VIDEO TITLE',
            value: 'videotitle',
          },
          ...commonColumnsContentLevelQOS,
        ],
      },
      {
        key: 'SERIES_TITLE',
        title: 'SERIES TITLE',
        dimensions: ['platform', 'seriesTitle'],
        metrics: ['numUsersWatching'],
        titleKey: 'seriestitle',
        transform: transformContentLevelQOSData,
        columns: [
          {
            key: 'seriestitle',
            title: 'SERIES TITLE',
            value: 'seriestitle',
          },
          ...commonColumnsContentLevelQOS,
        ],
      },
      {
        key: 'GENRE',
        title: 'GENRE',
        dimensions: ['platform', 'genre'],
        metrics: ['numUsersWatching'],
        titleKey: 'genre',
        transform: transformContentLevelQOSData,
        columns: [
          {
            key: 'genre',
            title: 'GENRE',
            value: 'genre',
          },
          ...commonColumnsContentLevelQOS,
        ],
      },
      {
        key: 'SERIES_VIDEO',
        title: 'SERIES/VIDEO',
        dimensions: ['platform', 'videoTitle', 'seriesTitle'],
        metrics: ['numUsersWatching'],
        titleKey: 'seriestitle',
        transform: transformContentLevelQOSData,
        columns: [
          {
            key: 'seriesvideotitle',
            title: 'Series/Video',
            value: 'seriesvideotitle',
          },
          ...commonColumnsContentLevelQOS,
        ],
      },
      {
        key: 'PLATFORM',
        title: 'PLATFORM',
        dimensions: ['platform'],
        metrics: ['numUsersWatching'],
        titleKey: 'platform',
        transform: transformContentLevelQOSData,
        columns: [
          {
            key: 'platform',
            title: 'Platform',
            value: 'platform',
          },
          ...commonColumnsContentLevelQOS,
        ],
      },
    ],
  },
  '/ui-analytics/audience-overview': {
    dataUrl: USER_BASE,
    defaultMetrics: 'numregistered',
    header: {
      title: 'Overview',
      period: true,
      dateRangeSelector: true,
      dateFormat: PREFFERED_DATE_FORMAT,
      defaultRange: {
        ...dateRangeSelectorDefaultValues,
        metrics: 'numregistered',
      },
      filters: {
        dimensions: audienceOverviewFields.map((item) => item.dimension),
        metrics: ['numregistered'],
        fields: audienceOverviewFields,
      },
    },
    tabs: [
      {
        key: 'OVERALL',
        title: 'OVERALL',
        dimensions: ['overall'],
        transform: transformAudienceOverViewOverAll,
        columns: commonAudienceMetricsDataSets,
      },
      {
        key: 'ACQUISITION_CAMPAIGN',
        title: 'ACQUISITION CAMPAIGN',
        dimensions: ['campaign'],
        valueKey: 'campaign',
        transform: transformAudienceOverViewAcquistionCampaign,
        metrics: metricsAcquistionCampaign,
      },
      {
        key: 'SUBSCRIPTION_PLAN',
        title: 'SUBSCRIPTION PLAN',
        dimensions: ['subscriptionPlan'],
        valueKey: 'subscriptionplan',
        transform: transformAudienceOverViewAcquistionCampaign,
        metrics: metricsAcquistionCampaign,
      },
      {
        key: 'PAYMENT_HANDLER',
        title: 'PAYMENT HANDLER',
        dimensions: ['paymentHandler'],
        valueKey: 'paymenthandler',
        transform: transformAudienceOverViewAcquistionCampaign,
        metrics: metricsAcquistionCampaign,
      },
      {
        key: 'COUNTRY',
        title: 'COUNTRY',
        dimensions: ['countryOfSubscription'],
        valueKey: 'countryofsubscription',
        transform: transformAudienceOverViewAcquistionCampaign,
        metrics: metricsAcquistionCampaign,
      },
      {
        key: 'PLAN_IDENTIFIER',
        title: 'PLAN IDENTIFIER',
        dimensions: ['planIdentifier'],
        valueKey: 'planidentifier',
        transform: transformAudienceOverViewAcquistionCampaign,
        metrics: metricsAcquistionCampaign,
      },
      {
        key: 'CAMPAIGN_SOURCE',
        title: 'CAMPAIGN SOURCE',
        dimensions: ['campaignSource'],
        valueKey: 'campaignsource',
        transform: transformAudienceOverViewAcquistionCampaign,
        metrics: metricsAcquistionCampaign,
      },
      {
        key: 'CAMPAIGN_MEDIUM',
        title: 'CAMPAIGN MEDIUM',
        dimensions: ['campaignMedium'],
        valueKey: 'campaignmedium',
        transform: transformAudienceOverViewAcquistionCampaign,
        metrics: metricsAcquistionCampaign,
      },
    ],
  },
  '/ui-analytics/audience-acquisition': {
    dataUrl: CHANGE_IN_USER_BASE,
    defaultMetrics: 'allnumentitled',
    header: {
      title: 'Acquisition',
      period: true,
      dateRangeSelector: true,
      dateFormat: PREFFERED_DATE_FORMAT,
      defaultRange: {
        ...dateRangeSelectorDefaultValues,
      },
      filters: {
        dimensions: audienceAcquisitionFields.map((item) => item.dimension),
        metrics: ['numSubsWatchedVideo'],
        fields: audienceAcquisitionFields,
      },
    },
    tabs: [
      {
        key: 'OVERALL',
        title: 'OVERALL',
        dimensions: [],
        transform: transformAudienceAcquisitionOverall,
        columns: overallMetricsAcquistion,
        lineChart: true,
      },
      {
        key: 'CAMPAIGN',
        title: 'CAMPAIGN',
        dimensions: ['campaign'],
        valueKey: 'campaign',
        transform: transformAudienceAcquisitionOthers,
        metrics: metricsAcquistion,
      },
      {
        key: 'SUBSCRIPTION_PLAN',
        title: 'SUBSCRIPTION PLAN',
        dimensions: ['subscriptionPlan'],
        valueKey: 'subscriptionplan',
        transform: transformAudienceAcquisitionOthers,
        metrics: metricsAcquistion,
      },
      {
        key: 'PAYMENT_HANDLER',
        title: 'PAYMENT HANDLER',
        dimensions: ['paymentHandler'],
        valueKey: 'paymenthandler',
        transform: transformAudienceAcquisitionOthers,
        metrics: metricsAcquistion,
      },
      {
        key: 'OFFER_CODE',
        title: 'OFFER CODE',
        dimensions: ['offerCode'],
        valueKey: 'offercode',
        transform: transformAudienceAcquisitionOthers,
        metrics: metricsAcquistion,
      },
      {
        key: 'COUNTRY',
        title: 'COUNTRY',
        dimensions: ['countryOfSubscription'],
        valueKey: 'countryofsubscription',
        transform: transformAudienceAcquisitionOthers,
        metrics: metricsAcquistion,
      },
      {
        key: 'PLAN_IDENTIFIER',
        title: 'PLAN IDENTIFIER',
        dimensions: ['planIdentifier'],
        valueKey: 'planidentifier',
        transform: transformAudienceAcquisitionOthers,
        metrics: metricsAcquistion,
      },
      {
        key: 'CAMPAIGN_SOURCE',
        title: 'CAMPAIGN SOURCE',
        dimensions: ['campaignSource'],
        valueKey: 'campaignsource',
        transform: transformAudienceAcquisitionOthers,
        metrics: metricsAcquistion,
      },
      {
        key: 'CAMPAIGN_MEDIUM',
        title: 'CAMPAIGN MEDIUM',
        dimensions: ['campaignMedium'],
        valueKey: 'campaignmedium',
        transform: transformAudienceAcquisitionOthers,
        metrics: metricsAcquistion,
      },
    ],
  },
  '/ui-analytics/audience-churn': {
    dataUrl: CHANGE_IN_USER_BASE,
    defaultMetrics: 'numattrited',
    fixedDataMetrics: 'numEntitled',
    header: {
      title: 'Churn',
      period: true,
      dateRangeSelector: true,
      dateFormat: PREFFERED_DATE_FORMAT,
      defaultRange: {
        ...dateRangeSelectorDefaultValues,
      },
      filters: {
        dimensions: audienceAcquisitionFields.map((item) => item.dimension),
        metrics: ['numSubsWatchedVideo'],
        fields: audienceAcquisitionFields,
      },
    },
    tabs: [
      {
        key: 'OVERALL',
        title: 'OVERALL',
        dimensions: [],
        transform: transformAudienceChurn,
        columns: overallMetricsChurn,
        lineChart: true,
      },
      {
        key: 'CAMPAIGN',
        title: 'CAMPAIGN',
        dimensions: ['campaign'],
        valueKey: 'campaign',
        transform: transformAudienceChurnOthers,
        metrics: overallMetricsChurn,
      },
      {
        key: 'SUBSCRIPTION_PLAN',
        title: 'SUBSCRIPTION PLAN',
        dimensions: ['subscriptionPlan'],
        valueKey: 'subscriptionplan',
        transform: transformAudienceChurnOthers,
        metrics: overallMetricsChurn,
      },
      {
        key: 'PAYMENT_HANDLER',
        title: 'PAYMENT HANDLER',
        dimensions: ['paymentHandler'],
        valueKey: 'paymenthandler',
        transform: transformAudienceChurnOthers,
        metrics: overallMetricsChurn,
      },
      {
        key: 'OFFER_CODE',
        title: 'OFFER CODE',
        dimensions: ['offerCode'],
        valueKey: 'offercode',
        transform: transformAudienceChurnOthers,
        metrics: overallMetricsChurn,
      },
      {
        key: 'COUNTRY',
        title: 'COUNTRY',
        dimensions: ['countryOfSubscription'],
        valueKey: 'countryofsubscription',
        transform: transformAudienceChurnOthers,
        metrics: overallMetricsChurn,
      },
      {
        key: 'PLAN_IDENTIFIER',
        title: 'PLAN IDENTIFIER',
        dimensions: ['planIdentifier'],
        valueKey: 'planidentifier',
        transform: transformAudienceChurnOthers,
        metrics: overallMetricsChurn,
      },
      {
        key: 'CAMPAIGN_SOURCE',
        title: 'CAMPAIGN SOURCE',
        dimensions: ['campaignSource'],
        valueKey: 'campaignsource',
        transform: transformAudienceChurnOthers,
        metrics: overallMetricsChurn,
      },
      {
        key: 'CAMPAIGN_MEDIUM',
        title: 'CAMPAIGN MEDIUM',
        dimensions: ['campaignMedium'],
        valueKey: 'campaignmedium',
        transform: transformAudienceChurnOthers,
        metrics: overallMetricsChurn,
      },
    ],
  },
  '/ui-analytics/behaviour-video-engagement': {
    dataUrl: USER_BEHAVIOUR,
    defaultMetrics: behaviourMetrics[0].key,
    header: {
      title: 'Video Engagement',
      period: true,
      dateRangeSelector: true,
      dateFormat: PREFFERED_DATE_FORMAT,
      defaultRange: {
        ...dateRangeSelectorDefaultValues,
      },
      filters: {
        dimensions: behaviourFields.map((item) => item.dimension),
        metrics: ['registeredMetrics'],
        fields: behaviourFields,
      },
    },
    metrics: behaviourMetrics,
    tabs: [
      {
        key: 'OVERALL',
        title: 'OVERALL',
        dimensions: [],
        transform: transformVideoEngagementOverall,
      },
      {
        key: 'CAMPAIGN',
        title: 'CAMPAIGN',
        dimensions: ['campaign'],
        valueKey: 'campaign',
        transform: transformVideoEngagementCampaign,
      },
      {
        key: 'SUBSCRIPTION_PLAN',
        title: 'SUBSCRIPTION PLAN',
        dimensions: ['subscriptionPlan'],
        valueKey: 'subscriptionplan',
        transform: transformVideoEngagementCampaign,
      },
      {
        key: 'PLATFORM',
        title: 'PLATFORM',
        dimensions: ['platform'],
        valueKey: 'platform',
        transform: transformVideoEngagementCampaign,
      },
    ],
  },
  '/ui-analytics/behaviour-cohort-analysis': {
    dataUrl: COHORT_ANALYSIS,
    defaultMetrics: behaviourMetrics[0].key,
    header: {
      title: 'Cohort Analysis',
      period: true,
      dateRangeSelector: true,
      dateFormat: PREFFERED_DATE_FORMAT,
      defaultRange: {
        ...dateRangeSelectorDefaultValues,
      },
      filters: {
        dimensions: audienceAcquisitionFields.map((item) => item.dimension),
        metrics: ['registeredMetrics'],
        fields: audienceAcquisitionFields,
      },
    },
    metrics: behaviourMetrics,
    tabs: [
      {
        key: 'OVERALL',
        title: 'OVERALL',
        dimensions: ['subscriptionPlan'],
        transform: transformVideoEngagementOverall,
      },
      {
        key: 'CAMPAIGN',
        title: 'CAMPAIGN',
        dimensions: ['campaign'],
        valueKey: 'campaign',
        transform: transformVideoEngagementCampaign,
      },
      {
        key: 'OFFER',
        title: 'OFFER',
        dimensions: ['offer'],
        valueKey: 'offer',
        transform: transformVideoEngagementCampaign,
      },
    ],
  },
  '/ui-analytics/behaviour-user-lifetime-value': {
    dataUrl: LTV_ENHANCED,
    defaultMetrics: behaviourMetrics[0].key,
    header: {
      title: 'User Lifetime Value',
      period: true,
      dateRangeSelector: true,
      dateFormat: PREFFERED_DATE_FORMAT,
      defaultRange: {
        ...dateRangeSelectorDefaultValues,
      },
      filters: {
        dimensions: userLifeTimeFields.map((item) => item.dimension),
        metrics: ['numSubsWatchedVideo'],
        defaultFilterValues: {
          intervalNumLimit: 4,
        },
        fields: [
          ...userLifeTimeFields,
          {
            type: 'text',
            key: 'intervalNumLimit',
            title: 'Maximum interval #',
          },
        ],
      },
    },
    metrics: behaviourMetrics,
    tabs: [
      {
        key: 'OVERALL',
        title: 'OVERALL',
        dimensions: ['subscriptionPlan'],
        transform: transformVideoEngagementOverall,
      },
      {
        key: 'CAMPAIGN',
        title: 'CAMPAIGN',
        dimensions: ['campaign'],
        valueKey: 'campaign',
        transform: transformVideoEngagementCampaign,
      },
      {
        key: 'OFFER',
        title: 'OFFER',
        dimensions: ['offer'],
        valueKey: 'offer',
        transform: transformVideoEngagementCampaign,
      },
    ],
  },
  '/ui-analytics/content-overview': {
    dataUrl: VIDEO_ENGAGEMENT,
    defaultMetrics: 'numPlays',
    header: {
      title: 'Overview',
      period: true,
      dateRangeSelector: true,
      dateFormat: PREFFERED_DATE_FORMAT,
      defaultRange: {
        ...dateRangeSelectorDefaultValues,
      },
      filters: {
        dimensions: behaviourFields.map((item) => item.dimension),
        metrics: ['numPlays', 'totalPlayDuration', 'numAdRequests'],
        fields: behaviourFields,
      },
    },
    metrics: contentOverviewMetrics,
    tabs: [
      {
        key: 'Platform',
        title: 'Platform',
        dimensions: ['platform', 'day'],
        valueKey: 'platform',
        transform: transformPlatformsOthers,
      },
      {
        key: 'CAMPAIGN',
        title: 'CAMPAIGN',
        dimensions: ['campaign', 'day'],
        valueKey: 'campaign',
        transform: transformPlatformsOthers,
      },
      {
        key: 'SUBSCRIPTION_PLAN',
        title: 'SUBSCRIPTION PLAN',
        dimensions: ['subscriptionPlan', 'day'],
        valueKey: 'subscriptionplan',
        transform: transformPlatformsOthers,
      },
    ],
  },
  '/ui-analytics/top-content': {
    dataUrl: VIDEO_ENGAGEMENT,
    defaultMetrics: 'numPlays',
    header: {
      title: 'Top Content',
      dateRangeSelector: true,
      dateFormat: PREFFERED_DATE_FORMAT,
      defaultRange: {
        ...dateRangeSelectorDefaultValues,
      },
      filters: {
        dimensions: behaviourFields.map((item) => item.dimension),
        metrics: ['numPlays', 'totalPlayDuration', 'numAdRequests'],
        fields: behaviourFields,
      },
    },
    metrics: topCotentMetrics,
    columns: commonColumnsTopContent,
    tabs: [
      {
        key: 'Video',
        title: 'Video',
        dimensions: ['mediaType', 'title', 'videoId'],
        metadataDimensions: {},
        groupBy: 'title',
        mediatype: 'video',
        transform: transformTopContent,
      },
      {
        key: 'AUDIO',
        title: 'AUDIO',
        dimensions: ['mediaType', 'title'],
        metadataDimensions: {},
        groupBy: 'title',
        mediatype: 'audio',
        transform: transformTopContent,
      },
      {
        key: 'SERIES_TITLE',
        title: 'SERIES TITLE',
        dimensions: ['mediaType', 'seriesTitle'],
        metadataDimensions: {},
        groupBy: 'seriestitle',
        mediatype: 'video',
        transform: transformTopContent,
      },
      {
        key: 'GENRE',
        title: 'GENRE',
        dimensions: ['mediaType', 'genre'],
        metadataDimensions: {},
        groupBy: 'genre',
        mediatype: 'video',
        transform: transformTopContent,
      },
      {
        key: 'SERIES_CONTENT_TITLE',
        title: 'SERIES/CONTENT TITLE',
        dimensions: ['mediaType', 'title', 'seriesTitle'],
        metadataDimensions: {},
        groupBy: 'title',
        mediatype: 'video',
        transform: transformTopContent,
      },
      {
        key: 'TAGS',
        title: 'TAGS',
        dimensions: [],
        metadataDimensions: { tag: { tagType: ['all'] } },
        groupBy: 'tagtitle',
        transform: transformTopContent,
      },
      {
        key: 'PERSON',
        title: 'PERSON',
        dimensions: [],
        metadataDimensions: { person: { personType: ['all'] } },
        valueKey: 'person',
        transform: transformTopContent,
      },
    ],
  },
  '/ui-analytics/video-watch-through': {
    dataUrl: DTL_VIDEO_ENGAGEMENT,
    defaultMetrics: 'numPlays',
    header: {
      title: 'Video Watch-Through',
      dateRangeSelector: true,
      dateFormat: PREFFERED_DATE_FORMAT,
      defaultRange: {
        ...dateRangeSelectorDefaultValues,
      },
      filters: {
        dimensions: realTimeFields.map((item) => item.key),
        metrics: [''],
        fields: realTimeFields,
      },
    },
    metrics: videoWatchThroughMetrics,
    columns: commonColumnsTopContent,
    tabs: [
      {
        key: 'run-time-minutes',
        title: 'Run-Time(Minutes)',
        dimensions: ['minuteRuntime'],
        transform: transformVideoWatchThrough,
      },
      {
        key: 'run-time-percentage',
        title: 'Run-Time(%)',
        dimensions: ['pctRuntime'],
        transform: transformVideoWatchThrough,
      },
    ],
  },
  '/ui-analytics/payments': {
    dataUrl: USER_PAYMENTS,
    defaultMetrics: 'grossTransactionAmount',
    header: {
      title: 'Payments',
      dateRangeSelector: true,
      dateFormat: PREFFERED_DATE_FORMAT,
      defaultRange: {
        ...dateRangeSelectorDefaultValues,
      },
    },
    metrics: paymentMetrics,
    queryData: {
      others: {
        dimensions: ['Currency Type'],
      },
      filters: {
        monetizationModel: ['svod'],
        currencyType: ['BDT'],
      },
    },
    platforms: {
      type: 'currency',
      platformKey: 'currency type',
      queryData: {
        filters: {
          monetizationModel: ['svod'],
        },
        others: {
          dimensions: ['Currency Type'],
        },
      },
      transform: transformPaymentsPlatform,
    },
    tabs: [
      {
        key: 'overall',
        title: 'Overall',
        dimensions: ['Currency Type'],
        transform: transformPayments,
      },
      {
        key: 'paymentHandler',
        title: 'Payment Handler',
        dimensions: ['Currency Type', 'Payment Handler'],
        identifier: 'payment handler',
        transform: transforPaymentsOthers,
      },
      {
        key: 'transactionType',
        title: 'Transaction Type',
        dimensions: ['Currency Type', 'Transaction Type'],
        identifier: 'transaction type',
        transform: transforPaymentsOthers,
      },
      {
        key: 'subscriptionPlan',
        title: 'Subscription Plan',
        dimensions: ['Currency Type', 'Subscription Plan'],
        identifier: 'subscription plan',
        transform: transforPaymentsOthers,
      },
    ],
  },
  ...qosMap,
}

export default filtersMap
