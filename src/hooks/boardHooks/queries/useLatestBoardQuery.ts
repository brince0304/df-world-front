import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/myConstants';
import { useBoardService } from 'context/boardServiceContext';

const useLatestBoardQuery = (boardType: string) => {
  const queryClient = useQueryClient();
  const { getLatestBoardList } = useBoardService();
  const { data } = useQuery([QUERY_KEY.latestBoardList, boardType], () => getLatestBoardList({ boardType }), {
    select: (data) => (data.content.length > 5 ? data.content.slice(0, 4) : data.content),
    onSuccess: (data) => {
      data.forEach((board) => {
        queryClient.setQueryData([QUERY_KEY.boardCommentCount, board.id], board.commentCount);
        queryClient.setQueryData([QUERY_KEY.boardLikeCount, board.id], board.boardLikeCount);
      });
    },
  });
  return data;
};

export default useLatestBoardQuery;
