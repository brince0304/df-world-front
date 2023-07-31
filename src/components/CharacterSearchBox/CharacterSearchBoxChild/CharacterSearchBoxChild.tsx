import * as S from './CharacterSearchBoxChild.style';
import React, { ForwardedRef, forwardRef, useState } from 'react';
import useRecentSearchedQuery from '../../../hooks/recoilHooks/useRecentSearchedQuery';
import RecentSearchedItemButton from './RecentSearchedItemButton';
import CharacterNoData from './CharacterNoData';
import { IRecentSearchedQuery } from '../../../storages/searchQueryLocalStorage';
import CharacterFastSearchItemButton from './CharacterFastSearchItemButton';

const CharacterSearchBoxChild = (
  { direction, searchResult, clickHandler }: ICharacterSearchBoxChildProps,
  ref: ForwardedRef<any>,
) => {
  const [selectedMenu, setSelectedMenu] = useState<'최근 검색 기록' | '빠른 검색'>('최근 검색 기록');
  const { recentSearchedQuery, handleRemoveRecentSearchedQuery, handleAddRecentSearchedQuery } =
    useRecentSearchedQuery();
  const isEmptyRecentSearchedList = recentSearchedQuery.length === 0;
  const isEmptySearchResult = searchResult.length === 0;
  const handleClickRecentSearch = () => {
    setSelectedMenu('최근 검색 기록');
  };
  const handleClickFastSearch = () => {
    setSelectedMenu('빠른 검색');
  };
  const searchCallback = (query: IRecentSearchedQuery) => {
    handleAddRecentSearchedQuery(query);
    if (clickHandler.length === 3) {
      clickHandler(query.characterId, query.characterServerId, query.characterName);
      return;
    }
    clickHandler(query.characterId, query.characterServerId);
  };

  return (
    <S.SearchOptionContainer direction={direction} ref={ref}>
      <S.SearchOptionTitle>
        <S.SearchOptionTitleWrapper
          selected={selectedMenu === '최근 검색 기록' ? 'true' : 'false'}
          onMouseDown={handleClickRecentSearch}
        >
          최근 검색 기록
        </S.SearchOptionTitleWrapper>
        <S.SearchOptionTitleWrapper
          selected={selectedMenu === '빠른 검색' ? 'true' : 'false'}
          onMouseDown={handleClickFastSearch}
        >
          빠른 검색
        </S.SearchOptionTitleWrapper>
      </S.SearchOptionTitle>
      <S.SearchOptionBody>
        {selectedMenu === '최근 검색 기록'
          ? !isEmptyRecentSearchedList &&
            recentSearchedQuery.map((data, index) => {
              return (
                <RecentSearchedItemButton
                  {...data}
                  removeHandler={handleRemoveRecentSearchedQuery}
                  mouseDownHandler={searchCallback}
                />
              );
            })
          : searchResult.map((item, index) => {
              return <CharacterFastSearchItemButton {...item} mouseDownHandler={searchCallback} />;
            })}
        {isEmptyRecentSearchedList && selectedMenu === '최근 검색 기록' && (
          <CharacterNoData content={'최근 검색 기록이 없습니다.'} />
        )}
        {isEmptySearchResult && selectedMenu === '빠른 검색' && (
          <CharacterNoData content={'데이터가 존재하지 않습니다.'} />
        )}
      </S.SearchOptionBody>
    </S.SearchOptionContainer>
  );
};

interface ICharacterSearchBoxChildProps {
  direction: string;
  searchResult: IRecentSearchedQuery[];
  clickHandler: (...args: any[]) => void;
}

export default forwardRef(CharacterSearchBoxChild);
