import React, { useState } from 'react'
import useManageAcceptableOffer from 'src/hooks/useManageAcceptableOffer'
import VLLoaderWrapper from '../common/VLLoaderWrapper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import moment from 'moment'
import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'

const ManageAcceptableOffer = ({
  setAddedOffers,
  addedOffers,
  handlePopUpChange,
}) => {
  const [offset, setOffset] = useState(0)

  const {
    loading,
    data,
    handlePrev,
    handleNext,
    checkExist,
    removeFromAddedOffer,
    serachInput,
    handleOkay,
    handleCancel,
    addedOffersLocal,
    setAddedOffersLocal,
    checkExistPreApplied,
    preAppliedFalseCondition,
  } = useManageAcceptableOffer({
    offset,
    setOffset,
    addedOffers,
    setAddedOffers,
    handlePopUpChange,
  })

  return (
    <>
      <VLLoaderWrapper loading={loading}></VLLoaderWrapper>
      {serachInput()}
      {!loading && (
        <Box>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Offer Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Availabilty</TableCell>
                  <TableCell>Pre-Applied</TableCell>
                  <TableCell>Acceptable</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.length > 0 ? (
                  data.map((item) => {
                    const {
                      offerDetails: {
                        offerLimit: { offerLimitType = '' },
                      },
                    } = item

                    return (
                      <TableRow
                        key={item.name}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {item.name}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {item.status}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {moment(item?.addedDate).format('d MMMM YYYY')}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <input
                            type="checkbox"
                            id={item.id}
                            checked={checkExistPreApplied(item.id)}
                            disabled={
                              offerLimitType === 'PREPAID' ? true : false
                            }
                            onChange={(e) => {
                              const checked = e.target.checked
                              if (checked) {
                                setAddedOffersLocal((prev) => [
                                  ...prev,
                                  { id: item.id, isDefault: true },
                                ])
                              } else {
                                preAppliedFalseCondition(item.id)
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <input
                            type="checkbox"
                            checked={checkExist(item.id)}
                            onChange={(e) => {
                              const checked = e.target.checked
                              if (checked) {
                                setAddedOffersLocal([
                                  ...addedOffersLocal,
                                  { id: item.id, isDefault: false },
                                ])
                              } else {
                                const filteredArray = removeFromAddedOffer(
                                  item.id
                                )
                                setAddedOffersLocal([...filteredArray])
                              }
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    )
                  })
                ) : (
                  <Typography p={3} sx={{ padding: '' }}>
                    No data available in table
                  </Typography>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '20px',
              marginTop: '15px',
            }}
          >
            <Button
              // color=''
              onClick={handlePrev}
              disabled={offset === 0}
            >
              Prev
            </Button>
            <Button onClick={handleNext}>Next</Button>
          </Box>
        </Box>
      )}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginTop: '15px',
        }}
      >
        <Button color="primary" variant="contained" onClick={handleOkay}>
          ok
        </Button>
        <Button variant="outlined" onClick={handleCancel}>
          cancel
        </Button>
      </Box>
    </>
  )
}

export default ManageAcceptableOffer
