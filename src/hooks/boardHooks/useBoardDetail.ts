import { useBoardService } from '../../context/boardServiceContext';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '../../constants';

const useBoardDetail = (boardId: string) => {
  const { getBoardDetail } = useBoardService();
  const queryClient = useQueryClient();
  const { data } = useQuery([QUERY_KEY.boardDetail, boardId], () => getBoardDetail({ boardId }), {
    enabled: boardId !== '',
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEY.isBoardLiked, boardId], data.likeLog);
    },
  });
  const isLiked = queryClient.getQueryData([QUERY_KEY.isBoardLiked, boardId]) as boolean;

  return {
    data,
    isLiked,
  };
};

export default useBoardDetail;
