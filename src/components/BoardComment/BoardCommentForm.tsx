import { Box, IconButton, InputBase, Paper, Typography, styled } from '@mui/material';
import { useUserQuery } from 'hooks/authHooks/queries/useUserQuery';
import useBoardCommentForm from '../../hooks/boardCommentHooks/useBoardCommentForm';
import { CommentListDataComments } from 'interfaces/CommentListData';
import { IBoardCommentUpdateChildrenRequest } from 'services/boardCommentService';
import SendIcon from '@mui/icons-material/Send';
import { useEffect } from 'react';
import BoardUserAvatar from 'components/BoardUserAvatar/BoardUserAvatar';

const BoardCommentForm = ({ boardId, initialValues, handleToggleClose, onSubmit, showProfile }: ICommentFormProps) => {
  const { register, handleSubmit, setValues, errors } = useBoardCommentForm(initialValues);
  const { user } = useUserQuery();
  const handleSubmitOnValid = (data: IBoardCommentUpdateChildrenRequest) => {
    onSubmit(data);
    setValues.setContent('');
    handleToggleClose && handleToggleClose();
  };
  useEffect(() => {
    if (!initialValues) {
      setValues.setBoardId(Number(boardId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <form
      onSubmit={handleSubmit(handleSubmitOnValid)}
      style={{ width: '100%', paddingTop: showProfile ? '10px' : '0px', gap: '10px' }}
    >
      {showProfile && <BoardUserAvatar src={user?.profileImgPath || ''} nickname={user?.nickname || '게스트'} />}
      <CommentContainer sx={{ marginTop: showProfile ? '10px' : '0px' }}>
        <CommentFormBox>
          <InputBase
            multiline
            sx={{ width: '100%', fontFamily: 'inherit', fontSize: '0.9rem' }}
            placeholder={user?.userId ? '댓글을 입력하세요.' : '로그인이 필요합니다.'}
            {...register('commentContent')}
            id={'comment-input'}
            disabled={!user}
          />
          <IconButton type="submit" disabled={!user}>
            <SendIcon />
          </IconButton>
        </CommentFormBox>
      </CommentContainer>
      <Typography sx={{ color: 'red', textAlign: 'left', fontSize: '13px', paddingTop: '5px' }}>
        {errors.commentContent?.message}
      </Typography>
    </form>
  );
};

interface ICommentFormProps {
  initialValues?: CommentListDataComments;
  handleToggleClose?: () => void;
  onSubmit: (...args: any[]) => void;
  boardId: string;
  showProfile?: boolean;
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
