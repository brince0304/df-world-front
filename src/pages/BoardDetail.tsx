import { Button, Checkbox, Chip, Container, Divider, FormControlLabel, Paper, styled } from '@mui/material';
import { useParams } from 'react-router';
import Box from '@mui/material/Box';
import React from 'react';
import BestContent from '../components/BestBoardList/BestBoardList';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { CharacterChip } from './Board';
import { useUserQuery } from '../hooks/authHooks/queries/useUserQuery';
import { getBoardType } from '../utils/boardUtil';
import { TagChip } from '../components/Chips/TagChip';
import BoardUserAvatar from '../components/BoardUserAvatar/BoardUserAvatar';
import useDeleteBoardMutation from 'hooks/boardHooks/mutations/useDeleteBoardMutation';
import useLikeBoardMutation from 'hooks/boardHooks/mutations/useLikeBoardMutation';
import useBoardDetailQuery from 'hooks/boardHooks/queries/useBoardDetailQuery';
import BoardComments from 'components/BoardComment/BoardComments';

const TagContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 5px;
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

const LikeButtonContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

const deleteEditButtonStyle = {
  color: 'gray',
  fontWeight: '400',
  '&:hover': {
    color: 'black',
    transition: 'all 0.3s',
  },
};

const BoardDetail = () => {
  const { boardId } = useParams<{ boardId: string }>();
  let navigate = useNavigate();
  const { user } = useUserQuery();
  const { data, isLiked } = useBoardDetailQuery(boardId || '');
  const { likeBoardMutation: likeBoard, likeCount } = useLikeBoardMutation(boardId || '');
  const handleBoardLike = () => {
    if (boardId) {
      likeBoard();
    }
  };
  const deleteBoard = useDeleteBoardMutation(boardId || '');
  const handleDeleteBoard = () => {
    if (window.confirm('게시글을 삭제하시겠습니까?')) {
      deleteBoard();
    }
  };
  const handleNavigateToBoardList = () => {
    navigate(-1);
  };
  const article = data?.article;
  return (
    <Container maxWidth={'md'} sx={{ paddingTop: '20px' }}>
      {article && (
        <Paper sx={{ padding: '10px 20px 20px 20px' }}>
          <Box sx={{ paddingBottom: '10px' }}>
            <BestContent boardType={'ALL'} />
          </Box>
          <BoardDetailContainer>
            <TagContainer>
              <Chip
                label={getBoardType(article.boardType)}
                size={'small'}
                color={'primary'}
                sx={{ fontWeight: 'bold' }}
              />
              {article.hashtags.map((hashtag, index) => (
                <TagChip key={index} boardType={article.boardType} tag={hashtag} />
              ))}
              {article.character && (
                <CharacterChip
                  characterName={article.character.characterName}
                  characterImgUrl={article.character.characterImageUrl}
                  adventureName={article.character.adventureName}
                  serverId={article.character.serverId}
                  characterId={article.character.characterId}
                />
              )}
            </TagContainer>
            <BoardTitleWrapper>{data?.article?.boardTitle}</BoardTitleWrapper>
            <BoardAuthorContainer>
              <BoardUserAvatar src={data?.article.userProfileIconPath} nickname={data?.article.userNickname} />
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
                  <Button sx={deleteEditButtonStyle} onClick={() => {}}>
                    수정
                  </Button>
                  <Button sx={deleteEditButtonStyle} onClick={handleDeleteBoard}>
                    삭제
                  </Button>
                </Box>
              )}
            </LikeButtonContainer>
            <Box sx={{ textAlign: 'left' }}>
              <div dangerouslySetInnerHTML={{ __html: article.boardContent }} />
            </Box>
            <Divider sx={{ marginTop: '10px', marginBottom: '10px' }} />
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 'auto' }}>
              <Button sx={{ marginRight: '10px' }} onClick={handleNavigateToBoardList}>
                <Typography
                  sx={{ fontSize: '14px', fontWeight: 'bold', fontFamily: 'Core Sans' }}
                  color={'black'}
                  component={'span'}
                >
                  돌아가기
                </Typography>
              </Button>
              <Button onClick={() => {}}>
                <Typography
                  sx={{ fontSize: '14px', fontWeight: 'bold', fontFamily: 'Core Sans' }}
                  color={'black'}
                  component={'span'}
                >
                  글쓰기
                </Typography>
              </Button>
            </Box>
          </BoardDetailContainer>
        </Paper>
      )}
      <BoardComments boardId={String(boardId)} commentCount={Number(article?.commentCount) || 0} />
    </Container>
  );
};

export default BoardDetail;
