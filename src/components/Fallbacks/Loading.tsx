import * as S from './Loading.style';
import Typography from '@mui/material/Typography';
import LoadingImg from 'assets/img/loading2.gif';
const Loading = () => {
  return (
    <S.Container>
      <img src={LoadingImg} alt="loading" />
      <Typography fontSize={'1.5rem'} fontWeight={'bold'} color={'#787878'}>
        로딩중입니다...
      </Typography>
    </S.Container>
  );
};

export default Loading;
