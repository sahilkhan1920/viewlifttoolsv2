import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Box, TablePagination, Typography } from '@mui/material'
import { useState } from 'react'
import { styled } from '@mui/material/styles'

interface Data {
  [key: string]: string | number
}
interface Columns {
  key: string
  title: string
  value: string
}
interface TableProps {
  data: Data[]
  columns: Columns[]
  tableRef: {
    current: null | HTMLTableElement
  }
  pagination: boolean
  rows: number
  onRowClick?: any
}

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

const VLTable: React.FC<TableProps> = ({
  data,
  columns,
  tableRef,
  pagination = true,
  onRowClick,
}) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  if (data?.length === 0)
    return (
      <Typography
        variant="h5"
        color="primary"
        align="center"
        sx={{
          mt: 20,
        }}
      >
        No data available
      </Typography>
    )

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
              {columns?.map(({ key, title }) => (
                <StyledTableCell key={key} title={title}>
                  {title}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {data
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <StyledTableRow
                    onClick={
                      onRowClick ? onRowClick.bind(null, row) : undefined
                    }
                    key={`row-${index}`}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    {columns.map(({ key, value }) => (
                      <StyledTableCell key={key} component="th" scope="row">
                        {/* {row[value]?.toLocaleString()} */}
                        {/* <div key={key}>{row[value]}</div> */}
                        {row[value]}
                      </StyledTableCell>
                    ))}
                  </StyledTableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {pagination && (
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

export default VLTable
