import { Container } from '@mui/material';
import * as React from 'react';
import { useLocation } from 'react-router';
import '@yaireo/tagify/dist/tagify.css';
import useBoardForm from '../../../hooks/boardHooks/useBoardForm';
import CharacterLinkModal from '../../../components/CharacterLinkModal';
import useCharacterBoardLink from '../../../hooks/useCharacterBoardLink';
import BoardForm from '../../../components/BoardForm';
import useCreateBoard from '../../../hooks/boardHooks/useCreateBoard';
import CharacterLinkBox from '../../../components/BoardForm/CharacterLinkBox';
import { useEffect } from 'react';

const WriteBoard = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const createBoard = useCreateBoard();
  const boardType = searchParams.get('boardType') || 'ALL';
  const { register, handleSubmit, errors, setValues, watchValues, onSubmit } = useBoardForm();
  const formProps = { register, handleSubmit, errors, setValues, watchValues, onSubmit };
  const {
    characterName,
    characterImgPath,
    characterLinkModalOpen,
    setCharacterLinkModalOpen,
    handleSetCharacterDetails,
    handleDeleteCharacter,
  } = useCharacterBoardLink(setValues, '', '');
  const handleModalOpen = () => {
    setCharacterLinkModalOpen(true);
  };
  const characterLinkBoxProps = {
    characterId: watchValues.watchCharacterId || '',
    characterName,
    characterImgUrl: characterImgPath,
    handleOpenModal: handleModalOpen,
    handleDeleteCharacter,
  };
  const handleModalClose = () => {
    setCharacterLinkModalOpen(false);
  };
  useEffect(() => {
    setValues.setBoardType(boardType);
  }, [boardType, setValues]);

  return (
    <Container maxWidth={'md'} sx={{ paddingTop: '20px', flexDirection: 'column', gap: '20px' }}>
      <BoardForm submitHandler={createBoard} useBoardForms={formProps} buttonLabel={'작성'} />
      <CharacterLinkModal
        isOpened={characterLinkModalOpen}
        handleClose={handleModalClose}
        handleSetCharacterDetails={handleSetCharacterDetails}
      />
      <CharacterLinkBox {...characterLinkBoxProps} />
    </Container>
  );
};
export default WriteBoard;
