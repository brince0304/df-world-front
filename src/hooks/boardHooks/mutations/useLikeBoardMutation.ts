import { useMutation } from '@tanstack/react-query';
import { useBoardService } from '../../../context/boardServiceContext';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { boardLikeCountSelector, isBoardLikedSelector } from '../../../recoil/selector';

const useLikeBoardMutation = (boardId: string) => {
  const { likeBoard } = useBoardService();
  const [isLiked,setIsLiked] = useRecoilState(isBoardLikedSelector(boardId));
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
