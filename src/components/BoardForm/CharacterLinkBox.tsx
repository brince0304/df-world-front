import { styled, Zoom } from '@mui/material';
import * as React from 'react';
import Box from '@mui/material/Box';
import CharacterLinkButtonNotLinked from '../Chips/CharacterLinkButton';
import CharacterLinkButtonLinked from '../Chips/CharacterLinkButtonLinked';

const CharacterLinkBox = ({ characterId, characterName, characterImgUrl, handleOpenModal, handleDeleteCharacter }: ICharacterLinkBoxProps) => {
  return (
    <SetCharacterContainer>
      {characterId ==='' && (
        <Zoom in={characterId === ''}>
          <CharacterLinkButtonNotLinked characterLinkModalOpen={handleOpenModal} />
        </Zoom>
      )}
      {characterId !== '' && (
        <Zoom in={characterId !== ''}>
          <CharacterLinkButtonLinked characterName={characterName} characterImgUrl={characterImgUrl} handleDeleteCharacter={handleDeleteCharacter} />
        </Zoom>
      )}
    </SetCharacterContainer>
  );
}

interface ICharacterLinkBoxProps {
  characterId: string;
  characterName: string;
  characterImgUrl: string;
  handleOpenModal: (...args:any[]) => void;
  handleDeleteCharacter: (...args:any[]) => void;
}
export default CharacterLinkBox;

const SetCharacterContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 10px;
`;