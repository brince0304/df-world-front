import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Button, Grid } from '@mui/material';
import React from 'react';
import * as S from './CharacterSearchBoxChild.style';
import { IRecentSearchedQuery } from '../../../storages/searchQueryLocalStorage';
const RecentSearchedItemButton = ({
  characterId,
  characterServerId,
  characterName,
  characterJob,
  characterLevel,
  characterServerName,
  removeHandler,
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

  const handleAddRecentSearchedQuery = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    mouseDownHandler(recentQuery);
  };

  const handleRemoveRecentSearchedQuery = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    removeHandler(characterId);
  };

  return (
    <Button sx={{ width: '100%' }}>
      <Grid
        container
        direction={'row'}
        sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        spacing={1}
        onMouseDown={handleAddRecentSearchedQuery}
      >
        <Grid item xs={4}>
          <S.BoldNameWrapper>{characterName}</S.BoldNameWrapper>
        </Grid>
        <Grid item xs={3}>
          <S.JobNameWrapper>{characterJob}</S.JobNameWrapper>
        </Grid>
        <Grid item xs={2}>
          <S.ContentWrapper>{'레벨 ' + characterLevel}</S.ContentWrapper>
        </Grid>
        <Grid item xs={2}>
          <S.ContentWrapper>{characterServerName}</S.ContentWrapper>
        </Grid>
        <Grid item xs={1}>
          <S.LatestRemoveButtonWrapper onMouseDown={handleRemoveRecentSearchedQuery}>
            <FontAwesomeIcon icon={faXmark} size={'lg'} />
          </S.LatestRemoveButtonWrapper>
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
  removeHandler: (characterId: string) => void;
  mouseDownHandler: (query: IRecentSearchedQuery) => void;
}

export default RecentSearchedItemButton;
