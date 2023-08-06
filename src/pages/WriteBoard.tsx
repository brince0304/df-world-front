import { Container } from '@mui/material';
import * as React from 'react';
import { useLocation } from 'react-router';
import '@yaireo/tagify/dist/tagify.css';
import useBoardForm from '../hooks/boardHooks/useBoardForm';
import CharacterLinkModal from '../components/CharacterLinkModal/CharacterLinkModal';
import useCharacterBoardLink from '../hooks/boardHooks/useCharacterBoardLink';
import BoardForm from '../components/BoardForm/BoardForm';
import useCreateBoardMutation from '../hooks/boardHooks/mutations/useCreateBoardMutation';
import CharacterLinkBox from '../components/BoardForm/CharacterLinkBox';
import { useEffect } from 'react';

const WriteBoard = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const createBoard = useCreateBoardMutation();
  const boardType = searchParams.get('boardType') || 'ALL';
  const formProps = useBoardForm();
  const {
    characterName,
    characterImgPath,
    characterLinkModalOpen,
    setCharacterLinkModalOpen,
    handleSetCharacterDetails,
    handleDeleteCharacter,
  } = useCharacterBoardLink(formProps.setValues, '', '');
  const handleModalOpen = () => {
    setCharacterLinkModalOpen(true);
  };
  const characterLinkBoxProps = {
    characterId: formProps.watchValues.watchCharacterId || '',
    characterName,
    characterImgUrl: characterImgPath,
    handleOpenModal: handleModalOpen,
    handleDeleteCharacter,
  };
  const handleModalClose = () => {
    setCharacterLinkModalOpen(false);
  };
  useEffect(() => {
    if (boardType === 'ALL') {
      formProps.setValues.setBoardType('FREE');
      return;
    }
    formProps.setValues.setBoardType(boardType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
