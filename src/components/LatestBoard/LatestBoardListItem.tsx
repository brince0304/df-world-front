import styled from '@emotion/styled';
import { Avatar, ListItemButton, Tooltip } from '@mui/material';
import { BoardContent } from 'interfaces/IBoardList';
import { useNavigate } from 'react-router-dom';
import { MouseEvent } from 'react';
import BoardUserAvatar from 'components/BoardUserAvatar/BoardUserAvatar';
import BoardCommentView from 'components/BoardList/BoardCommentView';
import { CharacterContent } from 'components/Chips/CharacterChip/CharacterChipContent';

const LatestBoardListItem = (data: BoardContent) => {
  let navigate = useNavigate();
  const onClickHandler = (e: MouseEvent<HTMLDivElement>) => {
    const id = e.currentTarget.dataset.id;
    navigate(`/boards/${id}`);
  };

  return (
    <ListItemButton
      onClick={onClickHandler}
      data-id={data.id}
      sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
    >
      <BoardTitleBox>
        <BoardTitle>{data.boardTitle}</BoardTitle>
        {data.character && (
          <Tooltip
            placement={'top'}
            title={
              <CharacterContent
                characterName={data.character.characterName}
                characterImgUrl={data.character.characterImageUrl}
                adventureName={data.character.adventureName}
                serverId={data.character.serverId}
                characterId={data.character.characterId}
              />
            }
          >
            <Avatar
              sx={{
                width: '30px',
                height: '30px',
                border: '1px solid #e0e0e0',
                '> img': {
                  objectFit: 'cover',
                  scale: '3',
                },
              }}
              src={data.character.characterImageUrl}
            />
          </Tooltip>
        )}
      </BoardTitleBox>
      <BoardFooter>
        <NicknameCreatedAtContainer>
          <NicknameWrapper>
            <BoardUserAvatar src={data.userProfileImgUrl} nickname={data.userNickname} />
          </NicknameWrapper>
        </NicknameCreatedAtContainer>
      </BoardFooter>
      <LikeCommentContainer>
        <BoardCommentView boardViewCount={data.boardViewCount} createdAt={data.createdAt} boardId={String(data.id)} />
      </LikeCommentContainer>
    </ListItemButton>
  );
};

export default LatestBoardListItem;

const BoardTitleBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const BoardTitle = styled.div`
  display: block;
  //맨왼쪽부터
  color: black;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  overflow: hidden;
  margin-bottom: 5px;
  text-overflow: ellipsis;
  text-align: left;
`;

const BoardFooter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
`;

const LikeCommentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const NicknameCreatedAtContainer = styled.div`
  display: grid;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  grid-template-columns: 140px 80px;
`;

const NicknameWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
`;
