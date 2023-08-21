import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMyPageService } from '../../../context/myPageServiceContext';
import { IMyPageResponse } from '../../../interfaces/IMyPageResponse';
import { QUERY_KEY } from '../../../constants/myConstants';

const useMyPageQuery = () => {
  const myPageService = useMyPageService();
  if (!myPageService) throw new Error('Cannot find MyPageService');
  const { getUserMyPageResponse } = myPageService;
  const queryClient = useQueryClient();
  const { data } = useQuery<IMyPageResponse>([QUERY_KEY.mypage], getUserMyPageResponse, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    cacheTime: 0,
    onError: () => {
      queryClient.setQueryData([QUERY_KEY.mypage], null);
    },
  });

  return {
    data,
  };
};

export default useMyPageQuery;
