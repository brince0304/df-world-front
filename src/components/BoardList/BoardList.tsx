import { List } from '@mui/material';
import BoardListItem from './BoardListItem';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import BoardListSkeleton from 'components/Skeleton/BoardListSkeleton /BoardListSkeleton';
import useBoardListQuery from 'hooks/boardHooks/queries/useBoardListQuery';

const BoardList = ({ searchType, keyword, boardType }: IBoardListProps) => {
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
    <InfiniteScroll
      key={0}
      pageStart={0}
      loadMore={() => fetchNextPage()}
      hasMore={hasNextPage}
      loader={<BoardListSkeleton />}
    >
      <List
        sx={{
          padding: '0px',
          }}
      >
        {boardList?.pages.map((items) => {
          return items.content.map((item) => {
            return <BoardListItem {...item} key={item.id} />;
          });
        })}
      </List>
    </InfiniteScroll>
  );
};

interface IBoardListProps {
  searchType: string;
  keyword: string;
  boardType: string;
}

export default BoardList;
