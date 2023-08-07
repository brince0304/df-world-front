import { useEffect, useRef } from 'react';

function useDebounce<T extends any[]>(callback: (...params: T) => void, time: number) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && timer.current) {
      clearTimeout(timer.current);
    }
  };

  useEffect(() => {
    document.addEventListener('keypress', handleKeyPress);
    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, []);

  return (...params: T) => {
    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      callback(...params);
      timer.current = null;
    }, time);
  };
}

export default useDebounce;
