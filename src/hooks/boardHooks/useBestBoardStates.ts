import React, { useEffect, useState } from 'react';

const useBestBoardStates = (listLength: number) => {
  const [index, setIndex] = useState(1);
  const handleLeftClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(listLength === 0) return;
    setIndex(index - 1);
  };
  const handleRightClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIndex(index + 1);
  };

  useEffect(() => {
    if (!listLength || listLength === 1) return;
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % listLength);
    }, 5000);
    return () => clearInterval(interval);
  }, [listLength]);

  return {
    index,
    handleLeftClick,
    handleRightClick,
  };
};

export default useBestBoardStates;
