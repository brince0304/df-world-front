import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useBoardService } from '../../context/boardServiceContext';
import { QUERY_KEY } from '../../constants';
import useBoardSuccess from './useBoardSuccess';
import useBoardError from './useBoardError';

const useDeleteBoard = (boardId: string) => {
  const { deleteBoard } = useBoardService();
  const queryClient = useQueryClient();
  const { handleDeleteBoardSuccess } = useBoardSuccess();
  const { handleDeleteBoardError } = useBoardError();
  const { mutate: deleteBoardMutation } = useMutation(
    [QUERY_KEY.boardDetail, boardId],
    () => deleteBoard({ boardId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEY.boards]);
        handleDeleteBoardSuccess();
      },
      onError: (error: any) => {
        handleDeleteBoardError(error.response.data.message);
      },
    },
  );

  return deleteBoardMutation;
};

export default useDeleteBoard;
