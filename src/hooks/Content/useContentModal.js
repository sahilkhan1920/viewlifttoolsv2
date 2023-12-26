import { useState } from 'react'
import { CONTENT_BASE_URL } from 'src/constants/urlConstants'
import fetchHelper from 'src/helpers/fetchHelper'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { useAppContext } from 'src/contexts/AppContext'
import { getApiType } from 'src/helpers/contentHelper' 

const useContentModal = () => {
  const [cookies] = useCookies()
  const {
    data: { selectedContent },
  } = useAppContext()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [thirdPartyLiveModal, setThirdPartyLiveModal] = useState(false)
  const [selfServiceLiveModal, setSelfServiceLiveModal] = useState(false)
  const [scheduleModal, setScheduleModal] = useState(false)

  const openModal = () => {
    if (selectedContent == 'schedules') {
      setScheduleModal(true)
    } else {
      setOpen(true)
    }
  }

  const closeModal = () => {
    if (selectedContent == 'schedules') {
      setScheduleModal(false)
    } else {
      setOpen(false)
    }
  }

  const handleLiveEventModal = (e) => {
    let liveStreamRequest = e.currentTarget.getAttribute('id')
    if (liveStreamRequest == 'thirdPartyLive') {
      setThirdPartyLiveModal(true)
      setOpen(false)
    } else {
      setSelfServiceLiveModal(true)
      setOpen(false)
    }
  }

  const closeLiveEventModal = () => {
    setThirdPartyLiveModal(false)
    setSelfServiceLiveModal(false)
  }

  const createContent = (buttonAction) => {
    let postData;
    if (buttonAction == 'addGame') {
      postData = {
        contentType: 'game',
        title: 'New Game'
      }
    } else if (buttonAction == 'addEvent') {
      postData = {
        contentType: 'event',
        title: 'New Event'
      }
    } else {
      postData = {
        title: `New ${selectedContent}`,
      }
    }
    fetchHelper({
      url: `${CONTENT_BASE_URL}${selectedContent}`,
      method: 'POST',
      data: postData,
      headers: {
        xApiKey: cookies.managementXApiKey,
        Authorization: cookies.accessToken,
      },
    }).then(function (result) {
      if (result && result.status == 200) {
        const apiType = getApiType(result)
        router.push({
          pathname: `/content/[contentType]/[id]`,
          query: { contentType: apiType, id: result.guid },
        })
      }
    })
  }

  return {
    open,
    openModal,
    createContent,
    thirdPartyLiveModal,
    selfServiceLiveModal,
    handleLiveEventModal,
    closeLiveEventModal,
    closeModal,
    scheduleModal
  }
}

export default useContentModal
