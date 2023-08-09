import styled from '@emotion/styled';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import useLikeBoardCommentMutation from '../../hooks/boardCommentHooks/mutations/useLikeBoardCommentMutation';
import { useRecoilValue } from 'recoil';
import { boardCommentIsLikedSelector, boardCommentLikeCountSelector } from '../../recoil/selector';

const BoardCommentLikeButton = ({ boardId, commentId }: IBoardCommentLikeButtonProps) => {
  const commentLikeCount = useRecoilValue(boardCommentLikeCountSelector(commentId));
  const likeComment = useLikeBoardCommentMutation(commentId);
  const handleLikeComment = () => {
    likeComment({ boardId: boardId, commentId: commentId });
  };
  const handleOnChage = () => {
    handleLikeComment();
  };
  const isCommentLiked = useRecoilValue(boardCommentIsLikedSelector(commentId));

  return (
    <FormControlLabel
      sx={{ scale: '0.7', marginLeft: '0px' }}
      control={<Checkbox color={'error'} checkedIcon={<Favorite />} icon={<FavoriteBorder />} />}
      checked={isCommentLiked}
      onChange={handleOnChage}
      label={<LikeCountWrapper>{commentLikeCount}</LikeCountWrapper>}
    />
  );
};

interface IBoardCommentLikeButtonProps {
  boardId: string;
  commentId: string;
}

export default BoardCommentLikeButton;

const LikeCountWrapper = styled(Typography)`
  display: flex;
  font-size: 18px;
  font-weight: bold;
  color: black;
`;
