import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/myConstants';
import { useBoardService } from 'context/boardServiceContext';

const useLatestBoardQuery = (boardType: string) => {
  const { getLatestBoardList } = useBoardService();
  const { data } = useQuery([QUERY_KEY.latestBoardList, boardType], () => getLatestBoardList({ boardType }), {
    select: (data) => (data.content.length > 5 ? data.content.slice(0, 4) : data.content),
  });
  return data;
};

export default useLatestBoardQuery;