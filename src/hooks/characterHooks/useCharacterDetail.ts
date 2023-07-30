import { useCharacterService } from '../../context/characterServiceContext';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ICharacterDetail } from '../../interfaces/ICharacterDetail';
import { QUERY_KEY } from '../../constants';
import useRecentSearchedQuery from '../recoilHooks/useRecentSearchedQuery';
import {
  getRecentSearchedQueryFromCharacterDetail,
} from '../../utils/charactersUtil';

const useCharacterDetail = (characterId: string, serverId: string) => {
  const { getCharacterDetail } = useCharacterService();
  const queryClient = useQueryClient();
  const {handleAddRecentSearchedQuery} = useRecentSearchedQuery();
  const { data, refetch , isError } = useQuery<ICharacterDetail>(
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

  return { data, refetch , isError };
};

export default useCharacterDetail;
