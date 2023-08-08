import { useMyPageService } from '../../../context/myPageServiceContext';
import useMyPageSuccess from '../useMyPageSuccess';
import useMyPageError from '../useMyPageError';
import { useMutation } from '@tanstack/react-query';
import { useLogoutMutation } from '../../authHooks/mutations/useLogoutMutation';

const useChangeUserPasswordMutation = () => {
  const { changeUserPassword } = useMyPageService();
  const { handleChangeUserPasswordSuccess } = useMyPageSuccess();
  const { handleChangeUserPasswordError } = useMyPageError();
  const logout = useLogoutMutation();
  const { mutate: handleChangeUserPassword } = useMutation({
    mutationFn: changeUserPassword,
    onSuccess: () => {
      handleChangeUserPasswordSuccess();
      logout();
    },
    onError: () => {
      handleChangeUserPasswordError();
    },
  });

  return handleChangeUserPassword;
};

export default useChangeUserPasswordMutation;
