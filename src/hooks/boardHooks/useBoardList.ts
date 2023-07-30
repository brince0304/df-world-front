import { useBoardService } from '../../context/boardServiceContext';
import { useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../../constants';

const useBoardList = (queries: { searchType: string; keyword: string; boardType: string }) => {
  const { getBoardList } = useBoardService();
  const { data, refetch, hasNextPage } = useInfiniteQuery(
    [QUERY_KEY, queries.searchType, queries.keyword, queries.boardType],
    async ({ pageParam }) =>
      getBoardList({
        searchType: queries.searchType,
        keyword: queries.keyword,
        boardType: queries.boardType,
        page: pageParam,
      }),
    {
      refetchOnMount: false,
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

export default useBoardList;
