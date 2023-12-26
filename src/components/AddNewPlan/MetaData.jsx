import Box from '@mui/material/Box'
import { TextField, Typography } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { FieldArray } from 'formik'
import MinimizeIcon from '@mui/icons-material/Minimize'
import AddIcon from '@mui/icons-material/Add'

const metadata = ({ handleChange }) => {
  return (
    <Box
      className="metaDetails"
      sx={{
        borderRadius: '10px',
        border: '1px solid #cfcfcf',
        padding: '20px 40px',
        marginTop: '20px',
      }}
    >
      <Typography variant="h6">Additional metadata</Typography>
      <Box
        className="metadataField"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <HelpOutlineIcon />
        <Box className="label&inputfield" sx={{ display: 'flex' }}>
          <Box
            className="label"
            sx={{
              fontSize: '14px',
              color: '#333',
              fontWeight: 'bold',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              marginRight: '20px',
            }}
          >
            <Box>metadata :</Box>
          </Box>
          <Box>
            <FieldArray name="metadata">
              {(props) => {
                const { form, push, remove } = props
                const { values } = form
                const { metadata } = values
                return (
                  <Box>
                    {metadata.map((item, index) => {
                      return (
                        <Box
                          key={`meta-${index}`}
                          mb={2}
                          sx={{
                            display: 'flex',
                            gap: '10px',
                            alignItems: 'center',
                          }}
                        >
                          <TextField
                            name={`metadata[${index}].name`}
                            label="Name"
                            value={values.metadata[index].name}
                            onChange={handleChange}
                          />
                          <TextField
                            name={`metadata[${index}].value`}
                            label="Value"
                            value={values.metadata[index].value}
                            onChange={handleChange}
                          />
                          {index === metadata.length - 1 ? (
                            <Box
                              sx={{
                                display: 'inline',
                                cursor: 'pointer',
                              }}
                              onClick={() => {
                                push({ name: '', value: '' })
                              }}
                            >
                              <AddIcon />
                            </Box>
                          ) : (
                            <Box
                              sx={{
                                display: 'inline',
                                cursor: 'pointer',
                              }}
                              onClick={() => {
                                remove(index)
                              }}
                            >
                              <MinimizeIcon />
                            </Box>
                          )}
                        </Box>
                      )
                    })}
                  </Box>
                )
              }}
            </FieldArray>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default metadata
