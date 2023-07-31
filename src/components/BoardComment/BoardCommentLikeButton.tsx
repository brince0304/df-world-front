import styled from "@emotion/styled";
import { Favorite, FavoriteBorder } from "@mui/icons-material"
import { Checkbox, FormControlLabel, Typography } from "@mui/material"
import useLikeBoardComment from "hooks/boardCommentHooks/mutations/useLikeBoardComment";
import useBoardCommentLike from "hooks/boardCommentHooks/queries/useBoardCommentLike";
import useBoardCommentLikeCount from "hooks/boardCommentHooks/queries/useBoardCommentLikeCount";

const BoardCommentLikeButton = ({boardId, commentId}: IBoardCommentLikeButtonProps) => {
    const commentLikeCount = useBoardCommentLikeCount(commentId);
    const likeComment = useLikeBoardComment(boardId, commentId);
    const handleLikeComment = () => {
        likeComment({boardId: boardId, commentId: commentId});
    };
    const handleOnChage = () => {
        handleLikeComment();
    };
    const isCommentLiked = useBoardCommentLike(commentId);

    return (
        <FormControlLabel
        sx={{ scale: '0.7', marginLeft: '0px' }}
        control={<Checkbox color={'error'} checkedIcon={<Favorite />} icon={<FavoriteBorder />} />}
        checked={isCommentLiked || false}
        onChange={handleOnChage}
        label={
          <LikeCountWrapper>
            {commentLikeCount || 0}
          </LikeCountWrapper>
        }
        onClick={handleLikeComment}
      />
    )
}

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