import { atom } from 'recoil';
import { IRecentSearchedQuery } from '../storages/searchQueryLocalStorage';

export const searchedQueryState = atom({
  key: 'searchedQueryState',
  default: [] as IRecentSearchedQuery[],
});

export const appStatusState = atom({
  key: 'appLoadingState',
  default: false,
});
