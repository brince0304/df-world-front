import { Box, Typography, styled } from '@mui/material';
import BoardChips from 'components/BoardList/BoardChips';
import BoardUserAvatar from 'components/BoardUserAvatar/BoardUserAvatar';
import useBoardDetailQuery from 'hooks/boardHooks/queries/useBoardDetailQuery';
import { BoardDetailDataArticle } from 'interfaces/IBoardDetail';
import ReactMarkdown from 'react-markdown';
import BoardLikeContainer from './BoardLikeContainer';

const BoardViewer = ({ boardId }: IBoardViewerProps) => {
  const { data } = useBoardDetailQuery(boardId);
  const article = data?.article as BoardDetailDataArticle;

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
      <BoardLikeContainer boardId={boardId} boardType={article.boardType} author={article.userId} />
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
  font-size: 0.8rem;
  color: gray;
`;

const ViewCountWrapper = styled(Typography)`
  display: flex;
  font-size: 0.8rem;
  color: gray;
  margin-left: 10px;
`;

const BoardTitleWrapper = styled(Typography)`
  display: block;
  font-size: 1.4rem;
  font-weight: bold;
  color: black;
  width: 100%;
  text-align: left;
  padding: 5px 0px;
`;

const BoardDetailContainer = styled(Box)`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-top: 1px solid #e0e0e0;
`;

export const boardButtonStyle = {
  color: 'gray',
  fontWeight: '400',
  fontSize: '0.8rem',
  '&:hover': {
    color: 'black',
    transition: 'all 0.3s',
  },
};
