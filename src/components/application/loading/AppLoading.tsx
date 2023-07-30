import styled from '@emotion/styled';
import { LinearProgress } from '@mui/material';

const AppLoading = () => {
  return (
    <Container>
      <LinearProgress />
    </Container>
  )
}

export default AppLoading;

const Container = styled.div`
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  `;