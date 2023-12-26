import Grid from '@mui/material/Grid'
import { Button, IconButton, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useS3Images from './useS3Images'
import ImageSelector from './ImageSelector'
import DownloadIcon from '@mui/icons-material/Download'
import DeleteIcon from '@mui/icons-material/Delete'
import brandImagesMap from 'src/json/brandImagesMap.json'
import VLImagePreview from 'src/components/common/VLImagePreview'
import download from 'downloadjs'
// import fetchHelper from 'src/helpers/fetchHelper'
// import { DELETE_S3_IMAGES } from 'src/constants/urlConstants'
// import { useCookies } from 'react-cookie'

const LogoNImages = ({ formik, handleInputChange }) => {
  const { images } = useS3Images()
  const theme = useTheme()

  const { values: { logoAndIcons = {} } = {} } = formik
  // return null

  const downloadFile = (image) => {
    download(image?.imageURI, image?.name)
  }

  const deleteImage = async ({ Key }) => {
    console.log(Key)
    // const data = await fetchHelper({
    //   url: DELETE_S3_IMAGES,
    //   method: 'DELETE',
    //   headers: {
    //     xapikey: cookies.managementXApiKey,
    //     Authorization: cookies.accessToken,
    //   },
    //   data: {
    //     key: Key,
    //   },
    // })

    // setData(data?.brand)
  }

  return (
    <Grid
      container
      sx={{
        padding: 5,
      }}
    >
      <Grid
        item
        container
        xs={6}
        sx={{
          border: 'solid 1px #ccc',
          overflowY: 'scroll',
          maxHeight: '90vh',
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            background: '#e0e0e0',
            padding: 2,
            alignItems: 'center',
            maxHeight: '5em',
          }}
        >
          <Button
            variant="outlined"
            sx={{
              width: 200,
            }}
          >
            Upload
          </Button>
        </Grid>
        {images.map((image, index) => {
          return (
            <Grid
              item
              key={`${image.Key}-${index}`}
              xs={12}
              sx={{
                px: 6,
                py: 1,
                borderBottom: 'solid 1px #ccc',
                display: 'flex',
                justifyContent: 'space-between',
                color: theme.palette.primary.main,
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  width: '20ch',
                }}
                noWrap={true}
              >
                {image?.name}
              </Typography>
              <Typography variant="subtitle1">
                {Math.round(image?.Size / 1024)} KB
              </Typography>
              <Stack direction="row">
                <VLImagePreview imageObj={image} />
                <IconButton onClick={() => downloadFile(image)} color="inherit">
                  <DownloadIcon />
                </IconButton>
                <IconButton onClick={() => deleteImage(image)} color="inherit">
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </Grid>
          )
        })}
      </Grid>
      <Grid container item xs={6}>
        {brandImagesMap.map((item) => {
          return (
            <Grid
              item
              key={item.key}
              xs={item.span || 12}
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <ImageSelector
                fieldKey={`logoAndIcons.${item.key}`}
                images={images}
                label={item.name}
                dataObj={logoAndIcons?.[item.key]}
                onChange={handleInputChange}
                preview={item.preview}
                save={item.save}
                backgroundChange={item.backgroundChange}
              />
            </Grid>
          )
        })}
      </Grid>
    </Grid>
  )
}

export default LogoNImages
