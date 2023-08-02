import Box from '@mui/material/Box';
import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined, RemoveRedEyeOutlined } from '@mui/icons-material';
import CreatedAt from './BoardCreatedAt';
import React from 'react';
import styled from '@emotion/styled';

const BoardCommentView = ({
  boardLikeCount,
  commentCount,
  boardViewCount,
  createdAt,
}: {
  boardLikeCount: number;
  commentCount: string;
  boardViewCount: number;
  createdAt: string;
}) => {
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
          <FavoriteBorderOutlined sx={{ fontSize: '18px', color: '#787878' }} />
          <ValueWrapper>{boardLikeCount}</ValueWrapper>
        </BoardIconWrapper>
        <BoardIconWrapper>
          <ChatBubbleOutlineOutlined sx={{ fontSize: '18px', color: '#787878' }} />
          <ValueWrapper>{commentCount}</ValueWrapper>
        </BoardIconWrapper>
        <BoardIconWrapper>
          <RemoveRedEyeOutlined sx={{ fontSize: '18px', color: '#787878' }} />
          <ValueWrapper>{boardViewCount}</ValueWrapper>
        </BoardIconWrapper>
      </Box>
      <CreatedAt createdAt={createdAt} />
    </Box>
  );
};

const BoardIconWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 5px;
`;

const ValueWrapper = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #787878;
`;

export default BoardCommentView;
