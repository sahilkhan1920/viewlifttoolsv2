import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DeleteIcon from '@mui/icons-material/Delete'
import { styled } from '@mui/material/styles'

import {
  Box,
  Container,
  Grid,
  MenuItem,
  Select,
  Switch,
  Autocomplete,
  TextField,
  Button,
  InputLabel,
  FormControl,
} from '@mui/material'
import Divider from '@mui/material/Divider'

import { Stack } from '@mui/system'
import SettingsMap from 'src/json/settingsTabUpdated'

import { get } from 'lodash'
import useSettings from './useSettings'
import VLFileUploader from 'src/components/common/VLFileUploader'
import VLConfigTable from 'src/components/common/VLConfigTable'
import SmartHubPreview from 'src/components/AppCMS/Settings/SmartHubPreview'
import VersionHistoryTable from 'src/components/AppCMS/Settings/VersionHistoryTable'
import LocalizationLanguages from 'src/components/AppCMS/Settings/LocalizationLanguages'
import VLAsyncAutoComplete from 'src/components/common/VLAsyncAutoComplete'

const Root = styled('div')(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  '& > :not(style) + :not(style)': {
    marginTop: theme.spacing(2),
  },
}))

export default function Settings() {
  const { data, formik, handleClick, expanded } = useSettings()
  console.log(data)
  return (
    <Container>
      <Typography
        variant="h5"
        color="primary"
        align="center"
        sx={{
          m: 2,
        }}
      >
        Settings
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={formik.handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        {SettingsMap.map(
          ({ key: accKey, title: accTitle, items: accItems }) => (
            <Accordion
              key={accKey}
              sx={{
                background: '#FBFCFE',
                borderTop: 'solid 2px #016690',
                borderRadius: 0,
              }}
              expanded={expanded === accKey}
              onChange={() => handleClick(accKey)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{accTitle}</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  padding: 0,
                }}
              >
                <Grid container>
                  {accItems
                    .filter((item) => {
                      if (item.show) {
                        const status = get(formik.values, item.show)
                        return Boolean(status)
                      }

                      return true
                    })
                    .map((a, index) => (
                      <Grid
                        key={`item-${index}`}
                        item
                        md={a.span || 4}
                        xs={12}
                        sx={{
                          border: 'solid 1px #ccc',
                          padding: 2,
                          display: 'flex',
                          flexDirection: 'column',
                          gridGap: 15,
                        }}
                      >
                        {a?.fields?.map(
                          (
                            {
                              id: fieldId,
                              title: fieldTitle,
                              label: fieldLabel,
                              type: fieldType,
                              addButtonText,
                              defaultItem,
                              options: fieldOptions = [],
                              items: fieldItems = [],
                              accept,
                              fileUploadUrl,
                              ...other
                            },
                            itemIndex
                          ) => {
                            const fullId = `${fieldId}`
                            const value = get(formik.values, fullId) || ''
                            const common = {
                              id: fullId,
                              key: fullId,
                              name: fullId,
                              value,
                              onChange: formik.handleChange,
                            }
                            return (
                              <Stack
                                key={`sub-${itemIndex}`}
                                direction="row"
                                spacing={5}
                                justifyContent="space-between"
                                alignItems="center"
                              >
                                {fieldTitle && fieldType !== 'divider' && (
                                  <Typography
                                    variant="subtitle1"
                                    sx={{
                                      fontWeight: 500,
                                    }}
                                  >
                                    {fieldTitle}
                                  </Typography>
                                )}
                                {fieldType === 'switch' && (
                                  <Switch
                                    checked={Boolean(common.value)}
                                    // defaultChecked={common.value || false}
                                    {...common}
                                  />
                                )}
                                {fieldType === 'file' && (
                                  <VLFileUploader
                                    {...common}
                                    accept={accept}
                                    fileUploadUrl={fileUploadUrl}
                                  />
                                )}
                                {fieldType === 'number' && (
                                  <TextField
                                    {...common}
                                    size="small"
                                    type="number"
                                    sx={{
                                      width: 150,
                                    }}
                                  />
                                )}
                                {fieldType === 'password' && (
                                  <TextField
                                    {...common}
                                    size="small"
                                    type="password"
                                    sx={{
                                      width: 150,
                                    }}
                                  />
                                )}
                                {fieldType === 'text' && (
                                  <TextField
                                    {...common}
                                    size="small"
                                    label={fieldLabel}
                                    sx={{
                                      width: '100%',
                                    }}
                                  />
                                )}
                                {fieldType === 'multiSelect' && (
                                  <Autocomplete
                                    // {...common}
                                    key={fullId}
                                    multiple
                                    disablePortal
                                    options={fieldOptions || []}
                                    // defaultValue={value || []}
                                    value={value || []}
                                    sx={{
                                      width: '100%',
                                    }}
                                    onChange={(e, val) =>
                                      formik.setFieldValue(fullId, val)
                                    }
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        id={fullId}
                                        key={fullId}
                                        name={fullId}
                                        onChange={(e) =>
                                          console.log(e.target.value)
                                        }
                                      />
                                    )}
                                  />
                                )}
                                {fieldType === 'select' && (
                                  <Select
                                    {...common}
                                    size="small"
                                    sx={{
                                      width: 150,
                                    }}
                                  >
                                    {fieldOptions.map((option) => (
                                      <MenuItem
                                        key={option.value}
                                        value={option.value}
                                      >
                                        <Box
                                          sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gridGap: 10,
                                            justifyContent: 'flex-start',
                                          }}
                                        >
                                          <span
                                            dangerouslySetInnerHTML={{
                                              __html: option.icon,
                                            }}
                                          />
                                          {option.label}
                                        </Box>
                                      </MenuItem>
                                    ))}
                                  </Select>
                                )}
                                {fieldType === 'textarea' && (
                                  <TextField
                                    {...common}
                                    size="small"
                                    rows={4}
                                    multiline
                                    sx={{
                                      width: '100%',
                                    }}
                                  />
                                )}
                                {fieldType === 'divider' && (
                                  <Root>
                                    <Divider>{fieldTitle}</Divider>
                                  </Root>
                                )}
                                {fieldType === 'combo' && (
                                  <Stack direction="row" gap={2}>
                                    {fieldItems.map((nestedFieldItem) => {
                                      const nestedFieldId = `${nestedFieldItem.id}`
                                      const nestedFieldValue =
                                        get(formik.values, nestedFieldId) || ''
                                      const commonNested = {
                                        id: nestedFieldId,
                                        key: nestedFieldId,
                                        name: nestedFieldId,
                                        value: nestedFieldValue,
                                        onChange: formik.handleChange,
                                        size: 'small',
                                      }

                                      if (nestedFieldItem.type === 'number')
                                        return (
                                          <TextField
                                            {...commonNested}
                                            sx={{
                                              width: 100,
                                            }}
                                            type={nestedFieldItem.type}
                                          />
                                        )
                                      if (nestedFieldItem.type === 'select')
                                        return (
                                          <Select {...commonNested}>
                                            {nestedFieldItem.options.map(
                                              (option) => (
                                                <MenuItem
                                                  key={option.value}
                                                  value={option.value}
                                                >
                                                  {option.label}
                                                </MenuItem>
                                              )
                                            )}
                                          </Select>
                                        )
                                    })}
                                  </Stack>
                                )}
                                {fieldType === 'array' && (
                                  <Box
                                    sx={{
                                      width: '100%',
                                      display: 'flex',
                                      flexDirection: 'column',
                                      gridGap: 15,
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                    }}
                                  >
                                    {Array.isArray(value) &&
                                      value.map((item, index) => (
                                        <Box
                                          key={index}
                                          sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            flexWrap: 'no-wrap',
                                            width: '100%',
                                            gridGap: 20,
                                          }}
                                        >
                                          {fieldItems.map((nestedFieldItem) => {
                                            const nestedFieldId = `${fullId}.${index}.${nestedFieldItem.id}`
                                            const commonNested = {
                                              id: nestedFieldId,
                                              name: nestedFieldId,
                                              label: nestedFieldItem.label,
                                              title: nestedFieldItem.title,
                                              value: get(
                                                formik.values,
                                                nestedFieldId
                                              ),
                                              sx: {
                                                width: '30%',
                                              },
                                              size: 'large',
                                              onChange: formik.handleChange,
                                            }
                                            if (
                                              nestedFieldItem.type ===
                                              'asyncAutocomplete'
                                            ) {
                                              return (
                                                <VLAsyncAutoComplete
                                                  key={nestedFieldId}
                                                  {...commonNested}
                                                  {...nestedFieldItem}
                                                  setFieldValue={
                                                    formik.setFieldValue
                                                  }
                                                />
                                              )
                                            }
                                            if (
                                              nestedFieldItem.type ===
                                              'multiSelect'
                                            ) {
                                              return (
                                                <Autocomplete
                                                  key={nestedFieldId}
                                                  options={
                                                    nestedFieldItem.options ||
                                                    []
                                                  }
                                                  value={
                                                    commonNested.value || []
                                                  }
                                                  multiple
                                                  disablePortal
                                                  sx={{ width: 200 }}
                                                  onChange={(e, val) =>
                                                    formik.setFieldValue(
                                                      nestedFieldId,
                                                      val
                                                    )
                                                  }
                                                  renderInput={(params) => (
                                                    <TextField
                                                      {...params}
                                                      id={nestedFieldId}
                                                      key={nestedFieldId}
                                                      name={nestedFieldId}
                                                      onChange={(e) =>
                                                        console.log(
                                                          e.target.value
                                                        )
                                                      }
                                                    />
                                                  )}
                                                />
                                              )
                                            }
                                            if (
                                              nestedFieldItem.type === 'switch'
                                            )
                                              return (
                                                <Box
                                                  sx={{
                                                    display: 'flex',
                                                    width: '30%',
                                                    alignItems: 'center',
                                                    justifyContent:
                                                      'space-between',
                                                  }}
                                                >
                                                  <Typography
                                                    variant="subtitle1"
                                                    sx={{
                                                      fontWeight: 500,
                                                    }}
                                                  >
                                                    {nestedFieldItem.title}
                                                  </Typography>
                                                  <Switch
                                                    title={
                                                      nestedFieldItem.title
                                                    }
                                                    {...common}
                                                  />
                                                </Box>
                                              )
                                            if (
                                              nestedFieldItem.type ===
                                                'number' ||
                                              nestedFieldItem.type === 'text'
                                            ) {
                                              return (
                                                <TextField
                                                  {...commonNested}
                                                  key={nestedFieldItem.id}
                                                  size="large"
                                                  type={nestedFieldItem.type}
                                                />
                                              )
                                            }
                                            if (
                                              nestedFieldItem.type === 'select'
                                            ) {
                                              return (
                                                <FormControl
                                                  key={nestedFieldItem.id}
                                                  sx={{
                                                    width: '30%',
                                                  }}
                                                >
                                                  <InputLabel
                                                    id={`label-${nestedFieldItem.id}`}
                                                  >
                                                    {nestedFieldItem.label}
                                                  </InputLabel>
                                                  <Select
                                                    labelId={`label-${nestedFieldItem.id}`}
                                                    {...commonNested}
                                                    sx={{
                                                      width: '100%',
                                                    }}
                                                  >
                                                    {nestedFieldItem.options.map(
                                                      (option) => (
                                                        <MenuItem
                                                          key={option.value}
                                                          value={option.value}
                                                        >
                                                          {option.label}
                                                        </MenuItem>
                                                      )
                                                    )}
                                                  </Select>
                                                </FormControl>
                                              )
                                            }
                                          })}
                                          <IconButton
                                            color="primary"
                                            aria-label="delete"
                                            component="label"
                                            onClick={() => {
                                              const actualValues = [...value]
                                              actualValues.splice(index, 1)
                                              formik.setFieldValue(
                                                fullId,
                                                actualValues
                                              )
                                            }}
                                          >
                                            <DeleteIcon />
                                          </IconButton>
                                        </Box>
                                      ))}
                                    <Button
                                      type="button"
                                      variant="contained"
                                      sx={{
                                        width: 300,
                                      }}
                                      onClick={() => {
                                        formik.setFieldValue(fullId, [
                                          ...value,
                                          defaultItem,
                                        ])
                                      }}
                                    >
                                      {addButtonText}
                                    </Button>
                                  </Box>
                                )}
                                {fieldType === 'configTable' && (
                                  <VLConfigTable
                                    {...common}
                                    setFieldValue={formik.setFieldValue}
                                  />
                                )}
                                {fieldType === 'smartHubPreview' &&
                                  common.value && (
                                    <SmartHubPreview
                                      {...common}
                                      onChange={(values) => {
                                        formik.setFieldValue(fullId, values)
                                      }}
                                    />
                                  )}
                                {fieldType === 'versionHistoryTable' && (
                                  <VersionHistoryTable {...common} />
                                )}
                                {fieldType === 'localizationLanguages' && (
                                  <LocalizationLanguages
                                    {...common}
                                    setFieldValue={formik.setFieldValue}
                                  />
                                )}
                                {fieldType === 'asyncAutocomplete' && (
                                  <VLAsyncAutoComplete
                                    {...common}
                                    {...other}
                                    setFieldValue={formik.setFieldValue}
                                  />
                                )}
                              </Stack>
                            )
                          }
                        )}
                        <Typography variant="subtitle1">
                          {a.description}
                        </Typography>
                      </Grid>
                    ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
          )
        )}
        <Divider
          sx={{
            mt: 5,
          }}
        />
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              width: 235,
              height: '49px',
              display: 'block',
              float: 'right',
              margin: '29px 0 30px 0',
            }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
