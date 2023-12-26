import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { INVOKE_V2_API } from 'src/constants/urlConstants'
import fetchHelper from '../helpers/fetchHelper'
import TextField from '@mui/material/TextField'
import { useCookies } from 'react-cookie'

const useManageAcceptableOffer = ({
  offset,
  setOffset,
  addedOffers,
  setAddedOffers,
  handlePopUpChange,
}) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [cookies] = useCookies()

  const [addedOffersLocal, setAddedOffersLocal] = useState(addedOffers)

  const [inputValue, setInputValue] = useState('')

  const router = useRouter()

  useEffect(() => {
    let timer
    let searchTerm = inputValue
    if (searchTerm) {
      timer = setTimeout(() => {
        getOffers({ searchTerm })
      }, 1000)
    } else {
      getOffers({ offset })
    }

    return () => clearTimeout(timer)
  }, [inputValue])

  const getOffers = async ({ o = 0, searchTerm = false }) => {
    setLoading(true)

    const { type: offerType = 'SVOD' } = router?.query

    const url = INVOKE_V2_API
    const site = cookies.site
    let query = {}

    if (searchTerm) {
      query = {
        site: site,
        offset: o,
        limit: 10,
        offerType: offerType,
        searchTerm: searchTerm,
      }
    } else {
      query = {
        site: site,
        offset: o,
        limit: 10,
        offerType: offerType,
      }
    }

    const result = await fetchHelper({
      url: url,
      data: {
        url: 'subscription/offers',
        method: 'GET',
        role: 'Subscriptions & Offers',
        auth: {
          site: site,
          isServerToken: true,
        },
        query: query,
        body: {},
      },

      method: 'POST',
      headers: {
        Authorization: cookies.accessToken,
        xApiKey: cookies.managementXApiKey,
      },
    })
    setLoading(false)

    setData(result)
  }

  const checkExist = (id) => {
    if (!addedOffersLocal || addedOffersLocal.length === 0) {
      return false
    } else {
      let exist = false
      addedOffersLocal.forEach((item) => {
        if (item.id === id) {
          exist = true
        }
      })

      return exist
    }
  }

  const checkExistPreApplied = (id) => {
    if (!addedOffersLocal || addedOffersLocal?.length === 0) {
      return false
    } else {
      let exist = false
      addedOffersLocal.forEach((item) => {
        if (item.isDefault === true && item.id === id) {
          exist = true
        }
      })
      return exist
    }
  }

  const preAppliedFalseCondition = (id) => {
    setAddedOffersLocal((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return { ...item, isDefault: false }
        } else {
          return item
        }
      })
    })
  }

  const handleOkay = () => {
    setAddedOffers([...addedOffersLocal])
    setAddedOffersLocal([])
    handlePopUpChange()
  }

  const handleCancel = () => {
    setAddedOffers([...addedOffersLocal])
    setAddedOffersLocal([])
    handlePopUpChange()
  }

  const removeFromAddedOffer = (id) => {
    return addedOffersLocal.filter((item) => {
      if (item.id == id) {
        return false
      } else {
        return true
      }
    })
  }

  const handlePrev = () => {
    let o = offset - 10
    getOffers({ o })
    setOffset((prev) => prev - 10)
  }

  const handleNext = () => {
    let o = offset + 10
    getOffers({ o })
    setOffset((prev) => prev + 10)
  }
  const serachInput = () => {
    return (
      <TextField
        label="Please Search Any Offer"
        onChange={(e) => setInputValue(e.target.value)}
        fullWidth
        sx={{ marginBottom: '20px' }}
      />
    )
  }

  console.log(addedOffersLocal, 'local offer')

  return {
    loading,
    data,
    handlePrev,
    handleNext,
    checkExist,
    removeFromAddedOffer,
    serachInput,
    handleCancel,
    handleOkay,
    addedOffersLocal,
    setAddedOffersLocal,
    checkExistPreApplied,
    preAppliedFalseCondition,
    setData,
  }
}

export default useManageAcceptableOffer
