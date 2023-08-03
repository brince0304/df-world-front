import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/myConstants';
import { useBoardService } from 'context/boardServiceContext';

const useBoardListQuery = (queries: { searchType: string; keyword: string; boardType: string }) => {
  const { getBoardList } = useBoardService();
  const queryClient = useQueryClient();
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    [QUERY_KEY.boards, queries.searchType, queries.keyword, queries.boardType],
    async ({ pageParam }) =>
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
      onSuccess: (data) => {
        data.pages.forEach((page) => {
          page.content.forEach((board) => {
            queryClient.setQueryData([QUERY_KEY.boardCommentCount, board.id], board.commentCount);
            queryClient.setQueryData([QUERY_KEY.boardLikeCount, board.id], board.boardLikeCount);
          });
        });
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
