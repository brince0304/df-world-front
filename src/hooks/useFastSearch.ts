import { useEffect, useState } from 'react';
import useDebounce from './useDebounce';
import useFastCharacters from './characterHooks/useFastCharacters';

const useFastCharacterSearch = () => {
  const [characterName, setCharacterName] = useState('');
  const [debouncedCharacterName, setDebouncedCharacterName] = useState('');
  const [serverId, setServerId] = useState({ label: '전체', value: 'all' });
  const debouncedSetCharacterName = useDebounce(setDebouncedCharacterName, 200);
  const { data: fastResult } = useFastCharacters(debouncedCharacterName, serverId);
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

export default useFastCharacterSearch;
