import { Box, Link, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const BoardListItemTitleContent = ({ title, content, boardId }: IBoardListItemContentProps) => {
  const newContent = content.length > 100 ? content.slice(0, 100) + '...' : content;
  const navigate = useNavigate();
  const handleListItemClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    navigate(`/boards/${boardId}`);
  };
  return (
    <Container component="div" onClick={handleListItemClick}>
      <BoardTitleWrapper>
        <Typography component="h3" style={{ fontSize: '1.2rem', fontWeight: '700' }}>
          {title}
        </Typography>
      </BoardTitleWrapper>
      <Typography component={'p'} style={{ fontSize: '0.9rem', color: 'gray' }}>
        {newContent}
      </Typography>
    </Container>
  );
};

export default BoardListItemTitleContent;

interface IBoardListItemContentProps {
  content: string;
  title: string;
  boardId: string;
}

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  cursor: pointer;
`;

const BoardTitleWrapper = styled(Link)`
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  width: 100%;
  margin-right: 10px;
  padding-top: 5px;
  && {
    color: #121212;
    text-decoration: none;
  }
  &:hover {
    text-decoration: underline;
  }
`;
