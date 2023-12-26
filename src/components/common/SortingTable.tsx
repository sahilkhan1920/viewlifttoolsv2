/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: WIP:: To replace 'any' with strict types
import React, { ReactNode, SyntheticEvent, useState } from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableProps,
  TableRow,
  TableSortLabel,
  Typography,
  useTheme,
} from '@mui/material'
import VLLoaderWrapper from './VLLoaderWrapper'

export type OrderDirection = 'asc' | 'desc'

export interface SortedTablePropType<T = unknown> extends TableProps {
  data: T[]
  columns: { key: keyof T; title: string }[]
  defaultOrderBy: string
  defaultOrderDirection?: OrderDirection
  enablePagination?: boolean
  rowsPerPage?: number
  rowsPerPageOptions?: number[]
  noDataMessage?: string
  headerComponent?: ReactNode
  loadingRowData?: boolean
}
function descendingComparator(a: any, b: any, orderBy: OrderDirection) {
  if (b[orderBy] < a[orderBy]) return -1
  if (b[orderBy] > a[orderBy]) return 1
  return 0
}

function getComparator(order: any, orderBy: any) {
  return order === 'desc' ? (a: any, b: any) => descendingComparator(a, b, orderBy) : (a: any, b: any) => -descendingComparator(a, b, orderBy)
}

function stableSort(array: any, comparator: any) {
  const stabilizedThis = array.map((el: any, index: number) => [el, index])
  stabilizedThis.sort((a: any, b: any) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el: any) => el[0])
}

function SortedTable<T = unknown>({
  rowsPerPage = 10,
  rowsPerPageOptions = [5, 10, 15],
  enablePagination = true,
  data,
  defaultOrderBy,
  defaultOrderDirection = 'desc',
  columns,
  sx,
  noDataMessage,
  headerComponent,
  loadingRowData = false,
}: SortedTablePropType<T>) {
  const { palette } = useTheme()

  const [order, setOrder] = useState(defaultOrderDirection)
  const [orderBy, setOrderBy] = useState(defaultOrderBy)
  const [page, setPage] = useState(0)
  const [_rowsPerPage, _setRowsPerPage] = useState(rowsPerPage)

  const handleRequestSort = (_: SyntheticEvent, property: string) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    return setOrderBy(property)
  }

  const handleChangePage = (_: unknown, newPage: number) => {
    return setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    _setRowsPerPage(parseInt(event.target.value, 10))
    return setPage(0)
  }

  function SortedTableHead() {
    const createSortHandler = (property: string) => (event: SyntheticEvent) => {
      handleRequestSort(event, property)
    }

    return (
      <TableHead sx={{ background: palette.primary.main, color: palette.primary.contrastText }}>
        <TableRow>
          {columns.map((headCell) => (
            <TableCell
              sx={{ color: palette.primary.contrastText }}
              key={headCell.key as string}
              sortDirection={orderBy === headCell.key ? order : false}
            >
              <TableSortLabel
                color={palette.primary.contrastText}
                // TODO: Figure out styling for sorting labels
                sx={{ '&$active': palette.primary.contrastText, color: palette.primary.contrastText }}
                active={orderBy === headCell.key}
                direction={orderBy === headCell.key ? order : 'asc'}
                onClick={createSortHandler(headCell.key as string)}
              >
                <Typography variant="body2" sx={{ color: palette.primary.contrastText }}>
                  {headCell.title}
                </Typography>
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    )
  }

  function SortedTableBody() {
    return (
      <VLLoaderWrapper loading={loadingRowData} type="inline">
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell sx={{ border: 'none' }}>{noDataMessage ?? 'No Data Available'}</TableCell>
            </TableRow>
          ) : (
            stableSort(data, getComparator(order, orderBy))
              .slice(page * _rowsPerPage, page * _rowsPerPage + _rowsPerPage)
              .map((row: T[], index: number) => {
                return (
                  <TableRow hover key={index}>
                    {Object.keys(row).map((_row: any, idx: number) => (
                      <TableCell key={`${idx}`} component="th" id={`enhanced-table-checkbox-${index}`} scope="row" padding="none" sx={{ padding: 2 }}>
                        <>{row[_row]}</>
                      </TableCell>
                    ))}
                  </TableRow>
                )
              })
          )}
        </TableBody>
      </VLLoaderWrapper>
    )
  }

  return (
    <Paper>
      <TableContainer>
        {headerComponent ? headerComponent : false}
        <Table aria-labelledby="tableTitle" size={'medium'} aria-label="enhanced table" sx={sx}>
          <SortedTableHead />
          <SortedTableBody />
        </Table>
      </TableContainer>
      {enablePagination && (
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={data?.length}
          rowsPerPage={_rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  )
}

export default SortedTable
