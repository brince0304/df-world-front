import Box from '@mui/material/Box';
import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined, RemoveRedEyeOutlined } from '@mui/icons-material';
import CreatedAt from './BoardCreatedAt';
import React from 'react';
import styled from '@emotion/styled';
import useBoardCommentCountQuery from '../../hooks/boardHooks/queries/useBoardCommentCountQuery';
import useBoardLikeCountQuery from '../../hooks/boardHooks/queries/useBoardLikeCount';

const BoardCommentView = ({ boardId, boardViewCount, createdAt }: IBoardCommentViewProps) => {
  const boardCommentCount = useBoardCommentCountQuery(String(boardId));
  const boardLikeCount = useBoardLikeCountQuery(String(boardId));
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
        }}
      >
        <BoardIconWrapper>
          <FavoriteBorderOutlined sx={{ fontSize: '1rem', color: '#787878' }} />
          <ValueWrapper>{typeof boardLikeCount === 'number' ? boardLikeCount : 0}</ValueWrapper>
        </BoardIconWrapper>
        <BoardIconWrapper>
          <ChatBubbleOutlineOutlined sx={{ fontSize: '1rem', color: '#787878' }} />
          <ValueWrapper>{boardCommentCount}</ValueWrapper>
        </BoardIconWrapper>
        <BoardIconWrapper>
          <RemoveRedEyeOutlined sx={{ fontSize: '1rem', color: '#787878' }} />
          <ValueWrapper>{boardViewCount}</ValueWrapper>
        </BoardIconWrapper>
      </Box>
      <CreatedAt createdAt={createdAt} />
    </Box>
  );
};

interface IBoardCommentViewProps {
  boardId: string;
  boardViewCount: number;
  createdAt: string;
}

const BoardIconWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 5px;
`;

const ValueWrapper = styled.p`
  font-weight: 500;
  color: #787878;
`;

export default BoardCommentView;
