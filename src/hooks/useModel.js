import { useState, useEffect } from 'react'
import { ADD_MODELS } from '../constants/urlConstants'
import fetchHelper from '../helpers/fetchHelper'

const useModel = ({
  editItemId,
  modelInfoDynamic,
  setShowAddModel,
  setModelInfoDynamic,
}) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({ item: {}, status: null })

  useEffect(() => {
    document.body.scrollTop = 0 // For Safari
    document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
    document.body.style.overflow = 'hidden'

    if (data.status == 200) {
      if (editItemId && data.item === 'delete') {
        const modelDataWithoutDeletedObject = modelInfoDynamic.filter(
          (item) => item.id !== editItemId
        )
        setModelInfoDynamic([...modelDataWithoutDeletedObject])
      } else if (editItemId) {
        const modelDataWithEditedModelObject = modelInfoDynamic.map((item) => {
          if (item.id == editItemId) {
            return data.item
          } else {
            return item
          }
        })
        setModelInfoDynamic(modelDataWithEditedModelObject)
      } else {
        setModelInfoDynamic([...modelInfoDynamic, data.item])
      }
      setShowAddModel(false)
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [data])

  const addModels = async ({ reqType, queryData, editItemId }) => {
    setLoading(true)
    const site = localStorage.getItem('content-view.current-siteid')

    const url = ADD_MODELS
    const queryParams = queryData
    const finalUrl = editItemId
      ? url + '/' + editItemId + `?site=${site.replace('/', '')}`
      : url + `?site=${site.replace('/', '')}`
    const result = await fetchHelper({
      url: finalUrl,
      method: reqType,
      headers: {},
      data: queryParams,
    })
    setLoading(false)
    setData({
      item: result?.Attributes ? result.Attributes : result.Item,
      status: result.status,
    })
  }

  const handleDelete = async (id, reqType) => {
    setLoading(true)
    const site = localStorage.getItem('content-view.current-siteid')

    const url = ADD_MODELS
    const finalUrl = url + '/' + id + `?site=${site?.replace('/', '')}`
    const result = await fetchHelper({
      url: finalUrl,
      method: reqType,
      headers: {},
    })
    setLoading(false)
    setData({
      item: 'delete',
      status: result.status,
    })
  }

  const handleAdd = (val, editItemId = '') => {
    const site = localStorage.getItem('content-view.current-siteid')
    const query = {
      contentTypes: {
        videos: true,
        audio: false,
        articles: false,
        editorial: false,
        episodic: false,
      },
      name: val.name,
      type: val.type,
      currency: 'usd',
      default: val.default === true ? 'yes' : 'no',
    }
    addModels({
      reqType: editItemId ? 'PUT' : 'POST',
      queryData: editItemId
        ? { ...query, active: true }
        : { ...query, site: site?.replace('/', '') },
      editItemId,
    })
  }

  return {
    loading,
    data,
    handleDelete,
    handleAdd,
  }
}

export default useModel
