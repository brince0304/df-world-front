import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/myConstants';
import { useBoardCommentService } from 'context/boardCommentServiceContext';
import useBoardCommentSuccess from '../useBoardCommentSuccess';
import useBoardCommentError from '../useBoardCommentError';

const useUpdateBoardCommentMutation = (boardId: string) => {
  const { updateBoardComment } = useBoardCommentService();
  const { handleBoardCommentUpdateSuccess } = useBoardCommentSuccess();
  const { handleBoardCommentUpdateError } = useBoardCommentError();
  const queryClient = useQueryClient();
  const { mutate: updateComment } = useMutation([QUERY_KEY.boardComments, boardId], updateBoardComment, {
    onError: (error:any) => {
      handleBoardCommentUpdateError(error.response.data);
    },
    onSuccess: (data) => {
      handleBoardCommentUpdateSuccess();
      queryClient.invalidateQueries([QUERY_KEY.boardComments, boardId]);
    },
  });
  return updateComment;
};

export default useUpdateBoardCommentMutation;
