import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/myConstants';

const useBoardLikeCount = (boardId: string) => {
  const queryClient = useQueryClient();
  const boardLikeCount = queryClient.getQueryData([QUERY_KEY.boardLikeCount, boardId]) as number;
  return boardLikeCount;
};

export default useBoardLikeCount;
