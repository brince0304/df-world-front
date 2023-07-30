import CustomTable from '../../components/CustomTable';
import { useLocation, useNavigate } from 'react-router';
import React, { ReactNode } from 'react';
import styled from 'styled-components';
import SpeedDial from './SpeedDial';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InfoIcon from '@mui/icons-material/Info';

import {
  Avatar,
  Button,
  Chip,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import BestContent from '../../components/BestBoardList';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  AllInbox,
  Announcement,
  FreeBreakfast,
  LocalMall,
  QuestionAnswer,
  Work,
} from '@mui/icons-material';
import {  BOARD_LIST_URL, BOARD_WRITE_URL } from '../../apis/data/urls';
import BoardListSkeleton from '../../components/Skeleton/BoardListSkeleton ';
import SearchForm from '../../components/SearchBox';
import { getServerName } from 'utils/charactersUtil';
import useSearchForm from '../../hooks/useSearchForm';
import { boardSearchTypes, getBoardType } from 'utils/boardUtil';
import useBoardList from '../../hooks/boardHooks/useBoardList';
import InfiniteScroll from 'react-infinite-scroller';
import BoardList from 'components/BoardList';

const CharacterContent = (props: {
  characterName: string;
  serverId: string;
  characterImgUrl: string;
  adventureName: string;
  characterId: string;
}) => {
  const navigate = useNavigate();
  const handleNavigateToCharacterDetail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/details/?characterId=${props.characterId}&serverId=${props.serverId}`);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        position: 'relative',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        gap: '2px',
      }}
    >
      <Tooltip title={'클릭하여 캐릭터 상세 정보를 확인하세요.'} placement="top" arrow>
        <IconButton
          sx={{ position: 'absolute', top: '-5px', right: '-5px', zIndex: '100', color: 'white' }}
          onClick={handleNavigateToCharacterDetail}
        >
          <InfoIcon />
        </IconButton>
      </Tooltip>
      <Avatar src={props.characterImgUrl} sx={{ width: '100px', height: '100px' }} variant="rounded" />
      <Typography fontFamily={'Core Sans'} fontSize={'13px'}>
        {props.characterName}
      </Typography>
      <Typography fontFamily={'Core Sans'} fontSize={'12px'}>
        {props.adventureName}
      </Typography>
      <Typography fontFamily={'Core Sans'} fontSize={'12px'}>
        {getServerName(props.serverId)}
      </Typography>
    </Box>
  );
};


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


export const CharacterChip = (props: {
  characterName: string;
  characterImgUrl: string;
  adventureName: string;
  serverId: string;
  characterId: string;
}) => {
  const chipStyle = {
    fontSize: '10px',
    '& > img': {
      objectFit: 'cover',
      objectPosition: 'center',
      height: '500%',
      width: '1300%',
      backgroundColor: '#c4c4c4',
    },
  };
  return (
    <Tooltip
      title={
        <CharacterContent
          characterName={props.characterName}
          serverId={props.serverId}
          characterId={props.characterId}
          characterImgUrl={props.characterImgUrl}
          adventureName={props.adventureName}
        />
      }
      placement="top"
      arrow
    >
      <Chip
        avatar={<Avatar src={props.characterImgUrl} sx={chipStyle}></Avatar>}
        label={props.characterName}
        color="default"
        sx={{ fontSize: '10px', fontWeight: 'bold' }}
        size="small"
        data-name={props.characterName}
      />
    </Tooltip>
  );
};

const Board = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const searchType = searchParams.get('searchType')?.toString() || '';
  const keyword = searchParams.get('keyword')?.toString() || '';
  const boardType = searchParams.get('boardType')?.toString() || 'ALL';
  const {data:boardList,refetch,hasNextPage} = useBoardList({
    searchType,
    keyword,
    boardType,
  });
  const handleNavigateToSearchResult = (searchType: string, searchKeyword: string) => {
    navigate(BOARD_LIST_URL + `?searchType=${searchKeyword}&keyword=${searchType}&boardType=${boardType}`);
  };

  const {value,setValue,selectedValue,setSelectedValue} = useSearchForm({
    initialValues: keyword,
    initialSelectedValue: {
      value: searchType,
      label: getSearchType(searchType) || '',
    }
  });
  const searchFormProps = {
    value,
    setValue,
    selectedValue,
    setSelectedValue,
  }
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 10px 10px 10px',
            flexDirection: 'row',
            gap: '10px',
            borderTop: '1px solid #e0e0e0',
            borderBottom: '1px solid #e0e0e0',
            width: '100%',
            '@media (max-width:1024px)': {
              display: 'none',
            },
          }}
        >
          <Box sx={{ width: '60%', height: '40px' }}>
            <SearchForm
              placeholder={'검색'}
              direction={'down'}
              filterOptions={boardSearchTypes}
              handleSubmit={handleNavigateToSearchResult}
              useSearchForms={searchFormProps}
              children={<></>}
              />
          </Box>
          <Box>
            <Button
              sx={{ textAlign: 'right' }}
              onClick={() => navigate(BOARD_WRITE_URL + `?boardType=${boardType}&request=add`)}
            >
              <Typography
                fontFamily={'Core Sans'}
                color={'black'}
                fontWeight={'bold'}
                component={'span'}
                fontSize={'15px'}
              >
                글쓰기
              </Typography>
            </Button>
          </Box>
        </Box>
        <InfiniteScroll
          pageStart={0}
          loadMore={() => refetch()}
          hasMore={hasNextPage}
          loader={<BoardListSkeleton/>}
        >
          {boardList && <BoardList {...boardList}/>}
        </InfiniteScroll>
        <SpeedDial
          boardType={boardType}
        />
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
