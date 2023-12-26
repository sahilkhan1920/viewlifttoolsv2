/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Grid,
  Select,
  MenuItem,
  Switch,
  Button,
  TextField,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import devices from 'src/json/devices.json'
import { cloneDeep, get } from 'lodash'
import VLAddRemove from 'src/components/common/VLAddRemove'
import VLAsyncAutoComplete from 'src/components/common/VLAsyncAutoComplete'
import { CONTENT_LIST } from 'src/constants/urlConstants'

const transformValue = (value) => {
  const { enableEdne, ...rest } = value
  const devices = Object.keys(rest).map((item) => ({
    name: item,
    ...value[item],
  }))

  return {
    enableEdne,
    devices,
  }
}

const reverseTransformValue = (value) => {
  const { enableEdne, devices } = value

  const transformedDevices = {}
  devices.forEach((device) => {
    const { name, ...rest } = device
    transformedDevices[name] = rest
  })

  return {
    enableEdne,
    ...transformedDevices,
  }
}

const SmartHubPreview = (props) => {
  const { value, id, onChange, setFieldValue } = props

  const [platform, setPlatform] = useState([])
  const handleDeviceChange = ({ target: { value: val } }) => {
    console.log(val)
  }

  const handleAddPlatform = () => {
    const data = cloneDeep(formik.values)
    const { devices: originalDevices } = data

    formik.setFieldValue('devices', [
      ...originalDevices,
      {
        name: '',
        sections: [
          {
            title: '',
            tiles: [],
          },
        ],
      },
    ])
  }

  const [initialValues, setInitialValues] = useState(transformValue(value))

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: ({ values }) => {
      console.log(values)
    },
  })

  useEffect(() => {
    setInitialValues(transformValue(value))
  }, [value])

  const handleSectionAdd = (deviceIndex) => {
    const data = cloneDeep(formik.values)
    const { devices: originalDevices } = data
    originalDevices[deviceIndex].sections = [
      ...originalDevices[deviceIndex].sections,
      {
        title: '',
        tiles: [],
      },
    ]
    formik.setFieldValue('devices', originalDevices)
  }

  const handleSectionRemove = (deviceIndex, sectionIndex) => {
    const data = cloneDeep(formik.values)
    data.devices[deviceIndex].sections.splice(sectionIndex)
    formik.setFieldValue('devices', data.devices)
  }

  const handleDeletePlatform = (deviceIndex) => {
    const original = [...formik.values.devices]
    original.splice(deviceIndex, 1)
    formik.setFieldValue('devices', original)
  }

  useEffect(() => {
    // console.log('Changed ==>', formik.values)
    const data = reverseTransformValue(formik.values)
    onChange(data)
  }, [formik.values])

  return (
    <Grid container>
      {/* <Grid item xs={12}>
        <Switch
          value={formik.values.enableEdne}
          id="enableEdne"
          name="enableEdne"
          onChange={formik.handleChange}
        />
      </Grid> */}
      <Grid
        item
        xs={12}
        container
        sx={{
          gridGap: 15,
        }}
      >
        {Array.isArray(formik.values.devices) &&
          formik.values.devices.map((item, i) => {
            const selectId = `devices.${i}.name`
            return (
              <Grid
                container
                item
                xs={12}
                key={`item-${i}`}
                sx={{
                  gridGap: 15,
                }}
              >
                <Grid item xs={12}>
                  <Select
                    labelId="demo-simple-select-label"
                    id={selectId}
                    name={selectId}
                    value={get(formik.values, selectId)}
                    label="Device"
                    sx={{
                      width: 200,
                    }}
                    onChange={formik.handleChange}
                  >
                    {devices.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  <Button onClick={() => handleDeletePlatform(i)}>
                    Delete Platform
                  </Button>
                </Grid>

                <Grid
                  container
                  item
                  xs={12}
                  sx={{
                    gridGap: 15,
                  }}
                >
                  {item.sections.map((section, b) => {
                    const sectionId = `devices.${i}.sections.${b}`
                    return (
                      <Grid
                        item
                        container
                        xs={12}
                        key={`section-${b}`}
                        sx={{
                          // gridGap: 10,
                          justifyContent: 'center',
                        }}
                      >
                        <Grid item xs={4}>
                          <TextField
                            id={`${sectionId}.title`}
                            name={`${sectionId}.title`}
                            type="text"
                            value={get(formik.values, `${sectionId}.title`)}
                            sx={{
                              width: '100%',
                            }}
                            onChange={formik.handleChange}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          {/* <TextField
                            id={`${sectionId}.tiles`}
                            name={`${sectionId}.tiles`}
                            type="text"
                            value={get(formik.values, `${sectionId}.tiles`)}
                            sx={{
                              width: '100%',
                            }}
                          /> */}
                          <VLAsyncAutoComplete
                            url={CONTENT_LIST}
                            id={`${sectionId}.tiles`}
                            name={`${sectionId}.titles`}
                            value={get(formik.values, `${sectionId}.tiles`)}
                            onChange={
                              (e, val) =>
                                formik.setFieldValue(`${sectionId}.tiles`, val)
                              // formik.setFieldValue(fullId, val)
                            }
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <VLAddRemove
                            index={b}
                            total={item.sections.length}
                            onAdd={() => handleSectionAdd(i)}
                            onRemove={() => handleSectionRemove(i, b)}
                          />
                        </Grid>
                      </Grid>
                    )
                  })}
                </Grid>
              </Grid>
            )
          })}
      </Grid>
      <Grid item xs={12}>
        <Button onClick={handleAddPlatform}>Add Platform</Button>
      </Grid>
    </Grid>
  )
}

export default SmartHubPreview
