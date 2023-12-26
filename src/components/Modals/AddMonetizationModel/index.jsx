import { useState } from 'react'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import { useFormik } from 'formik'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import useModel from 'src/hooks/useModel'
import VLLoaderWrapper from 'src/components/common/VLLoaderWrapper'

const AddMonetizationModel = ({
  setShowAddModel,
  setModelInfoDynamic,
  modelInfoDynamic,
  monetizationModelIntialValuesState,
  editItemId,
}) => {
  const { loading, handleDelete, handleAdd } = useModel({
    editItemId,
    setShowAddModel,
    setModelInfoDynamic,
    modelInfoDynamic,
  })
  const [reallyDelete, setReallyDelete] = useState(false)

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: monetizationModelIntialValuesState,
    onSubmit: (val) => {
      handleAdd(val, editItemId)
    },
  })

  const selectStyle = {
    padding: '18.5px 15px',
    border: '1px solid #cec4c4',
    borderRadius: '3px',
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        width: '100%',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        zIndex: 1,
      }}
    >
      {loading && <VLLoaderWrapper loading={loading}></VLLoaderWrapper>}
      <Box
        className="addMonetizationModelContainer"
        sx={{ width: '85%', minHeight: '400px', maxWidth: '1000px' }}
      >
        <Box
          className="addMonetizationModelContainerHeader"
          sx={{
            display: 'flex',
            padding: '12px 30px',
            background: '#4a78ad',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{ color: '#fff', fontSize: '24px', fontWeight: 'bolder' }}
          >
            Create Model
          </Typography>
          <Box
            onClick={() => {
              setShowAddModel(false)
            }}
            sx={{ width: '180x', height: '24px', cursor: 'pointer' }}
          >
            <CloseIcon sx={{ color: '#fff' }} />
          </Box>
        </Box>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Box
            className="addMonetizationModelformFieldsContainer"
            sx={{ padding: '15px 30px 20px', background: '#ffffff' }}
          >
            <Box
              className=""
              sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}
            >
              <TextField
                required
                id="outlined-error"
                label="Please enter Model name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                sx={{ minWidth: '30%' }}
              />
              <FormControl sx={{ minWidth: '20%' }}>
                <select
                  required
                  id="modelTypeId"
                  value={formik.values.type}
                  name="type"
                  onChange={formik.handleChange}
                  style={selectStyle}
                >
                  <option disabled>Type</option>
                  <option value={'SVOD'}>SVOD</option>

                  <option value={'TVOD'}>TVOD</option>
                  <option value={'FREE'}>FREE</option>
                  <option value={'AVOD'}>AVOD</option>
                </select>
              </FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    name="default"
                    value={formik.values.default}
                    onChange={formik.handleChange}
                  />
                }
                label="Default"
              />
            </Box>
            <Box
              className="availabilityConatiner"
              sx={{ marginTop: '20px', border: '1px solid #c9c3c3' }}
            >
              <Box
                className="availabilityConatinerHeader"
                sx={{
                  background: '#f0f0f0',
                  padding: '12px 20px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                }}
              >
                Availability
              </Box>
              <Box
                className="availabilitySettings"
                sx={{ padding: '5px 20px 10px 20px ' }}
              >
                <Box
                  className="availabilitySettingsHeader"
                  sx={{
                    color: '#969696',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    margin: '10px 0px 10px 0px',
                  }}
                >
                  Content Types
                </Box>
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="contentTypeVideo"
                        value={formik.values.contentTypeVideo}
                        defaultChecked
                        disabled
                      />
                    }
                    label="Videos"
                  />
                </Box>
              </Box>
            </Box>
            <Box
              className="addMonetizationModelActions"
              sx={{
                padding: '20px 0px ',
                display: 'flex',
                gap: '20px',
                justifyContent: 'space-between',
              }}
            >
              {editItemId && !reallyDelete && (
                <Button
                  variant="contained"
                  sx={{ background: '#f44336' }}
                  onClick={() => {
                    setReallyDelete(true)
                  }}
                >
                  Remove
                </Button>
              )}
              {editItemId && reallyDelete && (
                <Box
                  sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}
                >
                  {' '}
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleDelete(editItemId, 'DELETE')
                    }}
                    sx={{ background: '#f44336' }}
                  >
                    {' '}
                    Yes
                  </Button>{' '}
                  <Button
                    variant="contained"
                    onClick={() => {
                      setReallyDelete(false)
                    }}
                  >
                    {' '}
                    No
                  </Button>
                </Box>
              )}
              <Box>
                <Button
                  variant="contained"
                  sx={{ background: '#4a4a4a', marginRight: '10px' }}
                  onClick={() => {
                    setShowAddModel(false)
                  }}
                >
                  Cancel
                </Button>
                <Button variant="contained" type="submit">
                  Save
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default AddMonetizationModel
