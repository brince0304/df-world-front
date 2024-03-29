import { Box, Button, Checkbox, FormControlLabel, styled, Typography } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { boardButtonStyle } from './BoardViewer';
import { BOARD_INSERT_FORM_ROUTE } from '../../apis/data/urls';
import useLikeBoardMutation from '../../hooks/boardHooks/mutations/useLikeBoardMutation';
import { useNavigate } from 'react-router-dom';
import useDeleteBoardMutation from '../../hooks/boardHooks/mutations/useDeleteBoardMutation';
import { useUserQuery } from '../../hooks/authHooks/queries/useUserQuery';
import { useRecoilValue } from 'recoil';
import { boardLikeCountSelector, isBoardLikedSelector } from '../../recoil/selector';

const BoardLikeContainer = ({ boardId, boardType, author }: { boardId: string; boardType: string; author: string }) => {
  const boardLikeCount = useRecoilValue(boardLikeCountSelector(boardId));
  const boardIsLiked = useRecoilValue(isBoardLikedSelector(boardId));
  const likeBoardMutation = useLikeBoardMutation(boardId);
  const navigate = useNavigate();
  const handleBoardLike = () => {
    if (boardId) {
      likeBoardMutation({ boardId });
    }
  };
  const deleteBoard = useDeleteBoardMutation(boardId || '');
  const { user } = useUserQuery();
  const handleDeleteBoard = () => {
    if (window.confirm('게시글을 삭제하시겠습니까?')) {
      deleteBoard();
    }
  };
  const navigateToEdit = () => {
    if (boardId) {
      navigate(BOARD_INSERT_FORM_ROUTE + `?request=update&boardId=${boardId}&boardType=${boardType}`);
    }
  };

  return (
    <LikeButtonContainer>
      <FormControlLabel
        control={
          <Checkbox
            color={'error'}
            checkedIcon={<Favorite />}
            icon={<FavoriteBorder />}
            onClick={handleBoardLike}
            checked={boardIsLiked}
          />
        }
        label={
          <Typography
            sx={{
              fontSize: '0.9rem',
            }}
          >
            {boardLikeCount}
          </Typography>
        }
      />
      {user && author === user.userId && (
        <Box sx={{ display: 'flex' }}>
          <Button sx={boardButtonStyle} onClick={navigateToEdit}>
            수정
          </Button>
          <Button sx={boardButtonStyle} onClick={handleDeleteBoard}>
            삭제
          </Button>
        </Box>
      )}
    </LikeButtonContainer>
  );
};

export default BoardLikeContainer;

const LikeButtonContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;
