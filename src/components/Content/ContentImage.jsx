import React from 'react'
import Image from 'next/image'
import logo from 'public/viewlift/unofficial-viewlift-logo.png'

const ContentImage = ({contentImage}) => {
  return (
    <Image src={contentImage ? contentImage : logo} width={206} height={120} alt="No Image Available" />
  )
}

export default ContentImage