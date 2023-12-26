const tncPointsObject = { point: '' }

const featureDetailsObject = {
  textToDisplay: '',
  value: '',
  valueType: 'String',
}

const intialPlanDetailsTvodObject = {
  visible: true,
  allowedPayMethods: [],
  carrierBillingProviders: [],
  timweTnCHeading: '',
  timweTnCLink: '',
  hidePlanPrice: false,
  allowedPayCountries: [],
  isDefault: false,
  supportedDevices: [],
  countryCode: '',
  isPurchaseEnabled: true,
  purchaseAmount: '',
  isRentEnabled: false,
  rentAmount: '',
  startingPeriodValue: 30,
  startingPeriodUnit: 'days',
  rentalPeriodValue: 48,
  rentalPeriodUnit: 'hours',
}

const tvodFeatureSettingsObject = {
  isDownloadAllowed: false,
  isHdStreaming: false,
  isBeamingAllowed: false,
  contentConsumption: {
    web: true,
    ios: true,
    android: true,
    roku: true,
    fireTv: true,
    appleTv: true,
    samsung: true,
    lg: true,
    androidTv: true,
    tivo: true,
    xbox: true,
    miTv: true,
    corpus: true,
    vizioTv: true,
  },
  numberOfAllowedDevices: '',
  numberOfAllowedStreams: '',
  logoOfParnter: '',
}

const intialPlanDetailsSvodObject = {
  allowedPayCountries: [],
  allowedPayMethods: [],
  allowedStreamCountries: [],
  callToAction: '',
  carrierBillingProviders: [],
  countryCode: '',
  description: '',
  displayFeaturePlanIdentifier: false,
  displayStrikeThroughPrice: false,
  featureDetails: [{ ...featureDetailsObject }],
  featurePlanIdentifier: '',
  introductoryPrice: '',
  isDefault: false,
  noOfDaysExtended: '',
  paypalId: '',
  recurringPaymentAmount: '',
  recurringPaymentCurrencyCode: '',
  redirectUrl: '',
  strikeThroughPrice: '',
  supportedDevices: [],
  timweTnCHeading: '',
  timweTnCLink: '',
  tnCPoints: [{ ...tncPointsObject }],
  title: '',
  visible: true,
  hidePlanPrice: false,
}

const svodFeatureSettingsObject = {
  isDownloadAllowed: false,
  isHdStreaming: false,
  isBeamingAllowed: false,
  contentConsumption: {
    web: true,
    ios: true,
    android: true,
    roku: true,
    fireTv: true,
    appleTv: true,
    samsung: true,
    lg: true,
    androidTv: true,
    tivo: true,
    xbox: true,
    miTv: true,
    corpus: true,
    vizioTv: true,
  },
  numberOfAllowedDevices: '',
  numberOfAllowedStreams: '',
  includingAds: false,
  logoOfParnter: '',
}
const intialSvodObject = {
  name: '',
  identifier: '',
  description: '',
  planDisplayOrder: '',
  renewalCyclePeriodMultiplier: '',
  renewalCycleType: '',
  renewable: false,

  featureSetting: {
    ...svodFeatureSettingsObject,
  },

  metadata: [{ name: '', value: '' }],
  planDetails: [{ ...intialPlanDetailsSvodObject }],
  scheduledFromDate: '',
  scheduledToDate: '',
  addedOffers: [],
}

const freeFeatureSettingsObject = {
  isLoginRequired: false,
  isEmailRequired: false,
}

const intialFreeObject = {
  name: '',
  identifier: '',
  description: '',

  featureSetting: {
    ...freeFeatureSettingsObject,
  },
  metadata: [{ name: '', value: '' }],
}

const intialTvodObject = {
  name: '',
  identifier: '',
  description: '',
  purchaseIdentifier: '',
  rentIdentifier: '',
  featureSetting: {
    ...tvodFeatureSettingsObject,
  },

  metadata: [{ name: '', value: '' }],
  planDetails: [{ ...intialPlanDetailsTvodObject }],
  scheduledFromDate: '',
  scheduledToDate: '',
  addedOffers: [],
}
const avodFeatureSettingsObject = {
  loggedIn: false,
  nonLoggedIn: false,
  subscribed: false,
  transactionPurchased: false,
  tve: false,
  churned: false,
}

const intialAddTagsAvod = {
  web: { url: '', active: false },
  ios: { url: '', active: false },
  apple_tv: { url: '', active: false },
  android: { url: '', active: false },
  android_tv: { url: '', active: false },
  amazon_fire: { url: '', active: false },
  fire_tv: { url: '', active: false },
  fire_stick: { url: '', active: false },
  roku: { url: '', active: false },
  roku_fallback: { url: '', active: false },
  windows10_desktop: { url: '', active: false },
  xbox: { url: '', active: false },
  lg_tv: { url: '', active: false },
  samsung_tv: { url: '', active: false },
  tivo: { url: '', active: false },
  vizioTv: { url: '', active: false },
}
const intialPlanDetailsAvodObject = {
  visible: true,
  countryCode: '',
  isDefault: false,
  supportedDevices: [],
  preRoll: {
    adTags: { ...intialAddTagsAvod },
  },
}
const intialAvodObject = {
  name: '',
  identifier: '',
  description: '',
  featureSetting: {
    ...avodFeatureSettingsObject,
  },

  metadata: [{ name: '', value: '' }],
  planDetails: [{ ...intialPlanDetailsAvodObject }],
  scheduledFromDate: '',
  scheduledToDate: '',
}

const intialPlanDetailsTveObject = {
  countryCode: '',
  redirectUrl: '',
  channelIds: [],
  visible: true,
  isDefault: false,
  supportedDevices: [],
}

const intialTveObject = {
  name: '',
  identifier: '',
  description: '',
  providerId: '',
  metadata: [{ name: '', value: '' }],
  planDetails: [{ ...intialPlanDetailsTveObject }],
}

const createPlanIntialObjectHelper = (planType) => {
  if (!planType) return false
  else {
    if (planType === 'SVOD') {
      return intialSvodObject
    } else if (planType === 'FREE') {
      return intialFreeObject
    } else if (planType === 'TVOD') {
      return intialTvodObject
    } else if (planType === 'AVOD') {
      return intialAvodObject
    } else if (planType === 'edit') {
      return {}
    } else if (planType === 'TVE') {
      return intialTveObject
    }
  }
}

const chooseFeatureSettingContentObject = (type) => {
  switch (type) {
    case 'SVOD':
      return svodFeatureSettingsObject.contentConsumption

    case 'TVOD':
      return tvodFeatureSettingsObject.contentConsumption

    default:
      return {}
  }
}
const choosePlanDetailObjectIntial = (type) => {
  switch (type) {
    case 'SVOD':
      return intialPlanDetailsSvodObject

    case 'TVOD':
      return intialPlanDetailsTvodObject

    case 'AVOD':
      return intialPlanDetailsAvodObject

    case 'TVE':
      return intialPlanDetailsTveObject

    default:
      return {}
  }
}

const getFalseContentConsumption = (contentConsumption) => {
  const falseContentConsumption = Object.fromEntries(
    Object.keys(contentConsumption).map((key) => [key, false])
  )
  return falseContentConsumption
}

const preFillData = (data) => {
  if (data) {
    let { planOffers: addedOffers = [], monetizationModel = '' } = data

    // chosing intialPlanDetailObjectto prefill keys which are not there in  data recived  because we have to show all fields
    let intialPlanDetailObject = choosePlanDetailObjectIntial(monetizationModel)

    if (monetizationModel !== 'FREE') {
      const finalPlanDetails = data?.planDetails.map((item) => {
        if (!(monetizationModel === 'SVOD')) {
          try {
            delete item.tnCPoints
            delete item.featureDetails
          } catch (e) {}
        } else if (item.featureDetails && item.featureDetails?.length === 0) {
          item.featureDetails = [{ ...featureDetailsObject }]
        }

        if (monetizationModel === 'AVOD') {
          item.preRoll = {
            adTags: { ...intialAddTagsAvod, ...item.preRoll.adTags },
          }
        }
        if (monetizationModel === 'AVOD' || monetizationModel === 'TVE') {
          delete item?.carrierBillingProviders
          delete item?.displayStrikeThroughPrice
          delete item?.features
          delete item?.hidePlanPrice
          delete item?.isPurchaseEnabled
          delete item?.isRentEnabled
          delete item?.tnCPoints
          delete item?.featureDetails
        }

        return { ...intialPlanDetailObject, ...item }
      })
      data.planDetails = finalPlanDetails
    }

    addedOffers = addedOffers.map((item) => {
      const i = { ...item, id: item?.offerId }
      delete i.offerId
      return i
    })

    const arrayOfStrings =
      (data?.featureSetting &&
        data?.featureSetting?.contentConsumption &&
        data?.featureSetting?.contentConsumption.length > 0 &&
        data?.featureSetting?.contentConsumption) ||
      []
    const objOfKeyWithBooleanState = arrayOfStrings.reduce((acc, curr) => {
      acc[curr] = true
      return acc
    }, {})

    const contentConsumptionIntial =
      chooseFeatureSettingContentObject(monetizationModel)
    const getFalseContentConsumtionIntial = getFalseContentConsumption(
      contentConsumptionIntial
    )

    const fe = {
      ...data?.featureSetting,
      contentConsumption: {
        ...getFalseContentConsumtionIntial,
        ...objOfKeyWithBooleanState,
      },
    }

    if (!(monetizationModel === 'SVOD' || monetizationModel === 'TVOD')) {
      delete fe?.contentConsumption
    }

    // deleteing extra data
    delete data?.siteOwner

    delete data?.updateDate
    delete data?.addedDate
    delete data?.objectKey

    delete data?.status

    let finalData = {
      ...data,
      metadata: (data?.metadata?.length > 0 && data?.metadata) || [
        { name: '', value: '' },
      ],
      addedOffers: addedOffers,
      featureSetting: fe,
    }

    return finalData
  }
}

export {
  intialPlanDetailsSvodObject,
  intialPlanDetailsTvodObject,
  createPlanIntialObjectHelper,
  preFillData,
  choosePlanDetailObjectIntial,
}
