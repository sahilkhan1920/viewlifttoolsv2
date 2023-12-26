import fetchHelper from 'src/helpers/fetchHelper'
import { GET_SERVICE_PAGE_DATA, SAVE_SERVICE_PAGE_DATA } from 'src/constants/urlConstants'
import { useCookies } from 'react-cookie'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
// import { debounce } from 'lodash'


const useService = () => {
  const [cookies] = useCookies()
  const [data, setData] = useState()
  const [getCurrentKey, setCurrentKey] = useState(null)
  const formik = useFormik({
    initialValues: data,
    enableReinitialize: true,
    onSubmit: ({ values }) => {
      console.log(values)
    },
  })

  const getDifferences = (obj1, obj2, path = '') => {
    let differences = {};

    for (let key in obj1) {
      if (obj1.hasOwnProperty(key)) {
        const newPath = path ? `${path}.${key}` : key;

        if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
          const nestedDifferences = getDifferences(obj1[key], obj2[key], newPath);
          if (Object.keys(nestedDifferences).length > 0) {
            differences = { ...differences, ...nestedDifferences };
          }
        } else if (obj1[key] !== obj2[key]) {
          differences[newPath] = obj2[key];
        }
      }
    }

    return differences;
  };

  const differences = getDifferences(formik.initialValues, formik.values);

  let getUnikeName = Object.keys(differences);
  const finalKeyName = getUnikeName[0]?.split('.').pop();

  const saveService = async () => {
    if (!formik.values || !formik.dirty) return

    const fieldName = getCurrentKey == "serviceTypes" ? getCurrentKey : finalKeyName


    const data = {
      action: {
        type: 'UpdateMetadataAction',
        updateMetaData: {
          [fieldName]: formik.values[fieldName],
        },
      },
    }
    const result = await fetchHelper({
      url: `${SAVE_SERVICE_PAGE_DATA}/${cookies.siteId}`,
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
    saveService()
  }, [formik.values])

  const getKeyName = (keyName) => {
    setCurrentKey(keyName)
  }

  const getService = async () => {
    const data = await fetchHelper({
      url: GET_SERVICE_PAGE_DATA,
      method: 'GET',
      headers: {
        xapikey: cookies.managementXApiKey,
        Authorization: cookies.accessToken,
      },
    })

    setData(data?.service)
  }

  useEffect(() => {
    getService()
  }, [])
  return { data, formik, getKeyName, getCurrentKey }
}

export default useService
