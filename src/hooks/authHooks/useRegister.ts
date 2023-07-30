import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import { IRegisterRequest } from '../../service/userService';
import { useAuthService } from '../../context/userServiceContext';
import useAuthSuccess from './useAuthSuccess';
import useAuthError from './useAuthError';

type IUseRegister = UseMutateFunction<void, unknown, IRegisterRequest, unknown>;

export const useRegister = (): IUseRegister => {
  const { handleRegisterSuccess } = useAuthSuccess();
  const { handleRegisterError } = useAuthError();
  const { register } = useAuthService();
  const { mutate: registerMutation } = useMutation(
      register,
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
