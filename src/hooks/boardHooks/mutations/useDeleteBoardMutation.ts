import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/myConstants';
import { useBoardService } from 'context/boardServiceContext';
import useBoardError from '../useBoardError';
import useBoardSuccess from '../useBoardSuccess';
import { useNavigate } from 'react-router-dom';

const useDeleteBoardMutation = (boardId: string) => {
  const { deleteBoard } = useBoardService();
  const queryClient = useQueryClient();
  const { handleDeleteBoardSuccess } = useBoardSuccess();
  const { handleDeleteBoardError } = useBoardError();
  const navigate = useNavigate();
  const { mutate: deleteBoardMutation } = useMutation(
    [QUERY_KEY.boardDetail, boardId],
    () => deleteBoard({ boardId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEY.boards]);
        handleDeleteBoardSuccess();
        navigate(`/boards/`);
      },
      onError: () => {
        handleDeleteBoardError('게시글 삭제에 실패했습니다. 😭');
      },
    },
  );

  return deleteBoardMutation;
};

export default useDeleteBoardMutation;
