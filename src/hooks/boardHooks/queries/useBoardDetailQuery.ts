import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/myConstants';
import { useBoardService } from 'context/boardServiceContext';
import { useSetRecoilState } from 'recoil';
import { boardLikeCountSelector, isBoardLikedSelector } from '../../../recoil/selector';

const useBoardDetailQuery = (boardId: string) => {
  const boardService = useBoardService();
  if (!boardService) throw new Error('Cannot find BoardService');
  const { getBoardDetail } = boardService;
  const setBoardCount = useSetRecoilState(boardLikeCountSelector(boardId));
  const setIsLiked = useSetRecoilState(isBoardLikedSelector(boardId));
  const { data } = useQuery([QUERY_KEY.boardDetail, boardId], () => getBoardDetail({ boardId }), {
    enabled: !!boardId,
    onSuccess: (data) => {
      setBoardCount(data.article.boardLikeCount);
      setIsLiked(data.likeLog);
    },
  });
  return {
    data,
  };
};

export default useBoardDetailQuery;
