import MyChip from './MyChip';
import { boardTypesForForm, getBoardType } from '../../utils/boardUtil';
import { List, styled } from '@mui/material';
import CharacterLinkBox, { ICharacterLinkBoxProps } from '../BoardForm/CharacterLinkBox';
import * as React from 'react';
import CharacterLinkModal from '../CharacterLinkModal/CharacterLinkModal';

const BoardFormChips = ({ boardType, setBoardType , characterLinkBoxProps, characterLinkModalOpen, handleSetCharacterDetails, handleClose}: IBoardFormChipsProps) => {
  return (
    <ListContainer>
      {boardTypesForForm.map((boardCategory, index) => (
        <MyChip
          key={index}
          label={getBoardType(boardCategory.id)}
          color={boardType === boardCategory.id ? 'info' : 'default'}
          variant={boardType === boardCategory.id ? 'filled' : 'outlined'}
          clickable={true}
          sx={{ fontSize: '13px', fontWeight: 'bold' }}
          size="medium"
          data-type={getBoardType(boardCategory.id)}
          onClick={() => setBoardType(boardCategory.id)}
        />
      ))}
      <CharacterLinkBox {...characterLinkBoxProps} />
      <CharacterLinkModal
        isOpened={characterLinkModalOpen}
        handleClose={handleClose}
        handleSetCharacterDetails={handleSetCharacterDetails}
      />
    </ListContainer>
  );
};

export default BoardFormChips;

interface IBoardFormChipsProps {
  boardType: string;
  setBoardType: (value: string) => void;
  characterLinkBoxProps : ICharacterLinkBoxProps;
  characterLinkModalOpen: boolean;
  handleSetCharacterDetails: (characterId: string, characterName: string, characterImgPath: string) => void;
  handleClose: () => void;
}

const ListContainer = styled(List)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  overflow-x: auto;
  width: 100%;
  scroll-behavior: smooth;
  
  gap: 5px;
`;

