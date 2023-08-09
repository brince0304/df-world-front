import { useSetRecoilState } from 'recoil';
import { boardCommentCountState } from '../../recoil/states';

const useSetBoardCommentCount = () => {
  const setBoardCommentCount = useSetRecoilState(boardCommentCountState);
  const handleSetBoardCommentCount = (boardId: string, newCommentCount: string) => {
    setBoardCommentCount((prev) => {
      const foundBoardCommentCount = prev.find((item) => item.boardId === boardId);
      if (!foundBoardCommentCount) {
        return [...prev, { boardId, commentCount: newCommentCount }];
      }
      const newBoardCommentCount = {
        boardId,
        commentCount: newCommentCount,
      };
      const spliced = prev.filter((item) => item.boardId !== boardId);
      spliced.push(newBoardCommentCount);
      return [...spliced];
    });
  };

  return handleSetBoardCommentCount;
};

export default useSetBoardCommentCount;
