import React from 'react';
import { Container, useMediaQuery } from '@mui/material';

const MyContainer =({children} : {children: React.ReactNode}) => {
  const isMobile = useMediaQuery('(max-width: 480px)');

  return (
    <Container
      maxWidth={isMobile ? 'xs' : 'md'}
      sx={{
        padding: isMobile ? '0px' : '0px 20px 0px 20px',
        marginTop: '20px',
      }}
    >
      {children}
    </Container>
  );
}

export default MyContainer;