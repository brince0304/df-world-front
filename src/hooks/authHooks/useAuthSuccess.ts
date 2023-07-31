import { ILoginResponse } from '../../services/userService';
import useSuccess from '../uiHooks/useSuccess';

const useAuthSuccess = () => {
  const { handleSuccess } = useSuccess();
  const handleRegisterSuccess = () => {
    handleSuccess('회원가입이 완료되었습니다. 🤩');
  };
  const handleLoginSuccess = (data: ILoginResponse) => {
    handleSuccess(`${data.nickname}님, 환영합니다! 🥰`);
  };
  const handleLogoutSuccess = () => {
    handleSuccess('로그아웃 되었습니다. 😭');
  };

  return {
    handleRegisterSuccess,
    handleLoginSuccess,
    handleLogoutSuccess,
  };
};

export default useAuthSuccess;
