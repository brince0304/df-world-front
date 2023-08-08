import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/myConstants';
import { useBoardService } from 'context/boardServiceContext';

const useBoardListQuery = (queries: { searchType: string; keyword: string; boardType: string }) => {
  const { getBoardList } = useBoardService();
  const queryClient = useQueryClient();
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    [QUERY_KEY.boards, queries.searchType, queries.keyword, queries.boardType],
    ({ pageParam }) =>
      getBoardList({
        searchType: queries.searchType,
        keyword: queries.keyword,
        boardType: queries.boardType,
        page: pageParam,
      }),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.number + 1 >= lastPage.totalPages) return undefined;
        return lastPage.number + 1;
      },
      onSuccess: async (data) => {
        const tasks = data.pages.map(async (page) => {
          await Promise.all(
            page.content.map(async (board) => {
              const commentCount = board.commentCount !== undefined ? board.commentCount : 0;
              const boardLikeCount = board.boardLikeCount !== undefined ? board.boardLikeCount : 0;

              queryClient.setQueryData([QUERY_KEY.boardCommentCount, String(board.id)], commentCount);
              queryClient.setQueryData([QUERY_KEY.boardLikeCount, String(board.id)], boardLikeCount);
            }),
          );
        });

        await Promise.all(tasks);
      },
    },
  );

  return {
    data,
    fetchNextPage,
    hasNextPage,
  };
};

export default useBoardListQuery;
