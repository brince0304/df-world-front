import { Box, IconButton, InputBase, Paper, Typography, styled } from '@mui/material';
import { useUserQuery } from 'hooks/authHooks/queries/useUserQuery';
import useBoardCommentForm from 'hooks/boardCommentHooks/useBoardCommentForm';
import { CommentListDataComments } from 'interfaces/CommentListData';
import { IBoardCommentUpdateChildrenRequest } from 'services/boardCommentService';
import SendIcon from '@mui/icons-material/Send';
import { useEffect } from 'react';

const BoardCommentForm = ({ boardId, initialValues, handleToggleClose, onSubmit }: ICommentFormProps) => {
  const { register, handleSubmit, setValues, errors } = useBoardCommentForm(initialValues);
  const { user } = useUserQuery();
  const handleSubmitOnValid = (data: IBoardCommentUpdateChildrenRequest) => {
    onSubmit(data);
    setValues.setContent('');
    handleToggleClose && handleToggleClose();
  }
  useEffect(() => {
    if (!initialValues) {
      setValues.setBoardId(Number(boardId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <form onSubmit={handleSubmit(handleSubmitOnValid)} style={{ width: '100%' }}>
      <CommentContainer>
        <CommentFormBox>
          <InputBase
            sx={{ width: '100%' }}
            placeholder={user?.userId ? '댓글을 입력하세요.' : '로그인이 필요합니다.'}
            {...register('commentContent')}
            id={'comment-input'}
            disabled={!user}
          />
          <IconButton type="submit" disabled={!user}>
            <SendIcon />
          </IconButton>
        </CommentFormBox>
        <Typography sx={{ color: 'red' }}>{errors.commentContent?.message}</Typography>
      </CommentContainer>
    </form>
  );
};

interface ICommentFormProps {
  initialValues?: CommentListDataComments;
  handleToggleClose?: () => void;
  onSubmit: (...args: any[]) => void;
  boardId: string;
}

export default BoardCommentForm;

const CommentFormBox = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: white;
  border-radius: 5px;
  padding: 10px;
`;

const CommentContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
