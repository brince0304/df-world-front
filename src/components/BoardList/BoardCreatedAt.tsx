import Typography from '@mui/material/Typography';
import React from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';

const CreatedAt = ({ createdAt }: { createdAt: string }) => {
  return (
    <BoardCreatedAtWrapper>
      <Typography sx={{ fontSize: '0.8rem',}}>{createdAt}</Typography>
    </BoardCreatedAtWrapper>
  );
};

const BoardCreatedAtWrapper = styled(Box)`
  display: flex;
  align-items: center;
  color: #787878;
  justify-content: flex-end;
`;

export default CreatedAt;
