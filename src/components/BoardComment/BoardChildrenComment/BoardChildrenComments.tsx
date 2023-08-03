import { Box, styled } from '@mui/material';
import BoardCommentForm from '../BoardCommentForm';
import useCreateChildrenComment from 'hooks/boardCommentHooks/mutations/useCreateChildrenComment';
import { IBoardCommentUpdateChildrenRequest } from 'services/boardCommentService';
import { ForwardedRef, forwardRef } from 'react';
import BoardChildrenCommentList from './BoardChildrenCommentList';

const BoardChildrenComments = ({ boardId, commentId }: IBoardCommentListProps, ref: ForwardedRef<HTMLDivElement>) => {
  const createChildrenComment = useCreateChildrenComment(boardId, commentId);
  const handleCreateChildrenComment = (data: IBoardCommentUpdateChildrenRequest) => {
    createChildrenComment({
      boardId: Number(boardId),
      commentId: Number(commentId),
      commentContent: data.commentContent,
    });
  };
  return (
    // TODO : 자식댓글 삭제 & 수정 어떻게 핸들링할지 생각해보기
    <Container ref={ref}>
      <BoardCommentForm boardId={boardId} onSubmit={handleCreateChildrenComment} />
      <Box>
        <BoardChildrenCommentList boardId={boardId} commentId={commentId} />
      </Box>
    </Container>
  );
};

interface IBoardCommentListProps {
  boardId: string;
  commentId: string;
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
