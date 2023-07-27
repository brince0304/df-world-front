export interface CommentListData {
  comments: CommentListDataComments[];
  bestComments: CommentListDataBestComments[];
  likeResponses: CommentListDataLikeResponses[];
}
export interface CommentListDataComments {
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  id: number;
  commentContent: string;
  boardId: string;
  userId: string;
  userNickname: string;
  commentLikeCount: number;
  isParent: boolean;
  userProfileImgUrl: string;
  childrenComments: any[];
  profileCharacterIcon: string;
  profileCharacterIconClassName: string;
  boardType: string;
}
export interface CommentListDataBestComments {
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  id: number;
  commentContent: string;
  boardId: string;
  userId: string;
  userNickname: string;
  commentLikeCount: number;
  isParent: boolean;
  userProfileImgUrl: string;
  childrenComments: any[];
  profileCharacterIcon: string;
  profileCharacterIconClassName: string;
  boardType: string;
}
export interface CommentListDataLikeResponses {
  id: number;
  isLike: boolean;
}
