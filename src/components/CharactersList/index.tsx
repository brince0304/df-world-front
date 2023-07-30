import { ICharactersData } from '../../interfaces/ICharactersData';
import React from 'react';
import { Grid } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroller';
import { InfiniteData } from '@tanstack/react-query';
import CharacterCard from 'components/CharacterCard';

const CharacterList = (props: {
  data: InfiniteData<ICharactersData>;
  loadFunc?: (...args: any[]) => void;
  hasMore?: boolean;
}) => {
  return (
    <InfiniteScroll
      width={'100%'}
      height={'100%'}
      pageStart={0}
      loadMore={props.loadFunc ? props.loadFunc : () => {}}
      hasMore={props.hasMore ? props.hasMore : false}
      loader={<div>더 불러오기</div>}
    >
      <Grid container spacing={4}>
        {props.data.pages.map((page, index: number) => {
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
