import { useBoardService } from '../../../context/boardServiceContext';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../../../constants/myConstants';

const useHashtagListQuery = (query: string) => {
  const { getHashtags } = useBoardService();
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEY.hashtagList, query],
    queryFn: () => getHashtags({ hashtag: query }),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: !!query,
  });
  return { data, isLoading, isError };
};

export default useHashtagListQuery;
