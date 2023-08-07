import { RefObject, useEffect, useState } from 'react';

const useChildBox = (ref: RefObject<HTMLElement>) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsFocus(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if(e.key === 'Escape'){
      setIsFocus(false);
    }
    else if (e.key === 'Enter') {
      setIsFocus(false);
    }else{
      setIsFocus(true);
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isFocus, setIsFocus };
};

export default useChildBox;
