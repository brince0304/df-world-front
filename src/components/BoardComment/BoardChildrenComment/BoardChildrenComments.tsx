import { Box, styled } from '@mui/material';
import BoardCommentForm from '../BoardCommentForm';
import { IBoardCommentUpdateChildrenRequest } from 'services/boardCommentService';
import { ForwardedRef, Suspense, forwardRef } from 'react';
import BoardChildrenCommentList from './BoardChildrenCommentList';
import Loading from '../../Fallbacks/Loading';
import useCreateChildrenCommentMutation from '../../../hooks/boardCommentHooks/mutations/useCreateChildrenCommentMutation';

const BoardChildrenComments = ({ boardId, parentId }: IBoardCommentListProps, ref: ForwardedRef<HTMLDivElement>) => {
  const createChildrenComment = useCreateChildrenCommentMutation(boardId, parentId);
  const handleCreateChildrenComment = (data: IBoardCommentUpdateChildrenRequest) => {
    createChildrenComment({
      boardId: Number(boardId),
      commentId: Number(parentId),
      commentContent: data.commentContent,
    });
  };
  return (
    <Container ref={ref}>
      <Box
        sx={{
          width: '100%',
        }}
      >
        <Suspense fallback={<Loading />}>
          <BoardChildrenCommentList boardId={boardId} parentId={parentId} />
        </Suspense>
      </Box>
      <BoardCommentForm showProfile={true} boardId={boardId} onSubmit={handleCreateChildrenComment} />
    </Container>
  );
};

interface IBoardCommentListProps {
  boardId: string;
  parentId: string;
}

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  padding-left: 20px;
`;

export default forwardRef(BoardChildrenComments);
