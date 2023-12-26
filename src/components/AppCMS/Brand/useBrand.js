import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { GET_SERVICE_DATA, SAVE_BRAND_DATA } from 'src/constants/urlConstants'
import fetchHelper from 'src/helpers/fetchHelper'
import { useCookies } from 'react-cookie'

const useBrand = () => {
  const [cookies] = useCookies()
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const [key, setKey] = useState(null)

  const formik = useFormik({
    initialValues: data,
    enableReinitialize: true,
    onSubmit: () => {
      console.log('Here')
    },
    onChange: (e) => {
      console.log(e)
    },
  })

  // useEffect(() => {
  //   console.log(formik?.values?.theme?.metadata?.displayDuration)
  // }, [formik.values])

  const getBrand = async () => {
    const data = await fetchHelper({
      url: GET_SERVICE_DATA,
      method: 'GET',
      headers: {
        xapikey: cookies.managementXApiKey,
        Authorization: cookies.accessToken,
      },
    })

    setData(data?.brand)
    setLoading(false)
  }

  const saveBrand = async () => {
    if (!formik.values || !key) return

    const data = {
      action: {
        type: 'UpdateMetadataAction',
        updateMetaData: {
          [key]: formik.values[key],
        },
      },
    }

    await fetchHelper({
      url: `${SAVE_BRAND_DATA}/${cookies.siteId}`,
      method: 'PUT',
      data,
      headers: {
        xapikey: cookies.managementXApiKey,
        Authorization: cookies.accessToken,
      },
    })
  }

  const handleInputChange = (event) => {
    const { name, value, checked, type } = event.target
    const inputValue = type === 'checkbox' ? checked : value
    formik.setFieldValue(name, inputValue)
    const updatedKey = name.split('.')[0]
    setKey(updatedKey)
  }

  // const saveBrand = async (fieldName) => {
  //   setTimeout(() => {
  //     console.log(formik?.values[fieldName]?.metadata?.displayDuration)
  //   }, 1000)
  //   // const data = {
  //   //   action: {
  //   //     type: 'UpdateMetadataAction',
  //   //     updateMetaData: {
  //   //       [fieldName]: formik.values[fieldName],
  //   //     },
  //   //   },
  //   // }
  //   // const result = await fetchHelper({
  //   //   url: `${SAVE_BRAND_DATA}/${cookies.siteId}`,
  //   //   method: 'PUT',
  //   //   data,
  //   //   headers: {
  //   //     xapikey: cookies.managementXApiKey,
  //   //     Authorization: cookies.accessToken,
  //   //   },
  //   // })

  //   // console.log(result)
  // }

  useEffect(() => {
    getBrand()
  }, [])

  useEffect(() => {
    saveBrand()
  }, [formik.values])

  return {
    formik,
    loading,
    handleInputChange,
  }
}

export default useBrand
