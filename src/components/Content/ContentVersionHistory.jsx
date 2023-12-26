import React, { useState,useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import fetchHelper from 'src/helpers/fetchHelper'
import {
  CONTENT_BASE_URL, CONTENT_LIVE_URL
} from 'src/constants/urlConstants'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment'
import { useCookies } from 'react-cookie'
import ContentLoader from './ContentLoader';
import { Pagination, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';


export default function ContentVersionHistory({apiType,contentId}) {
  const [expanded, setExpanded] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1) 
  const [cookies] = useCookies();

  useEffect(()=>{
    if(expanded == "ContentVersionHistory"){
      getVersionHistory()
      setLoading(true)
    }
    // eslint-disable-next-line
  },[expanded,page])

  const handleChange = (panel) => async(event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handlePageChange = (e,value) => {
    setPage(value)
  }

  const getVersionHistory = async() => {
    if (apiType == 'live') {
      var url = CONTENT_LIVE_URL + '/history/' + contentId + '?max=20' + '&offset=' + (page - 1)*20
    } else {
      url = CONTENT_BASE_URL + apiType + '/history/' + contentId + '?max=20' + '&offset=' + (page - 1)*20
    }
    var result = await fetchHelper({
      url: url,
      method: 'GET',
      headers: {
        xApiKey: cookies.managementXApiKey,
        Authorization: cookies.accessToken,
      },
    })
    if(result && result.status == 200){
      if(result.content.length > 0){
        let arr = []
        for(let i=0; i<result.content.length; i++){
          let itemData = result.content[i];
          arr.push(createData(
            (itemData.publishDate != null ? moment(itemData.publishDate, 'YYYY-MM-DDTHH:mm:ssZ').format('MM/DD/YYYY - HH:mm:ss') : '-'), (itemData.user || itemData.userName), (itemData.versionStatus), (itemData.lastUpdated != null ? moment(itemData.lastUpdated, 'YYYY-MM-DDTHH:mm:ssZ').format('MM/DD/YYYY - HH:mm:ss') : '-'), (itemData.guid)
          ))
        }
        setCount(result.count);
        setTableData(arr)
        setLoading(false)
      }
    }
  }

  function createData(publishDate, user, versionStatus, lastUpdated, guid) {
    return { publishDate, user, versionStatus, lastUpdated, guid };
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <div style={{paddingTop: "40px"}}>
      <Accordion 
        expanded={expanded === 'ContentVersionHistory'} 
        onChange={handleChange('ContentVersionHistory')}
        sx={{
            backgroundColor: "white"
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="ContentVersionHistory"
          sx={{
            minHeight: "70px"
          }}
        >
          <Typography sx={{ width: '33%', flexShrink: 0, fontSize: "20px", fontWeight: 500, color: "#6f7276" }}>
            VERSION HISTORY
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            padding: "20px"
          }}
        >
          {loading ? <ContentLoader /> : 
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Published</StyledTableCell>
                    <StyledTableCell align="center">User</StyledTableCell>
                    <StyledTableCell align="center">Status</StyledTableCell>
                    <StyledTableCell align="center">Date</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((row) => (
                    <StyledTableRow
                      key={row.guid}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <StyledTableCell component="th" scope="row" align="center">
                        {row.publishDate}
                      </StyledTableCell>
                      <StyledTableCell align="center">{row.user}</StyledTableCell>
                      <StyledTableCell align="center">{row.versionStatus}</StyledTableCell>
                      <StyledTableCell align="center">{row.lastUpdated}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          }
          {!loading && 
            <Stack 
              spacing={2}
              sx={{
                display:'flex',
                alignItems:'center',
                marginTop: '20px'
              }}
            >
              <Pagination count={Math.ceil(count / 20)} page={page} onChange={handlePageChange} color="primary" />
            </Stack>
          }
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
