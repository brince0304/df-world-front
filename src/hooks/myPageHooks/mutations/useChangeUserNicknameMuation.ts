import { useMyPageService } from '../../../context/myPageServiceContext';
import useMyPageSuccess from '../useMyPageSuccess';
import useMyPageError from '../useMyPageError';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '../../../constants/myConstants';

const useChangeUserNicknameMuation = () => {
  const { changeUserNickname } = useMyPageService();
  const { handleChangeUserNicknameSuccess } = useMyPageSuccess();
  const { handleChangeUserNicknameError } = useMyPageError();
  const queryClient = useQueryClient();
  const { mutate: handleChangeUserNickname } = useMutation({
    mutationFn: changeUserNickname,
    onSuccess: () => {
      handleChangeUserNicknameSuccess();
      queryClient.invalidateQueries([QUERY_KEY.user]);
    },
    onError: () => {
      handleChangeUserNicknameError();
    },
  });

  return handleChangeUserNickname;
};

export default useChangeUserNicknameMuation;
