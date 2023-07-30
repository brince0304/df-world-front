import { useBoardService } from '../../context/boardServiceContext';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../../constants';

const useLatestBoard = (boardType: string) => {
  const { getLatestBoardList } = useBoardService();
  const { data } = useQuery([QUERY_KEY.latestBoardList, boardType], () => getLatestBoardList({ boardType }));
  return data;
};

export default useLatestBoard;
