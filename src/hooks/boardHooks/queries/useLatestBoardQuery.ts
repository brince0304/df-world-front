import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/myConstants';
import { useBoardService } from 'context/boardServiceContext';
import useSetBoardLikeCount from '../../recoilHooks/useSetBoardLikeCount';
import useSetBoardCommentCount from '../../recoilHooks/useSetBoardCommentCount';

const useLatestBoardQuery = (boardType: string) => {
  const boardService = useBoardService();
  if (!boardService) throw new Error('Cannot find BoardService');
  const { getLatestBoardList } = boardService;
  const handleSetLikeCount = useSetBoardLikeCount();
  const handleSetBoardCommentCount = useSetBoardCommentCount();
  const { data } = useQuery([QUERY_KEY.latestBoardList, boardType], async () => getLatestBoardList({ boardType }), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    select: (data) => {
      return data.content.length > 5 ? data.content.slice(0, 5) : data.content;
    },
    onSuccess: (data) => {
      data.forEach((board) => {
        handleSetLikeCount(String(board.id), board.boardLikeCount);
        handleSetBoardCommentCount(String(board.id), board.commentCount);
      });
    },
  });

  return data;
};

export default useLatestBoardQuery;
