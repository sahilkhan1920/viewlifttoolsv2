import React, { useEffect } from 'react'
import { FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, Switch, TextField, Typography } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import SaveIcon from '@mui/icons-material/Save'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import dayjs from 'dayjs'
import moment from 'moment'
import { getApiType } from 'src/helpers/contentHelper'
import { CONTENT_LIVE_URL } from 'src/constants/urlConstants'
import fetchHelper from 'src/helpers/fetchHelper'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'

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

export default function ThirdPartyLiveModal({ open, close }) {
  const [cookies] = useCookies()
  const router = useRouter()
  const drmProviders = [
    {
      name: 'AXINOM',
      value: 'AXINOM',
    },
    {
      name: 'EZDRM',
      value: 'EZDRM',
    },
  ]
  const [drmProvider, setDrmProvider] = React.useState('AXINOM')
  const [thirdPartyTitle, setThirdPartyTitle] = React.useState('')
  const [thirdPartyUrl, setThirdPartyUrl] = React.useState('')
  const [isDRM, setIsDRM] = React.useState(false)
  const [isDVR, setIsDVR] = React.useState(false)
  const [showStartOverTime, setShowStartOverTime] = React.useState(false)
  const [startOverTime, setStartOverTime] = React.useState('')
  const [startDateTime, setStartDateTime] = React.useState('')
  const [startTime, setStartTime] = React.useState('')
  const [startDate, setStartDate] = React.useState('')
  const [endDateTime, setEndDateTime] = React.useState('')
  const [endTime, setEndTime] = React.useState('')
  const [endDate, setEndDate] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  useEffect(() => {
    setShowStartOverTime(isDVR)
    // eslint-disable-next-line
  }, [isDVR])

  const handleDateChange = (fieldBox) => {
    var arr = []
    if (fieldBox == 'startDateTimeBox') {
      const startDateTimeField = document.getElementById('startTimeInput')
      const startDateTimeValue = startDateTimeField.value.split(' ')
      for (let i = 0; i < startDateTimeValue.length; i++) {
        arr.push(startDateTimeValue[i])
      }
      let scheduleStartDate = arr[0]
      scheduleStartDate = moment(scheduleStartDate).format('YYYY-MM-DD')
      const scheduleStartTime = arr[1] + ' ' + arr[2]
      setStartDate(scheduleStartDate)
      setStartTime(scheduleStartTime)
    } else {
      const endDateTimeField = document.getElementById('endTimeInput')
      const endDateTimeValue = endDateTimeField.value.split(' ')
      for (let i = 0; i < endDateTimeValue.length; i++) {
        arr.push(endDateTimeValue[i])
      }
      let scheduleEndDate = arr[0]
      scheduleEndDate = moment(scheduleEndDate).format('YYYY-MM-DD')
      const scheduleEndTime = arr[1] + ' ' + arr[2]
      setEndDate(scheduleEndDate)
      setEndTime(scheduleEndTime)
    }
  }

  const createThirdPartyLive = () => {
    setLoading(true)
    var thirdPartyLiveObject = {
      autoPublish: false,
      videoAssets: {
        type: 'videoAsset',
        hls: thirdPartyUrl,
        hlsDetail: {
          url: thirdPartyUrl,
          fileSize: null,
        },
      },
      title: thirdPartyTitle,
      generalConfiguration: {},
    }
    if (startDateTime) {
      thirdPartyLiveObject['scheduleStartDate'] = startDate
      thirdPartyLiveObject['scheduleStartTime'] = startTime
    }
    if (endDateTime) {
      thirdPartyLiveObject['scheduleEndDate'] = endDate
      thirdPartyLiveObject['scheduleEndTime'] = endTime
    }
    if (isDVR) {
      thirdPartyLiveObject.generalConfiguration['DVRConfig'] = {
        startOverTime: parseInt(startOverTime),
        isDvrEnabled: isDVR,
      }
    }
    fetchHelper({
      url: CONTENT_LIVE_URL,
      method: 'POST',
      data: thirdPartyLiveObject,
      headers: {
        xApiKey: cookies.managementXApiKey,
        Authorization: cookies.accessToken,
      },
    }).then(function (result) {
      if (result && result.status == 200) {
        setLoading(false)
        const apiType = getApiType(result)
        router.push({
          pathname: `/content/[contentType]/[id]`,
          query: { contentType: apiType, id: result.guid },
        })
      } else {
        setLoading(false)
      }
    }).catch(function() {
      setLoading(false)
    })
  }

  return (
    <div>
      <Modal open={open} onClose={close} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="thirdParty-live-modal-title" variant="h6" component="h2" sx={{ fontSize: '28px' }}>
            Third Party Live Stream
          </Typography>
          <TextField
            required
            id="thirdPartyTitle"
            label="Live Event Title"
            name="thirdPartyTitle"
            value={thirdPartyTitle}
            onChange={(e) => setThirdPartyTitle(e.target.value)}
            variant="outlined"
            sx={{
              width: '100%',
              marginTop: '15px',
              '& .MuiInputBase-input': { height: '20px' },
            }}
          />
          <TextField
            required
            id="thirdPartyUrl"
            label="Live Stream URL (HLS)"
            name="thirdPartyUrl"
            value={thirdPartyUrl}
            onChange={(e) => setThirdPartyUrl(e.target.value)}
            variant="outlined"
            sx={{
              width: '100%',
              marginTop: '15px',
              '& .MuiInputBase-input': { height: '20px' },
            }}
          />
          <Box
            sx={{
              display: 'none',
              alignItems: 'center',
              marginTop: '20px',
            }}
          >
            <FormGroup>
              <FormControlLabel
                control={<Switch checked={isDRM} name="isDrmEnabled" onChange={(e) => setIsDRM(e.currentTarget.checked)} />}
                label="Enable DRM"
              />
            </FormGroup>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel id="drmProvider-label">DRM Provider</InputLabel>
              <Select
                labelId="drmProvider-label"
                id="drmProvider-select"
                value={drmProvider}
                label="DRM Providers"
                onChange={(e) => setDrmProvider(e.target.value)}
                sx={{
                  height: '45px',
                }}
              >
                {drmProviders.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <FormGroup sx={{ marginTop: '15px' }}>
            <FormControlLabel
              control={<Switch checked={isDVR} name="isDvrEnabled" onChange={(e) => setIsDVR(e.currentTarget.checked)} />}
              label="Enable DVR"
            />
          </FormGroup>
          {showStartOverTime && (
            <TextField
              required
              id="thirdParty_StartOverTime"
              label="Start Over Window (in sec)"
              name="thirdParty_StartOverTime"
              value={startOverTime}
              onChange={(e) => setStartOverTime(e.target.value)}
              variant="outlined"
              sx={{
                width: '100%',
                marginTop: '15px',
                '& .MuiInputBase-input': { height: '20px' },
              }}
            />
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '15px' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Start Date Time"
                value={dayjs(startDateTime)}
                onChange={(newValue) => setStartDateTime(newValue)}
                onClose={() => {
                  setTimeout(() => {
                    handleDateChange('startDateTimeBox')
                  }, 1000)
                }}
                renderInput={(params) => <TextField id="startTimeInput" {...params} onBlur={() => handleDateChange('startDateTimeBox')} />}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="End Date Time"
                value={dayjs(endDateTime)}
                onChange={(newValue) => setEndDateTime(newValue)}
                onClose={() => {
                  setTimeout(() => {
                    handleDateChange('endDateTimeBox')
                  }, 1000)
                }}
                renderInput={(params) => <TextField id="endTimeInput" {...params} onBlur={() => handleDateChange('endDateTimeBox')} />}
              />
            </LocalizationProvider>
          </Box>
          <LoadingButton
            id="createThirdPartyLive"
            onClick={createThirdPartyLive}
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
            Create Live Event
          </LoadingButton>
        </Box>
      </Modal>
    </div>
  )
}
