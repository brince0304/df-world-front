import { useMyPageService } from '../../context/myPageServiceContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '../../constants';
import useMyPageSuccess from './useMyPageSuccess';
import useMyPageError from './useMyPageError';

const useDeleteCharacter = () => {
  const { deleteCharacterFromUserAccount } = useMyPageService();
  const queryClient = useQueryClient();
  const { handleDeleteCharacterSuccess } = useMyPageSuccess();
  const { handleDeleteCharacterError } = useMyPageError();
  const { mutate: deleteCharacterMutation } = useMutation<
    void,
    unknown,
    { characterId: string; serverId: string },
    unknown
  >(
    [QUERY_KEY.mypage],
    async ({ characterId, serverId }) => await deleteCharacterFromUserAccount(characterId, serverId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEY.mypage]);
        handleDeleteCharacterSuccess();
      },
      onError: () => {
        handleDeleteCharacterError();
      },
    },
  );

  return deleteCharacterMutation;
};

export default useDeleteCharacter;
