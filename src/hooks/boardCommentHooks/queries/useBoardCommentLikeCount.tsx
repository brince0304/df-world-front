import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/myConstants';

const useBoardCommentLikeCount = (boardCommentId: string) => {
  const queryClient = useQueryClient();
  const likeCount = queryClient.getQueryData([QUERY_KEY.boardCommentLikeCount, boardCommentId]) as number;
  return likeCount;
};

export default useBoardCommentLikeCount;
