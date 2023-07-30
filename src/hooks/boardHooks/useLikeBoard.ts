import { useBoardService } from '../../context/boardServiceContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '../../constants';

const useLikeBoard = (boardId:string) => {
  const { likeBoard} = useBoardService();
  const queryClient = useQueryClient();
  const isLiked = queryClient.getQueryData([QUERY_KEY.isBoardLiked, boardId]) as boolean;
  const likeCount = queryClient.getQueryData([QUERY_KEY.boardLikeCount, boardId]) as number;
  const {mutate: likeBoardMutation} = useMutation([QUERY_KEY.boardLikeCount, boardId], () => likeBoard({ boardId }), {
    onSuccess: () => {
      queryClient.setQueryData([QUERY_KEY.isBoardLiked, boardId], !isLiked);
    },
  });

  return {
    likeBoardMutation,
    likeCount,
  }
}

export default useLikeBoard;