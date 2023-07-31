import { useMutation } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/myConstants';
import { useBoardCommentService } from 'context/boardCommentServiceContext';
import useBoardCommentError from '../useBoardCommentError';
import useBoardCommentSuccess from '../useBoardCommentSuccess';

const useDeleteBoardComment = (boardId: string, commentId: string) => {
  const { deleteBoardComment } = useBoardCommentService();
  const { handleBoardCommentDeleteSuccess } = useBoardCommentSuccess();
  const { handleBoardCommentDeleteError } = useBoardCommentError();
  const { mutate: deleteComment } = useMutation([QUERY_KEY.boardComments, boardId], deleteBoardComment, {
    onError: () => {
      handleBoardCommentDeleteError();
    },
    onSuccess: (data) => {
      handleBoardCommentDeleteSuccess();
    },
  });

  return deleteComment;
};

export default useDeleteBoardComment;
