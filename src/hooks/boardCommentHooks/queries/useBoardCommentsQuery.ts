import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/myConstants';
import { useBoardCommentService } from 'context/boardCommentServiceContext';
import useSetBoardCommentCount from '../../recoilHooks/useSetBoardCommentCount';
import useSetCommentLikeCount from '../../recoilHooks/useSetCommentLikeCount';
import useSetCommentIsLiked from '../../recoilHooks/useSetCommentIsLiked';

const useBoardCommentsQuery = (boardId: string) => {
  const { getBoardComments } = useBoardCommentService();
  const handleSetBoardCommentCount = useSetBoardCommentCount();
  const handleSetCommentLikeCount = useSetCommentLikeCount();
  const handleSetCommentIsLiked = useSetCommentIsLiked();
  const { data } = useQuery([QUERY_KEY.boardComments, boardId], () => getBoardComments({ boardId }), {
    enabled: !!boardId,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    onSuccess: (data) => {
      const commentCount = data.comments.length;
      const childrenCount = data.comments.reduce((acc, cur) => acc + cur.childrenCommentCount, 0);
      const boardCommentCount = commentCount && childrenCount ? commentCount + childrenCount : data.comments.length;
      handleSetBoardCommentCount(boardId, String(boardCommentCount));
      data.likeResponses.forEach((likeResponse) => {
        handleSetCommentIsLiked(String(likeResponse.id), likeResponse.isLike);
      });
      data.comments.forEach((comment) => {
        handleSetCommentLikeCount(String(comment.id), comment.commentLikeCount);
      });
    },
  });
  return data;
};

export default useBoardCommentsQuery;
