
import { useEffect, useState } from 'react'
import fetchHelper from 'src/helpers/fetchHelper'
import { useCookies } from 'react-cookie'
import { useFormik } from 'formik'
import { CONTENT_BASE_URL, CONTENT_LIVE_URL } from 'src/constants/urlConstants'
import moment from 'moment'
import 'moment-timezone'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import { ratingOptions } from '../../constants/ratingOption'
import produce from 'immer';

const useContentSettings = () => {
  const [cookies] = useCookies()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [pageData, setPageData] = useState({})
  const [tagOptions, setTagOptions] = useState([])
  const [tagInputValue, setTagInputValue] = useState('')
  const [personInputValue, setPersonInputValue] = useState('')
  const [livestreamOptions, setLivestreamOptions] = useState([])
  const [livestreamInputValue, setLivestreamInputValue] = useState('')
  const [highlightOptions, setHighlightOptions] = useState([])
  const [highlightInputValue, setHighlightInputValue] = useState('')
  const [previewVideoOptions, setPreviewVideoOptions] = useState([])
  const [previewVideoInputValue, setPreviewVideoInputValue] = useState('')
  const [leagueOptions, setLeagueOptions] = useState([])
  const [leagueInputValue, setLeagueInputValue] = useState('')
  const [homeTeamOptions, setHomeTeamOptions] = useState([])
  const [homeTeamInputValue, setHomeTeamInputValue] = useState('')
  const [awayTeamOptions, setAwayTeamOptions] = useState([])
  const [awayTeamInputValue, setAwayTeamInputValue] = useState('')
  const [optionalTagOptions, setOptionalTagOptions] = useState([])
  const [optionalTagInputValue, setOptionalTagInputValue] = useState('')
  const [licenseOptions, setLicenseOptions] = useState([])
  const [modelOptions, setModelOptions] = useState([])
  const [planOptions, setPlanOptions] = useState([])
  const [planInputValue, setPlanInputValue] = useState('')
  const [trailerOptions, setTrailerOptions] = useState([])
  const [trailerInputValue, setTrailerInputValue] = useState('')
  const [relatedVideoOptions, setRelatedVideoOptions] = useState([])
  const [relatedVideosInputValue, setRelatedVideosInputValue] = useState('')
  const [promoVideoOptions, setPromoVideoOptions] = useState([])
  const [promoVideosInputValue, setPromoVideosInputValue] = useState('')
  const [categoryOptions, setCategoryOptions] = useState([])
  const [categoryInputValue, setCategoryInputValue] = useState('')
  const [successAutosave, setSucessAutosave] = useState(false)
  const [failedAutosave, setFailedAutosave] = useState(false)
  const [apiType, setApiType] = useState('video')
  const [contentId, setContentId] = useState('')
  const [startDateTime, setStartDateTime] = useState('')
  const [airDateTime, setAirDateTime] = useState('')
  const [seasonAirDateTime, setSeasonAirDateTime] = useState('')
  const [endDateTime, setEndDateTime] = useState('')
  const [timeZoneList, setTimeZoneList] = useState([])
  const [timezone, setTimezone] = useState('')
  const [airTimezone, setAirTimezone] = useState('')
  const [seasonAirTimezone, setSeasonAirTimezone] = useState('')
  const [seoKeywords, setSeoKeywords] = useState([])
  const [director, setDirector] = useState([])
  const [starring, setStarring] = useState([])
  const [videoplaylist, setVideoplaylist] = useState([])
  const [personOptions, setPersonOptions] = useState([])
  const [additionalMetadata, setAdditionalMetadata] = useState([
    {
      name: null,
      value: null,
    },
  ])
  const [seasonGroup, setSeasonGroup] = useState([
    {
      name: null,
      purchase: null,
      description: null,
      episodes: []
    },
  ])
  const [embedCode, setEmbedCode] = useState('')
  const [selectedModelTypes, setSelectedModelTypes] = useState([])
  const [cloudfrontProgress, setCloudfrontProgress] = useState(false)
  const [startLiveStream, setStartLiveStream] = useState(false)
  const [stopLiveStream, setStopLiveStream] = useState(false)
  const [showChooseArchive, setShowChooseArchive] = useState(false)
  const [showPrimaryInput, setShowPrimaryInput] = useState(false)
  const [showSecondaryInput, setShowSecondaryInput] = useState(false)
  const [primaryLiveInput, setPrimaryLiveInput] = useState('')
  const [secondaryLiveInput, setSecondaryLiveInput] = useState('')
  const [channelState, setChannelState] = useState('')
  const [isDVR, setIsDVR] = useState(false)
  const [showDVR, setShowDVR] = useState(false)
  const [thirdPartyLive, setThirdPartyLive] = useState(false)
  const [mediaLiveAlerts, setMediaLiveAlerts] = useState([])
  const [publishDisabled, setPublishDisabled] = useState(false)
  const [startLiveDisabled, setStartLiveDisabled] = useState(false)
  const [stopLiveDisabled, setStopLiveDisabled] = useState(false)
  const [liveProcessingCheck, setLiveProcessingCheck] = useState(null)
  const [liveStatusCheck, setLiveStatusCheck] = useState(null)
  const [mediaLiveAlertsCheck, setMediaLiveAlertsCheck] = useState(null)
  const [liveWorkflowStatus, setLiveWorkflowStatus] = useState(false)
  const [liveWorkflowMessage, setLiveWorkflowMessage] = useState('')
  const [showDuplicateContent, setShowDuplicateContent] = useState(true)
  const [currentGameState, setCurrentGameState] = useState('')
  const [defaultGameState, setDefaultGameState] = useState('')
  const [preGameState, setPreGameState] = useState('')
  const [liveGameState, setLiveGameState] = useState('')
  const [postGameState, setPostGameState] = useState('')
  const [endGameState, setEndGameState] = useState('')
  const [showScheduleButton, setShowScheduleButton] = useState(false)
  const [createScheduleButton, setCreateScheduleButton] = useState(false)

  const [imgSrc32x9, setImgSrc32x9] = useState(null)
  const [imgSrc16x9, setImgSrc16x9] = useState(null)
  const [imgSrc3x4, setImgSrc3x4] = useState(null)
  const [imgSrc1x1, setImgSrc1x1] = useState(null)
  const [imgSrc9x16, setImgSrc9x16] = useState(null)

  const [imgId32x9, setImgId32x9] = useState(null)
  const [imgId16x9, setImgId16x9] = useState(null)
  const [imgId3x4, setImgId3x4] = useState(null)
  const [imgId1x1, setImgId1x1] = useState(null)
  const [imgId9x16, setImgId9x16] = useState(null)

  const [images32x9, setImages32x9] = useState([])
  const [images16x9, setImages16x9] = useState([])
  const [images3x4, setImages3x4] = useState([])
  const [images1x1, setImages1x1] = useState([])
  const [images9x16, setImages9x16] = useState([])

  const [manageImagesModal, setManageImagesModal] = useState(false)
  const [manageImageInitialize, setManageImageInitialize] = useState(false)
  const [imageListData, setImageListData] = useState([])
  const [imageCount, setImageCount] = useState(0)
  const [showImage, setShowImage] = useState(null)

  const [selectedRating, setSelectedRating] = useState('');


  const formik = useFormik({
    initialValues: pageData,
    enableReinitialize: true,
    onSubmit: ({ values }) => {
      console.log(values)
    },
  })

  useEffect(() => {
    getPageData()
    setLoading(true)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (manageImageInitialize) {
      handleAutosave(null, 'saveImages', null)
    }
    // eslint-disable-next-line
  }, [images32x9, images16x9, images3x4, images1x1, images9x16])

  const getPageData = async () => {
    const pathname = window.location.pathname.split('/')
    let apiType = pathname[2]
    const id = pathname[3]
    let url
    apiType = apiType == 'game' ? 'event' : apiType
    if (apiType == 'live') {
      url = CONTENT_LIVE_URL + '/' + id
    } else {
      url = CONTENT_BASE_URL + apiType + '/' + id
    }
    var result = await fetchHelper({
      url: url,
      method: 'GET',
      headers: {
        xApiKey: cookies.managementXApiKey,
        Authorization: cookies.accessToken,
      },
    })
    if (result && result.status == 200) {
      initializeTemplate(result)
    } else {
      setLoading(false)
    }
  }

  const handleEditViewClose = () => {
    if (liveProcessingCheck) {
      clearInterval(liveProcessingCheck)
      setLiveProcessingCheck(null)
    }
    if (liveStatusCheck) {
      clearInterval(liveStatusCheck)
      setLiveStatusCheck(null)
    }
    if (mediaLiveAlertsCheck) {
      clearInterval(mediaLiveAlertsCheck)
      setMediaLiveAlertsCheck(null)
    }
    router.push('/content')
  }

  const modelQuery = (selectedModels) => {
    var typesArray = []
    selectedModels && _.map(selectedModels, function (item) {
      typesArray.push(item.type || item.title)
    })
    var modelQuery = typesArray.join(',')
    return modelQuery;
  }

  const getPlanList = (apiData) => {
    return fetchHelper({
      url: 'https://tools.develop.monumentalsportsnetwork.com/v2.0/invoke',
      method: 'POST',
      data: apiData,
      headers: {
        xApiKey: cookies.managementXApiKey,
        Authorization: cookies.accessToken,
      }
    })
  }

  const getModelList = () => {
    return fetchHelper({
      url: 'https://api-internal.develop.monumentalsportsnetwork.com/v3/enumodels?site=msndev',
      method: 'GET',
      headers: {
        xApiKey: cookies.managementXApiKey,
        Authorization: cookies.accessToken,
      }
    })
  }

  const initializeTemplate = async (result) => {
    getApiType(result)
    setContentId(result.guid)

    // for categories
    var primaryCategory = []
    var secondaryCategories = result.categories
    var mergedCategories = []
    if (result.primaryCategory && Object.keys(result.primaryCategory).length != 0) {
      primaryCategory.push(result.primaryCategory)
      mergedCategories = primaryCategory.concat(secondaryCategories)
    }
    result['mergedCategories'] = mergedCategories

    // for monetization models and plans
    if (result?.monetization?.models?.length > 0) {
      var initialModelData = []
      var selectedModelIds = []
      var modelOptions = []
      var modelTypes = []
      for (var m = 0; m < result.monetization.models.length; m++) {
        modelTypes = [...modelTypes, result.monetization.models[m].type]
        selectedModelIds = [...selectedModelIds, result.monetization.models[m].id]
      }
      setSelectedModelTypes(modelTypes)
      var selectedModelDetails = selectedModelIds.length > 0 && await getModelList()
      if (selectedModelDetails) {
        for (var i = 0; i < selectedModelDetails?.items?.length; i++) {
          modelOptions.push({
            id: selectedModelDetails.items[i].id,
            name: selectedModelDetails.items[i].name,
            type: selectedModelDetails.items[i].type
          });
          if (selectedModelIds.includes(selectedModelDetails.items[i].id)) {
            initialModelData.push({
              id: selectedModelDetails.items[i].id,
              name: selectedModelDetails.items[i].name,
              type: selectedModelDetails.items[i].type
            });
          }
        }
      }
      setModelOptions(modelOptions)
      result['monetizationModels'] = initialModelData
    }
    if (result?.monetization?.models?.length > 0 && result?.monetization?.plans?.length > 0) {
      var initialPlanData = []
      var modelString = modelQuery(result?.monetization?.models)
      var selectedPlanIds = []
      for (var p = 0; p < result.monetization.plans.length; p++) {
        if (modelString && modelString.includes(result.monetization.plans[p].type)) {
          selectedPlanIds = [...selectedPlanIds, result.monetization.plans[p].planId]
        }
      }
      if (selectedPlanIds.includes('svodAll')) {
        initialPlanData.push({
          id: "svodAll",
          title: "All SVOD",
          type: "SVOD",
          isPlanGroup: false
        });
        selectedPlanIds = selectedPlanIds.filter(id => id !== 'svodAll')
      }
      if (selectedPlanIds.includes('tveAll')) {
        initialPlanData.push({
          id: "tveAll",
          title: "All TVE",
          type: "TVE",
          isPlanGroup: false
        });
        selectedPlanIds = selectedPlanIds.filter(id => id !== 'tveAll')
      }
      var stringPlanIds = selectedPlanIds.toString()
      var apiData = {
        url: "/subscription/plangroups",
        method: "GET",
        role: "Content",
        auth: {
          site: cookies.site,
          isServerToken: true
        },
        query: {
          ids: stringPlanIds,
          site: cookies.site,
          stringPlanIds,
          migrationEnabled: true,
          includePlan: true
        },
        body: {}
      };
      var selectedPlanDetails = selectedPlanIds.length > 0 && await getPlanList(apiData)
      if (selectedPlanDetails) {
        for (var p = 0; p < selectedPlanDetails.length; p++) {
          initialPlanData.push({
            id: selectedPlanDetails[p].id,
            title: selectedPlanDetails[p].name,
            type: selectedPlanDetails[p].monetizationModel + (selectedPlanDetails[p].objectKey && selectedPlanDetails[p].objectKey == "plangroup" ? '-group' : ''),
            isPlanGroup: selectedPlanDetails[p].objectKey && selectedPlanDetails[p].objectKey == "plangroup",
          });
        }
      }
      result['monetizationPlans'] = initialPlanData
    }

    // for manage images
    if (result.images && Object.keys(result.images).length != 0) {
      var count = 0
      let images = []
      var keys = Object.keys(result.images)
      for (var i = 0; i < keys.length; i++) {
        for (var j = 0; j < result.images[keys[i]].length; j++) {
          if (result.images[keys[i]].length > 0) {
            if (keys[i] == '_32x9Images') {
              setImgSrc32x9(result.images[keys[i]][0].url)
              setImgId32x9(result.images[keys[i]][0].id)
              images.push({
                id: result.images[keys[i]][j].id,
                url: result.images[keys[i]][j].url,
              })
            } else if (keys[i] == '_16x9Images') {
              setImgSrc16x9(result.images[keys[i]][0].url)
              setImgId16x9(result.images[keys[i]][0].id)
              images.push({
                id: result.images[keys[i]][j].id,
                url: result.images[keys[i]][j].url,
              })
              setShowImage(result.images[keys[i]][0].url)
            } else if (keys[i] == '_3x4Images') {
              setImgSrc3x4(result.images[keys[i]][0].url)
              setImgId3x4(result.images[keys[i]][0].id)
              images.push({
                id: result.images[keys[i]][j].id,
                url: result.images[keys[i]][j].url,
              })
            } else if (keys[i] == '_1x1Images') {
              setImgSrc1x1(result.images[keys[i]][0].url)
              setImgId1x1(result.images[keys[i]][0].id)
              images.push({
                id: result.images[keys[i]][j].id,
                url: result.images[keys[i]][j].url,
              })
            } else if (keys[i] == '_9x16Images') {
              setImgSrc9x16(result.images[keys[i]][0].url)
              setImgId9x16(result.images[keys[i]][0].id)
              images.push({
                id: result.images[keys[i]][j].id,
                url: result.images[keys[i]][j].url,
              })
            }
          }
          count++
        }
        if (keys[i] == '_32x9Images') {
          setImages32x9(images)
          images = []
        } else if (keys[i] == '_16x9Images') {
          setImages16x9(images)
          images = []
        } else if (keys[i] == '_3x4Images') {
          setImages3x4(images)
          images = []
        } else if (keys[i] == '_1x1Images') {
          setImages1x1(images)
          images = []
        } else if (keys[i] == '_9x16Images') {
          setImages9x16(images)
          images = []
        }
      }
      setImageCount(count)
    }

    // for scheduling content availability dates
    var schedulingStartTime = result.scheduleStartTime || (result.schedule && result.schedule.startTime) || null
    var schedulingEndTime = result.scheduleEndTime || (result.schedule && result.schedule.endTime) || null
    var schedulingStartDate = result.scheduleStartDate || (result.schedule && result.schedule.startDate) || null
    var schedulingEndDate = result.scheduleEndDate || (result.schedule && result.schedule.endDate) || null
    if (moment(schedulingStartDate).isValid()) {
      schedulingStartDate = moment.utc(schedulingStartDate).format('MM/DD/YYYY')
      schedulingStartDate = schedulingStartTime ? schedulingStartDate + ' ' + schedulingStartTime : schedulingStartDate
      setStartDateTime(schedulingStartDate)
    }
    if (moment(schedulingEndDate).isValid()) {
      schedulingEndDate = moment.utc(schedulingEndDate).format('MM/DD/YYYY')
      schedulingEndDate = schedulingEndTime ? schedulingEndDate + ' ' + schedulingEndTime : schedulingEndDate
      setEndDateTime(schedulingEndDate)
    }
    const timeZones = moment.tz.names().map((zoneName) => {
      return {
        id: zoneName,
        text: zoneName,
      }
    })
    setTimeZoneList(timeZones)
    setTimezone(result.timezone || (result.schedule && result.schedule.timezone))

    // for air date
    var airDateTime = (result.geoRestriction && result.geoRestriction.airDateTime) || null;
    if (moment(airDateTime).isValid()) {
      var airDateTimeUpdated = moment.utc(airDateTime).format('MM/DD/YYYY hh:mm a');
      setAirDateTime(airDateTimeUpdated)
    }
    setAirTimezone(result.geoRestriction && result.geoRestriction.airTimezone)

    // for season air date
    var seasonAirDateTime = (result.geoRestriction && result.geoRestriction.seasonAirDateTime) || null;
    if (moment(seasonAirDateTime).isValid()) {
      var seasonAirDateTimeUpdated = moment.utc(seasonAirDateTime).format('MM/DD/YYYY hh:mm a');
      setSeasonAirDateTime(seasonAirDateTimeUpdated)
    }
    setSeasonAirTimezone(result.geoRestriction && result.geoRestriction.seasonAirTimezone)

    // for licenses
    result['licenses'] = result.licenses || (result.geoRestriction && result.geoRestriction.licenses) || []

    // for seo
    if (result.seo) {
      result['seoTitle'] = result?.seo?.title || null
      result['seoRedirectUrl'] = result?.seo?.redirectUrl || null
      result['seoRedirectCode'] = result?.seo?.redirectCode || null
      result['seoH1Title'] = result?.seo?.h1Title || null
      result['seoH2Title'] = result?.seo?.h2Title || null
      result['seoDescription'] = result?.seo?.description || null
      if (result?.seo?.keywords?.length > 0) {
        let keywordsArr = []
        for (let i = 0; i < result.seo.keywords.length; i++) {
          let keywordsObj = {
            id: result.seo.keywords[i],
            text: result.seo.keywords[i],
          }
          keywordsArr.push(keywordsObj)
        }
        setSeoKeywords(keywordsArr)
      }
    }

    // for player time control - advanced options
    if (result.playerTimeControl) {
      result['skipRecapStartTime'] = result?.playerTimeControl?.skipRecapStartTime?.toString() || null
      result['skipRecapEndTime'] = result?.playerTimeControl?.skipRecapEndTime?.toString() || null
      result['skipIntroStartTime'] = result?.playerTimeControl?.skipIntroStartTime?.toString() || null
      result['skipIntroEndTime'] = result?.playerTimeControl?.skipIntroEndTime?.toString() || null
      result['playNextTime'] = result?.playerTimeControl?.playNextTime?.toString() || null
      result['clevertapPopupTime'] = result?.playerTimeControl?.clevertapPopupTime?.toString() || null
    }

    // for cast and crew
    if (result.creditBlocks && result.creditBlocks.length > 0) {
      if (result?.creditBlocks[0]?.credits?.length > 0) {
        let directorArr = []
        for (let i = 0; i < result.creditBlocks[0].credits.length; i++) {
          let directorObj = {
            id: result.creditBlocks[0].credits[i].title,
            text: result.creditBlocks[0].credits[i].title,
          }
          directorArr.push(directorObj)
        }
        setDirector(directorArr)
      }
      if (result?.creditBlocks[1]?.credits?.length > 0) {
        let starringArr = []
        for (let i = 0; i < result.creditBlocks[1].credits.length; i++) {
          let starringObj = {
            id: result.creditBlocks[1].credits[i].title,
            text: result.creditBlocks[1].credits[i].title,
          }
          starringArr.push(starringObj)
        }
        setStarring(starringArr)
      }
    }

    // for setting videoplaylist
    if (result.videoList && result.videoList.length > 0) {
      setVideoplaylist(result.videoList)
    }

    // for additional metadata
    if (result?.metadata?.length > 0 || result?.additionalMetadata?.length > 0) {
      setAdditionalMetadata(result.metadata || result.additionalMetadata)
    }

    // for season group
    if (result?.seasons?.length > 0 || result?.seasons?.length > 0) {
      setSeasonGroup(result?.seasons || result.seasons)
    }
    // for embed code
    let domainName = null
    if (cookies.DomainName) {
      domainName = cookies.DomainName[0]
      setEmbedCode('<iframe allowfullscreen width="560" height="315" src="https://' + domainName + '/embed/player?filmId=' + result.guid + '" frameborder="0"></iframe>')
    }

    // for parental rating
    result.parentalRating ? setSelectedRating(result.parentalRating) : setSelectedRating('')

    // for live streaming
    if (result.isLiveStream) {
      // self service live
      if (result.workFlowArn) {
        setShowDuplicateContent(false)
        if (result.workflowStatus != 'error' && result.workflowStatus != 'archived') {
          if (result?.dvrConfig?.startOverTime) {
            setShowDVR(true)
            setIsDVR(result?.dvrConfig?.isDvrEnabled)
          }
          if (result.workflowStatus == 'processing') {
            setPublishDisabled(true)
            setLiveWorkflowStatus(true)
            setLiveWorkflowMessage('Processing...')
            startLiveProcessingCheck(result.guid)
          } else {
            setCloudfrontProgress(true)
            setStartLiveStream(false)
            setStopLiveStream(false)
            setPrimaryLiveInput('')
            setSecondaryLiveInput('')
            setShowChooseArchive(false)
            setShowPrimaryInput(false)
            setShowSecondaryInput(false)
            setChannelState('')
            setMediaLiveAlerts([])
            startLiveCheck(result.guid, true)
          }
        } else {
          setLiveWorkflowStatus(true)
          setLiveWorkflowMessage(`Live ${result.workflowStatus}`)
        }
      }
      // third party live 
      else {
        setThirdPartyLive(true)
      }
    }

    // for preview video in game
    if (result.preview) {
      if (Object.keys(result.preview).length != 0) {
        result['previewVideo'] = [result.preview]
      } else {
        result['previewVideo'] = []
      }
    }

    // for league in game
    if (result.league) {
      if (Object.keys(result.league).length != 0) {
        result['league'] = [result.league]
      } else {
        result['league'] = []
      }
    }

    // for home team in game
    if (result.homeTeam) {
      if (Object.keys(result.homeTeam).length != 0) {
        result['homeTeam'] = [result.homeTeam]
      } else {
        result['homeTeam'] = []
      }
    }

    // for away team in game
    if (result.awayTeam) {
      if (Object.keys(result.awayTeam).length != 0) {
        result['awayTeam'] = [result.awayTeam]
      } else {
        result['awayTeam'] = []
      }
    }

    // for Sports Radar in game
    if (result.sportsRadar && result.contentType == 'game') {
      result['sportsRadarId'] = result?.sportsRadar?.id || null
      result['sportsRadarSeasonId'] = result?.sportsRadar?.seasonId || null
      result['sportsRadarWidgetType'] = result?.sportsRadar?.widgetType || null
    }

    // for current game state
    if (result.currentState) {
      setCurrentGameState(result.currentState)
    }

    // for schedule in game/event
    if (result.schedule && (result.contentType == 'game' || result.contentType == 'event')) {
      if (Object.keys(result.schedule).length !== 0) {
        setShowScheduleButton(true)
      } else {
        setCreateScheduleButton(true)
      }
    }

    // for game states date time
    setDefaultGameState(result.states?.default?.startDateTime ? dayjs.unix(result.states.default.startDateTime).format('MM/DD/YYYY hh:mm a') : '')
    setPreGameState(result.states?.pre?.startDateTime ? dayjs.unix(result.states.pre.startDateTime).format('MM/DD/YYYY hh:mm a') : '')
    setLiveGameState(result.states?.live?.startDateTime ? dayjs.unix(result.states.live.startDateTime).format('MM/DD/YYYY hh:mm a') : '')
    setPostGameState(result.states?.post?.startDateTime ? dayjs.unix(result.states.post.startDateTime).format('MM/DD/YYYY hh:mm a') : '')
    setEndGameState(result.states?.end?.endDateTime ? dayjs.unix(result.states.end.endDateTime).format('MM/DD/YYYY hh:mm a') : '')

    setPageData(result)
    setLoading(false)
  }

  const getApiType = (ele) => {
    if (ele.videoType && !ele.isLiveStream) {
      setApiType('video')
    } else if (ele.videoType && ele.isLiveStream) {
      setApiType('live')
    } else if (ele.contentType && ele.contentType.toLowerCase() == 'videoplaylist') {
      setApiType('videoplaylist')
    } else if ((ele.mediaType && ele.mediaType.toLowerCase() == 'tag') || (ele.mediaType && ele.mediaType.toLowerCase() == 'category')) {
      setApiType('metadata')
    } else if (
      (ele.mediaType && ele.mediaType.toLowerCase() == 'coach') ||
      (ele.mediaType && ele.mediaType.toLowerCase() == 'professor') ||
      (ele.mediaType && ele.mediaType.toLowerCase() == 'actor') ||
      (ele.mediaType && ele.mediaType.toLowerCase() == 'instructor') ||
      (ele.mediaType && ele.mediaType.toLowerCase() == 'player')
    ) {
      setApiType('person')
    } else if (
      (ele.mediaType && ele.mediaType.toLowerCase() == 'pdf') ||
      (ele.mediaType && ele.mediaType.toLowerCase() == 'msword') ||
      (ele.mediaType && ele.mediaType.toLowerCase() == 'docx')
    ) {
      setApiType('document')
    } else if (ele.mediaType) {
      setApiType(ele.mediaType && ele.mediaType.toLowerCase())
    } else {
      setApiType(ele.contentType && ele.contentType.toLowerCase())
    }
  }

  const startLiveProcessingCheck = (id) => {
    if (!liveProcessingCheck) {
      const liveProcessingInterval = setInterval(function () {
        fetchHelper({
          url: CONTENT_LIVE_URL + '/' + id,
          method: 'GET',
          headers: {
            xApiKey: cookies.managementXApiKey,
            Authorization: cookies.accessToken,
          },
        }).then(function (response) {
          if (response && response.status == 200) {
            if (response.workflowStatus != "processing") {
              if (response.workflowStatus == "error") {
                setLiveWorkflowMessage(`Live ${response.workflowStatus}`)
              } else {
                setLiveWorkflowMessage('')
                setLiveWorkflowStatus(false)
                setCloudfrontProgress(true)
                setPublishDisabled(false)
                startLiveCheck(id)
                clearInterval(liveProcessingInterval)
              }
            }
          } else {
            clearInterval(liveProcessingInterval)
          }
        }).catch(function () {
          clearInterval(liveProcessingInterval)
        })
      }, 4000);
      setLiveProcessingCheck(liveProcessingInterval)
    }
  }

  const startLiveCheck = (id, action = false) => {
    if (!liveStatusCheck || action) {
      const liveCheckInterval = setInterval(function () {
        fetchHelper({
          url: CONTENT_LIVE_URL + '/' + id,
          method: 'GET',
          headers: {
            xApiKey: cookies.managementXApiKey,
            Authorization: cookies.accessToken,
          },
        }).then(function (response) {
          if (response?.status == 200) {
            var protocolType = response?.liveInfo?.mediaLive?.InputDetails?.Type
            var inputDetails = response?.liveInfo?.mediaLive?.InputDetails || null
            var inputUrl, secondaryUrl;
            if (response?.liveInfo?.mediaLive?.CloudFrontStatus == "Deployed" || response?.liveInfo?.mediaLive?.CloudFrontStatus == "Not Required") {
              if (protocolType == "HLS_PULL" || protocolType == "RTMP_PULL") {
                inputUrl = inputDetails?.PrimaryUrl || ''
                setPrimaryLiveInput(inputUrl)
              } else if (protocolType == "RTMP_PUSH" || protocolType == "RTP_PUSH") {
                inputUrl = (inputDetails?.InputsDestinations?.length > 0 && inputDetails?.InputsDestinations[0]) || ''
                setPrimaryLiveInput(inputUrl)
                if (inputDetails?.InputsDestinations?.length < 2) {
                  setShowSecondaryInput(false)
                } else {
                  secondaryUrl = inputDetails?.InputsDestinations[1]
                  setSecondaryLiveInput(secondaryUrl)
                  setShowSecondaryInput(true)
                }
              } else if (protocolType == "ZIXI_PUSH") {
                inputUrl = (inputDetails?.InputsDestinations?.length > 0 && inputDetails?.InputsDestinations[0]?.ipEndpoint) || ''
                setPrimaryLiveInput(inputUrl)
                if (inputDetails?.InputsDestinations?.length < 2) {
                  if (inputDetails?.InputsDestinations?.length > 0 && inputDetails?.InputsDestinations[0]?.streamId) {
                    secondaryUrl = inputDetails?.InputsDestinations[0]?.streamId
                    setSecondaryLiveInput(secondaryUrl)
                    setShowSecondaryInput(true)
                  } else {
                    setShowSecondaryInput(false)
                  }
                } else {
                  secondaryUrl = inputDetails?.InputsDestinations[1]?.ipEndpoint
                  setSecondaryLiveInput(secondaryUrl)
                  setShowSecondaryInput(true)
                }
              } else if (protocolType == "MEDIACONNECT_FLOW") {
                inputUrl = inputDetails?.PrimaryFlowArn
                setPrimaryLiveInput(inputUrl)
                if (inputDetails?.BackupFlowArn) {
                  secondaryUrl = inputDetails?.BackupFlowArn
                  setSecondaryLiveInput(secondaryUrl)
                  setShowSecondaryInput(true)
                } else {
                  setShowSecondaryInput(false)
                }
              }
              setShowPrimaryInput(true)
              setStartLiveStream(true)
              setCloudfrontProgress(false)
              setChannelState(response?.liveInfo?.mediaLive?.MediaLiveChannelState)
              if (response?.liveInfo?.mediaLive?.MediaLiveChannelState == "RUNNING") {
                setStartLiveStream(false)
                setStartLiveDisabled(false)
                setStopLiveStream(true)
                setStopLiveDisabled(false)
                clearInterval(liveCheckInterval)
                startMediaLiveAlerts(id)
              } else if (response?.liveInfo?.mediaLive?.MediaLiveChannelState == "STARTING") {
                setStartLiveStream(true)
                setStartLiveDisabled(true)
                setStopLiveStream(false)
                setStopLiveDisabled(false)
              } else if (response?.liveInfo?.mediaLive?.MediaLiveChannelState == "STOPPING") {
                setStartLiveStream(false)
                setStartLiveDisabled(false)
                setStopLiveStream(true)
                setStopLiveDisabled(true)
              } else if (response?.liveInfo?.mediaLive?.MediaLiveChannelState == "IDLE") {
                setStartLiveStream(true)
                setStartLiveDisabled(false)
                setStopLiveStream(false)
                setStopLiveDisabled(false)
                clearInterval(liveCheckInterval)
              } else if (response?.liveInfo?.mediaLive?.MediaLiveChannelState == "DELETED") {
                setStartLiveStream(false)
                setStartLiveDisabled(false)
                setStopLiveStream(false)
                setStopLiveDisabled(false)
                clearInterval(liveCheckInterval)
              } else if (response?.liveInfo?.mediaLive?.MediaLiveChannelState == "FAILED") {
                setStartLiveStream(false)
                setStartLiveDisabled(false)
                setStopLiveStream(false)
                setStopLiveDisabled(false)
                clearInterval(liveCheckInterval)
              }
            } else if (response?.liveInfo?.mediaLive?.MediaLiveChannelState == "DELETED") {
              setCloudfrontProgress(false)
              setChannelState('DELETED')
              clearInterval(liveCheckInterval)
            } else if (response?.liveInfo?.mediaLive?.MediaLiveChannelState == "FAILED") {
              setCloudfrontProgress(false)
              setChannelState('FAILED')
              clearInterval(liveCheckInterval)
            }
          } else {
            clearInterval(liveCheckInterval)
          }
        }).catch(function () {
          clearInterval(liveCheckInterval)
        })
      }, 4000);
      setLiveStatusCheck(liveCheckInterval)
    }
  }

  const startLiveEvent = () => {
    let invalid = validateContentPublished()
    if (invalid) return
    function validateContentPublished() {
      let autosaveFailedBox = document.getElementById('autosaveFailed')

      if (formik.values.isLiveStream && formik.values.workflowStatus !== 'publish') {
        autosaveFailedBox.innerText = 'Content not published!'
        setFailedAutosave(true)
        setTimeout(() => {
          setFailedAutosave(false)
        }, 2000)
        return true
      }
    }
    setStartLiveDisabled(true)
    setChannelState('STARTING')
    const putData = {
      action: {
        type: "StartAction",
        start: {
          autoPublish: false
        }
      }
    }
    fetchHelper({
      url: CONTENT_LIVE_URL + '/' + contentId,
      method: 'PATCH',
      data: putData,
      headers: {
        xApiKey: cookies.managementXApiKey,
        Authorization: cookies.accessToken,
      },
    }).then(function (response) {
      if (response?.status == 200) {
        startLiveCheck(response.guid, true)
      }
    })
  }

  const stopLiveEvent = () => {
    setStopLiveDisabled(true)
    setChannelState('STOPPING')
    clearInterval(mediaLiveAlertsCheck)
    setMediaLiveAlertsCheck(null)
    const putData = {
      action: {
        type: "StopAction",
        stop: {
          autoUnpublish: false,
          autoArchive: false,
          isPublish: false
        },
      }
    }
    fetchHelper({
      url: CONTENT_LIVE_URL + '/' + contentId,
      method: 'PATCH',
      data: putData,
      headers: {
        xApiKey: cookies.managementXApiKey,
        Authorization: cookies.accessToken,
      },
    }).then(function (response) {
      if (response?.status == 200) {
        startLiveCheck(response.guid, true)
      }
    })
  }

  const startMediaLiveAlerts = (id) => {
    if (!mediaLiveAlertsCheck) {
      const mediaLiveAlertsInterval = setInterval(function () {
        fetchHelper({
          url: CONTENT_LIVE_URL + '/' + id,
          method: 'GET',
          headers: {
            xApiKey: cookies.managementXApiKey,
            Authorization: cookies.accessToken,
          },
        }).then(function (response) {
          if (response?.status == 200) {
            if (response?.liveInfo?.mediaLive?.MediaLiveAlerts?.length > 0) {
              let arr = []
              for (let i = 0; i < response.liveInfo.mediaLive.MediaLiveAlerts.length; i++) {
                let itemData = response.liveInfo.mediaLive.MediaLiveAlerts[i];
                arr.push(createMediaLiveData(
                  itemData.timeUtc, itemData.state, itemData.pipeline, itemData.type, itemData.message
                ))
              }
              setMediaLiveAlerts(arr)
            }
          } else {
            clearInterval(mediaLiveAlertsInterval)
          }
        }).catch(function () {
          clearInterval(mediaLiveAlertsInterval)
        })
      }, 4000)
      setMediaLiveAlertsCheck(mediaLiveAlertsInterval)
    }
  }

  const createMediaLiveData = (timeUtc, state, pipeline, type, message) => {
    return { timeUtc, state, pipeline, type, message };
  }

  const handleFocusAutocomplete = async (e, name) => {
    if (name == 'tag' || name == 'category' ) {
      var url = CONTENT_BASE_URL + 'metadata' + '?type=' + name + '&start=0&limit=20'
    } else if (name == 'optionalTags') {
      url = CONTENT_BASE_URL + 'metadata' + '?type=tag&start=0&limit=20'
    } else if (name == 'livestreams') {
      url = CONTENT_LIVE_URL + '?offset=0&max=20'
    } else if (name == 'trailers' || name == 'relatedVideos' || name == 'promoVideos' || name == 'highlights' || name == 'previewVideo') {
      url = CONTENT_BASE_URL + 'video' + '?offset=0&max=20'
    } else if (name == 'homeTeam' || name == 'awayTeam') {
      url = CONTENT_BASE_URL + 'team' + '?offset=0&max=20'
    } else if (name == 'league') {
      url = CONTENT_BASE_URL + 'league' + '?offset=0&max=20'
    }  else if (name == 'person') {
      url = CONTENT_BASE_URL + 'person' + '?offset=0&max=20'
    }else if (name == 'licenses') {
      url = "https://api-internal.develop.monumentalsportsnetwork.com/v3/content/licenses?site=msndev"
    } else if (name == 'models') {
      if (modelOptions.length > 0) {
        return
      } else {
        var modelDetails = await getModelList()
        let modelOptions = []
        for (var i = 0; i < modelDetails?.items?.length; i++) {
          modelOptions.push({
            id: modelDetails.items[i].id,
            name: modelDetails.items[i].name,
            type: modelDetails.items[i].type
          });
        }
        setModelOptions(modelOptions)
        return
      }
    }
    const result = await fetchHelper({
      url: url,
      method: 'GET',
      headers: {
        xApiKey: cookies.managementXApiKey,
        Authorization: cookies.accessToken,
      },
    })

    if (result && result.status == 200) {
      if (name == 'licenses') {
        if (result.items && result.items.length > 0) {
          var options = {
            id: null,
            title: null,
          }
          var data = []
          for (let i = 0; i < result.items.length; i++) {
            options = {
              id: result.items[i].id,
              title: result.items[i].name,
            }
            data.push(options)
          }
          setLicenseOptions(data)
        }
      } else {
        if (result.content && result.content.length > 0) {
          var options = {
            id: null,
            title: null,
          }
          var data = []
          for (let i = 0; i < result.content.length; i++) {
            options = {
              id: result.content[i].id,
              title: result.content[i].title,
            }
            data.push(options)
          }
          if (name == 'tag') {
            setTagOptions(data)
          } else if (name == 'optionalTags') {
            setOptionalTagOptions(data)
          } else if (name == 'category') {
            setCategoryOptions(data)
          } else if (name == 'trailers') {
            setTrailerOptions(data)
          } else if (name == 'relatedVideos') {
            setRelatedVideoOptions(data)
          } else if (name == 'promoVideos') {
            setPromoVideoOptions(data)
          } else if (name == 'livestreams') {
            setLivestreamOptions(data)
          } else if (name == 'highlights') {
            setHighlightOptions(data)
          } else if (name == 'previewVideo') {
            setPreviewVideoOptions(data)
          } else if (name == 'league') {
            setLeagueOptions(data)
          } else if (name == 'homeTeam') {
            setHomeTeamOptions(data)
          } else if (name == 'awayTeam') {
            setAwayTeamOptions(data)
          } else if (name == 'person') {
            setPersonOptions(data)
          }
        }
      }
    }
  }

  const handleInputChangeAutocomplete = async (e, name) => {
    var url;
    if (name == 'tag') {
      setTagInputValue(e?.target?.value)
    } else if (name == 'category') {
      setCategoryInputValue(e?.target?.value)
    } else if (name == 'optionalTags') {
      setOptionalTagInputValue(e?.target?.value)
    } else if (name == 'trailers') {
      setTrailerInputValue(e?.target?.value)
    } else if (name == 'relatedVideos') {
      setRelatedVideosInputValue(e?.target?.value)
    } else if (name == 'promoVideos') {
      setPromoVideosInputValue(e?.target?.value)
    } else if (name == 'livestreams') {
      setLivestreamInputValue(e?.target?.value)
    } else if (name == 'highlights') {
      setHighlightInputValue(e?.target?.value)
    } else if (name == 'previewVideo') {
      setPreviewVideoInputValue(e?.target?.value)
    } else if (name == 'league') {
      setLeagueInputValue(e?.target?.value)
    } else if (name == 'homeTeam') {
      setHomeTeamInputValue(e?.target?.value)
    } else if (name == 'awayTeam') {
      setAwayTeamInputValue(e?.target?.value)
    } else if (name == 'person') {
      setPersonInputValue(e?.target?.value)
    } else {
      setPlanInputValue(e?.target?.value)
    }
    if (name !== 'plans') {
      if (e?.target?.value) {
        if (name == 'tag' || name == 'category' ) {
          url = CONTENT_BASE_URL + 'metadata' + '?type=' + name + '&start=0&limit=20' + '&keywordValue=' + e.target.value
        } else if (name == 'optionalTags') {
          url = CONTENT_BASE_URL + 'metadata' + '?type=tag&start=0&limit=20' + '&keywordValue=' + e.target.value
        } else if (name == 'trailers' || name == 'relatedVideos' || name == 'promoVideos' || name == 'highlights' || name == 'previewVideo') {
          url = CONTENT_BASE_URL + 'video' + '?offset=0&max=20&keywordValue=' + e.target.value
        } else if (name == 'livestreams') {
          url = CONTENT_LIVE_URL + '?offset=0&max=20&keywordValue=' + e.target.value
        } else if (name == 'homeTeam' || name == 'awayTeam') {
          url = CONTENT_BASE_URL + 'team' + '?offset=0&max=20&keywordValue=' + e.target.value
        } else if (name == 'league') {
          url = CONTENT_BASE_URL + 'league' + '?offset=0&max=20&keywordValue=' + e.target.value
        }
        else if (name == 'person') {
          url = CONTENT_BASE_URL + 'person' + '?offset=0&max=20&keywordValue=' + e.target.value
        }
        const result = await fetchHelper({
          url: url,
          method: 'GET',
          headers: {
            xApiKey: cookies.managementXApiKey,
            Authorization: cookies.accessToken,
          },
        })

        if (result && result.status == 200) {
          if (result.content && result.content.length > 0) {
            var options = {
              id: null,
              title: null,
            }
            let data = []
            for (let i = 0; i < result.content.length; i++) {
              options = {
                id: result.content[i].id,
                title: result.content[i].title,
              }
              data.push(options)
            }
            if (name == 'tag') {
              setTagOptions(data)
            } else if (name == 'optionalTags') {
              setOptionalTagOptions(data)
            } else if (name == 'category') {
              setCategoryOptions(data)
            } else if (name == 'trailers') {
              setTrailerOptions(data)
            } else if (name == 'relatedVideos') {
              setRelatedVideoOptions(data)
            } else if (name == 'promoVideos') {
              setPromoVideoOptions(data)
            } else if (name == 'livestreams') {
              setLivestreamOptions(data)
            } else if (name == 'highlights') {
              setHighlightOptions(data)
            } else if (name == 'previewVideo') {
              setPreviewVideoOptions(data)
            } else if (name == 'league') {
              setLeagueOptions(data)
            } else if (name == 'homeTeam') {
              setHomeTeamOptions(data)
            } else if (name == 'awayTeam') {
              setAwayTeamOptions(data)
            } else if (name == 'person') {
              setPersonOptions(data)
            }
          }
        }
      }
    } else {
      if (e?.target?.value && selectedModelTypes.length > 0) {
        let monetizationModels = selectedModelTypes.toString()
        var apiData = {
          url: "/subscription/plangroups",
          method: "GET",
          role: "Content",
          auth: {
            site: cookies.site,
            isServerToken: true
          },
          query: {
            site: cookies.site,
            migrationEnabled: true,
            monetizationModel: monetizationModels,
            offset: 0,
            limit: 10,
            searchTerm: e.target.value.split(' ').join('+'),
            includePlan: true
          },
          body: {}
        }
        let data = []
        var planList = await getPlanList(apiData)
        if (selectedModelTypes.includes('SVOD')) {
          let svodAll = {
            id: "svodAll",
            title: "All SVOD",
            type: "SVOD",
            "isPlanGroup": false
          };
          data.push(svodAll)
          setPlanOptions(data)
        }
        if (selectedModelTypes.includes('TVE')) {
          let tveAll = {
            id: "tveAll",
            title: "All TVE",
            type: "TVE",
            "isPlanGroup": false
          };
          data.push(tveAll)
          setPlanOptions(data)
        }
        if (planList && planList.length > 0) {
          for (var i = 0; i < planList.length; i++) {
            data.push({
              id: planList[i].id,
              title: planList[i].name,
              type: planList[i].monetizationModel + (planList[i].objectKey && planList[i].objectKey == "plangroup" ? '-group' : ''),
              "isPlanGroup": planList[i].objectKey && planList[i].objectKey == "plangroup",
            });
          }
          setPlanOptions(data)
        }
      }
    }
  }

  const handleAutocompleteClose = () => {
    setTagInputValue('')
    setCategoryInputValue('')
    setOptionalTagInputValue('')
    setPlanInputValue('')
    setTrailerInputValue('')
    setRelatedVideosInputValue('')
    setPromoVideosInputValue('')
    setLivestreamInputValue('')
    setHighlightInputValue('')
    setPreviewVideoInputValue('')
    setLeagueInputValue('')
    setHomeTeamInputValue('')
    setAwayTeamInputValue('')
    setPersonInputValue('')
  }

  const handleSelectChange = (key, val) => {
    var fieldName = key
    var fieldValue = val

    if (fieldName == 'mergedCategories') {
      formik.setFieldValue(key, val)
      var categoryData;
      if (apiType != 'video' && apiType != 'live') {
        if (fieldValue.length > 0) {
          var primaryCategory = fieldValue.shift()
          categoryData = {
            primaryCategory: primaryCategory,
            categories: fieldValue,
            isPublish: false,
          }
          saveData(contentId, apiType, 'categories', categoryData)
          fieldValue.unshift(primaryCategory)
        } else {
          categoryData = {
            primaryCategory: {},
            categories: [],
            isPublish: false,
          }
          saveData(contentId, apiType, 'categories', categoryData)
        }
      } else {
        categoryData = {
          categories: fieldValue,
          isPublish: false,
        }
        saveData(contentId, apiType, 'categories', categoryData)
      }
    } else if (fieldName == 'monetizationModels') {
      formik.setFieldValue(key, val)
      let modelIds = []
      let modelTypes = []
      let planIds = []
      for (var m = 0; m < val.length; m++) {
        modelIds = [...modelIds, val[m].id]
        modelTypes = [...modelTypes, val[m].type]
      }
      setSelectedModelTypes(modelTypes)
      if (formik?.values?.monetizationPlans?.length > 0) {
        let monetizationPlans = formik.values.monetizationPlans
        let filteredPlans = monetizationPlans.filter(plan => modelTypes.includes(plan.type))
        formik.setFieldValue('monetizationPlans', filteredPlans)
        for (var p = 0; p < filteredPlans.length; p++) {
          planIds = [...planIds, filteredPlans[p].id]
        }
      }
      var monetization = {
        modelIds: modelIds,
        planIds: planIds
      }
      saveData(contentId, apiType, 'monetization', monetization)
    } else if (fieldName == 'monetizationPlans') {
      formik.setFieldValue(key, val)
      let planIds = []
      for (var p = 0; p < val.length; p++) {
        planIds = [...planIds, val[p].id]
      }
      var monetization = {
        planIds: planIds
      }
      saveData(contentId, apiType, 'monetization', monetization)
    } else if (fieldName == 'relatedVideos') {
      formik.setFieldValue(key, val)
      if (apiType == 'game' || apiType == 'event') {
        saveData(contentId, apiType, 'related', fieldValue)
      } else {
        saveData(contentId, apiType, fieldName, fieldValue)
      }
    } else if (fieldName == 'previewVideo') {
      if (val.length > 1) {
        val.shift()
        formik.setFieldValue('previewVideo', val)
        saveData(contentId, apiType, 'preview', val[0])
      } else {
        formik.setFieldValue('previewVideo', val)
        if (val.length > 0) {
          saveData(contentId, apiType, 'preview', val[0])
        } else {
          saveData(contentId, apiType, 'preview', {})
        }
      }
    } else if (fieldName == 'league') {
      if (val.length > 1) {
        val.shift()
        formik.setFieldValue('league', val)
        saveData(contentId, apiType, 'league', val[0])
      } else {
        formik.setFieldValue('league', val)
        if (val.length > 0) {
          saveData(contentId, apiType, 'league', val[0])
        } else {
          saveData(contentId, apiType, 'league', {})
        }
      }
    } else if (fieldName == 'homeTeam') {
      if (val.length > 1) {
        val.shift()
        formik.setFieldValue('homeTeam', val)
        saveData(contentId, apiType, 'homeTeam', val[0])
      } else {
        formik.setFieldValue('homeTeam', val)
        if (val.length > 0) {
          saveData(contentId, apiType, 'homeTeam', val[0])
        } else {
          saveData(contentId, apiType, 'homeTeam', {})
        }
      }
    } else if (fieldName == 'awayTeam') {
      if (val.length > 1) {
        val.shift()
        formik.setFieldValue('awayTeam', val)
        saveData(contentId, apiType, 'awayTeam', val[0])
      } else {
        formik.setFieldValue('awayTeam', val)
        if (val.length > 0) {
          saveData(contentId, apiType, 'awayTeam', val[0])
        } else {
          saveData(contentId, apiType, 'awayTeam', {})
        }
      }
    } else {
      formik.setFieldValue(key, val)
      saveData(contentId, apiType, fieldName, fieldValue)
    }
  }

  const handleAsyncDateChange = (val, fieldBox) => {
    var arr = []
    if (fieldBox == 'startDateTimeBox') {
      const timezoneField = document.getElementById('timezone')
      let timezoneValue = timezoneField.value
      if (!timezoneValue) {
        timezoneValue = 'US/Eastern'
        setTimezone('US/Eastern')
      }
      const startDateTimeField = document.getElementById('startDateTime')
      const startDateTimeValue = startDateTimeField.value.split(' ')
      for (let i = 0; i < startDateTimeValue.length; i++) {
        arr.push(startDateTimeValue[i])
      }
      let scheduleStartDate = arr[0]
      scheduleStartDate = apiType == 'live' ? moment(scheduleStartDate).format('YYYY-MM-DD') : scheduleStartDate
      const scheduleStartTime = arr[1] + ' ' + arr[2]
      if (apiType == 'video') {
        const fieldValue = {
          timezone: timezoneValue,
          startDate: scheduleStartDate,
          startTime: scheduleStartTime,
        }
        saveData(contentId, apiType, 'schedule', fieldValue)
      } else {
        const fieldValue = {
          timezone: timezoneValue,
          scheduleStartDate: scheduleStartDate,
          scheduleStartTime: scheduleStartTime,
          isPublish: false,
        }
        saveData(contentId, apiType, 'startDateTime', fieldValue)
      }
    } else if (fieldBox == 'endDateTimeBox') {
      const timezoneField = document.getElementById('timezone')
      let timezoneValue = timezoneField.value
      if (!timezoneValue) {
        timezoneValue = 'US/Eastern'
        setTimezone('US/Eastern')
      }
      const endDateTimeField = document.getElementById('endDateTime')
      const endDateTimeValue = endDateTimeField.value.split(' ')
      for (let i = 0; i < endDateTimeValue.length; i++) {
        arr.push(endDateTimeValue[i])
      }
      let scheduleEndDate = arr[0]
      scheduleEndDate = apiType == 'live' ? moment(scheduleEndDate).format('YYYY-MM-DD') : scheduleEndDate
      const scheduleEndTime = arr[1] + ' ' + arr[2]
      if (apiType == 'video') {
        const fieldValue = {
          timezone: timezoneValue,
          endDate: scheduleEndDate,
          endTime: scheduleEndTime,
        }
        saveData(contentId, apiType, 'schedule', fieldValue)
      } else {
        const fieldValue = {
          timezone: timezoneValue,
          scheduleEndDate: scheduleEndDate,
          scheduleEndTime: scheduleEndTime,
          isPublish: false,
        }
        saveData(contentId, apiType, 'endDateTime', fieldValue)
      }
    } else if (fieldBox == 'airDateTimeBox') {
      const timezoneField = document.getElementById('airTimezone')
      let timezoneValue = timezoneField.value
      if (!timezoneValue) {
        timezoneValue = 'US/Eastern'
        setAirTimezone('US/Eastern')
      }
      const airDateTimeField = document.getElementById('airDateTime').value
      if (apiType == 'video') {
        const fieldValue = {
          airDateTime: airDateTimeField,
          airTimezone: timezoneValue,
        }
        saveData(contentId, apiType, 'geoRestriction', fieldValue)
      } else {
        const fieldValue = {
          airDateTime: airDateTimeField,
          airTimezone: timezoneValue,
          isPublish: false,
        }
        saveData(contentId, apiType, 'airDateTime', fieldValue)
      }
    } else if (fieldBox == 'seasonAirDateBox') {
      const timezoneField = document.getElementById('seasonAirTimezone')
      let timezoneValue = timezoneField.value
      if (!timezoneValue) {
        timezoneValue = 'US/Eastern'
        setSeasonAirTimezone('US/Eastern')
      }
      const seasonAirDateTimeField = document.getElementById('seasonAirDateTime').value
      const fieldValue = {
        seasonAirDateTime: seasonAirDateTimeField,
        seasonAirTimezone: timezoneValue
      }
      saveData(contentId, apiType, 'geoRestriction', fieldValue)
    } else if (fieldBox == 'timezone') {
      setTimezone(val)
      saveData(contentId, apiType, fieldBox, val)
    } else if (fieldBox == 'airTimezone') {
      setAirTimezone(val)
      if (apiType == 'video') {
        saveData(contentId, apiType, 'geoRestriction', { airTimezone: val })
      } else {
        saveData(contentId, apiType, fieldBox, val)
      }
    } else if (fieldBox == 'seasonAirTimezone') {
      setSeasonAirTimezone(val)
      saveData(contentId, apiType, 'geoRestriction', { seasonAirTimezone: val })
    } else if (
      fieldBox == 'defaultStartDateTimeBox' ||
      fieldBox == 'preStartDateTimeBox' ||
      fieldBox == 'liveStartDateTimeBox' ||
      fieldBox == 'postStartDateTimeBox' ||
      fieldBox == 'gameEndDateTimeBox'
    ) {
      const dateTimeValue = dayjs(val)
      const unixTimestamp = dateTimeValue.valueOf() / 1000
      const defaultStartDateTime = formik?.values?.states?.default?.startDateTime || null
      const preStartDateTime = formik?.values?.states?.pre?.startDateTime || null
      const liveStartDateTime = formik?.values?.states?.live?.startDateTime || null
      const postStartDateTime = formik?.values?.states?.post?.startDateTime || null
      const gameEndDateTime = formik?.values?.states?.end?.endDateTime || null
      const states = {
        default: {
          startDateTime: fieldBox == 'defaultStartDateTimeBox' ? unixTimestamp : defaultStartDateTime ? defaultStartDateTime : null,
        },
        pre: {
          startDateTime: fieldBox == 'preStartDateTimeBox' ? unixTimestamp : preStartDateTime ? preStartDateTime : null,
        },
        live: {
          startDateTime: fieldBox == 'liveStartDateTimeBox' ? unixTimestamp : liveStartDateTime ? liveStartDateTime : null,
        },
        post: {
          startDateTime: fieldBox == 'postStartDateTimeBox' ? unixTimestamp : postStartDateTime ? postStartDateTime : null,
        },
        end: {
          endDateTime: fieldBox == 'gameEndDateTimeBox' ? unixTimestamp : gameEndDateTime ? gameEndDateTime : null,
        },
      }
      formik.setFieldValue('states', states)
      saveData(contentId, apiType, 'states', states)
    }
  }

  const ckEditorDataSave = (data) => {
    var contentKey = ''
    var summaryDesc = null
    if (data == '') {
      data = ''
      minutes = '0'
    } else {
      /*count words*/
      var cont = data
      cont = cont.replace(/<[^>]*>/g, ' ')
      cont = cont.replace(/\s+/g, ' ')
      cont = cont.trim()
      var nWords = cont.split(' ').length
      /*caculation for readTime*/
      var words = nWords.toString().replace(/[^0-9]/g, '')
      var wpm = '130'
      var minutes = words / wpm
      minutes = Math.round(minutes * 10) / 10
      if (minutes <= 1) {
        minutes = Math.round(minutes * 10) / 10
      } else {
        minutes = Math.round(minutes * 10) / 10
      }
    }
    if (apiType.toLowerCase() == 'event') {
      contentKey = 'details'
      saveData(contentId, apiType, contentKey, data)
    } else if (apiType == 'sport' || apiType == 'game' || apiType == 'team' || apiType == 'person' || apiType == 'venue') {
      contentKey = 'body'
      saveData(contentId, apiType, contentKey, data)
    } else if (apiType.toLowerCase() == 'article') {
      var contentBodyData = {
        articleContent: data,
        readTime: minutes,
        isPublish: false,
      }
      let summaryTextBox = document.getElementById('summaryText')
      if (!summaryTextBox.value) {
        var summaryDesc = null
        const parser = new DOMParser()
        const parsedDocument = parser.parseFromString(data, 'text/html')
        var getPElement = parsedDocument.getElementsByTagName('p')
        if (getPElement && getPElement.length != 0) {
          let arr = []
          for (let i = 0; i < getPElement.length; i++) {
            arr.push(getPElement[i])
          }
          arr.every((el) => {
            let innerText = el.innerText
            if (innerText.trim() !== '' && innerText.trim() !== null) {
              summaryDesc = innerText.toString().replace(/^(.{150}[^\s]*).*/, '$1')
              summaryDesc = summaryDesc.length > 150 ? summaryDesc + '...' : summaryDesc
              return false
            }
          })
        }
        formik.setFieldValue('summaryText', summaryDesc)
        saveData(contentId, apiType, 'summaryText', summaryDesc)
      }
      saveData(contentId, apiType, 'articleBody', contentBodyData)
    }
  }

  const handleSeoKeywordsAddition = (tag) => {
    const updatedKeywords = [...seoKeywords, tag]
    handleAutosave(null, 'seoKeywordsInput', updatedKeywords)
    setSeoKeywords(updatedKeywords)
  }

  const handleDirectorAddition = (tag) => {
    const updatedDirectors = [...director, tag]
    handleAutosave(null, 'director', updatedDirectors)
    setDirector((prev) => [...prev, tag])
  }

  const handleStarringAddition = (tag) => {
    const updatedStarring = [...starring, tag]
    handleAutosave(null, 'starring', updatedStarring)
    setStarring((prev) => [...prev, tag])
  }

  const handleSeoKeywordsDeletion = (i) => {
    const updatedKeywords = seoKeywords.filter((tag, index) => index !== i)
    handleAutosave(null, 'seoKeywordsInput', updatedKeywords)
    setSeoKeywords(updatedKeywords)
  }

  const handleDirectorDeletion = (i) => {
    const updatedDirectors = director.filter((tag, index) => index !== i)
    handleAutosave(null, 'director', updatedDirectors)
    setDirector((prev) => prev.filter((tag, index) => index !== i))
  }

  const handleStarringDeletion = (i) => {
    const updatedStarring = starring.filter((tag, index) => index !== i)
    handleAutosave(null, 'starring', updatedStarring)
    setStarring((prev) => prev.filter((tag, index) => index !== i))
  }

  const openManageImageModal = (e) => {
    const openModalBox = e.currentTarget.getAttribute('id')
    if (openModalBox == 'manage_images') {
      setManageImagesModal(true)
    }
  }

  const closeManageImageModal = () => {
    setManageImagesModal(false)
    setImageListData([])
  }

  const handleImageDrop = (targetId, item) => {
    if (targetId == '_32x9Images') {
      setImgSrc32x9(item.imageSrc)
      setImgId32x9(item.imageId)
      handleImageAddition(targetId, {
        id: item.imageId,
        url: item.imageSrc,
      })
    } else if (targetId == '_16x9Images') {
      setImgSrc16x9(item.imageSrc)
      setImgId16x9(item.imageId)
      handleImageAddition(targetId, {
        id: item.imageId,
        url: item.imageSrc,
      })
    } else if (targetId == '_3x4Images') {
      setImgSrc3x4(item.imageSrc)
      setImgId3x4(item.imageId)
      handleImageAddition(targetId, {
        id: item.imageId,
        url: item.imageSrc,
      })
    } else if (targetId == '_1x1Images') {
      setImgSrc1x1(item.imageSrc)
      setImgId1x1(item.imageId)
      handleImageAddition(targetId, {
        id: item.imageId,
        url: item.imageSrc,
      })
    } else if (targetId == '_9x16Images') {
      setImgSrc9x16(item.imageSrc)
      setImgId9x16(item.imageId)
      handleImageAddition(targetId, {
        id: item.imageId,
        url: item.imageSrc,
      })
    }
  }

  const handleImageAddition = (targetId, image) => {
    setManageImageInitialize(true)
    if (targetId == '_32x9Images') {
      setImages32x9((prev) => [...prev, image])
    } else if (targetId == '_16x9Images') {
      setImages16x9((prev) => [...prev, image])
    } else if (targetId == '_3x4Images') {
      setImages3x4((prev) => [...prev, image])
    } else if (targetId == '_1x1Images') {
      setImages1x1((prev) => [...prev, image])
    } else if (targetId == '_9x16Images') {
      setImages9x16((prev) => [...prev, image])
    }
  }

  const handleImageDeletion = (e) => {
    setManageImageInitialize(true)
    let targetId = e.currentTarget.getAttribute('id')
    let imageId = e.currentTarget.getAttribute('data-imageid')
    if (targetId == 'delete32x9') {
      const updatedImages = images32x9.filter((image) => image.id !== imageId)
      setImgSrc32x9(updatedImages.length > 0 ? updatedImages[0].url : null)
      setImgId32x9(updatedImages.length > 0 ? updatedImages[0].id : null)
      setImages32x9((prev) => prev.filter((image) => image.id !== imageId))
    } else if (targetId == 'delete16x9') {
      const updatedImages = images16x9.filter((image) => image.id !== imageId)
      setImgSrc16x9(updatedImages.length > 0 ? updatedImages[0].url : null)
      setImgId16x9(updatedImages.length > 0 ? updatedImages[0].id : null)
      setImages16x9((prev) => prev.filter((image) => image.id !== imageId))
    } else if (targetId == 'delete3x4') {
      const updatedImages = images3x4.filter((image) => image.id !== imageId)
      setImgSrc3x4(updatedImages.length > 0 ? updatedImages[0].url : null)
      setImgId3x4(updatedImages.length > 0 ? updatedImages[0].id : null)
      setImages3x4((prev) => prev.filter((image) => image.id !== imageId))
    } else if (targetId == 'delete1x1') {
      const updatedImages = images1x1.filter((image) => image.id !== imageId)
      setImgSrc1x1(updatedImages.length > 0 ? updatedImages[0].url : null)
      setImgId1x1(updatedImages.length > 0 ? updatedImages[0].id : null)
      setImages1x1((prev) => prev.filter((image) => image.id !== imageId))
    } else if (targetId == 'delete9x16') {
      const updatedImages = images9x16.filter((image) => image.id !== imageId)
      setImgSrc9x16(updatedImages.length > 0 ? updatedImages[0].url : null)
      setImgId9x16(updatedImages.length > 0 ? updatedImages[0].id : null)
      setImages9x16((prev) => prev.filter((image) => image.id !== imageId))
    }
  }

  const handleImgCarousel = (e) => {
    const imageId = e.currentTarget.getAttribute('data-id')
    const imageSrc = e.currentTarget.getAttribute('data-url')
    const targetId = e.currentTarget.getAttribute('data-targetid')
    if (targetId == '32x9') {
      setImgSrc32x9(imageSrc)
      setImgId32x9(imageId)
    } else if (targetId == '16x9') {
      setImgSrc16x9(imageSrc)
      setImgId16x9(imageId)
    } else if (targetId == '3x4') {
      setImgSrc3x4(imageSrc)
      setImgId3x4(imageId)
    } else if (targetId == '1x1') {
      setImgSrc1x1(imageSrc)
      setImgId1x1(imageId)
    } else if (targetId == '9x16') {
      setImgSrc9x16(imageSrc)
      setImgId9x16(imageId)
    }
  }

  const handleVideoplaylistDeletion = (e) => {
    let videoId = e.currentTarget.getAttribute('data-videoid')
    const updatedVideoplaylist = videoplaylist.filter((video) => video.id !== videoId)
    handleAutosave(null, 'videoList', updatedVideoplaylist)
    setVideoplaylist((prev) => prev.filter((video) => video.id !== videoId))
  }

  const handleAdditionalMetadata = () => {
    const updatedAdditionalMetadata = [...additionalMetadata, { name: null, value: null }]
    setAdditionalMetadata(prev => [...prev, { name: null, value: null }])
    handleAutosave(null, 'additionalMetadata', updatedAdditionalMetadata)
  }
 
  const handleSeasonGroup = () => {
    const updateSeasonsGroup = [...seasonGroup, {  name: null,
      purchase: null,
      description: null,
      episodes:[]}]
   
    setSeasonGroup(prev => [...prev, {  name: null,
      purchase: null,
      description: null,
      episodes:[]}]);
    handleAutosave(null, 'seasons', updateSeasonsGroup)
  };

  // useEffect(() => {
  //   console.log("Updated seasonGroup:", seasonGroup);
  // }, [seasonGroup]);
  

  const handleAutosave = (e, key, value) => {
    var fieldName = e?.target?.attributes && e.target.getAttribute('name')
    var fieldValue = e?.target?.value

    if (!fieldName && !key) return

    if (
      fieldName == 'seoTitle' ||
      fieldName == 'seoRedirectUrl' ||
      fieldName == 'seoRedirectCode' ||
      fieldName == 'seoH1Title' ||
      fieldName == 'seoH2Title' ||
      fieldName == 'seoDescription' ||
      key == 'seoKeywordsInput'
    ) {
      let seoKeywordsArr = []
      let seoKeywordsValues = key == 'seoKeywordsInput' ? value : seoKeywords
      if (seoKeywordsValues && seoKeywordsValues.length > 0) {
        for (let i = 0; i < seoKeywordsValues.length; i++) {
          seoKeywordsArr.push(seoKeywordsValues[i].text)
        }
      }
      const seo = {
        title: formik.values.seoTitle != '' ? formik.values.seoTitle : null,
        keywords: seoKeywordsArr,
        redirectUrl: formik.values.seoRedirectUrl != '' ? formik.values.seoRedirectUrl : null,
        redirectCode: formik.values.seoRedirectCode != '' ? formik.values.seoRedirectCode : null,
        h1Title: formik.values.seoH1Title != '' ? formik.values.seoH1Title : null,
        h2Title: formik.values.seoH2Title != '' ? formik.values.seoH2Title : null,
        description: formik.values.seoDescription != '' ? formik.values.seoDescription : null,
      }
      saveData(contentId, apiType, 'seo', seo)
    } else if (
      fieldName == 'skipRecapStartTime' ||
      fieldName == 'skipRecapEndTime' ||
      fieldName == 'skipIntroStartTime' ||
      fieldName == 'skipIntroEndTime' ||
      fieldName == 'playNextTime' ||
      fieldName == 'clevertapPopupTime'
    ) {
      const playerTimeControl = {
        skipRecapStartTime: formik.values.skipRecapStartTime != '' ? formik.values.skipRecapStartTime : null,
        skipRecapEndTime: formik.values.skipRecapEndTime != '' ? formik.values.skipRecapEndTime : null,
        skipIntroStartTime: formik.values.skipIntroStartTime != '' ? formik.values.skipIntroStartTime : null,
        skipIntroEndTime: formik.values.skipIntroEndTime != '' ? formik.values.skipIntroEndTime : null,
        playNextTime: formik.values.playNextTime != '' ? formik.values.playNextTime : null,
        clevertapPopupTime: formik.values.clevertapPopupTime != '' ? formik.values.clevertapPopupTime : null,
      }
      saveData(contentId, apiType, 'playerTimeControl', playerTimeControl)
    } else if (
      fieldName == 'sportsRadarId' ||
      fieldName == 'sportsRadarSeasonId' ||
      fieldName == 'skipIntroStartTime'
    ) {
      const sportsRadar = {
        id: formik.values.sportsRadarId != '' ? formik.values.sportsRadarId : null,
        seasonId: formik.values.sportsRadarSeasonId != '' ? formik.values.sportsRadarSeasonId : null,
        widgetType: formik.values.sportsRadarWidgetType != '' ? formik.values.sportsRadarWidgetType : null
      }
      saveData(contentId, apiType, 'sportsRadar', sportsRadar)
    } else if (key == 'saveImages') {
      setShowImage(images16x9.length > 0 ? images16x9[0].url : null)
      let imageIds32x9 = [],
        imageIds16x9 = [],
        imageIds3x4 = [],
        imageIds1x1 = [],
        imageIds9x16 = []
      if (images32x9 && images32x9.length > 0) {
        for (let a = 0; a < images32x9.length; a++) {
          imageIds32x9.push({ id: images32x9[a].id })
        }
      }
      if (images16x9 && images16x9.length > 0) {
        for (let b = 0; b < images16x9.length; b++) {
          imageIds16x9.push({ id: images16x9[b].id })
        }
      }
      if (images3x4 && images3x4.length > 0) {
        for (let c = 0; c < images3x4.length; c++) {
          imageIds3x4.push({ id: images3x4[c].id })
        }
      }
      if (images1x1 && images1x1.length > 0) {
        for (let d = 0; d < images1x1.length; d++) {
          imageIds1x1.push({ id: images1x1[d].id })
        }
      }
      if (images9x16 && images9x16.length > 0) {
        for (let e = 0; e < images9x16.length; e++) {
          imageIds9x16.push({ id: images9x16[e].id })
        }
      }
      const images = {
        _32x9Images: imageIds32x9,
        _16x9Images: imageIds16x9,
        _3x4Images: imageIds3x4,
        _1x1Images: imageIds1x1,
        _9x16Images: imageIds9x16,
      }
      saveData(contentId, apiType, 'images', images)
    } else if (key == 'director' || key == 'starring') {
      let directorArr = [],
        starringArr = []
      let directorValues = key == 'director' ? value : director
      for (let a = 0; a < directorValues.length; a++) {
        directorArr.push({ title: directorValues[a].text })
      }
      let starringValues = key == 'starring' ? value : starring
      for (let a = 0; a < starringValues.length; a++) {
        starringArr.push({ title: starringValues[a].text })
      }
      const creditBlocks = [
        {
          containsHollywoodCelebrities: false,
          containsTVCelebrities: false,
          id: null,
          credits: directorArr,
          title: 'Director',
        },
        {
          containsHollywoodCelebrities: false,
          containsTVCelebrities: false,
          id: null,
          credits: starringArr,
          title: 'Starring',
        },
      ]
      saveData(contentId, apiType, 'creditBlocks', creditBlocks)
    } else if (key == 'additionalMetadata') {
      if (apiType == 'video' || apiType == 'live') {
        saveData(contentId, apiType, 'additionalMetadata', value)
      } else {
        saveData(contentId, apiType, 'metadata', value)
      }
    }
    else if (key == 'seasonGroup') {
      if (apiType == 'series' ) {
        saveData(contentId, apiType, 'seasonGroup', value)
      } else {
        saveData(contentId, apiType, 'seasons', value)
      }
    } 
     else if (fieldName == 'isDvrEnabled') {
      fieldValue = e.currentTarget.checked
      setIsDVR(fieldValue)
      saveData(contentId, apiType, fieldName, fieldValue)
    } else if (fieldName == 'privateEvent') {
      fieldValue = e.currentTarget.checked
      formik.setFieldValue('privateEvent', fieldValue)
      saveData(contentId, apiType, fieldName, fieldValue)
    } else if (fieldName == 'onSale') {
      fieldValue = e.currentTarget.checked
      formik.setFieldValue('onSale', fieldValue)
      saveData(contentId, apiType, fieldName, fieldValue)
    } else if (key) {
      saveData(contentId, apiType, key, value)
    } else {
      saveData(contentId, apiType, fieldName, fieldValue)
    }
  }

  const contentButtonsAction = (e) => {
    const buttonAction = e.currentTarget.getAttribute('data-label')

    let mediaType = apiType == 'game' ? 'event' : apiType
    if (mediaType == 'live') {
      var url = CONTENT_LIVE_URL + '/' + contentId
    } else {
      url = CONTENT_BASE_URL + mediaType + '/' + contentId
    }
    let APIMethod

    if (buttonAction == 'contentPublish') {
      var data = {
        action: {
          type: 'PublishAction',
          publish: {
            publish: true,
          },
        },
      }
      APIMethod = 'PATCH'
      let invalid = validatePublishUpdate()
      if (invalid) {
        return
      }
    } else if (buttonAction == 'contentUnpublish') {
      data = {
        action: {
          type: 'UnPublishAction',
          unpublish: {
            autoArchive: false,
          },
        },
      }
      APIMethod = 'PATCH'
    } else if (buttonAction == 'contentArchive') {
      data = {}
      APIMethod = 'DELETE'
    } else if (buttonAction == 'contentUnarchive') {
      data = {
        action: {
          type: 'UnArchiveAction',
          unArchive: {
            isPublish: false,
          },
        },
      }
      APIMethod = 'PATCH'
    } else if (buttonAction == 'contentUpdate') {
      data = {
        action: {
          type: 'UpdateMetadataAction',
          updateMetaData: {
            isPublish: true,
          },
        },
      }
      APIMethod = 'PATCH'
      let invalid = validatePublishUpdate()
      if (invalid) {
        return
      }
    }
    setLoading(true)

    fetchHelper({
      url: url,
      method: APIMethod,
      data: data,
      headers: {
        xApiKey: cookies.managementXApiKey,
        Authorization: cookies.accessToken,
      },
    }).then(function (result) {
      if (result && result.status == 200) {
        initializeTemplate(result)
      } else {
        setLoading(false)
        setFailedAutosave(true)
        setTimeout(() => {
          setFailedAutosave(false)
        }, 4000)
      }
    })
  }

  const validatePublishUpdate = () => {
    let autosaveFailedBox = document.getElementById('autosaveFailed')

    if (!formik.values.title) {
      autosaveFailedBox.innerText = 'Title is mandatory!'
      setFailedAutosave(true)
      setTimeout(() => {
        setFailedAutosave(false)
      }, 2000)
      return true
    } else if (!formik.values.permalink) {
      autosaveFailedBox.innerText = 'Permalink is mandatory!'
      setFailedAutosave(true)
      setTimeout(() => {
        setFailedAutosave(false)
        autosaveFailedBox.innerText = 'Autosave Failed!'
      }, 2000)
      return true
    } else if (formik.values.images) {
      if (Object.keys(formik.values.images).length > 0) {
        if (formik.values.images['_16x9Images'] && formik.values.images['_16x9Images'].length == 0) {
          autosaveFailedBox.innerText = '16x9 Image is mandatory!'
          setFailedAutosave(true)
          setTimeout(() => {
            setFailedAutosave(false)
            autosaveFailedBox.innerText = 'Autosave Failed!'
          }, 2000)
          return true
        }
      } else {
        autosaveFailedBox.innerText = '16x9 Image is mandatory!'
        setFailedAutosave(true)
        setTimeout(() => {
          setFailedAutosave(false)
          autosaveFailedBox.innerText = 'Autosave Failed!'
        }, 2000)
        return true
      }
    }
  }

  const saveData = (id, apiType, fieldName, fieldValue) => {
    if (fieldName == 'categories' || fieldName == 'startDateTime' || fieldName == 'endDateTime' || fieldName == 'airDateTime' || fieldName == 'articleBody') {
      var putData = {
        action: {
          type: 'UpdateMetadataAction',
          updateMetaData: fieldValue,
        },
      }
    } else {
      putData = {
        action: {
          type: 'UpdateMetadataAction',
          updateMetaData: {
            [fieldName]: fieldValue === '' ? null : fieldValue,
            isPublish: false,
          },
        },
      }
    }

    let mediaType = apiType == 'game' ? 'event' : apiType
    if (mediaType == 'live') {
      var APIUrl = CONTENT_LIVE_URL + '/' + id
    } else {
      APIUrl = CONTENT_BASE_URL + mediaType + '/' + id
    }
    const APIMethod = 'PATCH'

    fetchHelper({
      url: APIUrl,
      method: APIMethod,
      data: putData,
      headers: {
        xApiKey: cookies.managementXApiKey,
        Authorization: cookies.accessToken,
      },
    }).then(function (result) {
      if (result && result.status == 200) {
        if (fieldName == 'categories') {
          formik.setFieldValue('categories', result.categories)
          formik.setFieldValue('primaryCategory', result.primaryCategory)
        } else if (fieldName == 'startDateTime') {
          if (apiType == 'live') {
            formik.setFieldValue('schedule', result.schedule)
          } else {
            formik.setFieldValue('scheduleStartDate', result.scheduleStartDate)
            formik.setFieldValue('scheduleStartTime', result.scheduleStartDate)
            formik.setFieldValue('timezone', result.timezone)
          }
        } else if (fieldName == 'endDateTime') {
          if (apiType == 'live') {
            formik.setFieldValue('schedule', result.schedule)
          } else {
            formik.setFieldValue('scheduleEndDate', result.scheduleEndDate)
            formik.setFieldValue('scheduleEndTime', result.scheduleEndTime)
            formik.setFieldValue('timezone', result.timezone)
          }
        } else if (fieldName == 'timezone') {
          if (apiType == 'live') {
            formik.setFieldValue('schedule', result.schedule)
          } else {
            formik.setFieldValue('timezone', result.timezone)
          }
        } else if (fieldName == 'airDateTime' || fieldName == 'airTimezone') {
          formik.setFieldValue('geoRestriction', result.geoRestriction)
        } else if (fieldName == 'articleBody') {
          formik.setFieldValue('articleContent', result.articleContent)
          formik.setFieldValue('readTime', result.readTime)
        } else if (fieldName == 'licenses') {
          formik.setFieldValue('licenses', (result.licenses || result.geoRestriction.licenses))
        } else if (fieldName == 'league' || fieldName == 'homeTeam' || fieldName == 'awayTeam') {
          formik.setFieldValue([fieldName], [result[fieldName]])
        } else {
          formik.setFieldValue([fieldName], result[fieldName])
        }

        if (fieldName == 'title') {
          let contentTitleBox = document.getElementById('contentTitle')
          contentTitleBox.innerText = result.title
        }

        if (fieldName == 'images' && Object.keys(result.images).length != 0) {
          var count = 0
          var keys = Object.keys(result.images)
          for (var i = 0; i < keys.length; i++) {
            for (var j = 0; j < result.images[keys[i]].length; j++) {
              count++
            }
          }
          setImageCount(count)
        }

        setSucessAutosave(true)
        setFailedAutosave(false)
        setTimeout(() => {
          setSucessAutosave(false)
        }, 2000)
      } else {
        setFailedAutosave(true)
        setSucessAutosave(false)
        setTimeout(() => {
          setFailedAutosave(false)
        }, 2000)
      }
    })
  }

  const handleEpisodeDrop = (index, newEpisode) => {
    // Shallow Copy:
    // const updatedSeasonGroup = [...prev];: The spread operator (...) is used to create a shallow copy of the previous state array (prev). This ensures that the original array is not mutated directly.

    // Update Specific Index:
    // updatedSeasonGroup[index] = {...updatedSeasonGroup[index], ...};: The code creates a new object for the specified index (index) within the updatedSeasonGroup array. The spread operator is used to copy the properties of the previous state object at that index.

    // Deep Copy of Episodes Array:
    // episodes: [...updatedSeasonGroup[index].episodes, newEpisode]: The episodes array for the specified index is updated by creating a new array. The spread operator is used to copy the existing episodes, and newEpisode is added to the end of the array.

    // Return Updated State:
    // return updatedSeasonGroup;: The entire updatedSeasonGroup array, with the updated object at the specified index, is returned. This becomes the new state that is set using setSeasonGroup

    setSeasonGroup(prev => {
      const updatedSeasonGroup = [...prev];
      updatedSeasonGroup[index] = {
        ...updatedSeasonGroup[index],
        episodes: [...updatedSeasonGroup[index].episodes, newEpisode]
      };
      return updatedSeasonGroup;
    });
  };
 
  
  const handleEpisodeDeletion = (seasonIndex, episodeIndex) => {
    // Create a shallow copy of the state array
    const updatedSeasonGroup = [...seasonGroup];

    // Remove the episode at the specified index
    updatedSeasonGroup[seasonIndex]?.episodes.splice(episodeIndex, 1);

    // Update the state with the new array
    setSeasonGroup(updatedSeasonGroup);
  };

  return {
    loading,
    apiType,
    contentId,
    pageData,
    imageCount,
    formik,
    personOptions,
    tagOptions,
    categoryOptions,
    handleFocusAutocomplete,
    handleInputChangeAutocomplete,
    handleAutosave,
    successAutosave,
    setSucessAutosave,
    failedAutosave,
    setFailedAutosave,
    handleSelectChange,
    ckEditorDataSave,
    startDateTime,
    setStartDateTime,
    endDateTime,
    setEndDateTime,
    handleAsyncDateChange,
    timeZoneList,
    timezone,
    seoKeywords,
    handleSeoKeywordsAddition,
    handleSeoKeywordsDeletion,
    contentButtonsAction,
    handleImgCarousel,
    imgSrc32x9,
    imgSrc16x9,
    imgSrc3x4,
    imgSrc1x1,
    imgSrc9x16,
    imgId32x9,
    imgId16x9,
    imgId3x4,
    imgId1x1,
    imgId9x16,
    images32x9,
    images16x9,
    images3x4,
    images1x1,
    images9x16,
    handleImageDrop,
    handleImageDeletion,
    manageImagesModal,
    openManageImageModal,
    closeManageImageModal,
    imageListData,
    setImageListData,
    showImage,
    director,
    handleDirectorAddition,
    handleDirectorDeletion,
    starring,
    handleStarringAddition,
    handleStarringDeletion,
    videoplaylist,
    setVideoplaylist,
    handleVideoplaylistDeletion,
    additionalMetadata,
    seasonGroup,
    setSeasonGroup,
    setAdditionalMetadata,
    handleAdditionalMetadata,
    handleSeasonGroup,
    airDateTime,
    setAirDateTime,
    airTimezone,
    licenseOptions,
    trailerOptions,
    relatedVideoOptions,
    promoVideoOptions,
    embedCode,
    optionalTagOptions,
    seasonAirDateTime,
    setSeasonAirDateTime,
    seasonAirTimezone,
    modelOptions,
    planOptions,
    tagInputValue,
    personInputValue,
    optionalTagInputValue,
    planInputValue,
    trailerInputValue,
    relatedVideosInputValue,
    promoVideosInputValue,
    categoryInputValue,
    handleAutocompleteClose,
    cloudfrontProgress,
    startLiveStream,
    stopLiveStream,
    showChooseArchive,
    showPrimaryInput,
    showSecondaryInput,
    primaryLiveInput,
    secondaryLiveInput,
    channelState,
    isDVR,
    publishDisabled,
    liveWorkflowStatus,
    liveWorkflowMessage,
    handleEditViewClose,
    startLiveDisabled,
    stopLiveDisabled,
    showDVR,
    stopLiveEvent,
    startLiveEvent,
    mediaLiveAlerts,
    showDuplicateContent,
    thirdPartyLive,
    livestreamOptions,
    livestreamInputValue,
    highlightOptions,
    highlightInputValue,
    previewVideoOptions,
    previewVideoInputValue,
    leagueOptions,
    leagueInputValue,
    homeTeamOptions,
    homeTeamInputValue,
    awayTeamOptions,
    awayTeamInputValue,
    currentGameState,
    setCurrentGameState,
    defaultGameState,
    setDefaultGameState,
    preGameState,
    setPreGameState,
    liveGameState,
    setLiveGameState,
    postGameState,
    setPostGameState,
    endGameState,
    setEndGameState,
    showScheduleButton,
    setShowScheduleButton,
    createScheduleButton,
    setCreateScheduleButton,
    // selectRatingOtions,
    selectedRating,
    setSelectedRating,
    ratingOptions,
    handleEpisodeDrop,
    handleEpisodeDeletion
  }
}

export default useContentSettings
