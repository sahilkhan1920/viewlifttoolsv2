import { Box, Button, Card, Grid, InputAdornment, OutlinedInput, Typography } from '@mui/material'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { useCookies } from 'react-cookie'
import { INVOKE_V2_API } from 'src/constants/urlConstants'
import fetchHelper from 'src/helpers/fetchHelper'
import { DeviceResponseType, DeviceType } from './DeviceType'
import VLLoaderWrapper from 'src/components/common/VLLoaderWrapper'
import { Mode, Save } from '@mui/icons-material'

export default function DevicesTab({ userId }: { userId: string }) {
  const [cookies] = useCookies()
  const [loading, setLoading] = useState(false)
  const [deviceData, setDeviceData] = useState<DeviceType[] | []>([])
  const [isEditMode, setIsEditMode] = useState(false)

  const fetchUserDevices = useMemo(async (): Promise<DeviceResponseType> => {
    return await fetchHelper({
      method: 'POST',
      url: INVOKE_V2_API,
      data: {
        url: 'user/device',
        method: 'GET',
        role: 'Customer Support',
        auth: {
          site: cookies.site,
          userId,
        },
        query: {
          site: cookies.site,
          userId,
        },
      },
      headers: {
        xapikey: cookies.managementXApiKey,
        Authorization: cookies.accessToken,
      },
    })
  }, [cookies.managementXApiKey, cookies.accessToken, cookies.site, userId])

  function onDeviceNameChange(e: ChangeEvent<HTMLInputElement>) {
    if (!isEditMode) return
    const { id, value } = e.target
    const _value = value.trim()
    if (_value.length === 0) return
    const _updated = deviceData.map((node) => {
      if (node.deviceName === id) {
        return { ...node, deviceName: _value }
      }
      return node
    })
    return setDeviceData(_updated)
  }

  useEffect(() => {
    setLoading(true)
    fetchUserDevices
      .then((res) => {
        if (new Object(res).hasOwnProperty('error')) return setDeviceData([])
        if (res.Items.length === 0) setDeviceData([])
        setDeviceData(res.Items as DeviceType[])
      })
      .catch(() => {
        console.error(`Error in fetch devices`)
        setDeviceData([])
      })
      .finally(() => setLoading(false))
  }, [fetchUserDevices, userId])

  return (
    <Grid container spacing={2} p={2}>
      <VLLoaderWrapper loading={loading}>
        {deviceData.length !== 0 ? (
          deviceData.map((_device) => (
            <Grid key={_device.deviceName} item xs={3}>
              <Card sx={{ padding: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h6">{_device.deviceId}</Typography>
                <OutlinedInput
                  id={_device.deviceName}
                  sx={{ paddingRight: 0 }}
                  value={_device.deviceName}
                  size="small"
                  onChange={onDeviceNameChange}
                  endAdornment={
                    <InputAdornment position="end">
                      {!isEditMode ? (
                        <Button onClick={() => setIsEditMode(true)} size="small">
                          <Mode />
                        </Button>
                      ) : (
                        <Button onClick={() => setIsEditMode(false)} size="small">
                          <Save />
                        </Button>
                      )}
                    </InputAdornment>
                  }
                />
                <Box display="flex" alignItems="center" justifyContent="space-between" gap={2}>
                  <Typography>Date Added</Typography>
                  <Typography>{Intl.DateTimeFormat('en-IN', { dateStyle: 'short' }).format(new Date(_device.addedDate))}</Typography>
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1">No Devices Found</Typography>
        )}
      </VLLoaderWrapper>
    </Grid>
  )
}
