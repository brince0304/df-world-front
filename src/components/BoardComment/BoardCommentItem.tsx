import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';
import BoardUserAvatar from 'components/BoardUserAvatar/BoardUserAvatar';
import useDeleteBoardCommentMutation from '../../hooks/boardCommentHooks/mutations/useDeleteBoardCommentMutation';
import useUpdateBoardCommentMutation from '../../hooks/boardCommentHooks/mutations/useUpdateBoardCommentMutation';
import { CommentListDataComments } from 'interfaces/CommentListData';
import { useState } from 'react';
import BoardCommentForm from './BoardCommentForm';
import { useUserQuery } from 'hooks/authHooks/queries/useUserQuery';
import { IBoardCommentUpdateChildrenRequest } from 'services/boardCommentService';

const BoardCommentItem = ({ boardId, comment }: IBoardCommentItemProps) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const handleToggleEdit = () => {
    setIsEditOpen(!isEditOpen);
  };
  const { user } = useUserQuery();
  const commentId = String(comment.id);
  const updateComment = useUpdateBoardCommentMutation(boardId);
  const onValidUpdateComment = (data: IBoardCommentUpdateChildrenRequest) => {
    updateComment({
      boardId: Number(boardId),
      commentId: Number(commentId),
      commentContent: data.commentContent,
    });
    handleToggleEdit();
  };
  const deleteComment = useDeleteBoardCommentMutation(boardId, commentId);
  const handleDeleteBoardComment = () => {
    deleteComment({ commentId: commentId });
  };
  const markupedComment = comment.commentContent.split('\n').map((line, index) => {
    return (
      <span key={index}>
        {line}
        <br />
      </span>
    );
  });

  return (
    <>
      <BoardCommentAvatarEditDeleteWrapper>
        <BoardCommentAvatarCreatedAtWrapper>
          <BoardUserAvatar src={comment.userProfileImgUrl} nickname={comment.userNickname} />
        </BoardCommentAvatarCreatedAtWrapper>
        {user && user.userId === comment.userId && (
          <BoardCommentDeleteUpdateButtonWrapper>
            <Button sx={commentButtonStyle} onClick={handleToggleEdit}>
              {isEditOpen ? '취소' : '수정'}
            </Button>
            <Button sx={commentButtonStyle} onClick={handleDeleteBoardComment}>
              삭제
            </Button>
          </BoardCommentDeleteUpdateButtonWrapper>
        )}
      </BoardCommentAvatarEditDeleteWrapper>
      <Box sx={{ marginTop: '10px' }}>
        {!isEditOpen && <BoardCommentContentWrapper>{markupedComment}</BoardCommentContentWrapper>}
        {isEditOpen && (
          <BoardCommentForm
            showProfile={false}
            initialValues={comment}
            boardId={boardId}
            handleToggleClose={handleToggleEdit}
            onSubmit={onValidUpdateComment}
          />
        )}
      </Box>
    </>
  );
};

interface IBoardCommentItemProps {
  comment: CommentListDataComments;
  boardId: string;
}

export default BoardCommentItem;

const commentButtonStyle = {
  color: 'gray',
  fontSize: '0.8rem',
  justifyContent: 'flex-start',
  minWidth: '0px',
  '&:hover': {
    color: 'black',
    transition: 'all 0.3s',
  },
};

const BoardCommentAvatarEditDeleteWrapper = styled(Box)`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const BoardCommentAvatarCreatedAtWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const BoardCommentDeleteUpdateButtonWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const BoardCommentContentWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  margin-left: 8px;
  font-size: 0.9rem;
  font-family: 'inherit';
`;
