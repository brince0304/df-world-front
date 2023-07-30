export interface IBoardDetail {
  likeLog: boolean;
  article: BoardDetailDataArticle;
}
export interface BoardDetailDataArticleCharacter {
  characterId: string;
  characterName: string;
  serverId: string;
  characterImageUrl: string;
  imgStyleClassName: string;
  jobName: string;
  adventureName: string;
  adventureFame: number;
}
export interface BoardDetailDataArticle {
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  id: number;
  boardType: string;
  boardTitle: string;
  boardContent: string;
  deleted: boolean;
  boardViewCount: number;
  boardLikeCount: number;
  character: BoardDetailDataArticleCharacter;
  userId: string;
  userNickname: string;
  userProfileIconPath: string;
  commentCount: string;
  hashtags: string[];
  userAdventureExist: boolean;
  profileCharacterIcon: string;
  profileCharacterIconClassName: string;
}
