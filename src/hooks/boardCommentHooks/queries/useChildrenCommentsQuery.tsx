import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/myConstants';
import { useBoardCommentService } from 'context/boardCommentServiceContext';

const useChildrenCommentsQuery = (boardId: string, commentId: string) => {
  const { getChildrenComments } = useBoardCommentService();
  const queryClient = useQueryClient();
  const { data } = useQuery(
    [QUERY_KEY.childrenComments, boardId, commentId],
    async () => getChildrenComments({ boardId, commentId }),
    {
      enabled: !!boardId && !!commentId,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      onSuccess: (data) => {
        data.forEach((comment) => {
          queryClient.setQueryData([QUERY_KEY.boardCommentLikeCount, String(comment.id)], comment.commentLikeCount);
        });
        queryClient.setQueryData([QUERY_KEY.boardCommentChildrenCount, commentId], data.length);
        return data;
      },
    },
  );
  return data;
};

export default useChildrenCommentsQuery;
