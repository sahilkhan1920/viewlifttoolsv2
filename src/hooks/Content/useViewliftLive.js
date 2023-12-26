import React from 'react'
import contentData from 'src/json/contentData.json'
import { getCookie } from 'src/helpers/queryHelpers'
import { getApiType } from 'src/helpers/contentHelper'
import { CONTENT_LIVE_URL } from 'src/constants/urlConstants'
import fetchHelper from 'src/helpers/fetchHelper'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'

const useViewliftLive = () => {
  const [cookies] = useCookies()
  const router = useRouter()
  const [lowLatency, setLowLatency] = React.useState('no')
  const [latencyChannelType, setLatencyChannelType] = React.useState('STANDARD')
  const [awsRegion, setAwsRegion] = React.useState('')
  const [awsRegionOptions, setAwsRegionOptions] = React.useState(contentData.awsRegions)
  const [liveProtocol, setLiveProtocol] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [primaryHlsUrl, setPrimaryHlsUrl] = React.useState('')
  const [primaryHlsUsername, setPrimaryHlsUsername] = React.useState('')
  const [primaryHlsPassword, setPrimaryHlsPassword] = React.useState('')
  const [secondaryHlsUrl, setSecondaryHlsUrl] = React.useState('')
  const [secondaryHlsUsername, setSecondaryHlsUsername] = React.useState('')
  const [secondaryHlsPassword, setSecondaryHlsPassword] = React.useState('')
  const [primaryStreamKeyPrefix, setPrimaryStreamKeyPrefix] = React.useState('')
  const [primaryStreamKeySuffix, setPrimaryStreamKeySuffix] = React.useState('')
  const [secondaryStreamKeyPrefix, setSecondaryStreamKeyPrefix] = React.useState('')
  const [secondaryStreamKeySuffix, setSecondaryStreamKeySuffix] = React.useState('')
  const [whitelistRtmpIps, setWhitelistRtmpIps] = React.useState('')
  const [whitelistIp, setWhitelistIp] = React.useState('')
  const [primaryFlowArn, setPrimaryFlowArn] = React.useState('')
  const [backupFlowArn, setBackupFlowArn] = React.useState('')
  const [sourceDecryptionSettings, setSourceDecryptionSettings] = React.useState('')
  const [encryptionString, setEncryptionString] = React.useState('')
  const [slateSettings, setSlateSettings] = React.useState('')
  const [blankingUrl, setBlankingUrl] = React.useState('')
  const [captionSettings, setCaptionSettings] = React.useState('')
  const [captionSelectors, setCaptionSelectors] = React.useState([
    {
      languageDescription: null,
      channelNumber: null,
    },
  ])
  const [runtimeVal, setRuntimeVal] = React.useState('')
  const [isDRM, setIsDRM] = React.useState(false)
  const [slateScheduled, setSlateScheduled] = React.useState(false)
  const [ssaiRequired, setSsaiRequired] = React.useState(false)
  const [liveToVod, setLiveToVod] = React.useState(false)
  const [ssaiAdTag, setSsaiAdTag] = React.useState('')
  const [preRollAdTag, setPreRollAdTag] = React.useState('')
  const [preRollDuration, setPreRollDuration] = React.useState('')
  const [backupEndpointRequired, setBackupEndpointRequired] = React.useState(false)
  const [isDVR, setIsDVR] = React.useState(false)
  const [startOverTime, setStartOverTime] = React.useState('')
  const [errors, setErrors] = React.useState([])

  React.useEffect(() => {
    if (lowLatency == 'yes') {
      setAwsRegionOptions(contentData.lowLatencyAwsRegions)
      setLiveProtocol('')
      setAwsRegion('')
    } else {
      setAwsRegionOptions(contentData.awsRegions)
      setLiveProtocol('')
      setAwsRegion('')
    }
    // eslint-disable-next-line
  }, [lowLatency])

  React.useEffect(() => {
    if (slateScheduled) {
      setSsaiRequired(true)
    }
    // eslint-disable-next-line
  }, [slateScheduled])

  React.useEffect(() => {
    if (!ssaiRequired) {
      setSlateScheduled(false)
    }
    // eslint-disable-next-line
  }, [ssaiRequired])

  React.useEffect(() => {
    if (liveProtocol) {
      setPrimaryHlsUrl('')
      setPrimaryHlsUsername('')
      setPrimaryHlsPassword('')
      setSecondaryHlsUrl('')
      setSecondaryHlsUsername('')
      setSecondaryHlsPassword('')
      setPrimaryStreamKeyPrefix('')
      setPrimaryStreamKeySuffix('')
      setSecondaryStreamKeyPrefix('')
      setSecondaryStreamKeySuffix('')
      setWhitelistRtmpIps('')
      setWhitelistIp('')
      setPrimaryFlowArn('')
      setBackupFlowArn('')
      setSourceDecryptionSettings('')
      setEncryptionString('')
      setSlateSettings('')
      setBlankingUrl('')
      setCaptionSettings('')
      setCaptionSelectors([
        {
          languageDescription: null,
          channelNumber: null,
        },
      ])
      setRuntimeVal('')
      setIsDRM(false)
      setSlateScheduled(false)
      setSsaiRequired(false)
      setLiveToVod(false)
      setSsaiAdTag('')
      setPreRollAdTag('')
      setPreRollDuration('')
      setBackupEndpointRequired(false)
      setIsDVR(false)
      setStartOverTime('')
    }
    // eslint-disable-next-line
  }, [liveProtocol])

  const updateFieldValue = (index, field, value) => {
    const updatedFieldValues = [...captionSelectors]
    updatedFieldValues[index][field] = value
    setCaptionSelectors(updatedFieldValues)
  }

  const handleDeleteField = (index) => {
    const updatedFieldValues = captionSelectors.filter((_, i) => i !== index)
    setCaptionSelectors(updatedFieldValues)
  }

  const createViewliftLiveStream = () => {
    setLoading(true)
    let rtmpWhitelistIps = whitelistRtmpIps
    let rtmpVerifiedIps = []
    let whitelistIpStr = whitelistIp
    let verifiedIpStr = ''
    if (rtmpWhitelistIps) {
      rtmpWhitelistIps = rtmpWhitelistIps.split(',')
      for (var i = 0; i < rtmpWhitelistIps.length; i++) {
        rtmpWhitelistIps[i] = rtmpWhitelistIps[i].trim()
        if (/^([0-9]{1,3}\.){3}[0-9]{1,3}(\/([0-9]|[1-2][0-9]|3[0-2]))?$/.test(rtmpWhitelistIps[i]) == true) {
          rtmpVerifiedIps.push(rtmpWhitelistIps[i])
        }
      }
    } else {
      rtmpWhitelistIps = []
    }
    if (whitelistIpStr) {
      whitelistIpStr = whitelistIpStr.trim()
      if (/^([0-9]{1,3}\.){3}[0-9]{1,3}(\/([0-9]|[1-2][0-9]|3[0-2]))?$/.test(whitelistIpStr) == true) {
        verifiedIpStr = whitelistIpStr
      }
    } else {
      whitelistIpStr = ''
    }

    let error = []
    if (!awsRegion) {
      error.push('An AWS Region is required')
    }

    let createLiveObject = {
      autoPublish: false,
      encodingConfiguration: {
        partner: 'AWS_ELEMENTAL',
        region: awsRegion,
        drm: {
          provider: isDRM ? 'AXINOM' : 'NONE',
        },
      },
      archivalConfiguration: {},
      inputConfiguration: {},
      generalConfiguration: {},
    }

    if (lowLatency == 'yes') {
      createLiveObject['lowLatencySettings'] = {}
      createLiveObject['lowLatencySettings'] = {
        channelType: latencyChannelType,
      }
      createLiveObject.inputConfiguration['type'] = 'RTMP_PUSH'
      createLiveObject.inputConfiguration['whiteListIps'] = ['0.0.0.0/0']
    }
    if (liveProtocol == 'HLS_PULL') {
      if (!primaryHlsUrl) {
        error.push("Primary HLS URL can't be blank")
      }
      if (!primaryHlsUrl.includes('m3u8')) {
        error.push('Invalid Primary HLS URL')
      }
      createLiveObject.inputConfiguration['type'] = 'HLS'
      createLiveObject.inputConfiguration['primaryUrl'] = primaryHlsUrl
      if (primaryHlsUsername && primaryHlsPassword) {
        createLiveObject.inputConfiguration['primaryUrlUsername'] = primaryHlsUsername
        createLiveObject.inputConfiguration['primaryUrlPassword'] = primaryHlsPassword
      }
      if (secondaryHlsUrl) {
        createLiveObject.inputConfiguration['backupUrl'] = secondaryHlsUrl
      }
      if (secondaryHlsUsername && secondaryHlsPassword) {
        createLiveObject.inputConfiguration['backupUrlUsername'] = secondaryHlsUsername
        createLiveObject.inputConfiguration['backupUrlPassword'] = secondaryHlsPassword
      }
    } else if (liveProtocol == 'RTMP_PUSH') {
      if (rtmpWhitelistIps.length > 0 && rtmpWhitelistIps.length != rtmpVerifiedIps.length) {
        error.push('The format of IPV4 is not correct')
      } else {
        rtmpWhitelistIps = ['0.0.0.0/0']
      }
      createLiveObject.inputConfiguration['type'] = liveProtocol
      createLiveObject.inputConfiguration['allowedIPs'] = rtmpWhitelistIps
      if (!primaryStreamKeyPrefix || !primaryStreamKeySuffix || !secondaryStreamKeyPrefix || !secondaryStreamKeySuffix) {
        error.push('All stream keys are required')
      }
      createLiveObject.inputConfiguration['primaryStreamNamePrefix'] = primaryStreamKeyPrefix
      createLiveObject.inputConfiguration['primaryStreamNameSuffix'] = primaryStreamKeySuffix
      createLiveObject.inputConfiguration['backupStreamNamePrefix'] = secondaryStreamKeyPrefix
      createLiveObject.inputConfiguration['backupStreamNameSuffix'] = secondaryStreamKeySuffix
    } else if (liveProtocol == 'RTP_PUSH') {
      if (rtmpWhitelistIps.length > 0 && rtmpWhitelistIps.length != rtmpVerifiedIps.length) {
        error.push('The format of IPV4 is not correct')
      } else {
        rtmpWhitelistIps = ['0.0.0.0/0']
      }
      createLiveObject.inputConfiguration['type'] = liveProtocol
      createLiveObject.inputConfiguration['allowedIPs'] = rtmpWhitelistIps
    } else if (liveProtocol == 'ZIXI_PUSH') {
      if (whitelistIpStr != '' && verifiedIpStr == '') {
        error.push('The format of IPV4 is not correct')
      } else {
        verifiedIpStr = '0.0.0.0/0'
      }
      createLiveObject.inputConfiguration['type'] = liveProtocol
      createLiveObject.inputConfiguration['allowedIPRange'] = verifiedIpStr
      if (backupEndpointRequired) {
        createLiveObject.inputConfiguration['IsBackupEntryPointRequired'] = backupEndpointRequired
      }
    } else if (liveProtocol == 'SRT_LISTENER') {
      if (whitelistIpStr != '' && verifiedIpStr == '') {
        error.push('The format of IPV4 is not correct')
      } else {
        verifiedIpStr = '0.0.0.0/0'
      }
      createLiveObject.inputConfiguration['type'] = liveProtocol
      createLiveObject.inputConfiguration['allowedIPRange'] = verifiedIpStr
    } else if (liveProtocol == 'RTMP_PULL') {
      if (!primaryHlsUrl) {
        error.push("Primary Source URL can't be blank")
      }
      createLiveObject.inputConfiguration['type'] = liveProtocol
      createLiveObject.inputConfiguration['PrimaryUrl'] = primaryHlsUrl
      if (primaryHlsUsername && primaryHlsPassword) {
        createLiveObject.inputConfiguration['PrimaryUrlUsername'] = primaryHlsUsername
        createLiveObject.inputConfiguration['PrimaryUrlPassword'] = primaryHlsPassword
      }
      if (secondaryHlsUrl) {
        createLiveObject.inputConfiguration['BackupUrl'] = secondaryHlsUrl
      }
      if (secondaryHlsUsername && secondaryHlsPassword) {
        createLiveObject.inputConfiguration['BackupUrlUsername'] = secondaryHlsUsername
        createLiveObject.inputConfiguration['BackupUrlPassword'] = secondaryHlsPassword
      }
    } else if (liveProtocol == 'MEDIACONNECT_FLOW') {
      createLiveObject.inputConfiguration['type'] = liveProtocol
      if (!primaryFlowArn) {
        error.push("Primary Flow Arn can't be blank")
      }
      createLiveObject.inputConfiguration['PrimaryEntitlementArn'] = primaryFlowArn
      if (backupFlowArn) {
        createLiveObject.inputConfiguration['BackupEntitlementArn'] = backupFlowArn
      }
    } else {
      if (lowLatency != 'yes') {
        error.push('No Protocol type selected')
      }
    }
    if (liveToVod) {
      createLiveObject.archivalConfiguration['s3'] = {}
      createLiveObject.archivalConfiguration['s3']['bucketName'] = getCookie('bucket-name')
      createLiveObject.archivalConfiguration['s3']['region'] = getCookie('bucketRegion')
    }
    if (isDVR) {
      createLiveObject.generalConfiguration['DVRConfig'] = {
        startOverTime: parseInt(startOverTime),
        isDvrEnabled: true,
      }
    }
    if (slateScheduled) {
      createLiveObject.generalConfiguration['isSlateScheduled'] = true
    }
    if (ssaiRequired) {
      if (ssaiAdTag) {
        error.push('Ad tag URL is required')
      }
      createLiveObject.generalConfiguration['playbackConfiguration'] = {}
      createLiveObject.generalConfiguration['playbackConfiguration']['adDecisionServerUrl'] = ssaiAdTag
      if (preRollAdTag || preRollDuration) {
        createLiveObject.generalConfiguration['playbackConfiguration']['livePreRollConfiguration'] = {}
      }
      if (preRollDuration) {
        createLiveObject.generalConfiguration['playbackConfiguration']['livePreRollConfiguration']['maxDurationSeconds'] = preRollDuration
      }
      if (preRollAdTag) {
        createLiveObject.generalConfiguration['playbackConfiguration']['livePreRollConfiguration']['adDecisionServerUrl'] = preRollAdTag
      }
    }
    if (liveProtocol == 'ZIXI_PUSH' || liveProtocol == 'SRT_LISTENER' || liveProtocol == 'HLS_PULL' || liveProtocol == 'RTP_PUSH') {
      if (slateSettings) {
        if (!blankingUrl) {
          error.push('Please enter blanking Url.')
        }
        createLiveObject.generalConfiguration['adAvailsetting'] = {
          availBlanking: {
            blankingImage: {},
          },
        }
        createLiveObject.generalConfiguration.adAvailsetting.availBlanking['scte35Mode'] = slateSettings
        createLiveObject.generalConfiguration.adAvailsetting.availBlanking.blankingImage['Url'] = blankingUrl
        if (backupEndpointRequired) {
          createLiveObject.generalConfiguration['IsBackupEntryPointRequired'] = backupEndpointRequired
        }
      }
    }
    if (captionSettings == 'EMBEDDED_TO_VTT') {
      for (let i = 0; i < captionSelectors.length; i++) {
        if (!captionSelectors[i].languageDescription || !captionSelectors[i].channelNumber) {
          error.push('Language and Channel Number cannot be empty.')
          break
        }
      }
      createLiveObject.generalConfiguration['captionSetting'] = {
        captionSelectors: captionSelectors,
      }
    }
    if (error.length > 0) {
      setErrors(error)
      setLoading(false)
    } else {
      fetchHelper({
        url: CONTENT_LIVE_URL,
        method: 'POST',
        data: createLiveObject,
        headers: {
          xApiKey: cookies.managementXApiKey,
          Authorization: cookies.accessToken,
        },
      })
        .then(function (result) {
          if (result && result.status == 200) {
            setLoading(false)
            const apiType = getApiType(result)
            router.push({
              pathname: `/content/[contentType]/[id]`,
              query: { contentType: apiType, id: result.guid },
            })
          } else {
            setErrors(['Live event could not be created.'])
            setLoading(false)
          }
        })
        .catch(function () {
          setErrors(['Live event could not be created.'])
          setLoading(false)
        })
    }
  }

  return {
    lowLatency,
    setLowLatency,
    latencyChannelType,
    setLatencyChannelType,
    awsRegion,
    setAwsRegion,
    awsRegionOptions,
    liveProtocol,
    setLiveProtocol,
    loading,
    primaryHlsUrl,
    setPrimaryHlsUrl,
    primaryHlsUsername,
    setPrimaryHlsUsername,
    primaryHlsPassword,
    setPrimaryHlsPassword,
    secondaryHlsUrl,
    setSecondaryHlsUrl,
    secondaryHlsUsername,
    setSecondaryHlsUsername,
    secondaryHlsPassword,
    setSecondaryHlsPassword,
    primaryStreamKeyPrefix,
    setPrimaryStreamKeyPrefix,
    primaryStreamKeySuffix,
    setPrimaryStreamKeySuffix,
    secondaryStreamKeyPrefix,
    setSecondaryStreamKeyPrefix,
    secondaryStreamKeySuffix,
    setSecondaryStreamKeySuffix,
    whitelistRtmpIps,
    setWhitelistRtmpIps,
    whitelistIp,
    setWhitelistIp,
    primaryFlowArn,
    setPrimaryFlowArn,
    backupFlowArn,
    setBackupFlowArn,
    sourceDecryptionSettings,
    setSourceDecryptionSettings,
    encryptionString,
    setEncryptionString,
    slateSettings,
    setSlateSettings,
    blankingUrl,
    setBlankingUrl,
    captionSettings,
    setCaptionSettings,
    captionSelectors,
    setCaptionSelectors,
    runtimeVal,
    setRuntimeVal,
    isDRM,
    setIsDRM,
    slateScheduled,
    setSlateScheduled,
    ssaiRequired,
    setSsaiRequired,
    liveToVod,
    setLiveToVod,
    ssaiAdTag,
    setSsaiAdTag,
    preRollAdTag,
    setPreRollAdTag,
    preRollDuration,
    setPreRollDuration,
    backupEndpointRequired,
    setBackupEndpointRequired,
    isDVR,
    setIsDVR,
    startOverTime,
    setStartOverTime,
    errors,
    updateFieldValue,
    handleDeleteField,
    createViewliftLiveStream,
  }
}

export default useViewliftLive
