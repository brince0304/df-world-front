import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/myConstants';
import { useBoardCommentService } from 'context/boardCommentServiceContext';
import useBoardCommentError from '../useBoardCommentError';
import useBoardCommentSuccess from '../useBoardCommentSuccess';

const useCreateChildrenCommentMutation = (boardId: string, commentId: string) => {
  const { createChildrenComment } = useBoardCommentService();
  const { handleBoardCommentCreateSuccess } = useBoardCommentSuccess();
  const { handleBoardCommentCreateError } = useBoardCommentError();
  const queryClient = useQueryClient();
  const { mutate: createChildrenCommentMutation } = useMutation(
    [QUERY_KEY.boardComments, boardId],
    createChildrenComment,
    {
      onError: (error) => {
        handleBoardCommentCreateError(error as string);
      },
      onSuccess: (data) => {
        handleBoardCommentCreateSuccess();
        queryClient.invalidateQueries([QUERY_KEY.boardComments, boardId]);
      },
    },
  );
  return createChildrenCommentMutation;
};

export default useCreateChildrenCommentMutation;
