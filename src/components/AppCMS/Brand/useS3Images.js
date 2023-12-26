import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import fetchHelper from 'src/helpers/fetchHelper'
import { GET_S3_IMAGES } from 'src/constants/urlConstants'

const useS3Images = () => {
  const [images, setImages] = useState([])
  const [cookies] = useCookies()

  const getImages = async () => {
    const data = await fetchHelper({
      url: GET_S3_IMAGES,
      method: 'GET',
      headers: {
        xApiKey: cookies.managementXApiKey,
        Authorization: cookies.accessToken,
      },
    })
    const withName = data?.map((item) => ({
      ...item,
      name: item?.Key?.split('/').pop(),
      imageURI: `${cookies.templateBuilderURL}/${item.Key}`,
    }))
    setImages(withName)
  }

  useEffect(() => {
    getImages()
  }, [])

  return {
    images,
  }
}

export default useS3Images
