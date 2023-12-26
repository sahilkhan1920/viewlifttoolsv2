import { useState, useEffect } from 'react'
import { MONETIZATIONMODELS } from '../constants/urlConstants'
import fetchHelper from '../helpers/fetchHelper'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'

const useModels = () => {
  const [cookies] = useCookies()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const router = useRouter()

  const getModels = async () => {
    const url = MONETIZATIONMODELS
    const result = await fetchHelper({
      url: `${url}?site=${cookies.site}`,
      method: 'GET',
      headers: {},
    })
    setLoading(false)
    setData(result)
  }

  useEffect(() => {
    if (!router.isReady) return
    getModels()
  }, [])

  return { loading, data }
}

export default useModels
