import { Button, Grid } from '@mui/material';
import React from 'react';
import * as S from './CharacterSearchBoxChild.style';
import { IRecentSearchedQuery } from '../../../storages/searchQueryLocalStorage';
const CharacterFastSearchItemButton = ({
  characterId,
  characterServerId,
  characterName,
  characterJob,
  characterLevel,
  characterServerName,
  mouseDownHandler,
}: IRecentCharacterSearchBoxChildProps) => {
  const recentQuery = {
    characterLevel,
    characterJob,
    characterName,
    characterServerName,
    characterId,
    characterServerId,
  } as IRecentSearchedQuery;

  const handleAddRecentSearchedQuery = () => {
    mouseDownHandler(recentQuery);
  };

  return (
    <Button sx={{ width: '100%' }} onMouseDown={handleAddRecentSearchedQuery}>
      <Grid
        container
        direction={'row'}
        sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        spacing={1}
      >
        <Grid item xs={5}>
          <S.BoldNameWrapper>{characterName}</S.BoldNameWrapper>
        </Grid>
        <Grid item xs={3}>
          <S.ContentWrapper>{characterJob}</S.ContentWrapper>
        </Grid>
        <Grid item xs={2}>
          <S.ContentWrapper>{'레벨 ' + characterLevel}</S.ContentWrapper>
        </Grid>
        <Grid item xs={2}>
          <S.ContentWrapper>{characterServerName}</S.ContentWrapper>
        </Grid>
      </Grid>
    </Button>
  );
};

interface IRecentCharacterSearchBoxChildProps {
  characterId: string;
  characterServerId: string;
  characterName: string;
  characterJob: string;
  characterLevel: number;
  characterServerName: string;
  mouseDownHandler: (query: IRecentSearchedQuery) => void;
}

export default CharacterFastSearchItemButton;
