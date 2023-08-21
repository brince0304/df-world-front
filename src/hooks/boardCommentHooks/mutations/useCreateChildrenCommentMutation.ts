import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/myConstants';
import { useBoardCommentService } from 'context/boardCommentServiceContext';
import useBoardCommentError from '../useBoardCommentError';
import useBoardCommentSuccess from '../useBoardCommentSuccess';

const useCreateChildrenCommentMutation = (boardId: string, commentId: string) => {
  const boardCommentService = useBoardCommentService();
  if (!boardCommentService) throw new Error('Cannot find BoardCommentService');
  const { createChildrenComment } = boardCommentService;
  const { handleBoardCommentCreateSuccess } = useBoardCommentSuccess();
  const { handleBoardCommentCreateError } = useBoardCommentError();
  const queryClient = useQueryClient();
  const { mutate: createChildrenCommentMutation } = useMutation(
    [QUERY_KEY.boardComments, boardId],
    createChildrenComment,
    {
      onError: (error: any) => {
        handleBoardCommentCreateError('답글 작성에 실패했습니다. 😭');
      },
      onSuccess: (data) => {
        handleBoardCommentCreateSuccess();
        queryClient.invalidateQueries([QUERY_KEY.boardComments, boardId]);
        queryClient.invalidateQueries([QUERY_KEY.childrenComments, boardId, commentId]);
      },
    },
  );
  return createChildrenCommentMutation;
};

export default useCreateChildrenCommentMutation;
