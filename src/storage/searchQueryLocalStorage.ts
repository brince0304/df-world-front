export interface ISearchedQueryLocalStorage {
  getSearchedQuery: () => IRecentSearchedQuery[] | null;
  addSearchedQuery: (query: IRecentSearchedQuery) => void;
  setSearchedQuery: (query: IRecentSearchedQuery[]) => void;
  removeSearchedQuery: (query: string) => void;
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
  addSearchedQuery: (query: IRecentSearchedQuery) => {
    const list = searchedQueryLocalStorage.getSearchedQuery();
    if (list) {
      const index = list.findIndex((item) => item.characterId === query.characterId);
      if (index === -1) {
        list.unshift(query);
        const spliced = list.splice(0, 5);
        searchedQueryLocalStorage.setSearchedQuery(spliced);
      }
    }
  },
  removeSearchedQuery: (query: string) => {
    const list = searchedQueryLocalStorage.getSearchedQuery();
    if (list) {
      const index = list.findIndex((item) => item.characterId === query);
      if (index !== -1) {
        list.splice(index, 1);
        searchedQueryLocalStorage.setSearchedQuery(list);
      }
    }
  }
};

export interface IRecentSearchedQuery {
  characterLevel: number;
  characterJob: string;
  characterName: string;
  characterServerName: string;
  characterId: string;
  characterServerId: string;
}