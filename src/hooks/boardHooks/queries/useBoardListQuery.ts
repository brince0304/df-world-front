import { useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/myConstants';
import { useBoardService } from 'context/boardServiceContext';
import useSetBoardLikeCount from '../../recoilHooks/useSetBoardLikeCount';
import useSetBoardCommentCount from '../../recoilHooks/useSetBoardCommentCount';

const useBoardListQuery = (queries: { searchType: string; keyword: string; boardType: string }) => {
  const { getBoardList } = useBoardService();
  const handleSetLikeCount = useSetBoardLikeCount();
  const handleSetBoardCommentCount = useSetBoardCommentCount();
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
      onSuccess: (data) => {
        data.pages.forEach((page) => {
          page.content.forEach((board) => {
            handleSetLikeCount(String(board.id), board.boardLikeCount);
            handleSetBoardCommentCount(String(board.id), board.commentCount);
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
