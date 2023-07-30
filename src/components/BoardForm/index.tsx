import Typography from '@mui/material/Typography';
import { Button, styled, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import useBoardForm from '../../hooks/boardHooks/useBoardForm';
import { IBoardRequest } from '../../service/boardService';
import { IBoardDetail } from '../../interfaces/IBoardDetail';
import { useNavigate } from 'react-router-dom';
import ToastEditor from '../ToastEditor';
import useToastEditor from '../../hooks/boardHooks/useToastEditor';
import BoardTypeMenus from './BoardTypeMenus';

const BoardForm = ({  initialData, submitHandler, useBoardForms, buttonLabel }: IBoardFormProps) => {
  const { register, handleSubmit, errors, setValues, watchValues , onSubmit } = useBoardForms;
  const handleSelectChange = (event: React.MouseEvent) => {
    setValues.setBoardType(event.currentTarget.getAttribute('data-value') as string);
  };
  const handlePost = (data: IBoardRequest) => {
    if (window.confirm('글을 작성하시겠습니까?')) {
      onSubmit(data)
    }
  };
  const {hooksCallback, onChange} = useToastEditor(setValues,watchValues);
  const handleNavigateBack = () => {
    if (window.confirm('작성을 취소하시겠습니까?')) {
      navigate(-1);
    }
  }
  const navigate = useNavigate();
  return (
    <form onSubmit={handleSubmit(handlePost)}>
      <BoardWriteFormTitleWrapper>
        <Typography variant={'h4'} sx={{ fontWeight: 'bold' }} fontFamily={'Core Sans'}>
          {buttonLabel}
        </Typography>
      <BoardTypeMenus register={register('boardType')} handleSelectChange={handleSelectChange} />
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
          error={!!errors.boardTitle}
          helperText={errors.boardTitle?.message}
          label={'제목'}
          defaultValue={watchValues.watchBoardTitle}
          {...register('boardTitle')}
          sx={{
            width: '100%',
            height: '100%',
            fontSize: '20px',
            fontWeight: 'bold',
            display: 'flex',
          }}
        />
        <HashtagWrapper>
          <input type="text" id="tagify" placeholder="해시태그를 입력해보세요!" />
        </HashtagWrapper>
        <Typography variant={'body2'} sx={{ color: 'gray', textAlign: 'left' }}>
          태그는 7자 이하로 5개까지 가능합니다.
        </Typography>
      </Box>
      <Box width={'100%'} height={'90%'} paddingTop={'20px'}>
        <ToastEditor onChange={onChange} hooksCallback={hooksCallback} initialValue={watchValues.watchBoardContent}/>
        {errors.boardContent?.message && (
          <Typography variant={'body2'} sx={{ color: 'red', textAlign: 'left' }}>
            {errors.boardContent?.message}
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
  )
}

interface IBoardFormProps {
  initialData?: IBoardDetail;
  submitHandler: (data: IBoardRequest) => void;
  useBoardForms : ReturnType<typeof useBoardForm>;
  buttonLabel: string;
}

const BoardWriteFormTitleWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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