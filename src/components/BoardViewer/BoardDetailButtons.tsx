import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BoardDetailButtons = () => {
  let navigate = useNavigate();
  const handleNavigateToBoardList = () => {
    navigate('/boards/');
  };
  const handleNavigateToWriteBoard = () => {
    navigate('/boards/write');
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 'auto' }}>
      <Button sx={{ marginRight: '10px' }} onClick={handleNavigateToBoardList}>
        <Typography sx={{ fontSize: '0.8rem', fontWeight: 'bold' }} color={'black'} component={'span'}>
          돌아가기
        </Typography>
      </Button>
      <Button onClick={handleNavigateToWriteBoard}>
        <Typography sx={{ fontSize: '0.8rem', fontWeight: 'bold' }} color={'black'} component={'span'}>
          글쓰기
        </Typography>
      </Button>
    </Box>
  );
};

export default BoardDetailButtons;
