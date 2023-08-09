import { useMutation } from '@tanstack/react-query';
import { useBoardCommentService } from 'context/boardCommentServiceContext';
import { useSetRecoilState } from 'recoil';
import { boardCommentIsLikedSelector, boardCommentLikeCountSelector } from '../../../recoil/selector';

const useLikeBoardCommentMutation = (commentId: string) => {
  const { likeComment } = useBoardCommentService();
  const setIsLiked = useSetRecoilState(boardCommentIsLikedSelector(commentId));
  const setLikeCount = useSetRecoilState(boardCommentLikeCountSelector(commentId));
  const { mutate: likeBoardComment } = useMutation(likeComment, {
    onSuccess: (data) => {
      setIsLiked((prev) => !prev);
      setLikeCount(data);
    },
  });

  return likeBoardComment;
};

export default useLikeBoardCommentMutation;
