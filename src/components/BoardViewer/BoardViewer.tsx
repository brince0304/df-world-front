import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Box, Button, Checkbox, Divider, FormControlLabel, Typography, styled } from '@mui/material';
import BoardChips from 'components/BoardList/BoardChips';
import BoardUserAvatar from 'components/BoardUserAvatar/BoardUserAvatar';
import { useUserQuery } from 'hooks/authHooks/queries/useUserQuery';
import useDeleteBoardMutation from 'hooks/boardHooks/mutations/useDeleteBoardMutation';
import useLikeBoardMutation from 'hooks/boardHooks/mutations/useLikeBoardMutation';
import useBoardDetailQuery from 'hooks/boardHooks/queries/useBoardDetailQuery';
import { BoardDetailDataArticle } from 'interfaces/IBoardDetail';
import ReactMarkdown from 'react-markdown';

const BoardViewer = ({ boardId }: IBoardViewerProps) => {
  const { user } = useUserQuery();
  const { data, isLiked } = useBoardDetailQuery(boardId);
  const article = data?.article as BoardDetailDataArticle;
  const { likeBoardMutation, likeCount } = useLikeBoardMutation(boardId);
  const handleBoardLike = () => {
    if (boardId) {
      likeBoardMutation();
    }
  };
  const deleteBoard = useDeleteBoardMutation(boardId || '');
  const handleDeleteBoard = () => {
    if (window.confirm('게시글을 삭제하시겠습니까?')) {
      deleteBoard();
    }
  };
  return (
    <BoardDetailContainer>
      <BoardTitleWrapper>{article.boardTitle}</BoardTitleWrapper>
      <BoardAuthorContainer>
        <BoardUserAvatar src={article.userProfileIconPath} nickname={article.userNickname} />
      </BoardAuthorContainer>
      <BoardAuthorContainer>
        <CreatedAtWrapper>{article.createdAt}</CreatedAtWrapper>
        <ViewCountWrapper>조회수 {article.boardViewCount}</ViewCountWrapper>
      </BoardAuthorContainer>
      <Divider sx={{ marginTop: '10px' }} />
      <LikeButtonContainer>
        <FormControlLabel
          control={
            <Checkbox
              color={'error'}
              checkedIcon={<Favorite />}
              icon={<FavoriteBorder />}
              onClick={handleBoardLike}
              checked={isLiked}
            />
          }
          label={<Typography>{likeCount}</Typography>}
        />
        {user && article.userId === user.userId && (
          <Box sx={{ display: 'flex' }}>
            <Button sx={boardButtonStyle} onClick={() => {}}>
              수정
            </Button>
            <Button sx={boardButtonStyle} onClick={handleDeleteBoard}>
              삭제
            </Button>
          </Box>
        )}
      </LikeButtonContainer>
      <Box sx={{ textAlign: 'left' }}>
        <ReactMarkdown>{article.boardContent}</ReactMarkdown>
      </Box>
      <BoardChips data={article as any} />
    </BoardDetailContainer>
  );
};

interface IBoardViewerProps {
  boardId: string;
}

export default BoardViewer;

const BoardAuthorContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  width: 100%;
  gap: 5px;
`;

const CreatedAtWrapper = styled(Typography)`
  display: flex;
  font-size: 14px;
  color: gray;
`;

const ViewCountWrapper = styled(Typography)`
  display: flex;
  font-size: 14px;
  color: gray;
  margin-left: 10px;
`;

const BoardTitleWrapper = styled(Typography)`
  display: block;
  font-size: 20px;
  font-weight: bold;
  color: black;
  width: 100%;
  text-align: left;
`;

const BoardDetailContainer = styled(Box)`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-top: 1px solid #e0e0e0;
  padding: 10px;
`;

const LikeButtonContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

export const boardButtonStyle = {
  color: 'gray',
  fontWeight: '400',
  '&:hover': {
    color: 'black',
    transition: 'all 0.3s',
  },
};
