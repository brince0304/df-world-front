export type BestArticles = {
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  id: number;
  boardType: string;
  boardTitle: string;
  boardContent: string;
  boardViewCount: number;
  boardLikeCount: number;
  commentCount: string;
  userId: string;
  userNickname: string;
  userProfileImgUrl: string;
  userAdventureExist: boolean;
  profileCharacterIcon: string;
  profileCharacterIconClassName: string;
  character?: any;
  hashtags: any[];
};

export type Content = {
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  id: number;
  boardType: string;
  boardTitle: string;
  boardContent: string;
  boardViewCount: number;
  boardLikeCount: number;
  commentCount: string;
  userId: string;
  userNickname: string;
  userProfileImgUrl: string;
  userAdventureExist: boolean;
  profileCharacterIcon: string;
  profileCharacterIconClassName: string;
  character?: any;
  hashtags: any[];
};

export type Sort = {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
};

export type Pageable = {
  sort: Sort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
};

export type Articles = {
  content: Content[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  empty: boolean;
};

export type ArticleType = {
  bestArticles: BestArticles[];
  articles: Articles;
};
