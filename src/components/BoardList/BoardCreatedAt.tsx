import Typography from '@mui/material/Typography';
import React from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';

const CreatedAt = ({ createdAt }: { createdAt: string }) => {
  return (
    <BoardCreatedAtWrapper>
      <Typography sx={{ fontSize: '12px', fontFamily: 'Core Sans' }}>{createdAt}</Typography>
    </BoardCreatedAtWrapper>
  );
};

const BoardCreatedAtWrapper = styled(Box)`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #787878;
  justify-content: flex-end;
`;

export default CreatedAt;
