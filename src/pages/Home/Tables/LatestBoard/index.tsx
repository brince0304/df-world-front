import react, { Suspense } from 'react';
import React from 'react';
import styled from 'styled-components';
import CustomTable from '../../../../components/CustomTable';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Avatar, IconButton, ListItemButton } from '@mui/material';
import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import { BoardContent } from '../../../../interfaces/IBoardList';
import useLatestBoard from '../../../../hooks/boardHooks/useLatestBoard';

const BoardBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  font-size: 14px;
  color: #000;
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

const LikeCommentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-top: 5px;
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

const ProfileImgWrapper = styled.div`
  display: flex;
  border-radius: 50%;
  overflow: hidden;
  width: 25px;
  height: 25px;

  img {
    width: 100%;
    height: 100%;
  }
`;
const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
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
          sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '6px' }}
        >
          <BoardTitle>{item.boardTitle}</BoardTitle>
          <BoardFooter>
            <NicknameCreatedAtContainer>
              <NicknameWrapper>
                <ProfileImgWrapper>
                  <Avatar src={item.userProfileImgUrl} alt="profile" style={{ width: '25px', height: '25px' }} />
                </ProfileImgWrapper>
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontFamily: 'Core Sans',
                  }}
                >
                  {item.userNickname}
                </Typography>
              </NicknameWrapper>
            </NicknameCreatedAtContainer>
          </BoardFooter>
          <LikeCommentContainer>
            <IconContainer>
              <LikeCommentWrapper>
                <Typography>
                  <FavoriteBorderOutlined
                    style={{
                      padding: '0 2px 0 5px',
                    }}
                  />{' '}
                  {item.boardLikeCount}
                </Typography>
              </LikeCommentWrapper>
              <LikeCommentWrapper>
                <Typography>
                  <ChatBubbleOutlineOutlined
                    style={{
                      padding: '0 2px 0 5px',
                    }}
                  />{' '}
                  {item.commentCount}
                </Typography>
              </LikeCommentWrapper>
            </IconContainer>
            <Typography sx={{ justifyContent: 'flex-end' }}>{item.createdAt}</Typography>
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
