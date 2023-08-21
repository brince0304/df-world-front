import { useMyPageService } from '../../../context/myPageServiceContext';
import useMyPageSuccess from '../useMyPageSuccess';
import useMyPageError from '../useMyPageError';
import { useMutation } from '@tanstack/react-query';
import { useLogoutMutation } from '../../authHooks/mutations/useLogoutMutation';
import { useNavigate } from 'react-router-dom';

const useChangeUserPasswordMutation = () => {
  const myPageService = useMyPageService();
  if (!myPageService) throw new Error('Cannot find MyPageService');
  const { changeUserPassword } = myPageService;
  const { handleChangeUserPasswordSuccess } = useMyPageSuccess();
  const { handleChangeUserPasswordError } = useMyPageError();
  const logout = useLogoutMutation();
  const navigate = useNavigate();
  const { mutate: handleChangeUserPassword } = useMutation({
    mutationFn: changeUserPassword,
    onSuccess: () => {
      handleChangeUserPasswordSuccess();
      logout();
      navigate('/');
    },
    onError: () => {
      handleChangeUserPasswordError();
    },
  });

  return handleChangeUserPassword;
};

export default useChangeUserPasswordMutation;
