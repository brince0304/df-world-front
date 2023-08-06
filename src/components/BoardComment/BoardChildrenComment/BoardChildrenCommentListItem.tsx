import BoardCommentItem from '../BoardCommentItem';
import { Box, Typography } from '@mui/material';
import BoardCommentLikeButton from '../BoardCommentLikeButton';
import styled from '@emotion/styled';
import { CommentListDataComments } from '../../../interfaces/CommentListData';

const BoardChildrenCommentListItem = ({ boardId, comment }: IBoardChildrenCommentListItemProps) => {
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
        <BoardCommentLikeButton boardId={boardId} commentId={commentId} />
        <Typography
          sx={{
            fontSize: '12px',
            marginLeft: '10px',
            color: 'gray',
          }}
        >
          {comment.createdAt}
        </Typography>
      </Box>
    </BoardCommentItemContainer>
  );
};

export default BoardChildrenCommentListItem;

interface IBoardChildrenCommentListItemProps {
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
