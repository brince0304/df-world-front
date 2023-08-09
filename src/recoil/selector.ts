import { DefaultValue, selector, selectorFamily } from 'recoil';
import {
  boardCommentCountState,
  boardCommentLikeCountStates,
  boardLikeCountStates,
  isBoardCommentLikedStates,
  isBoardLikedStates,
  searchedQueryState,
} from './states';

export const boardLikeCountSelector = selectorFamily<number, string>({
  key: 'boardLikeCountSelector',
  get:
    (boardId) =>
    ({ get }) => {
      const boardLikeCount = get(boardLikeCountStates);
      const foundBoardLikeCount = boardLikeCount.find((item) => item.boardId === boardId);
      if (!foundBoardLikeCount) return 0;
      return foundBoardLikeCount.likeCount;
    },
  set:
    (boardId) =>
    ({ get, set }, newLikeCount) => {
      if (newLikeCount instanceof DefaultValue) return;
      const boardLikeCount = get(boardLikeCountStates);
      const foundBoardLikeCount = boardLikeCount.find((item) => item.boardId === boardId);
      if (!foundBoardLikeCount) {
        set(boardLikeCountStates, [...boardLikeCount, { boardId, likeCount: newLikeCount }]);
        return;
      }
      const newBoardLikeCount = {
        boardId,
        likeCount: newLikeCount,
      };
      const spliced = boardLikeCount.filter((item) => item.boardId !== boardId);
      spliced.push(newBoardLikeCount);
      set(boardLikeCountStates, [...spliced]);
    },
});

export const isBoardLikedSelector = selectorFamily<boolean, string>({
  key: 'boardIsLikedSelector',
  get:
    (boardId) =>
    ({ get }) => {
      const isBoardLiked = get(isBoardLikedStates);
      const foundIsBoardLiked = isBoardLiked.find((item) => item.boardId === boardId);
      if (!foundIsBoardLiked) return false;
      return foundIsBoardLiked.isLiked;
    },
  set:
    (boardId) =>
    ({ get, set }, newIsLiked) => {
      if (newIsLiked instanceof DefaultValue) return;
      const isBoardLiked = get(isBoardLikedStates);
      const foundIsBoardLiked = isBoardLiked.find((item) => item.boardId === boardId);
      if (!foundIsBoardLiked) {
        set(isBoardLikedStates, [...isBoardLiked, { boardId, isLiked: newIsLiked }]);
        return;
      }
      const newBoardIsLiked = {
        boardId,
        isLiked: newIsLiked,
      };
      const spliced = isBoardLiked.filter((item) => item.boardId !== boardId);
      spliced.push(newBoardIsLiked);
      set(isBoardLikedStates, [...spliced]);
    },
});

export const searchedQuerySelector = selector({
  key: 'recentSearchedQuerySelector',
  get: ({ get }) => {
    const recentSearchedQuery = get(searchedQueryState);
    return recentSearchedQuery;
  },
  set: ({ get, set }, newRecentSearchedQuery) => {
    set(searchedQueryState, newRecentSearchedQuery);
  },
});

export const boardCommentLikeCountSelector = selectorFamily<number, string>({
  key: 'boardCommentLikeCountSelector',
  get:
    (boardCommentId) =>
    ({ get }) => {
      const boardCommentLikeCount = get(boardCommentLikeCountStates);
      const foundBoardCommentLikeCount = boardCommentLikeCount.find((item) => item.boardCommentId === boardCommentId);
      if (!foundBoardCommentLikeCount) return 0;
      return foundBoardCommentLikeCount.likeCount;
    },
  set:
    (boardCommentId) =>
    ({ get, set }, newLikeCount) => {
      if (newLikeCount instanceof DefaultValue) return;
      const boardCommentLikeCount = get(boardCommentLikeCountStates);
      const foundBoardCommentLikeCount = boardCommentLikeCount.find((item) => item.boardCommentId === boardCommentId);
      if (!foundBoardCommentLikeCount) {
        set(boardCommentLikeCountStates, [
          ...boardCommentLikeCount,
          { boardCommentId: boardCommentId, likeCount: newLikeCount },
        ]);
        return;
      }
      const newBoardCommentLikeCount = {
        boardCommentId: boardCommentId,
        likeCount: newLikeCount,
      };
      const spliced = boardCommentLikeCount.filter((item) => item.boardCommentId !== boardCommentId);
      spliced.push(newBoardCommentLikeCount);
      set(boardCommentLikeCountStates, [...spliced]);
    },
});

export const boardCommentCountSelector = selectorFamily<string, string>({
  key: 'boardCommentCountSelector',
  get:
    (boardCommentId) =>
    ({ get }) => {
      const boardCommentCount = get(boardCommentCountState);
      const foundBoardCommentCount = boardCommentCount.find((item) => item.boardId === boardCommentId);
      if (!foundBoardCommentCount) return '0';
      return String(foundBoardCommentCount.commentCount);
    },
});

export const boardCommentIsLikedSelector = selectorFamily<boolean, string>({
  key: 'boardCommentIsLikedSelector',
  get:
    (boardCommentId) =>
    ({ get }) => {
      const isBoardCommentLiked = get(isBoardCommentLikedStates);
      const foundIsBoardCommentLiked = isBoardCommentLiked.find((item) => item.boardCommentId === boardCommentId);
      if (!foundIsBoardCommentLiked) return false;
      return foundIsBoardCommentLiked.isLiked;
    },
  set:
    (boardCommentId) =>
    ({ get, set }, newIsLiked) => {
      if (newIsLiked instanceof DefaultValue) return;
      const isBoardCommentLiked = get(isBoardCommentLikedStates);
      const foundIsBoardCommentLiked = isBoardCommentLiked.find((item) => item.boardCommentId === boardCommentId);
      if (!foundIsBoardCommentLiked) {
        set(isBoardCommentLikedStates, [
          ...isBoardCommentLiked,
          { boardCommentId: boardCommentId, isLiked: newIsLiked },
        ]);
        return;
      }
      const newBoardCommentIsLiked = {
        boardCommentId: boardCommentId,
        isLiked: newIsLiked,
      };
      const spliced = isBoardCommentLiked.filter((item) => item.boardCommentId !== boardCommentId);
      spliced.push(newBoardCommentIsLiked);
      set(isBoardCommentLikedStates, [...spliced]);
    },
});
