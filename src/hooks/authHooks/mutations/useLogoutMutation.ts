import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/myConstants';
import { useAuthService } from 'context/userServiceContext';
import useAuthError from '../useAuthError';
import useAuthSuccess from '../useAuthSuccess';
import { userLocalStorage } from '../../../storages/userLocalStorage';

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const { logout } = useAuthService();
  const { handleLogoutSuccess } = useAuthSuccess();
  const { handleLogoutError } = useAuthError();
  const handleLogout = async () => {
    try {
      await logout();
      queryClient.setQueryData([QUERY_KEY.user], null);
      userLocalStorage.clearUser();
      handleLogoutSuccess();
    } catch (error) {
      handleLogoutError();
    }
  };

  return handleLogout;
};
