import { enqueueSnackbar } from 'notistack';

const useAuthError = () => {
  const autoHideDuration = 1500;
  const handleLoginError = () => {
    enqueueSnackbar('아이디나 비밀번호가 옳지 않습니다. 😭', {
      variant: 'error',
      autoHideDuration,
    });
  };

  const handleLogoutError = () => {
    enqueueSnackbar('로그아웃에 실패했습니다. 😭', {
      variant: 'error',
      autoHideDuration,
    });
  }
  const handleRegisterError = (error: any) => {
    enqueueSnackbar(error.message, {
      variant: 'error',
      autoHideDuration,
    });
  };
  const handleTokenExpiredError = () => {
    enqueueSnackbar('로그인이 만료되었습니다. 🥲', {
      variant: 'error',
      autoHideDuration,
    });
  };

  return {
    handleLoginError,
    handleRegisterError,
    handleTokenExpiredError,
    handleLogoutError,
  };
};

export default useAuthError;
