import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { INVOKE_V2_API } from 'src/constants/urlConstants'
import {
  filterAdTags,
  convertContentConsumtionObjectToArrayOfStrings,
  removedOffer,
  filterArrayOfObject,
} from 'src/helpers/createPlanOrEditPlan'
import fetchHelper from 'src/helpers/fetchHelper'

const useCreatePlanOrEditPlan = () => {
  const [loading, setLoading] = useState(false)
  const [cookies] = useCookies()
  const [planSubmitted, setPlanSubmitted] = useState(false)

  const handlePlanSubmit = async ({
    values,
    addOrEditPlan,
    type,
    scheduledFromDate,
    scheduledToDate,
  }) => {
    const monetizationModel = type || ''

    // filtering metadata because if anyobject inside  metadata array is empty this below line will filter that object
    const metadata = filterArrayOfObject(values?.metadata)

    const site = cookies.site

    const payloadForEditPlan = {
      ...values,
      metadata: metadata,
      monetizationModel,
      site,
    }

    if (monetizationModel !== 'FREE') {
      if (scheduledFromDate) {
        payloadForEditPlan['scheduledFromDate'] = scheduledFromDate
      }
      if (scheduledToDate) {
        payloadForEditPlan['scheduledToDate'] = scheduledToDate
      } else {
        payloadForEditPlan['scheduledToDate'] = null
      }
    }

    if (monetizationModel === 'TVOD' || monetizationModel === 'SVOD') {
      const featureSettingContentConsumption =
        values?.featureSetting?.contentConsumption
      const featureSettingContentConsumptionArray =
        convertContentConsumtionObjectToArrayOfStrings(
          featureSettingContentConsumption
        )
      payloadForEditPlan['featureSetting'] = {
        ...payloadForEditPlan.featureSetting,
        contentConsumption: featureSettingContentConsumptionArray,
      }
    }

    if (addOrEditPlan === 'edit' && monetizationModel === 'TVE') {
      delete payloadForEditPlan.featureSetting
    }

    // filtering adTags object for avod plans inside planDetails array , planDetails array of object have preRoll object that have addTags object and addTags object have multiple object with key url and active so if any url is empty delete that object from add tags
    if (addOrEditPlan === 'edit' && monetizationModel === 'AVOD') {
      payloadForEditPlan['planDetails'] = filterAdTags(values.planDetails)
    }

    // removing status key from payload
    if (payloadForEditPlan?.status) {
      delete payloadForEditPlan?.status
    }

    // adding removedOffer data if any offer is removed from addedOffer for svod and tvod plan
    if (
      addOrEditPlan === 'edit' &&
      (monetizationModel === 'SVOD' || monetizationModel === 'TVOD')
    ) {
      payloadForEditPlan['removedOffer'] = removedOffer(
        values.planOffers,
        values.addedOffers
      )
      delete payloadForEditPlan.planOffers
    }

    if (
      addOrEditPlan === 'edit' &&
      !(monetizationModel === 'SVOD' || monetizationModel === 'TVOD')
    ) {
      payloadForEditPlan['removedOffer'] = []
      payloadForEditPlan['addedOffers'] = []
    }

    // call api
    try {
      setLoading(true)
      const url = INVOKE_V2_API

      const site = cookies.site

      const query = {
        site: site,
        migrationEnabled: true,
      }

      const result = await fetchHelper({
        url: url,
        data: {
          url: '/subscription/plan',
          method: addOrEditPlan === 'edit' ? 'PUT' : 'POST',
          role: 'Subscriptions & Offers',
          auth: {
            site: site,
            isServerToken: true,
          },
          query: query,
          body: payloadForEditPlan,
        },

        method: 'POST',
        headers: {
          Authorization: cookies.accessToken,
          xApiKey: cookies.managementXApiKey,
        },
      })
      if (result.status == 200) {
        setPlanSubmitted(true)
      }

      setLoading(false)
      setData(result)
    } catch (e) {}
  }

  return {
    loading,
    handlePlanSubmit,
    planSubmitted,
    setPlanSubmitted,
  }
}

export default useCreatePlanOrEditPlan
