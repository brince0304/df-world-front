export interface Content {
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
}

export interface Sor {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Pageable {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export interface IBoardList {
  content: Content[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  empty: boolean;
}

export interface BoardContent {
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
}
