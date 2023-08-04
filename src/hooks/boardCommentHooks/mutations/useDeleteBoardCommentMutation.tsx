import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/myConstants';
import { useBoardCommentService } from 'context/boardCommentServiceContext';
import useBoardCommentError from '../useBoardCommentError';
import useBoardCommentSuccess from '../useBoardCommentSuccess';

const useDeleteBoardCommentMutation = (boardId: string, commentId: string) => {
  const { deleteBoardComment } = useBoardCommentService();
  const { handleBoardCommentDeleteSuccess } = useBoardCommentSuccess();
  const { handleBoardCommentDeleteError } = useBoardCommentError();
  const queryclient = useQueryClient();
  const { mutate: deleteComment } = useMutation([QUERY_KEY.boardComments, boardId], deleteBoardComment, {
    onError: () => {
      handleBoardCommentDeleteError();
    },
    onSuccess: (data) => {
      handleBoardCommentDeleteSuccess();
      queryclient.invalidateQueries([QUERY_KEY.boardComments, boardId]);
    },
  });

  return deleteComment;
};

export default useDeleteBoardCommentMutation;
