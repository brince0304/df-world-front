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
}

export type BestArticleType = {
  bestArticles: BestArticles[];
}