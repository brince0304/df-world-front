import { useState } from 'react';

const useCharacterBoardLink = (setValues: any, initialCharacterName?: string, initialCharacterImgPath?: string) => {
  const [characterName, setCharacterName] = useState<string>(initialCharacterName || '');
  const [characterImgPath, setCharacterImgPath] = useState<string>(initialCharacterImgPath || '');
  const [isCharacterLinkModalOpen, setIsCharacterLinkModalOpen] = useState<boolean>(false);
  const handleSetCharacterDetails = (characterId: string, serverId: string, characterName: string) => {
    if (window.confirm('해당 캐릭터를 등록하시겠습니까?')) {
      setValues.setCharacterId(characterId);
      setValues.setServerId(serverId);
      setCharacterName(characterName);
      setCharacterImgPath(`https://img-api.neople.co.kr/df/servers/${serverId}/characters/${characterId}?zoom=3`);
      setIsCharacterLinkModalOpen(false);
    }
  };
  const handleDeleteCharacter = () => {
    setCharacterName('');
    setCharacterImgPath('');
    setValues.setCharacterId('');
    setValues.setServerId('');
  };

  return {
    characterName,
    characterImgPath,
    characterLinkModalOpen: isCharacterLinkModalOpen,
    setCharacterLinkModalOpen: setIsCharacterLinkModalOpen,
    handleSetCharacterDetails,
    handleDeleteCharacter,
  };
};

export default useCharacterBoardLink;
