import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/myConstants';
import { useBoardCommentService } from 'context/boardCommentServiceContext';

const useChildrenComments = (boardId: string, commentId: string) => {
  const { getChildrenComments } = useBoardCommentService();
  const { data } = useQuery(
    [QUERY_KEY.childrenComments, boardId, commentId],
    () => getChildrenComments({ boardId, commentId }),
    {
      enabled: !!boardId && !!commentId,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  );
  return data;
};

export default useChildrenComments;
