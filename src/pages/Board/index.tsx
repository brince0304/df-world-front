import CustomTable from '../../components/CustomTable/CustomTable';
import { useLocation, useNavigate } from 'react-router';
import React, { ReactNode } from 'react';
import styled from 'styled-components';
import SpeedDial from './SpeedDial';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Container, IconButton, Menu, MenuItem } from '@mui/material';
import BestContent from '../../components/BestBoardList/BestBoard';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AllInbox, Announcement, FreeBreakfast, LocalMall, QuestionAnswer, Work } from '@mui/icons-material';
import BoardListSkeleton from '../../components/Skeleton/BoardListSkeleton /BoardListSkeleton';
import InfiniteScroll from 'react-infinite-scroller';
import BoardList from 'components/BoardList/BoardList';
import useBoardListQuery from 'hooks/boardHooks/queries/useBoardListQuery';
import { getBoardType } from 'utils/boardUtil';

export const LongMenu = (props: { menuList: MenuItems[]; boardType: string }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  let navigation = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
    const type = e.currentTarget.getAttribute('data-type');
    if (type) {
      navigation(`/boards/?boardType=${type}`);
    }
  };

  return (
    <Box>
      <IconButton aria-label="more" id="long-button" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '130px',
          },
        }}
      >
        {props.menuList.map((item) => (
          <MenuItem
            key={item.type}
            selected={props.boardType === item.type}
            onClick={handleClose}
            component={'div'}
            data-type={item.type}
          >
            <Typography noWrap fontFamily={'Core Sans'} fontWeight={'bold'}>
              {item.label}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

interface MenuItems {
  type: string;
  icon: ReactNode;
  label: string;
}

export const getSearchType = (type: string) => {
  switch (type) {
    case 'title':
      return '제목';
    case 'content':
      return '내용';
    case 'hashtag':
      return '해시태그';
    case 'characterName':
      return '캐릭터';
  }
};

const MenuListItem = [
  { type: 'ALL', icon: <AllInbox />, label: '전체' },
  { type: 'MARKET', icon: <LocalMall />, label: '거래' },
  { type: 'QUESTION', icon: <QuestionAnswer />, label: '질문/답변' },
  { type: 'RECRUITMENT', icon: <Work />, label: '구인/홍보' },
  { type: 'FREE', icon: <FreeBreakfast />, label: '자유' },
  { type: 'NOTICE', icon: <Announcement />, label: '공지사항' },
];

const Board = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchType = searchParams.get('searchType')?.toString() || '';
  const keyword = searchParams.get('keyword')?.toString() || '';
  const boardType = searchParams.get('boardType')?.toString() || 'ALL';
  const {
    data: boardList,
    fetchNextPage,
    hasNextPage,
  } = useBoardListQuery({
    searchType,
    keyword,
    boardType,
  });

  return (
    <Container maxWidth="md">
      <CustomTable
        title={
          <TableTitleWrapper>
            {!keyword && !searchType && <TableTitle>{getBoardType(boardType)}</TableTitle>}
            {keyword && searchType && (
              <TableTitle>
                {getBoardType(boardType)} - {getSearchType(searchType)} : {keyword}
              </TableTitle>
            )}
          </TableTitleWrapper>
        }
        useMenu={false}
        useIcon={true}
        icon={<LongMenu menuList={MenuListItem} boardType={boardType} />}
      >
        <Box sx={{ padding: '10px 10px 10px 10px' }}>
          <BestContent boardType={boardType} />
        </Box>
        <InfiniteScroll
          pageStart={0}
          loadMore={() => fetchNextPage()}
          hasMore={hasNextPage}
          loader={<BoardListSkeleton />}
        >
          {boardList && <BoardList {...boardList} />}
        </InfiniteScroll>
        <SpeedDial boardType={boardType} keyword={keyword} searchType={searchType} />
      </CustomTable>
    </Container>
  );
};

export const BestArticleTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  color: #000;
`;

const ITEM_HEIGHT = 48;

const TableTitleWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  gap: 10px;
`;

const TableTitle = styled(Typography)`
  && {
    font-size: 24px;
    font-weight: bold;
    font-family: 'Core Sans';
  }
`;

export default Board;
