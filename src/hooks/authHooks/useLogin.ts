import { UseMutateFunction, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthService } from '../../context/userServiceContext';
import { ILoginRequest, ILoginResponse } from '../../service/userService';
import { QUERY_KEY } from '../../constants/queryKeys';
import useAuthError from './useAuthError';
import useAuthSuccess from './useAuthSuccess';

type IUseLogin = UseMutateFunction<ILoginResponse, unknown, ILoginRequest, unknown>;

export const useLogin = (): IUseLogin => {
  const { login } = useAuthService();
  const { handleLoginError } = useAuthError();
  const { handleLoginSuccess } = useAuthSuccess();
  const queryClient = useQueryClient();
  const { mutate: loginMutation } = useMutation<ILoginResponse, unknown, ILoginRequest, unknown>(
    ({ username, password }) => login({ username, password }),
    {
      onSuccess: (data) => {
        queryClient.setQueryData([QUERY_KEY.user], data);
        handleLoginSuccess(data);
      },
      onError: () => {
        handleLoginError();
      },
    },
  );

  return loginMutation;
};
