import { useCharacterService } from '../../../context/characterServiceContext';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../../../constants/myConstants';

const useMainAdventureRankingQuery = (searchType: string) => {
  const characterService = useCharacterService();
  if (!characterService) throw new Error('Cannot find CharacterService');
  const { getMainAdventureRanking } = characterService;
  const { data } = useQuery(
    [QUERY_KEY.mainPageAdventureRanking, searchType],
    () => getMainAdventureRanking({ searchType }),
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      enabled: !!searchType,
    },
  );

  return data;
};

export default useMainAdventureRankingQuery;
