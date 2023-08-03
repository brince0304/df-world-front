export interface ISearchedQueryLocalStorage {
  getSearchedQuery: () => IRecentSearchedQuery[] | null;
  setSearchedQuery: (query: IRecentSearchedQuery[]) => void;
}

export const localStorageSearchQueryKey = 'searchHistory';

export const searchedQueryLocalStorage: ISearchedQueryLocalStorage = {
  getSearchedQuery: () => {
    const query = localStorage.getItem(localStorageSearchQueryKey);
    if (!query) return null;
    return JSON.parse(query);
  },
  setSearchedQuery: (query: IRecentSearchedQuery[]) => {
    localStorage.setItem(localStorageSearchQueryKey, JSON.stringify(query));
  },
};

export interface IRecentSearchedQuery {
  characterLevel: number;
  characterJob: string;
  characterName: string;
  characterServerName: string;
  characterId: string;
  characterServerId: string;
}
