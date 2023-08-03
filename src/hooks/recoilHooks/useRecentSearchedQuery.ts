import { useRecoilState } from 'recoil';
import { searchedQueryState } from '../../recoil/states';
import { useEffect } from 'react';
import { IRecentSearchedQuery, searchedQueryLocalStorage } from '../../storages/searchQueryLocalStorage';

const useRecentSearchedQuery = () => {
  const [recentSearchedQuery, setRecentSearchedQuery] = useRecoilState(searchedQueryState);
  const handleAddRecentSearchedQuery = (query: IRecentSearchedQuery) => {
    if (recentSearchedQuery.some((item) => item.characterId === query.characterId)) return;
    const newRecentSearchedQuery = [query, ...recentSearchedQuery];
    const spliced = newRecentSearchedQuery.length > 5 ? newRecentSearchedQuery.splice(0, 5) : newRecentSearchedQuery;
    setRecentSearchedQuery(spliced);
    searchedQueryLocalStorage.setSearchedQuery(spliced);
  };

  const handleRemoveRecentSearchedQuery = (query: string) => {
    const newRecentSearchedQuery = recentSearchedQuery.filter((item) => item.characterId !== query);
    setRecentSearchedQuery(newRecentSearchedQuery);
    searchedQueryLocalStorage.setSearchedQuery(newRecentSearchedQuery);
  };

  useEffect(() => {
    const recentSearchedQuery = searchedQueryLocalStorage.getSearchedQuery();
    if (recentSearchedQuery) setRecentSearchedQuery(recentSearchedQuery);
  }, []);

  return {
    recentSearchedQuery,
    handleAddRecentSearchedQuery,
    handleRemoveRecentSearchedQuery,
  };
};

export default useRecentSearchedQuery;
