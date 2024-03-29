import { Box, Button, Typography } from '@mui/material';
import { CommentListDataComments } from 'interfaces/CommentListData';
import { useState } from 'react';
import BoardCommentLikeButton from './BoardCommentLikeButton';
import styled from '@emotion/styled';
import BoardCommentItem from './BoardCommentItem';
import BoardChildrenComments from './BoardChildrenComment/BoardChildrenComments';

const BoardCommentItemBox = ({ boardId, comment }: IBoardCommentItemBoxProps) => {
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const handleToggleOpenReply = () => {
    setIsReplyOpen(!isReplyOpen);
  };

  const commentId = String(comment.id);
  return (
    <BoardCommentItemContainer>
      <BoardCommentItem boardId={boardId} comment={comment} />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexDirection: 'row',
          marginTop: '5px',
          width: '100%',
        }}
      >
        <Button sx={commentButtonStyle} onClick={handleToggleOpenReply}>
          답글 {comment.childrenCommentCount}개
        </Button>
        <BoardCommentLikeButton boardId={boardId} commentId={commentId} />
        <Typography
          sx={{
            fontSize: '0.8rem',
            marginLeft: '10px',
            color: 'gray',
          }}
        >
          {comment.createdAt}
        </Typography>
      </Box>
      {isReplyOpen && <BoardChildrenComments parentId={String(comment.id)} boardId={boardId} />}
    </BoardCommentItemContainer>
  );
};

export default BoardCommentItemBox;

interface IBoardCommentItemBoxProps {
  boardId: string;
  comment: CommentListDataComments;
}

const BoardCommentItemContainer = styled(Box)`
  padding-top: 20px;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

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
