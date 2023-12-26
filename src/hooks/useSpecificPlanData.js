import { useState } from 'react'
import { INVOKE_V2_API } from 'src/constants/urlConstants'
import fetchHelper from 'src/helpers/fetchHelper'
import { useCookies } from 'react-cookie'

const useSpecificPlanData = () => {
  const [loading, setloading] = useState(false)
  const [data, setData] = useState(null)
  const [cookies] = useCookies()

  const getSpecificPlanData = async ({ id }) => {
    setloading(true)
    const url = INVOKE_V2_API

    const site = cookies.site

    const query = {
      site: site,
      migrationEnabled: true,
    }

    const result = await fetchHelper({
      url: url,
      data: {
        url: '/subscription/plan/' + id,
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

    setloading(false)

    setData(result)

    setData(result)
  }

  return { loading, data, getSpecificPlanData }
}

export default useSpecificPlanData
