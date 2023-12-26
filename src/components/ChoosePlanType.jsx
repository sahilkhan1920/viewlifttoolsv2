import React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/router';

const ChoosePlanType = () => {
  const router = useRouter();

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const plansTypeArray = [
    { name: 'SVOD' },
    { name: 'TVOD' },
    { name: 'AVOD' },
    { name: 'TVE' },
    { name: 'FREE' },
  ];

  const handleClick = ({ name }) => {
    router.push({ pathname: 'ui-plansNew/add', query: { type: name } });
  };

  return (
    <Box p={2}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {plansTypeArray.map((item, i) => {
          return (
            <Grid
              onClick={() => {
                handleClick(item);
              }}
              item
              xs={2}
              sm={2}
              md={4}
              key={i}
            >
              <Item
                sx={{
                  height: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '0.5px solid',
                }}
              >
                {item.name}
              </Item>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ChoosePlanType;
