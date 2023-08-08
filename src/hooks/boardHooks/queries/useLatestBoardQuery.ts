import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/myConstants';
import { useBoardService } from 'context/boardServiceContext';

const useLatestBoardQuery = (boardType: string) => {
  const queryClient = useQueryClient();
  const { getLatestBoardList } = useBoardService();
  const { data } = useQuery(
    [QUERY_KEY.latestBoardList, boardType],
    async () => {
      const response = await getLatestBoardList({ boardType });

      // 동기화 작업 수행
      await Promise.all(
        response.content.map(async (board) => {
          const commentCount = board.commentCount !== undefined ? board.commentCount : 0;
          const boardLikeCount = board.boardLikeCount !== undefined ? board.boardLikeCount : 0;
          queryClient.setQueryData([QUERY_KEY.boardCommentCount, String(board.id)], commentCount);
          queryClient.setQueryData([QUERY_KEY.boardLikeCount, String(board.id)], boardLikeCount);
          return {
            ...board,
            commentCount,
            boardLikeCount,
          };
        }),
      );

      return response;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  );

  return data;
};

export default useLatestBoardQuery;
