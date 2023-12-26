import { useState } from 'react'
import { CONTENT_BASE_URL } from 'src/constants/urlConstants'
import fetchHelper from 'src/helpers/fetchHelper'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { useAppContext } from 'src/contexts/AppContext'

const useSettingsClick = () => {
  const {
    data: { selectedContent },
  } = useAppContext()
  const [cookies] = useCookies()
  const router = useRouter()
  const [openScheduleModal, setOpenScheduleModal] = useState(false)
  const [modalData, setModalData] = useState({})

  const closeModalBox = () => {
    if (selectedContent == 'schedules') {
        setOpenScheduleModal(false)
    }
  }

  const handleSettingsClick = (e) => {
    const targetElement = e.currentTarget
    const accordionBody = targetElement.closest('.MuiAccordion-root')
    const guid = accordionBody.getAttribute('data-id')
    const apiType = accordionBody.getAttribute('data-api-type')
    if (apiType == 'schedule') {
      getModalData(guid, apiType)
    } else {
      router.push({
        pathname: `/content/[contentType]/[id]`,
        query: { contentType: apiType, id: guid },
      })
    }
  }

  const getModalData = (id, apiType) => {
    fetchHelper({
      url: CONTENT_BASE_URL + selectedContent + '/' + id,
      method: 'GET',
      headers: {
        xApiKey: cookies.managementXApiKey,
        Authorization: cookies.accessToken,
      },
    }).then(function (result) {
      if (result?.status == 200) {
        setModalData(result)
        if (apiType == 'schedule') {
            setOpenScheduleModal(true)
        }
      }
    })
  }

  return {
    modalData,
    openScheduleModal,
    closeModalBox,
    handleSettingsClick,
  }
}

export default useSettingsClick
