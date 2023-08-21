import { useMyPageService } from '../../../context/myPageServiceContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useMyPageSuccess from '../useMyPageSuccess';
import useMyPageError from '../useMyPageError';
import { QUERY_KEY } from '../../../constants/myConstants';
const useChangeProfileIconByURLMutation = () => {
  const myPageService = useMyPageService();
  if (!myPageService) throw new Error('Cannot find MyPageService');
  const { changeUserProfileIconByURL } = myPageService;
  const queryClient = useQueryClient();
  const { handleChangeAvatarSuccess } = useMyPageSuccess();
  const { handleChangeAvatarError } = useMyPageError();
  const { mutate: changeProfile } = useMutation({
    mutationKey: [QUERY_KEY.user],
    mutationFn: changeUserProfileIconByURL,
    onSuccess: () => {
      handleChangeAvatarSuccess();
      queryClient.invalidateQueries([QUERY_KEY.user]);
    },
    onError: () => {
      handleChangeAvatarError();
    },
  });

  return changeProfile;
};

export default useChangeProfileIconByURLMutation;
