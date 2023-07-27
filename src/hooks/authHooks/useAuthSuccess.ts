import { enqueueSnackbar } from 'notistack';
import { IAuthLoginResponse } from '../../service/authService';

const useAuthSuccess = () => {
  const autoHideDuration = 1000;
  const handleRegisterSuccess = () => {
    enqueueSnackbar('가입이 완료되었습니다. 🤩', {
      variant: 'success',
      autoHideDuration,
    });
  };
  const handleLoginSuccess = (data:IAuthLoginResponse) => {
    enqueueSnackbar(`환영합니다 ${data.nickname}님! 🤩`, {
      variant: 'success',
      autoHideDuration,
    })
  }
  const handleLogoutSuccess = () => {
    enqueueSnackbar('로그아웃 되었습니다. 다음에 봬요~! 😒', {
      variant: 'success',
      autoHideDuration,
    })
  }

  return {
    handleRegisterSuccess,
    handleLoginSuccess,
    handleLogoutSuccess,
  };
};

export default useAuthSuccess;