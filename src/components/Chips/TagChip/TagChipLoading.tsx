import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import { CircularProgress } from '@mui/material';

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
      <CircularProgress />
      <Typography fontSize={'15px'}>로딩중...</Typography>
    </Box>
  );
};

export default HashtagLoading;
