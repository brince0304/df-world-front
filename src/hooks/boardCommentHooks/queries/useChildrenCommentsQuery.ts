import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/myConstants';
import { useBoardCommentService } from 'context/boardCommentServiceContext';
import useSetCommentLikeCount from '../../recoilHooks/useSetCommentLikeCount';

const useChildrenCommentsQuery = (boardId: string, commentId: string) => {
  const boardCommentService = useBoardCommentService();
  if (!boardCommentService) throw new Error('Cannot find BoardCommentService');
  const { getChildrenComments } = boardCommentService;
  const handleSetBoardCommentLikeCount = useSetCommentLikeCount();
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
          handleSetBoardCommentLikeCount(String(comment.id), comment.commentLikeCount);
        });
        return data;
      },
    },
  );
  return data;
};

export default useChildrenCommentsQuery;
