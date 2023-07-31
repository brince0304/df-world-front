import { useEffect, useState } from 'react';
import useFastCharactersQuery from './useFastCharactersQuery';
import useDebounce from 'hooks/uiHooks/useDebounce';

const useFastCharacterSearchQuery = () => {
  const [characterName, setCharacterName] = useState('');
  const [debouncedCharacterName, setDebouncedCharacterName] = useState('');
  const [serverId, setServerId] = useState({ label: '전체', value: 'all' });
  const debouncedSetCharacterName = useDebounce(setDebouncedCharacterName, 200);
  const { data: fastResult } = useFastCharactersQuery(debouncedCharacterName, serverId);
  useEffect(() => {
    debouncedSetCharacterName(characterName);
  }, [characterName, debouncedSetCharacterName]);

  return {
    characterName,
    debouncedCharacterName,
    setDebouncedCharacterName,
    setCharacterName,
    debouncedSetCharacterName,
    setServerId,
    serverId,
    fastResult,
  };
};

export default useFastCharacterSearchQuery;
