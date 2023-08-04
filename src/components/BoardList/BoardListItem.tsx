import { ListItem } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import { BoardContent } from '../../interfaces/IBoardList';
import styled from '@emotion/styled';
import BoardUserAvatar from '../BoardUserAvatar/BoardUserAvatar';
import BoardCommentView from './BoardCommentView';
import BoardListItemTitleContent from './BoardListItemContent';
import BoardChips from './BoardChips';
import useBoardCommentCountQuery from '../../hooks/boardHooks/queries/useBoardCommentCountQuery';
import useBoardLikeCountQuery from '../../hooks/boardHooks/queries/useBoardLikeCount';

const BoardListItem = (data: BoardContent) => {

  return (
    <ListItem sx={{ width: '100%', border: '0.2px solid #e0e0e0' }}>
      <BoardContainer>
        <BoardUserAvatar src={data.userProfileImgUrl} nickname={data.userNickname} />
        <BoardListItemTitleContent boardId={String(data.id)} title={data.boardTitle} content={data.boardContent} />
        <BoardChips data={data} />
        <BoardCommentContainer>
          <BoardCommentView boardViewCount={data.boardViewCount} createdAt={data.createdAt}
          boardId={String(data.id)} />
        </BoardCommentContainer>
      </BoardContainer>
    </ListItem>
  );
};

export default BoardListItem;

const BoardContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
`;

const BoardCommentContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  gap: 10px;
  padding-top: 5px;
`;
