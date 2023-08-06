import { IMyPageResponse } from '../interfaces/IMyPageResponse';
import { IAxiosClient } from '../axiosClient/axiosClient';

export interface IMyPageService {
  getUserActivities: (
    type: 'board' | 'comment' | 'notification',
    sortBy: 'like' | 'commentCount' | 'view' | '',
    page: number,
  ) => Promise<any>;
  deleteCharacterFromUserAccount: (characterId: string, serverId: string) => Promise<void>;
  getUserMyPageResponse: () => Promise<IMyPageResponse>;
  validateUserNickname: (nickname: string) => Promise<any>;
  addCharacterToUserAccount: (data: { characterId: string; serverId: string }) => Promise<void>;
  changeUserProfileIcon: (formData: FormData) => Promise<any>;
  changeUserProfileIconByURL: (url: string) => Promise<any>;
  changeUserNickname: (nickname: string) => Promise<any>;
  changeUserPassword: (password: string) => Promise<any>;
}

export default class MyPageService implements IMyPageService {
  private axiosInstance: IAxiosClient;
  private readonly addCharacterToUserAccountUrl = '/users/characters?characterId={characterId}&serverId={serverId}';
  private readonly changeUserProfileIconUrl = '/users/avatar';
  private readonly changeUserNicknameUrl = '/users?nickname={nickname}';
  private readonly changeUserPasswordUrl = '/users?password={password}';
  private readonly deleteCharacterFromUserAccountUrl =
    '/users/characters?characterId={characterId}&serverId={serverId}';
  private readonly getUserActivitiesUrl = '/users/activities?type={type}&sortBy={sortBy}&page={page}';
  private readonly getUserMyPageResponseUrl = '/users/';
  private readonly validateUserNicknameUrl = '/users/check?nickname={nickname}';

  constructor(axiosInstance: IAxiosClient) {
    this.axiosInstance = axiosInstance;
  }
  addCharacterToUserAccount(data: { characterId: string; serverId: string }) {
    return this.axiosInstance.post(
      this.addCharacterToUserAccountUrl.replace('{characterId}', data.characterId).replace('{serverId}', data.serverId),
    );
  }

  changeUserNickname(nickname: string) {
    return this.axiosInstance.put(this.changeUserNicknameUrl.replace('{nickname}', nickname));
  }

  changeUserPassword(password: string) {
    return this.axiosInstance.put(this.changeUserPasswordUrl.replace('{password}', password));
  }

  changeUserProfileIcon(formData: FormData) {
    return this.axiosInstance.put(this.changeUserProfileIconUrl, formData, {
      contentType: 'multipart/form-data',
    });
  }

  changeUserProfileIconByURL(url: string) {
    return this.axiosInstance.put(url);
  }

  deleteCharacterFromUserAccount(characterId: string, serverId: string) {
    return this.axiosInstance.delete(
      this.deleteCharacterFromUserAccountUrl.replace('{characterId}', characterId).replace('{serverId}', serverId),
    );
  }

  getUserActivities(
    type: 'board' | 'comment' | 'notification',
    sortBy: 'like' | 'commentCount' | 'view' | '',
    page: number,
  ) {
    return this.axiosInstance.get(
      this.getUserActivitiesUrl.replace('{type}', type).replace('{sortBy}', sortBy).replace('{page}', page.toString()),
    );
  }

  getUserMyPageResponse() {
    return this.axiosInstance.get(this.getUserMyPageResponseUrl);
  }

  validateUserNickname(nickname: string) {
    return this.axiosInstance.get(this.validateUserNicknameUrl.replace('{nickname}', nickname));
  }
}
