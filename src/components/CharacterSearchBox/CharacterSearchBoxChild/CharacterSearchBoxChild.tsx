import * as S from './CharacterSearchBoxChild.style';
import React, { ForwardedRef, Suspense, forwardRef } from 'react';
import useRecentSearchedQuery from '../../../hooks/recoilHooks/useRecentSearchedQuery';
import CharacterNoData from './CharacterNoData';
import { IRecentSearchedQuery } from '../../../storages/searchQueryLocalStorage';
import RecentSearchedList from './RecentSearchedList';
import useSearchForm from 'hooks/uiHooks/useSearchForm';
import CharacterFastSearchList from './CharacterFastSearchList';
import Loading from 'components/Loading/Loading';

const CharacterSearchBoxChild = (
  { direction, clickHandler, searchFormProps }: ICharacterSearchBoxChildProps,
  ref: ForwardedRef<any>,
) => {
  const recentSearch = '최근 검색 기록';
  const fastSearch = '빠른 검색';

  const { recentSearchedQuery, handleAddRecentSearchedQuery } = useRecentSearchedQuery();
  const isEmptyRecentSearchedList = recentSearchedQuery.length === 0;
  const isEmptySearchResult = searchFormProps.value.length === 0;
  const searchCallback = (query: IRecentSearchedQuery) => {
    handleAddRecentSearchedQuery(query);
    if (clickHandler.length === 3) {
      clickHandler(query.characterId, query.characterServerId, query.characterName);
      return;
    }
    clickHandler(query.characterId, query.characterServerId);
  };
  const isFastSearch = searchFormProps.value.length >= 2;

  return (
    <S.SearchOptionContainer direction={direction} ref={ref}>
      <S.SearchOptionTitle>
        <S.SearchOptionTitleWrapper>{isFastSearch ? fastSearch : recentSearch}</S.SearchOptionTitleWrapper>
      </S.SearchOptionTitle>
      <S.SearchOptionBody>
        {!isFastSearch ? (
          !isEmptyRecentSearchedList && <RecentSearchedList searchCallback={searchCallback} />
        ) : (
          <Suspense fallback={<Loading />}>
            <CharacterFastSearchList searchCallback={searchCallback} searchFormProps={searchFormProps} />
          </Suspense>
        )}
        {isEmptyRecentSearchedList && !isFastSearch && <CharacterNoData content={'최근 검색 기록이 없습니다.'} />}
        {isEmptySearchResult && isFastSearch && <CharacterNoData content={'데이터가 존재하지 않습니다.'} />}
      </S.SearchOptionBody>
    </S.SearchOptionContainer>
  );
};

interface ICharacterSearchBoxChildProps {
  direction: string;
  clickHandler: (...args: any[]) => void;
  searchFormProps: ReturnType<typeof useSearchForm>;
}

export default forwardRef(CharacterSearchBoxChild);
