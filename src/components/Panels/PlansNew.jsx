import React, { useState, useEffect, useRef } from 'react'
import { Box } from '@mui/material'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import TextField from '@mui/material/TextField'
import VLTableNew from '../common/VLTableNew'
import columns from '../../json/plansColJson.json'
import usePlanss from 'src/hooks/usePlanss'
import VLLoaderWrapper from '../common/VLLoaderWrapper'
import Popup from '../common/Popup'
import VersionHistory from '../VersionHistory'
import ChoosePlanType from '../ChoosePlanType'

const PlansNew = () => {
  const {
    loading,
    data,
    getPlans,
    handlePrev,
    handleNext,
    refineTableDataForPlans,
    actionListObject,
    headerActionsAndIconObject,
  } = usePlanss()

  const [nameOrder, setNameOrder] = useState(false)
  const [descriptionOrder, setdescriptionOrder] = useState(false)
  const [monetizationModelOrder, setMonetizationModelOrder] = useState(false)
  const [allVisible, setallVisible] = useState(null)
  const [allCountryOrder, setAllCountryOrder] = useState(false)
  const lastClickedSortedOption = useRef()
  const [offSet, setOffSet] = useState(0)
  const [showVersionHistory, setShowVersionHistory] = useState(false)
  const [dateOrder, setDateOrder] = useState(false)
  const [frequency, setFrequency] = useState(false)
  const [choosePlanType, setchoosePlanType] = useState(false)

  useEffect(() => {
    if (allVisible) {
      getPlans({
        status: allVisible,
        ...lastClickedSortedOption.current,
        offset: offSet,
      })
    }

    // return () => {}
  }, [allVisible])

  const refinedTableData = refineTableDataForPlans(data)

  const actionList = actionListObject({ setShowVersionHistory })

  const selectForHeaderVisible = () => {
    return (
      <select
        required
        id="modelTypeId"
        name="type"
        value={allVisible || ''}
        onChange={(e) => {
          setallVisible(e.target.value)
        }}
      >
        <option value={1}>Visible</option>
        <option value={0}>NA</option>
        <option value={2}>Invisble</option>
        <option value={3}>Visible & Invisble both</option>
      </select>
    )
  }

  const headerActionsAndIcon = headerActionsAndIconObject({
    nameOrder,
    setNameOrder,
    lastClickedSortedOption,
    offSet,
    descriptionOrder,
    setdescriptionOrder,
    allCountryOrder,
    setAllCountryOrder,
    selectForHeaderVisible,
    monetizationModelOrder,
    setMonetizationModelOrder,
    dateOrder,
    setDateOrder,
    frequency,
    setFrequency,
  })

  return (
    <Box
      padding={2}
      marginTop={2}
      sx={{ border: 1, borderColor: '#cfcfcf', borderRadius: '10px' }}
    >
      {showVersionHistory && (
        <Popup
          setPopup={setShowVersionHistory}
          heading="Version History"
          popUpOpen={showVersionHistory}
        >
          <VersionHistory />
        </Popup>
      )}

      {choosePlanType && (
        <Popup
          heading="Please choose Plan Monetisation Type"
          setPopup={setchoosePlanType}
          popUpOpen={choosePlanType}
        >
          <ChoosePlanType />
        </Popup>
      )}

      <Box
        className="plansNewHeader"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '25px',
        }}
      >
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <Button
            color="primary"
            variant="contained"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Box sx={{ position: 'relative', top: '3px' }}>
              <AddIcon />
            </Box>
            <Box
              onClick={() => {
                setchoosePlanType(true)
              }}
            >
              New Plan
            </Box>
          </Button>
        </Box>
        <TextField
          required
          id="outlined-error"
          label="Please enter Model name"
          name="name"
          sx={{ minWidth: '30%' }}
        />
      </Box>

      <Box>
        <VLLoaderWrapper loading={loading}></VLLoaderWrapper>

        {!loading && (
          <VLTableNew
            columns={columns}
            data={refinedTableData}
            actionList={actionList}
            headerActionsAndIcon={headerActionsAndIcon}
            handlePrev={() => {
              handlePrev({
                allVisible,
                offSet,
                setOffSet,
                lastClickedSortedOption,
              })
            }}
            handleNext={() => {
              handleNext({
                allVisible,
                offSet,
                setOffSet,
                lastClickedSortedOption,
              })
            }}
            offSet={offSet}
          />
        )}
      </Box>
    </Box>
  )
}

export default PlansNew
