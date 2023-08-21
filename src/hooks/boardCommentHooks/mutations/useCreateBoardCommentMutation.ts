import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/myConstants';
import { useBoardCommentService } from 'context/boardCommentServiceContext';
import useBoardCommentSuccess from '../useBoardCommentSuccess';
import useBoardCommentError from '../useBoardCommentError';

const useCreateBoardCommentMutation = (boardId: string) => {
  const boardCommentService = useBoardCommentService();
  if (!boardCommentService) throw new Error('Cannot find BoardCommentService');
  const { createBoardComment } = boardCommentService;
  const { handleBoardCommentCreateSuccess } = useBoardCommentSuccess();
  const { handleBoardCommentCreateError } = useBoardCommentError();
  const queryclient = useQueryClient();
  const { mutate: createComment } = useMutation([QUERY_KEY.boardComments, boardId], createBoardComment, {
    onError: (error: any) => {
      handleBoardCommentCreateError('댓글 작성에 실패했습니다. 😭');
    },
    onSuccess: (data) => {
      queryclient.invalidateQueries([QUERY_KEY.boardComments, boardId]);
      handleBoardCommentCreateSuccess();
    },
  });

  return createComment;
};

export default useCreateBoardCommentMutation;
