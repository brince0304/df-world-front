import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../../../constants/myConstants';
import { useCharacterService } from '../../../context/characterServiceContext';
import { getFastSearchListsFromCharactersData } from '../../../utils/charactersUtil';

const useFastCharactersQuery = (characterName: string, serverId: { label: string; value: string }) => {
  const { getCharacterList } = useCharacterService();
  const { data, isLoading, isError } = useQuery(
    [QUERY_KEY.fastSearchCharacters, characterName, serverId],
    () =>
      getCharacterList({
        characterName,
        serverId: serverId.value,
        page: 0,
      }),
    {
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      enabled: characterName.length > 1,
      select: (data) => {
        return getFastSearchListsFromCharactersData(data);
      },
    },
  );
  return {
    data,
    isLoading,
    isError,
  };
};

export default useFastCharactersQuery;
