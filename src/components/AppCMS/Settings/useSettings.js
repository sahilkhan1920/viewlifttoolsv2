import fetchHelper from 'src/helpers/fetchHelper'
import { GET_SERVICE_DATA, SAVE_SERVICE_DATA } from 'src/constants/urlConstants'
import { useCookies } from 'react-cookie'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'

const useSettings = () => {
  const [cookies] = useCookies()
  const [data, setData] = useState()
  const [expanded, setExpanded] = useState(null)
  const formik = useFormik({
    initialValues: data,
    enableReinitialize: true,
    onSubmit: () => {
      console.log('Here')
    },
  })

  const saveSettings = async () => {
    if (!formik.values || !expanded || !formik.dirty) return

    const fieldName = expanded === 'otp' ? 'features' : expanded

    const data = {
      action: {
        type: 'UpdateMetadataAction',
        updateMetaData: {
          [fieldName]: formik.values[fieldName],
        },
      },
    }

    const result = await fetchHelper({
      url: `${SAVE_SERVICE_DATA}/${cookies.siteId}`,
      method: 'PUT',
      data,
      headers: {
        xapikey: cookies.managementXApiKey,
        Authorization: cookies.accessToken,
      },
    })

    console.log(result)
  }

  useEffect(() => {
    saveSettings()
  }, [formik.values])

  const handleClick = (panel) => {
    setExpanded(panel === expanded ? null : panel)
  }

  const getSettings = async () => {
    const data = await fetchHelper({
      url: GET_SERVICE_DATA,
      method: 'GET',
      headers: {
        xapikey: cookies.managementXApiKey,
        Authorization: cookies.accessToken,
      },
    })

    setData(data?.settings)
  }

  useEffect(() => {
    getSettings()
  }, [])
  return { data, formik, handleClick, expanded }
}

export default useSettings
