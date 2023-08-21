import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/myConstants';
import { useCharacterService } from 'context/characterServiceContext';
import useRecentSearchedQuery from 'hooks/recoilHooks/useRecentSearchedQuery';
import { ICharacterDetail } from 'interfaces/ICharacterDetail';
import { getRecentSearchedQueryFromCharacterDetail } from 'utils/charactersUtil';

const useCharacterDetailQuery = (characterId: string, serverId: string) => {
  const characterService = useCharacterService();
  if (!characterService) throw new Error('Cannot find CharacterService');
  const { getCharacterDetail } = characterService;
  const queryClient = useQueryClient();
  const { handleAddRecentSearchedQuery } = useRecentSearchedQuery();
  const { data, refetch, isError } = useQuery<ICharacterDetail>(
    [QUERY_KEY.characterDetail, characterId, serverId],
    async () => getCharacterDetail({ characterId, serverId }),
    {
      enabled: !!characterId && !!serverId,
      onSuccess: (data) => {
        const item = getRecentSearchedQueryFromCharacterDetail(data);
        handleAddRecentSearchedQuery(item);
        queryClient.setQueryData([QUERY_KEY.characterDetail], data);
      },
    },
  );

  return { data, refetch, isError };
};

export default useCharacterDetailQuery;
