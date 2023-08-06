import styled from '@emotion/styled';
import { Grid, Skeleton } from '@mui/material';

const CharacterListSkeleton = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={6} sm={4} md={3} lg={3}>
        <CardContainer animation={'wave'} variant="rectangular" width={264} height={403} />
      </Grid>
      <Grid item xs={6} sm={4} md={3} lg={3}>
        <CardContainer animation={'wave'} variant="rectangular" width={264} height={403} />
      </Grid>
      <Grid item xs={6} sm={4} md={3} lg={3}>
        <CardContainer animation={'wave'} variant="rectangular" width={264} height={403} />
      </Grid>
      <Grid item xs={6} sm={4} md={3} lg={3}>
        <CardContainer animation={'wave'} variant="rectangular" width={264} height={403} />
      </Grid>
    </Grid>
  );
};

export default CharacterListSkeleton;

const CardContainer = styled(Skeleton)`
  display: flex;
  overflow: hidden;
  position: relative;
  flex-direction: column;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  padding: 10px;

  &:hover {
    cursor: pointer;
    background-color: #f7f8fd;
    transition: 0.5s;
  }

  @media (max-width: 1024px) {
    padding: 0px;
  }
  @media (max-width: 768px) {
    padding: 0px;
  }
  @media (max-width: 480px) {
    padding: 0px;
  }
`;
