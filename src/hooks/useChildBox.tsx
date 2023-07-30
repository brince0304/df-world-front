import { RefObject, useEffect, useState } from 'react';

const useChildBox = (ref: RefObject<HTMLElement>) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsFocus(false);
      }
    }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.info(isFocus);
  }, [isFocus]);


  return { isFocus, setIsFocus };
};

export default useChildBox;
