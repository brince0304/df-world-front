import { Avatar } from '@mui/material';
import React from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';

const BoardUserAvatar = (props: { src: string; nickname: string }) => {
  return (
    <Container>
      <Avatar src={props.src} sx={{ width: 24, height: 24, bgcolor: 'transparent', border: '2px solid #e0e0e0' }} />
      <p
        style={{
          fontWeight: 'bold',
        }}
      >
        {props.nickname}
      </p>
    </Container>
  );
};

const Container = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 5px;
`;

export default BoardUserAvatar;
