import { atom } from 'recoil';
import { IRecentSearchedQuery } from '../storage/searchQueryLocalStorage';

export const searchedQueryState = atom({
    key: 'searchedQueryState',
    default: [] as IRecentSearchedQuery[]
});

export const appStatusState = atom({
    key: 'appLoadingState',
    default: false,
});