import { Button } from '@mui/material';
import React from 'react';
import * as S from './CharacterSearchBoxChild.style';
import { IRecentSearchedQuery } from '../../../storage/searchQueryLocalStorage';
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
    characterServerId
  } as IRecentSearchedQuery;

  const handleAddRecentSearchedQuery = () => {
    mouseDownHandler(recentQuery);
  }

  return (
    <Button sx={{ padding: 0 }} onMouseDown={handleAddRecentSearchedQuery}>
      <S.HistoryOptionCell>
        <S.BoldNameWrapper>{characterName}</S.BoldNameWrapper>
        <S.ContentWrapper>{characterJob}</S.ContentWrapper>
        <S.ContentWrapper>{'레벨 '+characterLevel}</S.ContentWrapper>
        <S.ContentWrapper>{characterServerName}</S.ContentWrapper>
      </S.HistoryOptionCell>
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
  mouseDownHandler: (query: IRecentSearchedQuery) => void;
}

export default CharacterFastSearchItemButton;