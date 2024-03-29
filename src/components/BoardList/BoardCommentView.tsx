import Box from '@mui/material/Box';
import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined, RemoveRedEyeOutlined } from '@mui/icons-material';
import CreatedAt from './BoardCreatedAt';
import React from 'react';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { boardCommentCountSelector, boardLikeCountSelector } from '../../recoil/selector';

const BoardCommentView = ({ boardId, boardViewCount, createdAt }: IBoardCommentViewProps) => {
  const boardCommentCount = useRecoilValue(boardCommentCountSelector(boardId));
  const boardLikeCount = useRecoilValue(boardLikeCountSelector(boardId));
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
        }}
      >
        <BoardIconWrapper>
          <FavoriteBorderOutlined sx={{ fontSize: '1rem', color: '#787878' }} />
          <ValueWrapper>{boardLikeCount}</ValueWrapper>
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
    </Container>
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

const Container = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export default BoardCommentView;
