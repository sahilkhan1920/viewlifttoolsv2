import fetchHelper from 'src/helpers/fetchHelper'
import {
  GET_DEVICES_DATA,
  SAVE_ADD_DEVICES_DATA,
} from 'src/constants/urlConstants'
import { useCookies } from 'react-cookie'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
// import { debounce } from 'lodash'

const useAddDevices = () => {
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

    
  // if (!formik.values || !formik.dirty) return

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
    const result = await fetchHelper({
      url: `${SAVE_ADD_DEVICES_DATA}/${cookies.siteId}`,
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
    // debouncedSubmit(formik.values)
    // saveService();
  }, [formik.values])

  const getService = async () => {
    const data = await fetchHelper({
      url: GET_DEVICES_DATA,
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

export default useAddDevices
