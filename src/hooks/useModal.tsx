import { useCallback, useState } from 'react';

type returnType = [boolean, () => void, () => void];

const useModal = (): returnType => {
  const [isOpened, setIsOpened] = useState(false);
  const openModal = useCallback(() => {
    setIsOpened(true);
  }, []);
  const closeModal = useCallback(() => {
    setIsOpened(false);
  }, []);
  return [isOpened, openModal, closeModal];
};

export default useModal;
