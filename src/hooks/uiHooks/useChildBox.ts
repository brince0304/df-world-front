import { RefObject, useEffect, useState } from 'react';

const useChildBox = (ref: RefObject<HTMLDivElement>) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsFocus(false);
    }
  };
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsFocus(false);
    } else if (e.key === 'Enter') {
      setIsFocus(false);
    } else {
      setIsFocus(true);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    ref.current?.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isFocus, setIsFocus };
};

export default useChildBox;
