import { atom } from 'recoil';
import { IRecentSearchedQuery } from '../storages/searchQueryLocalStorage';

export const searchedQueryState = atom({
  key: 'searchedQueryState',
  default: [] as IRecentSearchedQuery[],
});

export const boardLikeCountStates = atom({
  key: 'boardLikeCountState',
  default: [] as IBoardLikeCount[],
});

export const boardCommentCountState = atom({
  key: 'boardCommentCountState',
  default: [] as IBoardCommentCount[],
});

interface IBoardCommentCount {
  boardId: string;
  commentCount: string;
}

interface IBoardLikeCount {
  boardId: string;
  likeCount: number;
}

export const isBoardLikedStates = atom({
  key: 'isBoardLikedState',
  default: [] as IBoardIsLiked[],
});

interface IBoardIsLiked {
  boardId: string;
  isLiked: boolean;
}

export const boardCommentLikeCountStates = atom({
  key: 'boardCommentLikeCountState',
  default: [] as IBoardCommentLikeCount[],
});

interface IBoardCommentLikeCount {
  boardCommentId: string;
  likeCount: number;
}

export const isBoardCommentLikedStates = atom({
  key: 'isBoardCommentLikedState',
  default: [] as IBoardCommentIsLiked[],
});

interface IBoardCommentIsLiked {
  boardCommentId: string;
  isLiked: boolean;
}
