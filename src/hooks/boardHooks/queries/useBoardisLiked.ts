import { QUERY_KEY } from '../../../constants/myConstants';
import { useQueryClient } from '@tanstack/react-query';

const useBoardisLiked = (boardId: string) => {
  const queryClient = useQueryClient();
  const isLiked = queryClient.getQueryData([QUERY_KEY.isBoardLiked, boardId]);
  return isLiked;
};

export default useBoardisLiked;
