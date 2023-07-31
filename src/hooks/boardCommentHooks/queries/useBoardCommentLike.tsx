import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/myConstants';

const useBoardCommentLike = (boardCommentId: string) => {
  const queryClient = useQueryClient();
  const isLiked = queryClient.getQueryData([QUERY_KEY, boardCommentId]) as boolean;
  return isLiked;
};

export default useBoardCommentLike;
