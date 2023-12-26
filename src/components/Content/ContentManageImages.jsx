import { Box, Button } from '@mui/material'
import React from 'react'
import ManageImagesModal from './Modals/ManageImagesModal'

const ContentManageImages = ({
  imageCount, openCreateModal, closeCreateModal, manageImagesModal, handleImgCarousel, 
  imgSrc32x9, imgSrc16x9, imgSrc3x4, imgSrc1x1, imgSrc9x16, imgId32x9, imgId16x9, imgId3x4, imgId1x1, imgId9x16, 
  handleImageDrop, handleImageDeletion, imageListData, setImageListData, images32x9, images16x9, images3x4, images1x1, images9x16,
}) => {
  return (
    <Box sx={{marginTop: "5px"}}>
      Images
      <Box
        sx={{
         background: "#fff",
         border: "1px solid #ccc",
         borderRadius: "3px",
         height: "45px",
         textAlign: "center",
         padding: "5px 10px"
        }}
      >
        <Box 
          component="span"
          sx={{
            fontSize: "14px",
            fontWeight: 400,
            marginRight: "3px"
          }}
        >
          {imageCount} image(s)
        </Box>
        <Box
         sx={{
          padding: "3px",
          display: "inline-block",
          width: "250px",
          border: "1px solid #ddd",
          borderRadius: "3px",
          cursor: "pointer",
          textAlign: "center",
          lineHeight: 1,
          fontSize: "14px"
         }}
        >
          <Button id="manage_images" sx={{padding: "0px", color: "inherit"}} onClick={openCreateModal}>MANAGE IMAGES</Button>
        </Box>
      </Box>
      <ManageImagesModal 
        manageImagesModal={manageImagesModal} closeCreateModal={closeCreateModal} handleImgCarousel={handleImgCarousel}
        imgSrc32x9={imgSrc32x9} imgSrc16x9={imgSrc16x9} imgSrc3x4={imgSrc3x4} imgSrc1x1={imgSrc1x1} imgSrc9x16={imgSrc9x16} 
        imgId32x9={imgId32x9} imgId16x9={imgId16x9} imgId3x4={imgId3x4} imgId1x1={imgId1x1} imgId9x16={imgId9x16} 
        images32x9={images32x9} images16x9={images16x9} images3x4={images3x4} images1x1={images1x1} images9x16={images9x16}
        handleImageDrop={handleImageDrop} handleImageDeletion={handleImageDeletion} imageListData={imageListData} setImageListData={setImageListData}
      />
    </Box>
  )
}

export default ContentManageImages