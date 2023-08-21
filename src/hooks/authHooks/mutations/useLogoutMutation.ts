import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/myConstants';
import { useAuthService } from 'context/userServiceContext';
import useAuthSuccess from '../useAuthSuccess';
import { userLocalStorage } from '../../../storages/userLocalStorage';

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const authService = useAuthService();
  if (!authService) throw new Error('Cannot find AuthService');
  const { logout } = authService;
  const { handleLogoutSuccess } = useAuthSuccess();
  const handleLogout = async () => {
    try {
      await logout();
      queryClient.setQueryData([QUERY_KEY.user], null);
      userLocalStorage.clearUser();
      handleLogoutSuccess();
    } catch (error) {
      handleLogoutSuccess();
      queryClient.setQueryData([QUERY_KEY.user], null);
      userLocalStorage.clearUser();
    }
  };

  return handleLogout;
};
