import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../../../constants/myConstants';
import { useCharacterService } from '../../../context/characterServiceContext';
import { getFastSearchListsFromCharactersData } from '../../../utils/charactersUtil';

const useFastCharactersQuery = (characterName: string, serverId: string) => {
  const { getCharacterList } = useCharacterService();
  const { data } = useQuery(
    [QUERY_KEY.fastSearchCharacters, characterName, serverId],
    () =>
      getCharacterList({
        characterName,
        serverId: serverId,
        page: 0,
      }),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      enabled: !!characterName && !!serverId,
      select: (data) => {
        return getFastSearchListsFromCharactersData(data);
      },
    },
  );
  return data;
};

export default useFastCharactersQuery;
