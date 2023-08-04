import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/myConstants';
import { useBoardService } from 'context/boardServiceContext';

const useBoardDetailQuery = (boardId: string) => {
  const { getBoardDetail } = useBoardService();
  const queryClient = useQueryClient();
  const { data } = useQuery([QUERY_KEY.boardDetail, boardId], () => getBoardDetail({ boardId }), {
    enabled: boardId !== '',
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEY.isBoardLiked, String(boardId)], data.likeLog);
      queryClient.setQueryData([QUERY_KEY.boardLikeCount, String(boardId)], data.article.boardLikeCount);
    },
  });
  const isLiked = queryClient.getQueryData([QUERY_KEY.isBoardLiked, boardId]) as boolean;

  return {
    data,
    isLiked,
  };
};

export default useBoardDetailQuery;
