import { Box } from '@mui/material';
import useBoardComments from 'hooks/boardCommentHooks/queries/useBoardComments';
import BoardCommentItemBox from './BoardCommentItemBox';

const BoardCommentList = ({ boardId }: IBoardCommentListProps) => {
  const data = useBoardComments(boardId);
  return (
    <Box>
      {data &&
        data.map((comment) => {
          return <BoardCommentItemBox key={comment.id} boardId={boardId} comment={comment} />;
        })}
    </Box>
  );
};

interface IBoardCommentListProps {
  boardId: string;
}

export default BoardCommentList;
