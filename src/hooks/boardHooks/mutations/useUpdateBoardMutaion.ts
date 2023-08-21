import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/myConstants';
import useBoardSuccess from '../useBoardSuccess';
import useBoardError from '../useBoardError';
import { useBoardService } from '../../../context/boardServiceContext';
import { useNavigate } from 'react-router-dom';

const useUpdateBoardMutation = (boardId: string) => {
  const boardService = useBoardService();
  if (!boardService) throw new Error('Cannot find BoardService');
  const { updateBoard } = boardService;
  const { handleUpdateBoardSuccess } = useBoardSuccess();
  const { handleUpdateBoardError } = useBoardError();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: updateBoardMutation } = useMutation([QUERY_KEY.boards, boardId], updateBoard, {
    onSuccess: () => {
      handleUpdateBoardSuccess();
      navigate(`/boards/${boardId}`);
      queryClient.invalidateQueries([QUERY_KEY.boardDetail, boardId]);
      queryClient.invalidateQueries([QUERY_KEY.boards]);
      queryClient.invalidateQueries([QUERY_KEY.latestBoardList]);
    },
    onError: () => {
      handleUpdateBoardError('게시글 수정에 실패했습니다. 😭');
    },
  });

  return updateBoardMutation;
};

export default useUpdateBoardMutation;
