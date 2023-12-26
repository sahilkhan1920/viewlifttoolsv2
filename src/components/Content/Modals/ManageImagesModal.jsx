import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import {
  CONTENT_BASE_URL
} from 'src/constants/urlConstants'
import fetchHelper from 'src/helpers/fetchHelper'
import { useCookies } from 'react-cookie'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ContentLoader from '../ContentLoader';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ImageItem from '../DraggableImage';
import DropTarget32x9 from '../DropTarget32x9';
import DropTarget16x9 from '../DropTarget16x9';
import DropTarget3x4 from '../DropTarget3x4';
import DropTarget1x1 from '../DropTarget1x1';
import DropTarget9x16 from '../DropTarget9x16';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minwidth: 500,
  minheight: 300,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  borderRadius: '5px',
  textAlign: 'center'
};

export default function ManageImagesModal({manageImagesModal, closeCreateModal, handleImgCarousel, imgSrc32x9, imgSrc16x9, imgSrc3x4, imgSrc1x1, imgSrc9x16, imgId32x9, 
    imgId16x9, imgId3x4, imgId1x1, imgId9x16, handleImageDrop, handleImageDeletion, imageListData, setImageListData, images32x9, images16x9, images3x4, images1x1, images9x16
}) {
    const [cookies] = useCookies();
    const [loading, setLoading] = React.useState(false);

    const onImageSearch = async(e) => {
        const result = await fetchHelper({
            url: CONTENT_BASE_URL + 'image' + '?offset=' + 0 + '&max=20&orderBy=lastUpdated&order=DESC&keywordValue=' + e.target.value,
            method: "GET",
            headers: {
              xApiKey: cookies.managementXApiKey,
              Authorization:  cookies.accessToken,
            },
        })
        if(result && result.status == 200){
            setImageListData(result.content)
            setLoading(false)
        }
    }    

  return (
    <DndProvider backend={HTML5Backend}>
        <div>
          <Modal
            open={manageImagesModal}
            onClose={closeCreateModal}
            aria-labelledby="images-modal-title"
            aria-describedby="images-modal-description"
          >
            <Box sx={style}>
                <Typography id="manageImages-modal-title" variant="h6" component="h2" sx={{fontSize: '28px'}}>
                  Manage Images
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'start',
                        justifyContent: 'center',
                        gap: '20px',
                        marginTop: '30px',
                        minWidth: 500,
                        height: 450,
                    }}
                > 
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Box
                            sx={{
                                marginBottom: "30px",
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column"
                            }}
                        >
                            <Typography id='32x9' component="label" sx={{fontSize: '12px'}}>
                                32:9 OTT DL
                            </Typography>
                            <Box
                                sx={{
                                    width: 608,
                                    height: 171,
                                    border: '1px dashed #ccc',
                                }}
                            >   
                                <DropTarget32x9 targetId="_32x9Images" imgSrc32x9={imgSrc32x9} imgId32x9={imgId32x9} handleImageDrop={handleImageDrop} handleImageDeletion={handleImageDeletion} />
                            </Box>
                            <Box
                                sx={{
                                    width: 608,
                                    height: 10,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    flexWrap: 'wrap',
                                    gap: '5px',
                                    overflow: 'auto',
                                    marginTop: '7.5px'
                                }}
                            >
                                {images32x9.map((image,index) => (
                                    <div
                                        style={{
                                          width: 5,
                                          height: 5,
                                          borderRadius: '50%',
                                          backgroundColor: 'black',
                                          cursor: 'pointer'
                                        }}
                                        key={index}
                                        data-id={image.id}
                                        data-url={image.url}
                                        data-targetid="32x9"
                                        onClick={handleImgCarousel}
                                    >
                                    </div>
                                ))}
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "20px"
                            }}
                        >
                            <Box
                             sx={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column"
                             }}
                            >
                                <Typography id='16x9' component="label" sx={{fontSize: "12px"}}>
                                    16:9 Landscape
                                </Typography>
                                <Box
                                    sx={{
                                        width: 238,
                                        height: 134,
                                        border: '1px dashed #ccc',
                                    }}
                                >
                                    <DropTarget16x9 targetId="_16x9Images" imgSrc16x9={imgSrc16x9} imgId16x9={imgId16x9} handleImageDrop={handleImageDrop} handleImageDeletion={handleImageDeletion} />
                                </Box>
                                <Box
                                    sx={{
                                        width: 238,
                                        height: 10,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        flexWrap: 'wrap',
                                        gap: '5px',
                                        overflow: 'auto',
                                        marginTop: '7.5px'
                                    }}
                                >
                                    {images16x9.map((image,index) => (
                                        <div
                                            style={{
                                              width: 5,
                                              height: 5,
                                              borderRadius: '50%',
                                              backgroundColor: 'black',
                                              cursor: 'pointer'
                                            }}
                                            key={index}
                                            data-id={image.id}
                                            data-url={image.url}
                                            data-targetid="16x9"
                                            onClick={handleImgCarousel}
                                        >
                                        </div>
                                    ))}
                                </Box>
                            </Box>
                            <Box
                             sx={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column"
                             }}
                            >
                                <Typography id='16x9' component="label" sx={{fontSize: "12px"}}>
                                    3:4 Poster
                                </Typography>
                                <Box
                                    sx={{
                                        width: 100,
                                        height: 134,
                                        border: '1px dashed #ccc',
                                    }}
                                >
                                    <DropTarget3x4 targetId="_3x4Images" imgSrc3x4={imgSrc3x4} imgId3x4={imgId3x4} handleImageDrop={handleImageDrop} handleImageDeletion={handleImageDeletion} />
                                </Box>
                                <Box
                                    sx={{
                                        width: 100,
                                        height: 10,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        flexWrap: 'wrap',
                                        gap: '5px',
                                        overflow: 'auto',
                                        marginTop: '7.5px'
                                    }}
                                >
                                    {images3x4.map((image,index) => (
                                        <div
                                            style={{
                                              width: 5,
                                              height: 5,
                                              borderRadius: '50%',
                                              backgroundColor: 'black',
                                              cursor: 'pointer'
                                            }}
                                            key={index}
                                            data-id={image.id}
                                            data-url={image.url}
                                            data-targetid="3x4"
                                            onClick={handleImgCarousel}
                                        >
                                        </div>
                                    ))}
                                </Box>
                            </Box>
                            <Box
                             sx={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column"
                             }}
                            >
                                <Typography id='16x9' component="label" sx={{fontSize: "12px"}}>
                                    1:1 Square
                                </Typography>
                                <Box
                                    sx={{
                                        width: 134,
                                        height: 134,
                                        border: '1px dashed #ccc',
                                    }}
                                >
                                    <DropTarget1x1 targetId="_1x1Images" imgSrc1x1={imgSrc1x1} imgId1x1={imgId1x1} handleImageDrop={handleImageDrop} handleImageDeletion={handleImageDeletion} />
                                </Box>
                                <Box
                                    sx={{
                                        width: 134,
                                        height: 10,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        flexWrap: 'wrap',
                                        gap: '5px',
                                        overflow: 'auto',
                                        marginTop: '7.5px'
                                    }}
                                >
                                    {images1x1.map((image,index) => (
                                        <div
                                            style={{
                                              width: 5,
                                              height: 5,
                                              borderRadius: '50%',
                                              backgroundColor: 'black',
                                              cursor: 'pointer'
                                            }}
                                            key={index}
                                            data-id={image.id}
                                            data-url={image.url}
                                            data-targetid="1x1"
                                            onClick={handleImgCarousel}
                                        >
                                        </div>
                                    ))}
                                </Box>
                            </Box>
                            <Box
                             sx={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column"
                             }}
                            >
                                <Typography id='16x9' component="label" sx={{fontSize: "12px"}}>
                                    9:16 Portrait
                                </Typography>
                                <Box
                                    sx={{
                                        width: 76,
                                        height: 134,
                                        border: '1px dashed #ccc',
                                    }}
                                >
                                    <DropTarget9x16 targetId="_9x16Images" imgSrc9x16={imgSrc9x16} imgId9x16={imgId9x16} handleImageDrop={handleImageDrop} handleImageDeletion={handleImageDeletion} />
                                </Box>
                                <Box
                                    sx={{
                                        width: 76,
                                        height: 10,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        flexWrap: 'wrap',
                                        gap: '5px',
                                        overflow: 'auto',
                                        marginTop: '7.5px'
                                    }}
                                >
                                    {images9x16.map((image,index) => (
                                        <div
                                            style={{
                                              width: 5,
                                              height: 5,
                                              borderRadius: '50%',
                                              backgroundColor: 'black',
                                              cursor: 'pointer'
                                            }}
                                            key={index}
                                            data-id={image.id}
                                            data-url={image.url}
                                            data-targetid="9x16"
                                            onClick={handleImgCarousel}
                                        >
                                        </div>
                                    ))}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            position:'relative',
                            height: "100%"
                        }}
                    >
                        <TextField 
                            id="searchImages" 
                            label="Search Images" 
                            variant="outlined" 
                            sx={
                                {
                                    width: 320,
                                    
                                }
                            }
                            onChange={(e) => {
                                setLoading(true)
                                setTimeout(() => {
                                    onImageSearch(e)
                                }, 1000)
                            }}
                            
                        />
                        {loading ? <Box><ContentLoader top="40%" left="45%"/></Box> : 
                            <ImageList cols={2} gap={15} sx={{width: 320, maxHeight: 325, display: "flex", flexWrap: "wrap"}}>
                                {imageListData.map((image,index) => (
                                    <ImageListItem key={index} sx={{width: 150, height: 110, border: "1px solid #ccc"}}>
                                      <ImageItem imageId={image.guid} imageSrc={image.url} />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        }
                    </Box>                    
                </Box>
            </Box>
          </Modal>
        </div>
    </DndProvider>
  );
}