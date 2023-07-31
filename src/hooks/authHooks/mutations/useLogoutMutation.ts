import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/myConstants';
import { useAuthService } from 'context/userServiceContext';
import useAuthError from '../useAuthError';
import useAuthSuccess from '../useAuthSuccess';

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const { logout } = useAuthService();
  const { handleLogoutSuccess } = useAuthSuccess();
  const { handleLogoutError } = useAuthError();
  const handleLogout = async () => {
    try {
      await logout();
      queryClient.setQueryData([QUERY_KEY.user], null);
      handleLogoutSuccess();
    } catch (error) {
      handleLogoutError();
    }
  };

  return handleLogout;
};
