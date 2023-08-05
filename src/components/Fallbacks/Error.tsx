import * as S from './Loading.style';
import Typography from '@mui/material/Typography';
import ErrorImg from 'assets/img/error.gif';
const Error = () => {
  return (
    <S.Container>
      <img src={ErrorImg} alt="error" />
      <Typography fontSize={'1.5rem'} fontWeight={'bold'} color={'#121212'}>
        에러가 발생했습니다...
      </Typography>
    </S.Container>
  );
};

export default Error;
