import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/myConstants';

const useBoardCommentCountQuery = (boardId: string) => {
  const queryClient = useQueryClient();
  return queryClient.getQueryData([QUERY_KEY.boardCommentCount, boardId]) as number;
};

export default useBoardCommentCountQuery;
