import { useState } from 'react';
import useAddCharacter from './useAddCharacter';

const useCharacterUserLink = () => {
  const [openLinkCharacterModal, setOpenLinkCharacterModal] = useState(false);
  const addCharacter = useAddCharacter();
  const handlePostCharacter = (characterId: string, serverId: string, characterName: string) => {
    if (characterId && serverId && window.confirm(`${characterName} 캐릭터를 등록하시겠습니까?`)) {
      addCharacter({ characterId, serverId });
    }
  };
  const handleOpenCharacterLinkModal = () => {
    setOpenLinkCharacterModal(true);
  }

  const handleCloseCharacterLinkModal = () => {
    setOpenLinkCharacterModal(false);
  };

  return {
    openLinkCharacterModal,
    handleOpenCharacterLinkModal,
    handleCloseCharacterLinkModal,
    handlePostCharacter,
  }
}

export default useCharacterUserLink;