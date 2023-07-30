import react, { Suspense } from 'react';
import React from 'react';
import styled from 'styled-components';
import CustomTable from '../../../../components/CustomTable';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Avatar, IconButton, ListItemButton, Tooltip } from '@mui/material';
import { BoardContent } from '../../../../interfaces/IBoardList';
import useLatestBoard from '../../../../hooks/boardHooks/useLatestBoard';
import UserAvatarNickname from '../../../../UserAvatar';
import BoardCommentView from '../../../../components/BoardList/BoardCommentView';
import { CharacterContent } from '../../../Board';

const BoardBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  font-size: 14px;
  color: #000;
`;
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
  font-size: 18px;
  color: black;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  overflow: hidden;
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
  font-size: 14px;
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

interface BoardProps {
  title: string;
  boardTypes?: { name: string; id: string }[];
  url: string;
}

const BoardList = (props: { data: BoardContent[] }) => {
  let navigate = useNavigate();
  const onClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const id = e.currentTarget.dataset.id;
    navigate(`/boards/${id}`);
  };
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {props.data.map((item, index: number) => (
        <ListItemButton
          key={index}
          onClick={onClickHandler}
          data-id={item.id}
          sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
        >
          <BoardTitleBox>
            <BoardTitle>{item.boardTitle}</BoardTitle>
            {item.character && (
              <Tooltip
                placement={'top'}
                title={
                  <CharacterContent
                    characterName={item.character.characterName}
                    characterImgUrl={item.character.characterImageUrl}
                    adventureName={item.character.adventureName}
                    serverId={item.character.serverId}
                    characterId={item.character.characterId}
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
                  src={item.character.characterImageUrl}
                />
              </Tooltip>
            )}
          </BoardTitleBox>
          <BoardFooter>
            <NicknameCreatedAtContainer>
              <NicknameWrapper>
                <UserAvatarNickname src={item.userProfileImgUrl} nickname={item.userNickname} />
              </NicknameWrapper>
            </NicknameCreatedAtContainer>
          </BoardFooter>
          <LikeCommentContainer>
            <BoardCommentView
              boardLikeCount={item.boardLikeCount}
              commentCount={item.commentCount}
              boardViewCount={item.boardViewCount}
              createdAt={item.createdAt}
            />
          </LikeCommentContainer>
        </ListItemButton>
      ))}
    </Suspense>
  );
};

const LatestBoard = (props: BoardProps) => {
  const [isSelected, setIsSelected] = props.boardTypes ? react.useState('FREE') : react.useState('NOTICE');
  const data = useLatestBoard(isSelected);
  const navigate = useNavigate();

  return (
    <CustomTable
      menus={props.boardTypes}
      title={props.title}
      isSelected={isSelected}
      setIsSelected={setIsSelected}
      useMenu={true}
      useIcon={true}
      icon={
        <IconButton onClick={() => navigate('/boards/?boardType=' + isSelected)}>
          <FontAwesomeIcon icon={faChevronRight} size="sm" />
        </IconButton>
      }
    >
      <BoardBody>{data && <BoardList data={data.content} />}</BoardBody>
    </CustomTable>
  );
};

export default LatestBoard;
