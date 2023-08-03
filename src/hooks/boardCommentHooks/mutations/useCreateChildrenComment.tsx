import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/myConstants';
import { useBoardCommentService } from 'context/boardCommentServiceContext';
import useBoardCommentError from '../useBoardCommentError';
import useBoardCommentSuccess from '../useBoardCommentSuccess';

const useCreateChildrenComment = (boardId: string, commentId: string) => {
  const { createChildrenComment } = useBoardCommentService();
  const { handleBoardCommentCreateSuccess } = useBoardCommentSuccess();
  const { handleBoardCommentCreateError } = useBoardCommentError();
  const queryClient = useQueryClient();
  const { mutate: createChildrenCommentMutation } = useMutation(
    [QUERY_KEY.boardComments, boardId, commentId],
    createChildrenComment,
    {
      onError: (error) => {
        handleBoardCommentCreateError(error as string);
      },
      onSuccess: (data) => {
        handleBoardCommentCreateSuccess();
        queryClient.invalidateQueries([QUERY_KEY.childrenComments, boardId, commentId]);
      },
    },
  );
  return createChildrenCommentMutation;
};

export default useCreateChildrenComment;
