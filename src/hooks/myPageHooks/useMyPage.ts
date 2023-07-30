import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMyPageService } from '../../context/myPageServiceContext';
import { IMyPageResponse } from '../../interfaces/IMyPageResponse';
import { QUERY_KEY } from '../../constants';
import { useLogout } from '../authHooks/useLogout';

const useMyPage = () => {
  const { getUserMyPageResponse } = useMyPageService();
  const queryClient = useQueryClient();
  const logout = useLogout();
  const { data } = useQuery<IMyPageResponse>([QUERY_KEY.mypage], getUserMyPageResponse, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    cacheTime: 0,
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEY.mypage], data);
    },
    onError: () => {
      queryClient.setQueryData([QUERY_KEY.mypage], null);
      logout();
    },
  });

  return {
    data,
  };
};

export default useMyPage;
