import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/myConstants';
import { useBoardCommentService } from 'context/boardCommentServiceContext';

const useBoardCommentsQuery = (boardId: string) => {
  const { getBoardComments } = useBoardCommentService();
  const queryClient = useQueryClient();
  const { data } = useQuery([QUERY_KEY.boardComments, boardId], () => getBoardComments({ boardId }), {
    enabled: !!boardId,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    select: (data) => {
      const commentCount = data.comments.length;
      const childrenCount = data.comments.reduce((acc, cur) => acc + cur.childrenComments.length, 0);
      const boardCommentCount = commentCount && childrenCount ? commentCount + childrenCount : data.comments.length;
      queryClient.setQueryData([QUERY_KEY.boardCommentCount, boardId],boardCommentCount);
      data.comments.forEach((comment) => {
        const isLiked = data.likeResponses.find((likeResponse) => likeResponse.id === comment.id);
        queryClient.setQueryData([QUERY_KEY.isBoardCommentLiked, String(comment.id)], isLiked?.isLike);
        queryClient.setQueryData([QUERY_KEY.boardCommentLikeCount, String(comment.id)], comment.commentLikeCount);
      });
      return data.comments;
    },
  });
  return data;
};

export default useBoardCommentsQuery;
