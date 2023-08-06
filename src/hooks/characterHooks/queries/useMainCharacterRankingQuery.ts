import { useCharacterService } from '../../../context/characterServiceContext';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../../../constants/myConstants';

const useMainCharacterRankingQuery = (searchType: string) => {
  const { getMainCharacterRanking } = useCharacterService();
  const { data } = useQuery({
    queryKey: [QUERY_KEY.mainPageCharacterRanking, searchType],
    queryFn: () => getMainCharacterRanking({ searchType }),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: !!searchType,
  });

  return data;
};

export default useMainCharacterRankingQuery;
