import { Box, styled } from '@mui/material';
import BoardCommentForm from '../BoardCommentForm';
import { IBoardCommentUpdateChildrenRequest } from 'services/boardCommentService';
import { ForwardedRef, Suspense, forwardRef } from 'react';
import BoardChildrenCommentList from './BoardChildrenCommentList';
import Loading from 'components/Loading/Loading';
import { CommentListDataComments } from 'interfaces/CommentListData';
import useCreateChildrenComment from 'hooks/boardCommentHooks/mutations/useCreateChildrenComment';

const BoardChildrenComments = (
  { childrenComments, boardId, parentId }: IBoardCommentListProps,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const createChildrenComment = useCreateChildrenComment(boardId, parentId);
  const handleCreateChildrenComment = (data: IBoardCommentUpdateChildrenRequest) => {
    createChildrenComment({
      boardId: Number(boardId),
      commentId: Number(parentId),
      commentContent: data.commentContent,
    });
  };
  return (
    // TODO : 자식댓글 삭제 & 수정 어떻게 핸들링할지 생각해보기
    <Container ref={ref}>
      <BoardCommentForm boardId={boardId} onSubmit={handleCreateChildrenComment} />
      <Box>
        <Suspense fallback={<Loading />}>
          <BoardChildrenCommentList childrenComments={childrenComments} />
        </Suspense>
      </Box>
    </Container>
  );
};

interface IBoardCommentListProps {
  childrenComments: CommentListDataComments[];
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
