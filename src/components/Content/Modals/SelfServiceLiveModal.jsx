import React from 'react'
import { Button, FormGroup, InputLabel, MenuItem, Select, Switch, TextField, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import contentData from 'src/json/contentData.json'
import LoadingButton from '@mui/lab/LoadingButton'
import SaveIcon from '@mui/icons-material/Save'
import DeleteIcon from '@mui/icons-material/Delete'
import useViewliftLive from 'src/hooks/Content/useViewliftLive'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 600,
  minHeight: 300,
  maxHeight: 750,
  overflowY: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: '20px',
  borderRadius: '5px',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

export default function SelfServiceLiveModal({ open, close }) {
  const {
    lowLatency,
    setLowLatency,
    latencyChannelType,
    setLatencyChannelType,
    awsRegion,
    setAwsRegion,
    awsRegionOptions,
    liveProtocol,
    setLiveProtocol,
    loading,
    primaryHlsUrl,
    setPrimaryHlsUrl,
    primaryHlsUsername,
    setPrimaryHlsUsername,
    primaryHlsPassword,
    setPrimaryHlsPassword,
    secondaryHlsUrl,
    setSecondaryHlsUrl,
    secondaryHlsUsername,
    setSecondaryHlsUsername,
    secondaryHlsPassword,
    setSecondaryHlsPassword,
    primaryStreamKeyPrefix,
    setPrimaryStreamKeyPrefix,
    primaryStreamKeySuffix,
    setPrimaryStreamKeySuffix,
    secondaryStreamKeyPrefix,
    setSecondaryStreamKeyPrefix,
    secondaryStreamKeySuffix,
    setSecondaryStreamKeySuffix,
    whitelistRtmpIps,
    setWhitelistRtmpIps,
    whitelistIp,
    setWhitelistIp,
    primaryFlowArn,
    setPrimaryFlowArn,
    backupFlowArn,
    setBackupFlowArn,
    sourceDecryptionSettings,
    setSourceDecryptionSettings,
    encryptionString,
    setEncryptionString,
    slateSettings,
    setSlateSettings,
    blankingUrl,
    setBlankingUrl,
    captionSettings,
    setCaptionSettings,
    captionSelectors,
    setCaptionSelectors,
    runtimeVal,
    setRuntimeVal,
    isDRM,
    setIsDRM,
    slateScheduled,
    setSlateScheduled,
    ssaiRequired,
    setSsaiRequired,
    liveToVod,
    setLiveToVod,
    ssaiAdTag,
    setSsaiAdTag,
    preRollAdTag,
    setPreRollAdTag,
    preRollDuration,
    setPreRollDuration,
    backupEndpointRequired,
    setBackupEndpointRequired,
    isDVR,
    setIsDVR,
    startOverTime,
    setStartOverTime,
    errors,
    updateFieldValue,
    handleDeleteField,
    createViewliftLiveStream,
  } = useViewliftLive()

  return (
    <div>
      <Modal open={open} onClose={close} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" sx={{ overflowY: 'auto' }}>
        <Box sx={style}>
          <Typography id="selfService-live-modal-title" variant="h6" component="h2" sx={{ fontSize: '28px' }}>
            Viewlift Live Stream
          </Typography>
          <FormControl sx={{ marginTop: '15px' }}>
            <FormLabel id="lowLatency-radio-buttons-group">Do you require low latency?</FormLabel>
            <RadioGroup
              aria-labelledby="lowLatency-radio-buttons-group"
              name="lowLatency-radio-buttons-group"
              value={lowLatency}
              onChange={(e) => setLowLatency(e.target.value)}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" sx={{ justifyContent: 'center' }} />
              <FormControlLabel value="no" control={<Radio />} label="No" sx={{ justifyContent: 'center' }} />
            </RadioGroup>
          </FormControl>
          <Box sx={{ width: '100%', borderBottom: '1px solid #9c9c9c', marginTop: '10px' }}></Box>
          {lowLatency == 'yes' && (
            <FormControl sx={{ marginTop: '15px' }}>
              <FormLabel id="latencyChannelType-radio-buttons-group">Channel Type</FormLabel>
              <RadioGroup
                aria-labelledby="latencyChannelType-radio-buttons-group"
                name="latencyChannelType-radio-buttons-group"
                value={latencyChannelType}
                onChange={(e) => setLatencyChannelType(e.target.value)}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '40px',
                  marginTop: '10px',
                }}
              >
                <FormControlLabel
                  value="STANDARD"
                  control={<Radio />}
                  label="STANDARD: Broadcast and deliver live video in up to Full HD. The maximum input is 8.5 Mbps and 1080p resolution (Full HD)."
                  sx={{
                    width: '300px',
                    textAlign: 'initial',
                  }}
                />
                <FormControlLabel
                  value="BASIC"
                  control={<Radio />}
                  label="BASIC: Broadcast and deliver live video in up to SD. The maximum input is 1.5 Mbps and 480p resolution (SD)."
                  sx={{
                    width: '300px',
                    textAlign: 'initial',
                  }}
                />
              </RadioGroup>
              <Box sx={{ width: '100%', borderBottom: '1px solid #9c9c9c', marginTop: '10px' }}></Box>
            </FormControl>
          )}
          <FormControl sx={{ width: '100%', marginTop: '15px' }}>
            <InputLabel id="awsRegion-label">AWS Region</InputLabel>
            <Select
              labelId="awsRegion-label"
              id="awsRegion-select"
              value={awsRegion}
              label="AWS Region"
              onChange={(e) => setAwsRegion(e.target.value)}
            >
              {awsRegionOptions.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {lowLatency == 'no' && (
            <Box sx={{ width: '100%' }}>
              <FormControl sx={{ width: '100%', marginTop: '15px' }}>
                <InputLabel id="liveProtocol-label">Protocols</InputLabel>
                <Select
                  labelId="liveProtocol-label"
                  id="liveProtocol-select"
                  value={liveProtocol}
                  label="Protocols"
                  onChange={(e) => setLiveProtocol(e.target.value)}
                >
                  {contentData.liveProtocols.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {(liveProtocol == 'HLS_PULL' || liveProtocol == 'RTMP_PULL') && (
                <Box
                  className="hls-details"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '15px',
                    gap: '15px',
                    width: '100%',
                  }}
                >
                  <Box className="hls-primary-details" sx={{ width: '100%' }}>
                    <TextField
                      required
                      id="primary_hls_url"
                      label="Primary Source URL"
                      name="primary_hls_url"
                      value={primaryHlsUrl}
                      onChange={(e) => setPrimaryHlsUrl(e.target.value)}
                      variant="outlined"
                      sx={{
                        width: '100%',
                        '& .MuiInputBase-input': { height: '20px' },
                      }}
                    />
                    <TextField
                      id="primary_username"
                      label="Primary URL Username (Optional)"
                      name="primary_username"
                      value={primaryHlsUsername}
                      onChange={(e) => setPrimaryHlsUsername(e.target.value)}
                      variant="outlined"
                      sx={{
                        width: '100%',
                        marginTop: '15px',
                        '& .MuiInputBase-input': { height: '20px' },
                      }}
                    />
                    <TextField
                      id="primary_password"
                      label="Primary URL Password (Optional)"
                      name="primary_password"
                      value={primaryHlsPassword}
                      onChange={(e) => setPrimaryHlsPassword(e.target.value)}
                      variant="outlined"
                      sx={{
                        width: '100%',
                        marginTop: '15px',
                        '& .MuiInputBase-input': { height: '20px' },
                      }}
                    />
                  </Box>
                  <Box className="hls-secondary-details" sx={{ width: '100%' }}>
                    <TextField
                      id="secondary_hls_url"
                      label="Secondary Source URL"
                      name="secondary_hls_url"
                      value={secondaryHlsUrl}
                      onChange={(e) => setSecondaryHlsUrl(e.target.value)}
                      variant="outlined"
                      sx={{
                        width: '100%',
                        '& .MuiInputBase-input': { height: '20px' },
                      }}
                    />
                    <TextField
                      id="secondary_username"
                      label="Secondary URL Username (Optional)"
                      name="secondary_username"
                      value={secondaryHlsUsername}
                      onChange={(e) => setSecondaryHlsUsername(e.target.value)}
                      variant="outlined"
                      sx={{
                        width: '100%',
                        marginTop: '15px',
                        '& .MuiInputBase-input': { height: '20px' },
                      }}
                    />
                    <TextField
                      id="secondary_password"
                      label="Secondary URL Password (Optional)"
                      name="secondary_password"
                      value={secondaryHlsPassword}
                      onChange={(e) => setSecondaryHlsPassword(e.target.value)}
                      variant="outlined"
                      sx={{
                        width: '100%',
                        marginTop: '15px',
                        '& .MuiInputBase-input': { height: '20px' },
                      }}
                    />
                  </Box>
                </Box>
              )}
              {liveProtocol == 'RTMP_PUSH' && (
                <Box
                  className="rtmp-streamKey-details"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '15px',
                    gap: '15px',
                    width: '100%',
                  }}
                >
                  <Box className="primary-streamKey-details" sx={{ width: '100%' }}>
                    <TextField
                      required
                      id="primary_streamKey_prefix"
                      label="Primary Stream Keys Prefix"
                      name="primary_streamKey_prefix"
                      value={primaryStreamKeyPrefix}
                      onChange={(e) => setPrimaryStreamKeyPrefix(e.target.value)}
                      variant="outlined"
                      sx={{
                        width: '100%',
                        '& .MuiInputBase-input': { height: '20px' },
                      }}
                    />
                    <TextField
                      required
                      id="primary_streamKey_suffix"
                      label="Primary Stream Keys Suffix"
                      name="primary_streamKey_suffix"
                      value={primaryStreamKeySuffix}
                      onChange={(e) => setPrimaryStreamKeySuffix(e.target.value)}
                      variant="outlined"
                      sx={{
                        width: '100%',
                        marginTop: '15px',
                        '& .MuiInputBase-input': { height: '20px' },
                      }}
                    />
                  </Box>
                  <Box className="secondary-streamKey-details" sx={{ width: '100%' }}>
                    <TextField
                      id="secondary_streamKey_prefix"
                      label="Secondary Stream Keys Prefix"
                      name="secondary_streamKey_prefix"
                      value={secondaryStreamKeyPrefix}
                      onChange={(e) => setSecondaryStreamKeyPrefix(e.target.value)}
                      variant="outlined"
                      sx={{
                        width: '100%',
                        '& .MuiInputBase-input': { height: '20px' },
                      }}
                    />
                    <TextField
                      id="secondary_streamKey_suffix"
                      label="Secondary Stream Keys Suffix"
                      name="secondary_streamKey_suffix"
                      value={secondaryStreamKeySuffix}
                      onChange={(e) => setSecondaryStreamKeySuffix(e.target.value)}
                      variant="outlined"
                      sx={{
                        width: '100%',
                        marginTop: '15px',
                        '& .MuiInputBase-input': { height: '20px' },
                      }}
                    />
                  </Box>
                </Box>
              )}
              {(liveProtocol == 'RTMP_PUSH' || liveProtocol == 'RTP_PUSH') && (
                <TextField
                  id="whitelist_ips_rtmp"
                  label="Enter IPv4 IPs To Be Whitelisted (comma seperated)"
                  name="whitelist_ips_rtmp"
                  value={whitelistRtmpIps}
                  onChange={(e) => setWhitelistRtmpIps(e.target.value)}
                  variant="outlined"
                  sx={{
                    width: '100%',
                    marginTop: '15px',
                    '& .MuiInputBase-input': { height: '20px' },
                  }}
                />
              )}
              {(liveProtocol == 'ZIXI_PUSH' || liveProtocol == 'SRT_LISTENER') && (
                <TextField
                  id="whitelist_ip_rtp"
                  label="Enter IPv4 IP To Be Whitelisted"
                  name="whitelist_ip_rtp"
                  value={whitelistIp}
                  onChange={(e) => setWhitelistIp(e.target.value)}
                  variant="outlined"
                  sx={{
                    width: '100%',
                    marginTop: '15px',
                    '& .MuiInputBase-input': { height: '20px' },
                  }}
                />
              )}
              {liveProtocol == 'MEDIACONNECT_FLOW' && (
                <TextField
                  id="primary_flow_arn"
                  label="Primary Flow Arn"
                  name="primary_flow_arn"
                  value={primaryFlowArn}
                  onChange={(e) => setPrimaryFlowArn(e.target.value)}
                  variant="outlined"
                  sx={{
                    width: '100%',
                    marginTop: '15px',
                    '& .MuiInputBase-input': { height: '20px' },
                  }}
                />
              )}
              {liveProtocol == 'MEDIACONNECT_FLOW' && (
                <TextField
                  id="backup_flow_arn"
                  label="Backup Flow Arn"
                  name="backup_flow_arn"
                  value={backupFlowArn}
                  onChange={(e) => setBackupFlowArn(e.target.value)}
                  variant="outlined"
                  sx={{
                    width: '100%',
                    marginTop: '15px',
                    '& .MuiInputBase-input': { height: '20px' },
                  }}
                />
              )}
              <Box sx={{ display: 'none', width: '100%', marginTop: '15px' }}>
                <FormControl sx={{ width: '100%' }}>
                  <InputLabel id="sourceDecryption-label">Source Decryption Settings</InputLabel>
                  <Select
                    labelId="sourceDecryption-label"
                    id="sourceDecryption-select"
                    value={sourceDecryptionSettings}
                    label="Source Decryption Settings"
                    onChange={(e) => setSourceDecryptionSettings(e.target.value)}
                  >
                    {contentData.sourceDecryptionSettings.map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {sourceDecryptionSettings && (
                  <TextField
                    id="encryptionString"
                    label="Enter Encryption String"
                    name="encryptionString"
                    value={encryptionString}
                    onChange={(e) => setEncryptionString(e.target.value)}
                    variant="outlined"
                    sx={{
                      width: '100%',
                      marginTop: '15px',
                      '& .MuiInputBase-input': { height: '20px' },
                    }}
                  />
                )}
              </Box>
              {(liveProtocol == 'HLS_PULL' || liveProtocol == 'RTP_PUSH' || liveProtocol == 'ZIXI_PUSH' || liveProtocol == 'SRT_LISTENER') && (
                <Box sx={{ width: '100%', marginTop: '15px' }}>
                  <FormControl sx={{ width: '100%' }}>
                    <InputLabel id="slateSettings-label">Slate Settings</InputLabel>
                    <Select
                      labelId="slateSettings-label"
                      id="slateSettings-select"
                      value={slateSettings}
                      label="Slate Settings"
                      onChange={(e) => setSlateSettings(e.target.value)}
                    >
                      <MenuItem value="">Select One...</MenuItem>
                      <MenuItem value="SPLICE_INSERT">Splice Insert</MenuItem>
                      <MenuItem value="TIME_SIGNAL_APOS">Time Signal Apos</MenuItem>
                    </Select>
                  </FormControl>
                  {slateSettings && (
                    <TextField
                      id="blankingUrl"
                      label="Enter Blanking URL"
                      name="blankingUrl"
                      value={blankingUrl}
                      onChange={(e) => setBlankingUrl(e.target.value)}
                      variant="outlined"
                      sx={{
                        width: '100%',
                        marginTop: '15px',
                        '& .MuiInputBase-input': { height: '20px' },
                      }}
                    />
                  )}
                </Box>
              )}
              {liveProtocol && (
                <Box sx={{ width: '100%', marginTop: '15px' }}>
                  <FormControl sx={{ width: '100%' }}>
                    <InputLabel id="captionSettings-label">Caption Settings</InputLabel>
                    <Select
                      labelId="captionSettings-label"
                      id="captionSettings-select"
                      value={captionSettings}
                      label="Caption Settings"
                      onChange={(e) => setCaptionSettings(e.target.value)}
                    >
                      <MenuItem value="">Select One...</MenuItem>
                      <MenuItem value="EMBEDDED_TO_VTT">Embedded To VTT</MenuItem>
                    </Select>
                  </FormControl>
                  {captionSettings && (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        alignItems: 'center',
                        width: '100%',
                      }}
                    >
                      <Box
                        className="captionSelectors-block"
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '15px',
                          width: '100%',
                          marginTop: '15px',
                        }}
                      >
                        {captionSelectors.map((item, index) => (
                          <Box key={index} className={`captionSelectors-column column-${index}`}>
                            <Box
                              className="language-channel-block"
                              sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: '15px',
                              }}
                            >
                              <TextField
                                id={`languageDescription-${index}`}
                                label="Language"
                                value={item.languageDescription || ''}
                                onChange={(e) => updateFieldValue(index, 'languageDescription', e.target.value)}
                                variant="outlined"
                                sx={{
                                  width: '100%',
                                  marginTop: '0px',
                                  '& .MuiInputBase-input': { height: '20px' },
                                }}
                              />
                              <TextField
                                id={`channelNumber-${index}`}
                                label="Channel Number"
                                value={item.channelNumber || ''}
                                onChange={(e) => updateFieldValue(index, 'channelNumber', e.target.value)}
                                variant="outlined"
                                sx={{
                                  width: '100%',
                                  marginTop: '0px',
                                  '& .MuiInputBase-input': { height: '20px' },
                                }}
                              />
                              {index != 0 ? (
                                <div
                                  className="delete-languageChannelBlock"
                                  data-index={index}
                                  onClick={() => handleDeleteField(index)}
                                  style={{
                                    cursor: 'pointer',
                                  }}
                                >
                                  <DeleteIcon />
                                </div>
                              ) : (
                                <div
                                  className="delete-languageChannelBlock"
                                  data-index={index}
                                  style={{
                                    visibility: 'hidden',
                                  }}
                                >
                                  <DeleteIcon />
                                </div>
                              )}
                            </Box>
                          </Box>
                        ))}
                      </Box>
                      <Button
                        id="addCaptionSelectors"
                        variant="outlined"
                        onClick={() => setCaptionSelectors((prev) => [...prev, { languageDescription: null, channelNumber: null }])}
                        sx={{
                          width: 150,
                          height: 35,
                          marginLeft: '18px',
                          fontWeight: 500,
                          fontSize: '14px',
                          '&:hover': {
                            backgroundColor: 'primary.main',
                            color: '#FFFFFF',
                          },
                        }}
                      >
                        Add Block
                      </Button>
                    </Box>
                  )}
                </Box>
              )}
              {liveProtocol && (
                <TextField
                  id="runtimeVal"
                  label="Enter Runtime"
                  name="runtimeVal"
                  value={runtimeVal}
                  onChange={(e) => setRuntimeVal(e.target.value)}
                  variant="outlined"
                  sx={{
                    width: '100%',
                    marginTop: '15px',
                    '& .MuiInputBase-input': { height: '20px' },
                  }}
                />
              )}
              {liveProtocol && (
                <Box
                  className="advance-features"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '15px',
                    gap: '15px',
                    width: '100%',
                  }}
                >
                  <FormGroup>
                    <FormControlLabel
                      control={<Switch checked={isDRM} name="isDrmEnabled" onChange={(e) => setIsDRM(e.currentTarget.checked)} />}
                      label="Enable DRM"
                    />
                  </FormGroup>
                  {(liveProtocol == 'HLS_PULL' || liveProtocol == 'RTMP_PUSH' || liveProtocol == 'RTP_PUSH' || liveProtocol == 'ZIXI_PUSH') && (
                    <FormGroup sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '15px' }}>
                      <FormControlLabel
                        control={
                          <Switch checked={slateScheduled} name="slateScheduled" onChange={(e) => setSlateScheduled(e.currentTarget.checked)} />
                        }
                        label="Slate Scheduled"
                      />
                      <FormControlLabel
                        control={<Switch checked={ssaiRequired} name="ssaiRequired" onChange={(e) => setSsaiRequired(e.currentTarget.checked)} />}
                        label="SSAI Required"
                      />
                    </FormGroup>
                  )}
                  <FormGroup>
                    <FormControlLabel
                      control={<Switch checked={liveToVod} name="liveToVod" onChange={(e) => setLiveToVod(e.currentTarget.checked)} />}
                      label="Live To VOD Conversion"
                    />
                  </FormGroup>
                </Box>
              )}
              {(ssaiRequired || slateScheduled) &&
                ssaiRequired &&
                (liveProtocol == 'HLS_PULL' || liveProtocol == 'RTMP_PUSH' || liveProtocol == 'RTP_PUSH' || liveProtocol == 'ZIXI_PUSH') && (
                  <Box sx={{ width: '100%', marginTop: '15px' }}>
                    <TextField
                      id="ssai_adTag_url"
                      label="SSAI Ad Tag URL"
                      name="ssai_adTag_url"
                      value={ssaiAdTag}
                      onChange={(e) => setSsaiAdTag(e.target.value)}
                      variant="outlined"
                      sx={{
                        width: '100%',
                        '& .MuiInputBase-input': { height: '20px' },
                      }}
                    />
                    <Box
                      className="preRoll-ad-settings"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: '15px',
                        gap: '15px',
                        width: '100%',
                      }}
                    >
                      <TextField
                        id="preRoll_adTag_url"
                        label="PreRoll Ad Tag URL"
                        name="preRoll_adTag_url"
                        value={preRollAdTag}
                        onChange={(e) => setPreRollAdTag(e.target.value)}
                        variant="outlined"
                        sx={{
                          width: '100%',
                          '& .MuiInputBase-input': { height: '20px' },
                        }}
                      />
                      <TextField
                        id="preRoll_duration"
                        label="PreRoll Duration"
                        name="preRoll_duration"
                        value={preRollDuration}
                        onChange={(e) => setPreRollDuration(e.target.value)}
                        variant="outlined"
                        sx={{
                          width: '100%',
                          '& .MuiInputBase-input': { height: '20px' },
                        }}
                      />
                    </Box>
                  </Box>
                )}
              {(liveProtocol == 'ZIXI_PUSH' || liveProtocol == 'SRT_LISTENER') && (
                <FormGroup sx={{ marginTop: '15px' }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={backupEndpointRequired}
                        name="backupEndpointRequired"
                        onChange={(e) => setBackupEndpointRequired(e.currentTarget.checked)}
                      />
                    }
                    label="Backup Endpoint Required"
                  />
                </FormGroup>
              )}
              {liveProtocol && (
                <Box sx={{ width: '100%', marginTop: '15px' }}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Switch checked={isDVR} name="isDvrEnabled" onChange={(e) => setIsDVR(e.currentTarget.checked)} />}
                      label="Enable DVR"
                    />
                  </FormGroup>
                  {isDVR && (
                    <TextField
                      required
                      id="startOverTime"
                      label="Start Over Window (in sec)"
                      name="startOverTime"
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
                </Box>
              )}
            </Box>
          )}
          <LoadingButton
            id="createSelfServiceLive"
            onClick={() => createViewliftLiveStream()}
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
          <Box sx={{ width: '100%', marginTop: '15px' }}>
            {errors.map((ele, i) => (
              <Typography key={i} sx={{ fontSize: '14px' }}>
                {ele}
              </Typography>
            ))}
          </Box>
        </Box>
      </Modal>
    </div>
  )
}
