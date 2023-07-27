import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import { IAuthRegisterRequest } from '../../service/authService';
import { useAuthService } from '../../context/authContext';
import useAuthSuccess from './useAuthSuccess';
import useAuthError from './useAuthError';

type IUseRegister = UseMutateFunction<void, unknown, IAuthRegisterRequest, unknown>;

export const useRegister = (): IUseRegister => {
  const { handleRegisterSuccess } = useAuthSuccess();
  const { handleRegisterError } = useAuthError();
  const { register } = useAuthService();
  const { mutate: registerMutation } = useMutation<void, unknown, IAuthRegisterRequest, unknown>(
    ({ username, password, passwordCheck, email, nickname }) =>
      register({ username, password, passwordCheck, email, nickname }),
    {
      onSuccess: () => {
        handleRegisterSuccess();
      },
      onError: (error) => {
        handleRegisterError(error);
      },
    },
  );
  return registerMutation;
};

export default useRegister;
