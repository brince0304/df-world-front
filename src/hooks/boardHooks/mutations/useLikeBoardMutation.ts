import { useMutation } from '@tanstack/react-query';
import { useBoardService } from '../../../context/boardServiceContext';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { boardLikeCountSelector, isBoardLikedSelector } from '../../../recoil/selector';

const useLikeBoardMutation = (boardId: string) => {
  const boardService = useBoardService();
  if (!boardService) throw new Error('Cannot find BoardService');
  const { likeBoard } = boardService;
  const [isLiked, setIsLiked] = useRecoilState(isBoardLikedSelector(boardId));
  const setLikeCount = useSetRecoilState(boardLikeCountSelector(boardId));
  const { mutate: likeBoardMutation } = useMutation(likeBoard, {
    onSuccess: (data) => {
      setIsLiked(!isLiked);
      setLikeCount(data);
    },
  });

  return likeBoardMutation;
};

export default useLikeBoardMutation;
