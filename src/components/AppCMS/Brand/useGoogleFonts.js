import { useEffect, useState } from 'react'
import fetchHelper from 'src/helpers/fetchHelper'

const useGoogleFonts = () => {
  const [fonts, setFonts] = useState()

  const getFonts = async () => {
    const { items } = await fetchHelper({
      url: 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCWVJZvKoEzot7FlLqGaXhspEimgaT5EyQ',
      method: 'GET',
    })

    setFonts(items)
  }

  useEffect(() => {
    getFonts()
  }, [])

  return {
    fonts,
  }
}

export default useGoogleFonts
