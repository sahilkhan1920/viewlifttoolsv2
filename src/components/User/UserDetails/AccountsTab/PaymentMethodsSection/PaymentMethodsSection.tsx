import { Box, Button, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import { memo } from 'react'
import { UserPageCard } from 'src/components/Card'

export default memo(function PaymentMethodsSection({}: { userId: string }) {
  const TableData = [
    {
      field: 'Details',
      value: 'N/A',
    },
    {
      field: 'Date Added',
      value: '-', //Intl.DateTimeFormat('en-IN', { dateStyle: 'short' }).format(new Date(monetizationPlan.addedDate)),
    },
  ]
  return (
    <Box paddingY={5}>
      <Box id="section-header" display="flex" alignItems="center" justifyContent="space-between" marginBottom={2}>
        <Typography variant="h6">Payment Methods</Typography>
        <Button variant="outlined" size="large">
          ADD NEW
        </Button>
      </Box>
      <UserPageCard>
        <TableContainer sx={{ width: '30rem' }}>
          <Table size="small">
            <TableBody sx={{ outline: '1px solid' }}>
              {TableData.map(({ field, value }) => (
                <TableRow key={field} sx={{ display: 'flex' }}>
                  <TableCell
                    sx={{
                      width: '40%',
                      textOverflow: 'ellipsis',
                      lineClamp: 1,
                    }}
                  >
                    {field}
                  </TableCell>
                  <TableCell
                    sx={{
                      width: '50%',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      lineClamp: 1,
                    }}
                  >
                    {value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box id="card-actions" flexDirection="column" display="flex" gap={2} marginTop={1}>
          <Button variant="contained">UPDATE</Button>
          <Button variant="outlined">REMOVE</Button>
        </Box>
      </UserPageCard>
    </Box>
  )
})
