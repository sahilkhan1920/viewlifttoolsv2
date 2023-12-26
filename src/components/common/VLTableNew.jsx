import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Box, TablePagination, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { styled } from '@mui/material/styles'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const VLTableNew = ({
  data,
  columns,
  tableRef,
  actionList,
  headerActionsAndIcon = {},
  handlePrev = false,
  handleNext,
  offSet,
}) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleClick = (id, value, item) => {
    const action = actionList && (id || value) && actionList[value]
    action && action({ id, item })
  }

  if (data?.length === 0)
    return (
      <Typography
        variant="h5"
        color="primary"
        align="center"
        sx={{
          mt: 4,
        }}
      >
        No data available
      </Typography>
    )
  const renderRowData = (val, item) => {
    if (val && typeof val === 'function') {
      if (item.id) {
        return val(item)
      } else {
        return val()
      }
      return val()
    } else if (val && typeof val === 'string' && val.includes('undef')) {
      return 'Na'
    } else {
      return val?.toLocaleString()
    }
  }

  return (
    <Box
      sx={{
        p: {
          xs: 0,
          md: 2,
        },
        width: '100%',
        height: '100%',
      }}
    >
      <TableContainer component={Paper} sx={{ height: '100%' }}>
        <Table
          aria-label="simple table"
          ref={(el) => {
            if (!tableRef) return
            tableRef.current = el
          }}
        >
          <TableHead>
            <StyledTableRow>
              {columns?.map(({ key, title, value }) => (
                <StyledTableCell
                  key={key}
                  title={title}
                  onClick={() => {
                    headerActionsAndIcon[value] &&
                      headerActionsAndIcon[value]?.action &&
                      headerActionsAndIcon[value]?.action()
                  }}
                >
                  {title}
                  {headerActionsAndIcon && headerActionsAndIcon[value]?.icon}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {data
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <StyledTableRow
                  key={row.key}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {columns.map(({ key, value }) => (
                    <StyledTableCell
                      key={key}
                      component="th"
                      scope="row"
                      sx={
                        actionList && actionList[value]
                          ? {
                              cursor: 'pointer',
                              whiteSpace: 'normal',
                              wordBreak: 'break-word',
                              minWidth: '115px',
                            }
                          : {
                              whiteSpace: 'normal',
                              wordBreak: 'break-word',
                              minWidth: '115px',
                            }
                      }
                      onClick={() => {
                        handleClick(row.id, value, row)
                      }}
                    >
                      {renderRowData(row[value], row)}
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {handlePrev ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '20px',
            marginTop: '15px',
          }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={handlePrev}
            disabled={offSet === 0}
          >
            Prev
          </Button>
          <Button color="primary" variant="contained" onClick={handleNext}>
            Next
          </Button>
        </Box>
      ) : (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Box>
  )
}

export default VLTableNew
