import MyTable from '../components/MyTable/MyTable';
import { useLocation } from 'react-router';
import React, { Suspense } from 'react';
import SpeedDial from '../components/BoardList/BoardSpeedDial';
import { Container } from '@mui/material';
import BestContent from '../components/BestBoardList/BestBoard';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BoardList from '../components/BoardList/BoardList';
import { getBoardType } from '../utils/boardUtil';
import styled from '@emotion/styled';
import BoardTypeChips from '../components/Chips/BoardTypeChips';
import BoardListSkeleton from '../components/Skeleton/BoardListSkeleton /BoardListSkeleton';

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

const Board = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchType = searchParams.get('searchType')?.toString() || '';
  const keyword = searchParams.get('keyword')?.toString() || '';
  const boardType = searchParams.get('boardType')?.toString() || 'ALL';

  return (
    <Container maxWidth="md">
      <MyTable
        title={
          <TableTitleWrapper>
            {!keyword && !searchType && <TableTitle>{getBoardType(boardType)}</TableTitle>}
            {keyword && searchType && (
              <TableTitle>
                {getBoardType(boardType)} - {getSearchType(searchType)} : {keyword}
              </TableTitle>
            )}
            <BoardTypeChips boardType={boardType} />
          </TableTitleWrapper>
        }
        useMenu={false}
        useIcon={false}
      >
        <Box sx={{ padding: '10px 10px 10px 10px' }}>
          <Suspense fallback={<div>로딩중...</div>}>
            <BestContent boardType={boardType} />
          </Suspense>
        </Box>
        <Suspense fallback={<BoardListSkeleton />}>
          <BoardList searchType={searchType} keyword={keyword} boardType={boardType} />
        </Suspense>
        <SpeedDial boardType={boardType} keyword={keyword} searchType={searchType} />
      </MyTable>
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

const TableTitleWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

const TableTitle = styled(Typography)`
  && {
    font-size: 24px;
    font-weight: bold;
  }
`;

export default Board;
