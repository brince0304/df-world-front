import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@mui/material';
import React from 'react';
import * as S from './CharacterSearchBoxChild.style';
import { IRecentSearchedQuery } from '../../../storage/searchQueryLocalStorage';
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
    characterServerId
  } as IRecentSearchedQuery;

  const handleAddRecentSearchedQuery = () => {
    mouseDownHandler(recentQuery);
  }

  const handleRemoveRecentSearchedQuery = () => {
    removeHandler(characterId);
  }

  return (
    <Button sx={{ padding: 0 }}>
      <S.HistoryOptionCell
        onMouseDown={handleAddRecentSearchedQuery}
      >
        <S.BoldNameWrapper>{characterName}</S.BoldNameWrapper>
        <S.ContentWrapper>{characterJob}</S.ContentWrapper>
        <S.ContentWrapper>{'레벨 '+characterLevel}</S.ContentWrapper>
        <S.ContentWrapper>{characterServerName}</S.ContentWrapper>
      </S.HistoryOptionCell>
      <S.LatestRemoveButtonWrapper onMouseDown={handleRemoveRecentSearchedQuery}>
        <FontAwesomeIcon icon={faXmark} size={'lg'} />
      </S.LatestRemoveButtonWrapper>
    </Button>
  )
}

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