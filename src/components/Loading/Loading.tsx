import * as S from './Loading.style';
import Typography from '@mui/material/Typography';
const Loading = () => {
  return (
    <S.Container>
      <img src={''} alt="loading" />
      <Typography fontSize={'1.5rem'} fontWeight={'bold'}>
        로딩중입니다...
      </Typography>
    </S.Container>
  );
};

export default Loading;
