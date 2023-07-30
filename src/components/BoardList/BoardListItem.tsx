import { Avatar, Chip, Link, ListItem } from '@mui/material';
import { getBoardType } from '../../utils/boardUtil';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined, RemoveRedEyeOutlined } from '@mui/icons-material';
import React from 'react';
import { CharacterChip } from '../../pages/Board';
import { BoardContent } from '../../interfaces/IBoardList';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { TagChip } from './TagChip';

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
    <ListItem sx={{ width: '100%', border: '0.2px solid #e0e0e0' }} onClick={handleListItemClick}>
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
        <BoardTitleWrapper>{data.boardTitle}</BoardTitleWrapper>
        <BoardAuthorWrapper>
          <Avatar src={data.userProfileImgUrl} sx={{ width: 24, height: 24, bgcolor: '#c4c4c4' }} />
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 'bold',
              fontFamily: 'Core Sans',
            }}
          >
            {data.userNickname}
          </Typography>
        </BoardAuthorWrapper>
        <BoardCommentContainer>
          <Box style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
            <BoardIconWrapper>
              <FavoriteBorderOutlined sx={{ fontSize: '14px' }} />
              <BoardIconValues>{data.boardLikeCount}</BoardIconValues>
            </BoardIconWrapper>
            <BoardIconWrapper>
              <ChatBubbleOutlineOutlined sx={{ fontSize: '14px' }} />
              <BoardIconValues>{data.commentCount}</BoardIconValues>
            </BoardIconWrapper>
            <BoardIconWrapper>
              <RemoveRedEyeOutlined sx={{ fontSize: '14px' }} />
              <BoardIconValues>{data.boardViewCount}</BoardIconValues>
            </BoardIconWrapper>
          </Box>
          <BoardCreatedAtWrapper>
            <Typography sx={{ fontSize: '12px', fontFamily: 'Core Sans' }}>{data.createdAt}</Typography>
          </BoardCreatedAtWrapper>
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

const BoardAuthorWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 5px;
  padding-top: 12px;
`;

const BoardCommentContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  gap: 10px;
  padding-top: 5px;
`;

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

const BoardCreatedAtWrapper = styled(Box)`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #000;
  justify-content: flex-end;
`;
