import Box from '@mui/material/Box';
import Loading from 'react-loading';
import Typography from '@mui/material/Typography';
import React from 'react';

const HashtagLoading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        gap: '10px',
      }}
    >
      <Loading type="spin" color="white" height={20} width={20} />
      <Typography fontFamily={'Core Sans'} fontSize={'15px'}>
        로딩중...
      </Typography>
    </Box>
  );
};

export default HashtagLoading;
