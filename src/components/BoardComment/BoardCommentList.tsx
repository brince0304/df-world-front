import { Box, Button } from '@mui/material';
import useBoardComments from 'hooks/boardCommentHooks/queries/useBoardComments';
import BoardCommentItemBox from './BoardCommentItemBox';
import { boardButtonStyle } from 'components/BoardViewer/BoardViewer';
import styled from '@emotion/styled';

const BoardCommentList = ({ boardId }: IBoardCommentListProps) => {
  const data = useBoardComments(boardId);
  const commentCount = data?.length;
  const childrenCount = data?.reduce((acc, cur) => acc + cur.childrenComments.length, 0);
  const boardCommentCount = commentCount && childrenCount ? commentCount + childrenCount : 0;
  const handleClick = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return (
    <Container>
      <Button onClick={handleClick} sx={boardButtonStyle}>
        댓글 {boardCommentCount}개
      </Button>
      {data &&
        data.map((comment) => {
          return <BoardCommentItemBox key={comment.id} boardId={boardId} comment={comment} />;
        })}
    </Container>
  );
};

interface IBoardCommentListProps {
  boardId: string;
}

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
`;

export default BoardCommentList;
