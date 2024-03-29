import { Content } from './ICharactersData';

export interface IMyPageResponse {
  userDetail: MyPageResponseUserDetail;
}
export interface MyPageResponseUserDetail {
  userId: string;
  nickname: string;
  email: string;
  characters: Content[];
  profileIconPath: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  adventureCharacters: Content[];
  representCharacterName: string;
  profileCharacterIcon: string;
  profileCharacterIconClassName: string;
}
