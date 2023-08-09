import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/myConstants';
import { useBoardService } from 'context/boardServiceContext';

const useHashtagCountQuery = (hashtag: string, mouseOvered: boolean) => {
  const { getBoardCountByHashtag } = useBoardService();
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.boardCountByHashtag, hashtag],
    queryFn: () => getBoardCountByHashtag({ hashtag }),
    enabled: mouseOvered,
  });

  return {
    boardCount: data,
    isHashtagLoading: isLoading,
  };
};

export default useHashtagCountQuery;
