import fetchHelper from 'src/helpers/fetchHelper'
import {
  GET_SERVICE_DATA,
  SAVE_DEVICES_PAGE_DATA,
  SAVE_DEVICES_PAGE_APPLETV_DATA,
  SAVE_DEVICES_PAGE_ANDROID_DATA,
  SAVE_DEVICES_PAGE_IOS_DATA,
} from 'src/constants/urlConstants'
import { useCookies } from 'react-cookie'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
// import { debounce } from 'lodash'

const useDevices = () => {
  const [cookies] = useCookies()
  const [data, setData] = useState()
  const formik = useFormik({
    initialValues: data,
    enableReinitialize: true,
    onSubmit: ({ values }) => {
      console.log(values)
    },
  })

  const saveService = async (getName, getValue) => {
    let fieldName = getName.split('.')

    if (!formik.values || !formik.dirty) return

    if ([fieldName[1]] == 'appStore') {
      var data = {
        action: {
          type: 'UpdateMetadataAction',
          updateMetaData: {
            [fieldName[1]]: {
              [fieldName[2]]: getValue,
            },
          },
        },
      }
    } else {
      var data = {
        action: {
          type: 'UpdateMetadataAction',
          updateMetaData: {
            [fieldName[2]]: getValue,
          },
        },
      }
    }

    if ([fieldName[1]].toString() === 'appStore') {
      const result = await fetchHelper({
        url: `${SAVE_DEVICES_PAGE_DATA}`,
        method: 'PUT',
        data,
        headers: {
          xapikey: cookies.managementXApiKey,
          Authorization: cookies.accessToken,
        },
      })
      console.log(result)
    }
    if ([fieldName[1]].toString() === 'appleTv') {
      const result = await fetchHelper({
        url: `${SAVE_DEVICES_PAGE_APPLETV_DATA}`,
        method: 'PUT',
        data,
        headers: {
          xapikey: cookies.managementXApiKey,
          Authorization: cookies.accessToken,
        },
      })
      console.log(result)
    }
    if ([fieldName[1]].toString() === 'android') {
      const result = await fetchHelper({
        url: `${SAVE_DEVICES_PAGE_ANDROID_DATA}`,
        method: 'PUT',
        data,
        headers: {
          xapikey: cookies.managementXApiKey,
          Authorization: cookies.accessToken,
        },
      })
      console.log(result)
    }
    if ([fieldName[1]].toString() === 'ios') {
      const result = await fetchHelper({
        url: `${SAVE_DEVICES_PAGE_IOS_DATA}`,
        method: 'PUT',
        data,
        headers: {
          xapikey: cookies.managementXApiKey,
          Authorization: cookies.accessToken,
        },
      })
      console.log(result)
    }
  }

  useEffect(() => {
    // debouncedSubmit(formik.values)
    //  saveService()
  }, [formik.values])

  const getService = async () => {
    const data = await fetchHelper({
      url: GET_SERVICE_DATA,
      method: 'GET',
      headers: {
        xapikey: cookies.managementXApiKey,
        Authorization: cookies.accessToken,
      },
    })

    setData(data)
  }

  useEffect(() => {
    getService()
  }, [])
  return { data, formik, saveService }
}

export default useDevices
