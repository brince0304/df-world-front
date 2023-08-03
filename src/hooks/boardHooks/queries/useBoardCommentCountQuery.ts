import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/myConstants';

const useBoardCommentCountQuery = (boardId: string) => {
  const queryClient = useQueryClient();
  const boardCommentCount = queryClient.getQueryData([QUERY_KEY.boardCommentCount, boardId]) as number;
  return boardCommentCount;
};

export default useBoardCommentCountQuery;
