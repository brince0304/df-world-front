import { Chip, Link, ListItem } from '@mui/material';
import { getBoardType } from '../../utils/boardUtil';
import Box from '@mui/material/Box';
import React from 'react';
import { CharacterChip } from '../../pages/Board';
import { BoardContent } from '../../interfaces/IBoardList';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { TagChip } from '../Chips/TagChip';
import BoardUserAvatar from '../BoardUserAvatar/BoardUserAvatar';
import BoardCommentView from './BoardCommentView';

const BoardListItem = (data: BoardContent) => {
  const navigate = useNavigate();
  const handleTypeTagClick = () => {
    navigate(`/boards?boardType=${data.boardType}`);
  };
  const handleListItemClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    navigate(`/boars/${data.id}`);
  };
  return (
    <ListItem sx={{ width: '100%', border: '0.2px solid #e0e0e0' }}>
      <BoardContainer>
        <BoardTagContainer>
          <Chip
            label={getBoardType(data.boardType)}
            color="info"
            clickable={true}
            sx={{ fontSize: '10px', fontWeight: 'bold' }}
            size="small"
            data-type={data.boardType}
            onClick={handleTypeTagClick}
          />
          {data.hashtags.map((tag, index) => (
            <TagChip key={index} boardType={data.boardType} tag={tag} />
          ))}
          {data.character && (
            <CharacterChip
              characterName={data.character.characterName}
              characterImgUrl={data.character.characterImageUrl}
              adventureName={data.character.adventureName}
              serverId={data.character.serverId}
              characterId={data.character.characterId}
            />
          )}
        </BoardTagContainer>
        <BoardTitleWrapper onClick={handleListItemClick}>{data.boardTitle}</BoardTitleWrapper>
        <BoardUserAvatar src={data.userProfileImgUrl} nickname={data.userNickname} />
        <BoardCommentContainer>
          <BoardCommentView
            boardLikeCount={data.boardLikeCount}
            commentCount={data.commentCount}
            boardViewCount={data.boardViewCount}
            createdAt={data.createdAt}
          />
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

const BoardTitleWrapper = styled(Link)`
  display: inline-block;
  font-size: 18px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  margin-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  cursor: pointer;
  && {
    color: #121212;
    text-decoration: none;
  }
`;

const BoardTagContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 5px;
`;

const BoardCommentContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  gap: 10px;
  padding-top: 5px;
`;
