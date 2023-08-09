import { useSetRecoilState } from 'recoil';
import { boardLikeCountStates } from '../../recoil/states';

const useSetBoardLikeCount = () =>{
  const setBoardLikeCount = useSetRecoilState(boardLikeCountStates);
  const handleSetBoardLikeCount = (boardId: string, newLikeCount: number) => {
    setBoardLikeCount((prev) => {
      const foundBoardLikeCount = prev.find((item) => item.boardId === boardId);
      if (!foundBoardLikeCount) {
        return [...prev, { boardId, likeCount: newLikeCount }];
      }
      const newBoardLikeCount = {
        boardId,
        likeCount: newLikeCount,
      }
      const spliced = prev.filter((item) => item.boardId !== boardId);
      spliced.push(newBoardLikeCount);
      return [...spliced];
    });
  }

  return handleSetBoardLikeCount;
}

export default useSetBoardLikeCount;