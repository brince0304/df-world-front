import { useInfiniteQuery } from '@tanstack/react-query';
import { useCharacterService } from '../../context/characterServiceContext';
import { QUERY_KEY } from '../../constants';
import { ICharactersData } from '../../interfaces/ICharactersData';

const useCharacters = (characterName: string, serverId: string) => {
  const { getCharacterList } = useCharacterService();
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery<ICharactersData>(
    [QUERY_KEY.characters, characterName, serverId],
    async ({ pageParam }): Promise<ICharactersData> => getCharacterList({ characterName, serverId, page: pageParam }),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      cacheTime: 0,
      getNextPageParam: (lastPage) => {
        if (lastPage.number + 1 >= lastPage.totalPages) return undefined;
        return lastPage.number + 1;
      },
    },
  );

  return {
    data,
    fetchNextPage,
    hasNextPage,
  };
};

export default useCharacters;
