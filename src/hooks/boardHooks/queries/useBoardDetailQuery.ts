import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/myConstants';
import { useBoardService } from 'context/boardServiceContext';

const useBoardDetailQuery = (boardId: string) => {
  const { getBoardDetail } = useBoardService();
  const queryClient = useQueryClient();
  const { data } = useQuery([QUERY_KEY.boardDetail, boardId], () => getBoardDetail({ boardId }), {
    enabled: !!boardId,
    onSuccess: async (data) => {
      const likeCount = data.article.boardLikeCount !== undefined ? data.article.boardLikeCount : 0;
      const isLiked = data.likeLog !== undefined ? data.likeLog : false;
      queryClient.setQueryData([QUERY_KEY.boardLikeCount, String(data.article.id)], likeCount);
      queryClient.setQueryData([QUERY_KEY.isBoardLiked, String(data.article.id)], isLiked);
    },
  });
  return {
    data,
  };
};

export default useBoardDetailQuery;
