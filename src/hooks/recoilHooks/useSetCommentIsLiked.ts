import { useSetRecoilState } from 'recoil';
import { isBoardCommentLikedStates } from '../../recoil/states';

const useSetCommentIsLiked = () => {
  const setCommentIsLiked = useSetRecoilState(isBoardCommentLikedStates);
  const handleSetCommentIsLiked = (boardCommentId: string, newIsLiked: boolean) => {
    setCommentIsLiked((prev) => {
      const foundCommentIsLiked = prev.find((item) => item.boardCommentId === boardCommentId);
      if (!foundCommentIsLiked) {
        return [...prev, { boardCommentId, isLiked: newIsLiked }];
      }
      const newCommentIsLiked = {
        boardCommentId,
        isLiked: newIsLiked,
      };
      const spliced = prev.filter((item) => item.boardCommentId !== boardCommentId);
      spliced.push(newCommentIsLiked);
      return [...spliced];
    });
  };

  return handleSetCommentIsLiked;
};

export default useSetCommentIsLiked;
