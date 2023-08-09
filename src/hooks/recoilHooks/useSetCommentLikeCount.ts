import { useSetRecoilState } from 'recoil';
import { boardCommentLikeCountStates } from '../../recoil/states';

const useSetCommentLikeCount = () => {
  const setCommentLikeCount = useSetRecoilState(boardCommentLikeCountStates);
  const handleSetCommentLikeCount = (boardCommentId: string, newLikeCount: number) => {
    setCommentLikeCount((prev) => {
      const foundCommentLikeCount = prev.find((item) => item.boardCommentId === boardCommentId);
      if (!foundCommentLikeCount) {
        return [...prev, { boardCommentId, likeCount: newLikeCount }];
      }
      const newCommentLikeCount = {
        boardCommentId,
        likeCount: newLikeCount,
      };
      const spliced = prev.filter((item) => item.boardCommentId !== boardCommentId);
      spliced.push(newCommentLikeCount);
      return [...spliced];
    });
  };

  return handleSetCommentLikeCount;
};

export default useSetCommentLikeCount;
