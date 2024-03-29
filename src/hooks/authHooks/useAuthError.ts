import useError from 'hooks/uiHooks/useError';

const useAuthError = () => {
  const { handleError } = useError();
  const handleLoginError = () => {
    handleError('로그인에 실패했습니다. 아이디나 비밀번호를 확인해주세요 😭 ');
  };

  const handleLogoutError = () => {
    handleError('로그아웃에 실패했습니다. 😭');
  };
  const handleRegisterError = (error: any) => {
    handleError(error.response.data.message);
  };
  const handleTokenExpiredError = () => {
    handleError('로그인이 만료되었습니다. 😭');
  };

  return {
    handleLoginError,
    handleRegisterError,
    handleTokenExpiredError,
    handleLogoutError,
  };
};

export default useAuthError;
