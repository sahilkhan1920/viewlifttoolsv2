import { Button, Grid } from '@mui/material'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import fetchHelper from 'src/helpers/fetchHelper'
import useAWSSdk from 'src/hooks/useAWSSdk'

const FileUploader = ({ id, name, value, accept, fileUploadUrl }) => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [cookies] = useCookies()
  const { upload } = useAWSSdk()

  const handleUpload = async () => {
    console.log(selectedFile)
    if (!selectedFile) {
      return
    }

    const result = await fetchHelper({
      url: `${fileUploadUrl}/?filename=${selectedFile.name}&filesize=${selectedFile.size}&last_modified=${selectedFile.lastModified}&formattedDate=20230525&contentType=${selectedFile.type}&type=ios`,
      method: 'GET',
      headers: {
        xapikey: cookies.managementXApiKey,
        Authorization: cookies.accessToken,
      },
    })

    const uploadResponse = await upload({
      file: selectedFile,
      bucket: result.bucket,
      key: result.key,
      region: result.region,
      accessKeyId: result.access_key,
      secretAccessKey: result.signature,
    })

    console.log(uploadResponse)
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    setSelectedFile(file)
  }

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <input
          id={id}
          name={name}
          type="file"
          style={{ display: 'none' }}
          onChange={handleFileChange}
          accept={accept}
        />
        <label htmlFor={name}>
          <Button variant="contained" component="span">
            Choose File
          </Button>
        </label>
      </Grid>
      <Grid item>{value}</Grid>
      <Grid item>
        <Button
          variant="contained"
          disabled={!selectedFile}
          onClick={handleUpload}
        >
          Upload
        </Button>
      </Grid>
    </Grid>
  )
}

export default FileUploader
