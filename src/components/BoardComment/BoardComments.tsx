import { Box } from '@mui/material';
import BoardCommentForm from './BoardCommentForm';
import useCreateBoardComment from 'hooks/boardCommentHooks/mutations/useCreateBoardComment';
import { IBoardCommentRequest } from 'services/boardCommentService';
import BoardCommentList from './BoardCommentList';

const BoardComments = ({ boardId }: IBoardCommentListProps) => {
  const createComment = useCreateBoardComment(boardId);
  const handleSubmit = (data: IBoardCommentRequest) => {
    createComment(data);
  };
  return (
    <Box>
      <Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            marginBottom: '10px',
          }}
        ></Box>
      </Box>
      <Box>
        <BoardCommentList boardId={boardId} />
      </Box>
      <BoardCommentForm boardId={boardId} onSubmit={handleSubmit} />
    </Box>
  );
};

interface IBoardCommentListProps {
  boardId: string;
}

export default BoardComments;
