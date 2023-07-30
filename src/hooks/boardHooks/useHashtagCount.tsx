import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useBoardService } from '../../context/boardServiceContext';
import { QUERY_KEY } from '../../constants';

const useHashtagCount = (hashtag: string, mouseOvered: boolean) => {
  const { getBoardCountByHashtag } = useBoardService();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.boardCountByHashtag, hashtag],
    queryFn: () => getBoardCountByHashtag({ hashtag }),
    enabled: mouseOvered,
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEY.boardCountByHashtag, hashtag], data);
    },
  });

  return {
    boardCount: data,
    isHashtagLoading: isLoading,
  };
};

export default useHashtagCount;
