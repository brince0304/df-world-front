import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/myConstants';
import { useBoardService } from '../../../context/boardServiceContext';

const useLikeBoardMutation = (boardId: string) => {
  const { likeBoard } = useBoardService();
  const queryClient = useQueryClient();
  const prevIsLiked = queryClient.getQueryData([QUERY_KEY.isBoardLiked, boardId]);
  const { mutate: likeBoardMutation } = useMutation(likeBoard, {
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEY.isBoardLiked, boardId], !prevIsLiked);
      queryClient.setQueryData([QUERY_KEY.boardLikeCount, boardId], data);
    },
  });

  return likeBoardMutation;
};

export default useLikeBoardMutation;
