import { Box } from '@mui/material';
import BoardCommentForm from './BoardCommentForm';
import useCreateBoardCommentMutation from '../../hooks/boardCommentHooks/mutations/useCreateBoardCommentMutation';
import { IBoardCommentRequest } from 'services/boardCommentService';
import BoardCommentList from './BoardCommentList';
import { Suspense } from 'react';

const BoardComments = ({ boardId }: IBoardCommentListProps) => {
  const createComment = useCreateBoardCommentMutation(boardId);
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
        <Suspense fallback={<div>로딩중...</div>}>
          <BoardCommentList boardId={boardId} />
        </Suspense>
      </Box>
      <BoardCommentForm boardId={boardId} onSubmit={handleSubmit} />
    </Box>
  );
};

interface IBoardCommentListProps {
  boardId: string;
}

export default BoardComments;
