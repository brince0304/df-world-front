import Typography from '@mui/material/Typography';
import { Button, styled, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import useBoardForm from '../../hooks/boardHooks/useBoardForm';
import { IBoardRequest } from '../../services/boardService';
import { IBoardDetail } from '../../interfaces/IBoardDetail';
import { useNavigate } from 'react-router-dom';
import ToastEditor from '../ToastEditor/ToastEditor';
import useToastEditor from '../../hooks/boardHooks/useToastEditor';
import BoardFormChips from '../Chips/BoardFormChips';
import TagifyContainer from './TagifyContainer';
import useCharacterBoardLink from '../../hooks/boardHooks/useCharacterBoardLink';

const BoardForm = ({ initialData, submitHandler, useBoardForms, buttonLabel }: IBoardFormProps) => {
  const handleSelectChange = (value: string) => {
    useBoardForms.setValues.setBoardType(value);
  };
  const handlePost = (data: IBoardRequest) => {
    if (window.confirm('글을 작성하시겠습니까?')) {
      useBoardForms.onSubmit(data);
    }
  };
  const {
    characterName,
    characterImgPath,
    characterLinkModalOpen,
    setCharacterLinkModalOpen,
    handleSetCharacterDetails,
    handleDeleteCharacter,
  } = useCharacterBoardLink(useBoardForms.setValues, '', '');
  const handleModalOpen = () => {
    setCharacterLinkModalOpen(true);
  };
  const characterLinkBoxProps = {
    characterId: useBoardForms.watchValues.watchCharacterId || '',
    characterName,
    characterImgUrl: characterImgPath,
    handleOpenModal: handleModalOpen,
    handleDeleteCharacter,
  };
  const handleModalClose = () => {
    setCharacterLinkModalOpen(false);
  };
  const { hooksCallback, onChange } = useToastEditor(useBoardForms.setValues, useBoardForms.watchValues);
  const handleNavigateBack = () => {
    if (window.confirm('작성을 취소하시겠습니까?')) {
      navigate(-1);
    }
  };
  const navigate = useNavigate();
  return (
    <form onSubmit={useBoardForms.handleSubmit(handlePost)}>
      <BoardWriteFormTitleWrapper>
        <Typography variant={'h4'} sx={{ fontWeight: 'bold' }} fontFamily={'Core Sans'}>
          {buttonLabel}
        </Typography>
        <BoardFormChips
          characterLinkBoxProps={characterLinkBoxProps}
          characterLinkModalOpen={characterLinkModalOpen}
          handleClose={handleModalClose}
          handleSetCharacterDetails={handleSetCharacterDetails}
          boardType={useBoardForms.watchValues.watchBoardType}
          setBoardType={handleSelectChange}
        />
      </BoardWriteFormTitleWrapper>
      <Box
        sx={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: '20px',
        }}
      >
        <TextField
          type="text"
          variant={'outlined'}
          error={!!useBoardForms.errors.boardTitle}
          helperText={useBoardForms.errors.boardTitle?.message}
          label={'제목'}
          defaultValue={useBoardForms.watchValues.watchBoardTitle}
          {...useBoardForms.register('boardTitle')}
          sx={{
            width: '100%',
            height: '100%',
            fontSize: '1rem',
            fontWeight: 'bold',
            display: 'flex',
          }}
        />
        <HashtagWrapper>
          <TagifyContainer useFormProps={useBoardForms} handleAddHashtag={useBoardForms.setValues.setHashtag} />
        </HashtagWrapper>
        <Typography
          variant={'body2'}
          sx={{ marginLeft:'0.5rem', marginTop:'0.5rem',fontSize:'0.8rem', textAlign: 'left', color: useBoardForms.errors.hashtag?.message ? 'red' : 'grey' }}
        >
          {useBoardForms.errors.hashtag?.message || '7자 이하로 3개까지 입력해보세요.'}
        </Typography>
      </Box>
      <Box width={'100%'} height={'90%'} paddingTop={'20px'}>
        <ToastEditor
          onChange={onChange}
          hooksCallback={hooksCallback}
          initialValue={useBoardForms.watchValues.watchBoardContent}
        />
        {useBoardForms.errors.boardContent?.message && (
          <Typography variant={'body2'} sx={{ fontSize:'0.7rem', color: 'red', textAlign: 'left' }}>
            {useBoardForms.errors.boardContent?.message}
          </Typography>
        )}
      </Box>

      <FormFooter>
        <Button
          variant={'contained'}
          sx={{
            width: '100px',
            height: '40px',
            backgroundColor: '#3f51b5',
            color: 'white',
            fontWeight: 'bold',
          }}
          type="submit"
        >
          {buttonLabel}
        </Button>
        <Button
          variant={'contained'}
          onClick={handleNavigateBack}
          sx={{
            width: '100px',
            height: '40px',
            backgroundColor: '#3f51b5',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          취소
        </Button>
      </FormFooter>
    </form>
  );
};

interface IBoardFormProps {
  initialData?: IBoardDetail;
  submitHandler: (data: IBoardRequest) => void;
  useBoardForms: ReturnType<typeof useBoardForm>;
  buttonLabel: string;
}

const BoardWriteFormTitleWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
`;

const HashtagWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 20px;
`;

const FormFooter = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 20px;
`;

export default BoardForm;
