import { useBoardService } from '../../../context/boardServiceContext';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../../../constants/myConstants';

const useBestBoardList = (query?: string) => {
  const { getBestBoardList } = useBoardService();
  const boardType = query || 'ALL';
  const { data } = useQuery([QUERY_KEY.bestBoardList, boardType], () => getBestBoardList({ boardType }), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  return {
    data,
  };
};

export default useBestBoardList;
