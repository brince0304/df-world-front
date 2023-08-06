import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/myConstants';
import { useAuthService } from 'context/userServiceContext';
import useAuthError from '../useAuthError';
import useAuthSuccess from '../useAuthSuccess';

export const useKaKaoLoginMutation = () => {
  const { kakaoLogin } = useAuthService();
  const { handleLoginError } = useAuthError();
  const { handleLoginSuccess } = useAuthSuccess();
  const queryClient = useQueryClient();
  const { mutate: loginMutation } = useMutation([QUERY_KEY.user], kakaoLogin, {
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEY.user], data);
      handleLoginSuccess(data);
    },
    onError: (data: any) => {
      handleLoginError(data.response.data);
    },
  });

  return loginMutation;
};
