import { useMyPageService } from '../../context/myPageServiceContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '../../constants';
import useMyPageSuccess from './useMyPageSuccess';
import useMyPageError from './useMyPageError';

const useAddCharacter = () => {
  const { addCharacterToUserAccount } = useMyPageService();
  const { handleAddCharacterSuccess } = useMyPageSuccess();
  const { handleAddCharacterError } = useMyPageError();
  const queryClient = useQueryClient();
  const { mutate: addCharacterMutation } = useMutation([QUERY_KEY.mypage], addCharacterToUserAccount, {
    onSuccess: () => {
      handleAddCharacterSuccess();
      queryClient.invalidateQueries([QUERY_KEY.mypage]);
    },
    onError: () => {
      handleAddCharacterError();
    },
  });

  return addCharacterMutation;
};

export default useAddCharacter;
