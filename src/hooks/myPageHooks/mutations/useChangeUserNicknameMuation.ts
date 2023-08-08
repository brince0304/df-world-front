import { useMyPageService } from '../../../context/myPageServiceContext';
import useMyPageSuccess from '../useMyPageSuccess';
import useMyPageError from '../useMyPageError';
import { useMutation } from '@tanstack/react-query';

const useChangeUserNicknameMuation = () => {
  const { changeUserNickname } = useMyPageService();
  const { handleChangeUserNicknameSuccess } = useMyPageSuccess();
  const { handleChangeUserNicknameError } = useMyPageError();

  const { mutate: handleChangeUserNickname } = useMutation({
    mutationFn: changeUserNickname,
    onSuccess: () => {
      handleChangeUserNicknameSuccess();
    },
    onError: () => {
      handleChangeUserNicknameError();
    },
  });

  return handleChangeUserNickname;
};

export default useChangeUserNicknameMuation;
