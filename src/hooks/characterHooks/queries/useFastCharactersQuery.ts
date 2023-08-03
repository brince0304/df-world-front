import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../../../constants/myConstants';
import { useCharacterService } from '../../../context/characterServiceContext';
import { getFastSearchListsFromCharactersData } from '../../../utils/charactersUtil';
import { useEffect, useState } from 'react';
import useDebounce from 'hooks/uiHooks/useDebounce';

const useFastCharactersQuery = (characterName: string, serverId: { label: string; value: string }) => {
  const { getCharacterList } = useCharacterService();
  const [debouncedCharacterName, setDebouncedCharacterName] = useState(characterName);
  const debounceddSetCharacterName = useDebounce(setDebouncedCharacterName, 300);
  useEffect(() => {
    debounceddSetCharacterName(characterName);
  }, [characterName, debounceddSetCharacterName]);
  const { data, isLoading, isError } = useQuery(
    [QUERY_KEY.fastSearchCharacters, debouncedCharacterName, serverId],
    () =>
      getCharacterList({
        characterName,
        serverId: serverId.value,
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
  return {
    data,
    isLoading,
    isError,
  };
};

export default useFastCharactersQuery;
