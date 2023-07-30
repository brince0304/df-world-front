import Box from '@mui/material/Box';
import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined, RemoveRedEyeOutlined } from '@mui/icons-material';
import CreatedAt from './CreatedAt';
import React from 'react';
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';

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
          <FavoriteBorderOutlined sx={{ fontSize: '14px' }} />
          <BoardIconValues>{boardLikeCount}</BoardIconValues>
        </BoardIconWrapper>
        <BoardIconWrapper>
          <ChatBubbleOutlineOutlined sx={{ fontSize: '14px' }} />
          <BoardIconValues>{commentCount}</BoardIconValues>
        </BoardIconWrapper>
        <BoardIconWrapper>
          <RemoveRedEyeOutlined sx={{ fontSize: '14px' }} />
          <BoardIconValues>{boardViewCount}</BoardIconValues>
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
  font-size: 12px;
  color: #000;
`;

const BoardIconValues = styled(Typography)`
  && {
    font-size: 14px;
    font-weight: bold;
  }
`;

export default BoardCommentView;
