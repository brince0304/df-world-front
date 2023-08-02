import { useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/myConstants';
import { useBoardService } from 'context/boardServiceContext';

const useBoardListQuery = (queries: { searchType: string; keyword: string; boardType: string }) => {
  const { getBoardList } = useBoardService();
  const { data, refetch, hasNextPage } = useInfiniteQuery(
    [QUERY_KEY.boards, queries.searchType, queries.keyword, queries.boardType],
    async ({ pageParam }) =>
      getBoardList({
        searchType: queries.searchType,
        keyword: queries.keyword,
        boardType: queries.boardType,
        page: pageParam,
      }),
    {
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      getNextPageParam: (lastPage) => {
        return lastPage.number + 1;
      },
    },
  );

  return {
    data,
    refetch,
    hasNextPage,
  };
};

export default useBoardListQuery;
