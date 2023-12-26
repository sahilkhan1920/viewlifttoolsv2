const filterArrayOfObject = (data) => {
  return data.filter((obj) => {
    return Object.values(obj).every((val) => {
      return val !== '' && val !== null && val !== undefined
    })
  })
}

const removedOffer = (oldOffer = [], newOffer = []) => {
  const ro = oldOffer.filter(
    (offer) => !newOffer.find((o) => o.id === offer.offerId)
  )
  return ro
}

const convertContentConsumtionObjectToArrayOfStrings = (contentConsumption) => {
  const c = []
  Object.keys(contentConsumption).forEach((i) => {
    if (
      contentConsumption[i] !== '' &&
      contentConsumption[i] !== undefined &&
      contentConsumption[i] != false
    ) {
      c.push(i)
    }
  })
  return c
}

const filterAdTags = (planDetails) => {
  const filteredPlanDetailsForAddTags = planDetails.map((i) => {
    const adTags = i.preRoll?.adTags

    const filteredAdTags = Object.keys(adTags).reduce((obj, platform) => {
      if (adTags[platform].url !== '' && adTags[platform].url !== undefined) {
        obj[platform] = adTags[platform]
      }
      return obj
    }, {})

    const freshPreRol = { ...i.preRoll, adTags: { ...filteredAdTags } }

    if (Object.keys(freshPreRol.adTags).length === 0) {
      delete freshPreRol.adTags
    }

    return { ...i, preRoll: freshPreRol }
  })

  return filteredPlanDetailsForAddTags
}

export {
  filterAdTags,
  convertContentConsumtionObjectToArrayOfStrings,
  removedOffer,
  filterArrayOfObject,
}
