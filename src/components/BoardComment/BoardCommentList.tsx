import { Box, Button } from '@mui/material';
import useBoardCommentsQuery from '../../hooks/boardCommentHooks/queries/useBoardCommentsQuery';
import BoardCommentItemBox from './BoardCommentItemBox';
import { boardButtonStyle } from 'components/BoardViewer/BoardViewer';
import React from 'react';
import BoardDetailButtons from '../BoardViewer/BoardDetailButtons';
import { useRecoilValue } from 'recoil';
import { boardCommentCountSelector } from 'recoil/selector';

const BoardCommentList = ({ boardId }: IBoardCommentListProps) => {
  const data = useBoardCommentsQuery(boardId);
  const commentCount = useRecoilValue(boardCommentCountSelector(boardId));
  const handleClick = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContents: 'space-between',
          width: '100%',
          alignItems: 'center',
          marginLeft: 'auto',
        }}
      >
        <Button onClick={handleClick} sx={boardButtonStyle}>
          댓글 {commentCount}개
        </Button>
        <BoardDetailButtons />
      </Box>

      {data &&
        data.comments.map((comment) => {
          return <BoardCommentItemBox key={comment.id} boardId={boardId} comment={comment} />;
        })}
    </>
  );
};

interface IBoardCommentListProps {
  boardId: string;
}

export default BoardCommentList;
