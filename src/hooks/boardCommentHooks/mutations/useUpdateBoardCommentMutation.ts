import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/myConstants';
import { useBoardCommentService } from 'context/boardCommentServiceContext';
import useBoardCommentSuccess from '../useBoardCommentSuccess';
import useBoardCommentError from '../useBoardCommentError';

const useUpdateBoardCommentMutation = (boardId: string) => {
  const boardCommentService = useBoardCommentService();
  if (!boardCommentService) throw new Error('Cannot find BoardCommentService');
  const { updateBoardComment } = boardCommentService;
  const { handleBoardCommentUpdateSuccess } = useBoardCommentSuccess();
  const { handleBoardCommentUpdateError } = useBoardCommentError();
  const queryClient = useQueryClient();
  const { mutate: updateComment } = useMutation([QUERY_KEY.boardComments, boardId], updateBoardComment, {
    onError: (error: any) => {
      handleBoardCommentUpdateError('댓글 수정에 실패했습니다. 😭');
    },
    onSuccess: (data) => {
      handleBoardCommentUpdateSuccess();
      queryClient.invalidateQueries([QUERY_KEY.boardComments, boardId]);
      queryClient.invalidateQueries([QUERY_KEY.childrenComments, boardId]);
    },
  });
  return updateComment;
};

export default useUpdateBoardCommentMutation;
