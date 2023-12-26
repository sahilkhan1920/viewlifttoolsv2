import moment from 'moment'

export const getApiType = (ele) => {
  var apiType = 'video'
  if (ele.videoType && !ele.isLiveStream) {
    apiType = 'video'
  } else if (ele.videoType && ele.isLiveStream) {
    apiType = 'live'
  } else if (ele.contentType && ele.contentType.toLowerCase() == 'videoplaylist') {
    apiType = 'videoplaylist'
  } else if ((ele.mediaType && ele.mediaType.toLowerCase() == 'tag') || (ele.mediaType && ele.mediaType.toLowerCase() == 'category')) {
    apiType = 'metadata'
  } else if (
    (ele.mediaType && ele.mediaType.toLowerCase() == 'coach') ||
    (ele.mediaType && ele.mediaType.toLowerCase() == 'professor') ||
    (ele.mediaType && ele.mediaType.toLowerCase() == 'actor') ||
    (ele.mediaType && ele.mediaType.toLowerCase() == 'instructor') ||
    (ele.mediaType && ele.mediaType.toLowerCase() == 'player')
  ) {
    apiType = 'person'
  } else if (
    (ele.mediaType && ele.mediaType.toLowerCase() == 'pdf') ||
    (ele.mediaType && ele.mediaType.toLowerCase() == 'msword') ||
    (ele.mediaType && ele.mediaType.toLowerCase() == 'docx')
  ) {
    apiType = 'document'
  } else if (ele.mediaType) {
    apiType = ele.mediaType && ele.mediaType.toLowerCase()
  } else {
    apiType = ele.contentType && ele.contentType.toLowerCase()
  }
  return apiType
}

export const getTagName = (ele) => {
  var tagName = 'video'
  if (ele.contentType && ele.contentType.toLowerCase() == 'videoplaylist') {
    tagName = 'videoplaylist'
  } else if (ele.videoType && ele.isLiveStream) {
    if (ele.drm && ele.drm.enabled) {
      tagName = 'live - drm'
    } else {
      tagName = 'live'
    }
  } else if (ele.videoType) {
    if (ele.drm && ele.drm.enabled) {
      tagName = 'video - drm'
    } else {
      tagName = ele.mediaType || ele.videoType
    }
  } else if (ele.mediaType) {
    tagName = ele.mediaType
  } else {
    tagName = ele.contentType
  }
  return tagName
}

export const formatTileData = (item) => {
  return item
}

export const formatDate = (val) => {
  if (!val) return
  return moment(val, 'YYYYMMDD').format('MM/DD/YYYY')
}
