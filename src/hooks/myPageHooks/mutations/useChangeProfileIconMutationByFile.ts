import { useMyPageService } from '../../../context/myPageServiceContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '../../../constants/myConstants';
import useMyPageError from '../useMyPageError';
import useMyPageSuccess from '../useMyPageSuccess';

const useChangeProfileIconByFileMutation = () => {
  const { changeUserProfileIcon } = useMyPageService();
  const queryClient = useQueryClient();
  const { handleChangeAvatarError } = useMyPageError();
  const { handleChangeAvatarSuccess } = useMyPageSuccess();
  const { mutate: changeProfileIconMutation } = useMutation([QUERY_KEY.mypage], changeUserProfileIcon, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.mypage]);
      queryClient.invalidateQueries([QUERY_KEY.user]);
      handleChangeAvatarSuccess();
    },
    onError: () => {
      handleChangeAvatarError();
    },
  });

  return changeProfileIconMutation;
};

export default useChangeProfileIconByFileMutation;
