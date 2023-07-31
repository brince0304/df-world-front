import { useRecoilState } from 'recoil';
import { searchedQueryState } from '../../recoil/states';
import { useEffect } from 'react';
import {
  IRecentSearchedQuery,
  localStorageSearchQueryKey,
  searchedQueryLocalStorage,
} from '../../storages/searchQueryLocalStorage';

const useRecentSearchedQuery = () => {
  const [recentSearchedQuery, setRecentSearchedQuery] = useRecoilState(searchedQueryState);
  const handleAddRecentSearchedQuery = (query: IRecentSearchedQuery) => {
    searchedQueryLocalStorage.addSearchedQuery(query);
  };

  const handleRemoveRecentSearchedQuery = (query: string) => {
    searchedQueryLocalStorage.removeSearchedQuery(query);
  };

  useEffect(() => {
    setRecentSearchedQuery(searchedQueryLocalStorage.getSearchedQuery() || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setRecentSearchedQuery, localStorage.getItem(localStorageSearchQueryKey)]);

  return {
    recentSearchedQuery,
    handleAddRecentSearchedQuery,
    handleRemoveRecentSearchedQuery,
  };
};

export default useRecentSearchedQuery;
