import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/myConstants';
import { useBoardCommentService } from 'context/boardCommentServiceContext';

const useBoardComments = (boardId: string) => {
  const { getBoardComments } = useBoardCommentService();
  const queryClient = useQueryClient();
  const { data } = useQuery([QUERY_KEY.boardComments, boardId], () => getBoardComments({ boardId }), {
    enabled: !!boardId,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    select: (data) => {
      data.comments.forEach((comment) => {
        const isLiked = data.likeResponses.find((likeResponse) => likeResponse.id === comment.id);
        queryClient.setQueriesData([QUERY_KEY.isBoardCommentLiked, comment.id], isLiked?.isLike);
        queryClient.setQueriesData([QUERY_KEY.boardCommentLikeCount, comment.id], comment.commentLikeCount);
      });
      return data.comments;
    },
  });
  return data;
};

export default useBoardComments;
