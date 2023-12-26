import { Grid, IconButton, Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import VLTable from 'src/components/common/VLTable';
import fetchHelper from 'src/helpers/fetchHelper';
import moment from 'moment';
import RestoreIcon from '@mui/icons-material/Restore';
import {
  GET_VERSION_HISTORY,
  RESTORE_VERSION,
} from 'src/constants/urlConstants';
import VLAlert from 'src/components/common/VLAlert';

const columns = [
  {
    key: 'dateCreated',
    title: 'Published At',
    value: 'dateCreated',
  },
  {
    key: 'userName',
    title: 'Published By',
    value: 'userName',
  },
  {
    key: 'action',
    title: 'Action',
    value: 'action',
  },
];

const VersionHistoryTable = () => {
  const [cookies] = useCookies();
  const [records, setRecords] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [message, setMessage] = useState('');

  async function getVersionHistory() {
    const data = await fetchHelper({
      url: `${GET_VERSION_HISTORY}?max=10&offset=${page * 10}`,
      method: 'GET',
      headers: {
        xapikey: cookies.managementXApiKey,
        Authorization: cookies.accessToken,
      },
    });

    setRecords(
      data?.data.map((item) => ({
        ...item,
        dateCreated: moment
          .utc(item.dateCreated)
          .local()
          .format('MM/DD/YYYY - HH:mm:ss'),
        action: (
          <IconButton
            size="large"
            aria-label="Restore"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => restoreVersion(item.id)}
            color="inherit"
          >
            <RestoreIcon />
          </IconButton>
        ),
      }))
    );
    setCount(data?.count);
  };

  async function restoreVersion(id) {
    const data = await fetchHelper({
      url: `${RESTORE_VERSION}/${id}`,
      method: 'PUT',
      headers: {
        xapikey: cookies.managementXApiKey,
        Authorization: cookies.accessToken,
      },
    });

    if (!data.status) return;

    getVersionHistory();
    setMessage('Version restored successfully !');
  };

  

  

  useEffect(() => {
    getVersionHistory();
  }, [page]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <VLTable columns={columns} data={records} pagination={false}></VLTable>
        <Pagination
          count={Math.ceil(count / 20)}
          onChange={(_, a) => setPage(a)}
        />
        <VLAlert message={message} setMessage={setMessage} success={true} />
      </Grid>
    </Grid>
  );
};

export default VersionHistoryTable;
