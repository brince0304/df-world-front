import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';

const HashtagContent = (props: { count: string }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        gap: '5px',
      }}
    >
      <Typography fontSize={'12px'}>{props.count}개의 게시글이 등록되어있습니다.</Typography>
      <Typography fontSize={'12px'}>해당 게시글을 확인해보세요!</Typography>
    </Box>
  );
};

export default HashtagContent;
