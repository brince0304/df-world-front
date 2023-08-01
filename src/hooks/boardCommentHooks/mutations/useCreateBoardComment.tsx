import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/myConstants';
import { useBoardCommentService } from 'context/boardCommentServiceContext';
import useBoardCommentSuccess from '../useBoardCommentSuccess';
import useBoardCommentError from '../useBoardCommentError';

const useCreateBoardComment = (boardId: string) => {
  const { createBoardComment } = useBoardCommentService();
  const { handleBoardCommentCreateSuccess } = useBoardCommentSuccess();
  const { handleBoardCommentCreateError } = useBoardCommentError();
  const queryclient = useQueryClient();
  const { mutate: createComment } = useMutation([QUERY_KEY.boardComments, boardId], createBoardComment, {
    onError: (error) => {
      handleBoardCommentCreateError(error as string);
    },
    onSuccess: (data) => {
      queryclient.invalidateQueries([QUERY_KEY.boardComments, boardId]);
      handleBoardCommentCreateSuccess();
    },
  });

  return createComment;
};

export default useCreateBoardComment;
