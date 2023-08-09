import { useSetRecoilState } from 'recoil';
import { isBoardLikedStates } from '../../recoil/states';

const useSetBoardIsLiked = () => {
  const setBoardIsLiked = useSetRecoilState(isBoardLikedStates);
  const handleSetBoardIsLiked = (boardId: string, newIsLiked: boolean) => {
    setBoardIsLiked((prev) => {
      const foundBoardIsLiked = prev.find((item) => item.boardId === boardId);
      if (!foundBoardIsLiked) {
        return [...prev, { boardId, isLiked: newIsLiked }];
      }
      const newBoardIsLiked = {
        boardId,
        isLiked: newIsLiked,
      }
      const spliced = prev.filter((item) => item.boardId !== boardId);
      spliced.push(newBoardIsLiked);
      return [...spliced];
    });
  }

  return handleSetBoardIsLiked;
}

export default useSetBoardIsLiked;