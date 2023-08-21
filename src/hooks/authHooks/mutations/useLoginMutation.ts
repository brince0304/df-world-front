import { UseMutateFunction, useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/myConstants';
import { useAuthService } from 'context/userServiceContext';
import { ILoginResponse, ILoginRequest } from 'services/userService';
import useAuthError from '../useAuthError';
import useAuthSuccess from '../useAuthSuccess';

type IUseLogin = UseMutateFunction<ILoginResponse, unknown, ILoginRequest, unknown>;

export const useLoginMutation = (): IUseLogin => {
  const authService = useAuthService();
  if (!authService) throw new Error('Cannot find AuthService');
  const { login } = authService;
  const { handleLoginError } = useAuthError();
  const { handleLoginSuccess } = useAuthSuccess();
  const queryClient = useQueryClient();
  const { mutate: loginMutation } = useMutation([QUERY_KEY.user], login, {
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEY.user], data);
      handleLoginSuccess(data);
    },
    onError: () => {
      handleLoginError();
    },
  });

  return loginMutation;
};
