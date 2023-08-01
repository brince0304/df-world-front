import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/myConstants';
import { useBoardCommentService } from 'context/boardCommentServiceContext';

const useLikeBoardComment = (boardId: string, commentId: string) => {
  const { likeComment } = useBoardCommentService();
  const queryClient = useQueryClient();
  const prevIsLiked = queryClient.getQueryData([QUERY_KEY.isBoardCommentLiked, commentId]);
  const { mutate: likeBoardComment } = useMutation(likeComment, {
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEY.boardCommentLikeCount, commentId], data);
      queryClient.setQueryData([QUERY_KEY.isBoardCommentLiked, commentId], !prevIsLiked);
    },
  });

  return likeBoardComment;
};

export default useLikeBoardComment;
