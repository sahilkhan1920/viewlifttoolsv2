import React, { useState } from 'react'
import { Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import SaveIcon from '@mui/icons-material/Save'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import dayjs from 'dayjs'
import { CONTENT_BASE_URL } from 'src/constants/urlConstants'
import fetchHelper from 'src/helpers/fetchHelper'
import { useCookies } from 'react-cookie'
import { useAppContext } from 'src/contexts/AppContext'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 600,
  minHeight: 300,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  borderRadius: '5px',
  textAlign: 'center',
}

export default function ScheduleModal({
  open,
  close,
  pageData,
  schedule,
  setShowScheduleButton,
  setCreateScheduleButton,
  disableEvent = false,
  listTemplate,
}) {
  const [cookies] = useCookies()
  const {
    data: { listData },
    updateData,
  } = useAppContext()
  const eventTypes = [
    {
      name: 'GAME',
      value: 'game',
    },
    {
      name: 'EVENT',
      value: 'event',
    },
  ]
  const [scheduleTitle, setScheduleTitle] = useState(schedule?.title || 'New Schedule')
  const [eventType, setEventType] = useState(pageData?.contentType?.toLowerCase() || schedule?.eventType || 'event')
  const [startDateTime, setStartDateTime] = useState(schedule?.startDate || null)
  const [endDateTime, setEndDateTime] = useState(schedule?.endDate || null)
  const [eventOptions, setEventOptions] = useState([])
  const [eventInputValue, setEventInputValue] = useState('')
  const [eventValue, setEventValue] = useState(
    pageData
      ? [
          {
            id: pageData?.id,
            title: pageData?.title,
          },
        ]
      : schedule?.event
      ? [schedule?.event]
      : []
  )
  const [venueOptions, setVenueOptions] = useState([])
  const [venueInputValue, setVenueInputValue] = useState('')
  const [venueValue, setVenueValue] = useState(schedule?.venue ? [schedule?.venue] : [])
  const [loading, setLoading] = useState(false)

  const handleFocus = (e, name) => {
    if (name == 'scheduleEvent') {
      var url = CONTENT_BASE_URL + 'event' + '?offset=0&max=20'
    } else if (name == 'scheduleVenue') {
      url = CONTENT_BASE_URL + 'venue' + '?offset=0&max=20'
    }
    fetchHelper({
      url: url,
      method: 'GET',
      headers: {
        xApiKey: cookies.managementXApiKey,
        Authorization: cookies.accessToken,
      },
    })
      .then(function (response) {
        if (response.content && response.content.length > 0) {
          var options = {
            id: null,
            title: null,
          }
          var data = []
          for (let i = 0; i < response.content.length; i++) {
            options = {
              id: response.content[i].id,
              title: response.content[i].title,
            }
            data.push(options)
          }
          if (name == 'scheduleEvent') {
            setEventOptions(data)
          } else if (name == 'scheduleVenue') {
            setVenueOptions(data)
          }
        }
      })
      .catch(function (err) {
        console.log(err)
      })
  }

  const handleInputChange = (e, name) => {
    if (name == 'scheduleEvent') {
      setEventInputValue(e?.target?.value)
    } else if (name == 'scheduleVenue') {
      setVenueInputValue(e?.target?.value)
    }
    if (e?.target?.value) {
      if (name == 'scheduleEvent') {
        var url = CONTENT_BASE_URL + 'event' + '?offset=0&max=20&keywordValue=' + e.target.value
      } else if (name == 'scheduleVenue') {
        url = CONTENT_BASE_URL + 'venue' + '?offset=0&max=20&keywordValue=' + e.target.value
      }
      fetchHelper({
        url: url,
        method: 'GET',
        headers: {
          xApiKey: cookies.managementXApiKey,
          Authorization: cookies.accessToken,
        },
      })
        .then(function (response) {
          if (response.content && response.content.length > 0) {
            var options = {
              id: null,
              title: null,
            }
            var data = []
            for (let i = 0; i < response.content.length; i++) {
              options = {
                id: response.content[i].id,
                title: response.content[i].title,
              }
              data.push(options)
            }
            if (name == 'scheduleEvent') {
              setEventOptions(data)
            } else if (name == 'scheduleVenue') {
              setVenueOptions(data)
            }
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  }

  const handleSelectChange = (key, val) => {
    if (key == 'scheduleEvent') {
      if (val.length > 1) {
        val.shift()
        setEventValue(val)
      } else {
        setEventValue(val)
      }
    } else {
      if (val.length > 1) {
        val.shift()
        setVenueValue(val)
      } else {
        setVenueValue(val)
      }
    }
  }

  const handleDateChange = (key, val) => {
    let dateTimeValue, unixTimestamp
    if (key == 'scheduleStartTimeInput') {
      dateTimeValue = dayjs(val)
      unixTimestamp = dateTimeValue.valueOf() / 1000
      setStartDateTime(unixTimestamp)
    } else {
      dateTimeValue = dayjs(val)
      unixTimestamp = dateTimeValue.valueOf() / 1000
      setEndDateTime(unixTimestamp)
    }
  }

  const saveSchedule = () => {
    setLoading(true)
    let url, apiMethod, putData
    let apiData = {
      eventType: eventType,
      event: eventValue[0],
      venue: venueOptions.length > 0 ? venueValue[0] : {},
      title: scheduleTitle,
      startDate: startDateTime,
      endDate: endDateTime,
    }
    if (schedule?.id) {
      url = CONTENT_BASE_URL + 'schedules/' + schedule?.id
      apiMethod = 'PATCH'
      apiData['isPublish'] = false
      putData = {
        action: {
          type: 'UpdateMetadataAction',
          updateMetaData: apiData,
        },
      }
    } else {
      apiData['timeZone'] = 'US/Eastern'
      url = CONTENT_BASE_URL + 'schedules'
      apiMethod = 'POST'
      putData = apiData
    }
    fetchHelper({
      url: url,
      method: apiMethod,
      data: putData,
      headers: {
        xApiKey: cookies.managementXApiKey,
        Authorization: cookies.accessToken,
      },
    })
      .then(function (response) {
        if (response?.status === 200) {
          if (listTemplate == 'POST') {
            setLoading(false)
            const updatedListData = [response, ...listData]
            updateData({
              listData: updatedListData,
            })
            close()
          } else if (listTemplate == 'PATCH') {
            setLoading(false)
            const indexToBeReplaced = listData.findIndex(item => item.id === schedule.id)
            const listDataCopy = listData
            listDataCopy[indexToBeReplaced] = response
            updateData({
              listData: listDataCopy,
            })
            close()
          } else {
            setLoading(false)
            close()
            setCreateScheduleButton(false)
            setShowScheduleButton(true)
          }
        }
      })
      .catch(function (err) {
        console.log(err)
      })
  }

  return (
    <div>
      <Modal open={open} onClose={close} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="schedule-modal-title" variant="h6" component="h2" sx={{ fontSize: '28px' }}>
            Add Schedule
          </Typography>
          <TextField
            required
            id="scheduleTitle"
            label="Title"
            name="scheduleTitle"
            value={scheduleTitle}
            onChange={(e) => setScheduleTitle(e.target.value)}
            variant="outlined"
            sx={{
              width: '100%',
              marginTop: '15px',
              '& .MuiInputBase-input': { height: '20px' },
            }}
          />
          <FormControl sx={{ width: '100%', marginTop: '15px' }}>
            <InputLabel id="eventType-label">Event Type</InputLabel>
            <Select
              required
              disabled={disableEvent}
              labelId="eventType-label"
              id="eventType-select"
              value={eventType}
              label="Event Type"
              onChange={(e) => setEventType(e.target.value)}
              sx={{
                height: '45px',
              }}
            >
              {eventTypes.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box
            sx={{
              width: '100%',
              marginTop: '15px',
            }}
          >
            <Box
              sx={{
                height: '60px',
                overflowY: 'auto',
                border: '1px solid #c4c4c4',
                borderRadius: '4px',
              }}
            >
              <Autocomplete
                multiple
                disabled={disableEvent}
                id="scheduleEvent"
                inputValue={eventInputValue}
                options={eventOptions || []}
                getOptionLabel={(option) => (option ? option.title : '')}
                onChange={(e, val) => handleSelectChange('scheduleEvent', val)}
                onFocus={(e) => handleFocus(e, 'scheduleEvent')}
                onClose={() => setEventInputValue('')}
                value={eventValue}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    required
                    onChange={(e) => handleInputChange(e, 'scheduleEvent')}
                    name="scheduleEvent"
                    placeholder="Select Event"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          border: '0',
                        },
                      },
                    }}
                  />
                )}
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginTop: '15px' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Start Date Time"
                value={startDateTime ? dayjs.unix(startDateTime).format('MM/DD/YYYY hh:mm a') : ''}
                onChange={(newValue) => handleDateChange('scheduleStartTimeInput', newValue)}
                renderInput={(params) => <TextField required id="scheduleStartTimeInput" {...params} sx={{ width: '100%' }} />}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="End Date Time"
                value={endDateTime ? dayjs.unix(endDateTime).format('MM/DD/YYYY hh:mm a') : ''}
                onChange={(newValue) => handleDateChange('scheduleEndTimeInput', newValue)}
                renderInput={(params) => <TextField required id="scheduleEndTimeInput" {...params} sx={{ width: '100%' }} />}
              />
            </LocalizationProvider>
          </Box>
          <Box
            sx={{
              width: '100%',
              marginTop: '15px',
            }}
          >
            <Box
              sx={{
                height: '60px',
                overflowY: 'auto',
                border: '1px solid #c4c4c4',
                borderRadius: '4px',
              }}
            >
              <Autocomplete
                multiple
                id="scheduleVenue"
                inputValue={venueInputValue}
                options={venueOptions || []}
                getOptionLabel={(option) => (option ? option.title : '')}
                onChange={(e, val) => handleSelectChange('scheduleVenue', val)}
                onFocus={(e) => handleFocus(e, 'scheduleVenue')}
                onClose={() => setVenueInputValue('')}
                value={venueValue}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    onChange={(e) => handleInputChange(e, 'scheduleVenue')}
                    name="scheduleVenue"
                    placeholder="Select Venue"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          border: '0',
                        },
                      },
                    }}
                  />
                )}
              />
            </Box>
          </Box>
          <LoadingButton
            id="saveSchedule"
            onClick={saveSchedule}
            loading={loading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
            sx={{
              width: 200,
              height: 50,
              fontWeight: 500,
              fontSize: '14px',
              marginTop: '30px',
              borderRadius: '50px',
              '&:hover': {
                backgroundColor: 'primary.main',
                color: '#FFFFFF',
              },
            }}
          >
            Save Schedule
          </LoadingButton>
        </Box>
      </Modal>
    </div>
  )
}
