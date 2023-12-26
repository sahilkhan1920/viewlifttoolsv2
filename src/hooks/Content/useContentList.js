import { useEffect, useState } from 'react'
import fetchHelper from 'src/helpers/fetchHelper'
import { useCookies } from 'react-cookie'
import { CONTENT_BASE_URL, CONTENT_LIVE_URL } from 'src/constants/urlConstants'
import { useAppContext } from 'src/contexts/AppContext'
import contentData from 'src/json/contentData'

const useContentList = () => {
  const {
    data: { selectedContent },
  } = useAppContext()

  const [selected, setSelected] = useState([])

  const {
    data: { contentSearchKeyword: keywordValue },
    updateData
  } = useAppContext()
  const [cookies] = useCookies()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)
  const [contentFilterStatus, setContentFilterStatus] = useState('lastUpdated')

  const { filterStatus: filterStatusMap, tabs } = contentData

  const handleContentFilterStatus = (e) => {
    setContentFilterStatus(e.target.value)
  }

  const handlePageChange = (e, value) => {
    setPage(value)
  }

  const handleSelectAll = (status) => {
    if (status) {
      setSelected(data.map(({ id }) => id))
      return
    }
    setSelected([])
  }

  const handleContentSelect = (val) => {
    const filtered = data.filter((item) => {
      if (val === 'all') {
        return true
      }
      if (val === 'none') {
        return false
      }
      if (val === 'archived') {
        return item.archivedDate
      }
      return item.contentStatus === val
    })
    setSelected(filtered.map((item) => item.id))
  }

  const handleSelect = (id) => {
    const values = [...selected]
    const index = values.indexOf(id)

    if (index !== -1 && values.length) {
      // If the id exists in the array, remove it
      values.splice(index, 1)
    } else {
      // If the id doesn't exist, add it to the array
      values.push(id)
    }
    setSelected(values)
  }

  // console.log('selected ==>', selected)

  useEffect(() => {
    let timer
    if (keywordValue != '') {
      timer = setTimeout(() => {
        getListData()
        setLoading(true)
      }, 1000)
    } else {
      getListData()
      setLoading(true)
    }
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, keywordValue, contentFilterStatus])

  const getListData = async () => {
    const selectedTab = tabs.find((item) => item.key === selectedContent)
    // console.log(selectedTab)
    const items = selectedTab.items || [selectedTab.key]
    console.log(items)
    const { order, orderBy } = filterStatusMap.find(
      (item) => item.key === contentFilterStatus
    )

    var queryParams = {
      offset: (page - 1) * 20,
      max: 20,
      orderBy,
      order,
      keywordValue: keywordValue,
    }
    const promises = items.map(async (item) => {
      try {
        var url;
        if(item == "live"){
          url = `${CONTENT_LIVE_URL}?offset=${queryParams.offset}&max=${queryParams.max}&orderBy=${queryParams.orderBy}&order=${queryParams.order}&keywordValue=${queryParams.keywordValue}`
        } else {
          url = `${CONTENT_BASE_URL}${item}?offset=${queryParams.offset}&max=${queryParams.max}&orderBy=${queryParams.orderBy}&order=${queryParams.order}&keywordValue=${queryParams.keywordValue}`
        }
        const response = await fetchHelper({
          url: url,
          method: 'GET',
          headers: {
            xApiKey: cookies.managementXApiKey,
            Authorization: cookies.accessToken,
          },
        })
        return response
      } catch (error) {
        console.error('Error fetching data:', error)
        throw error // Rethrow the error to propagate it
      }
    })
    const result = await Promise.all(promises)
    if (result.some((item) => !item?.content)) {
      setLoading(false)
      setData([])
      setCount(0)
      return
    }
    const all = result.reduce(
      (acc, item) => {
        acc.count += item.count
        acc.items = [...acc.items, ...item.content]
        return acc
      },
      { count: 0, items: [] }
    )

    setData(all.items)
    setCount(all.count)
    updateData({
      listData: all.items
    })
    setLoading(false)
  }

  return {
    loading,
    data,
    count,
    page,
    handlePageChange,
    contentFilterStatus,
    handleContentFilterStatus,
    handleSelectAll,
    handleSelect,
    selected,
    handleContentSelect,
  }
}

export default useContentList
