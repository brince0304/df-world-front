import React from 'react';
import { Grid } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroller';
import CharacterCard from 'components/CharacterList/CharacterCard';
import useCharactersQuery from '../../hooks/characterHooks/queries/useCharactersQuery';

const CharacterList = (props: {
  characterName: string;
  serverId: string;
}) => {
  const { data, hasNextPage, fetchNextPage } = useCharactersQuery(props.characterName, props.serverId ? props.serverId : '');
  return (
    <InfiniteScroll
      width={'100%'}
      height={'100%'}
      pageStart={0}
      loadMore={()=>fetchNextPage()}
      hasMore={hasNextPage}
      loader={<div>더 불러오기</div>}
    >
      <Grid container spacing={4}>
        {data?.pages.map((page, index: number) => {
          return page.content.map((character, index) => {
            return (
              <Grid item xs={6} sm={4} md={3} lg={3} key={index}>
                <CharacterCard character={character} />
              </Grid>
            );
          });
        })}
      </Grid>
    </InfiniteScroll>
  );
};

export default CharacterList;
