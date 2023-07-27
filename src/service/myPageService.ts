import { MyPageResponse } from '../interfaces/MyPageResponse';
import { IAxiosClient } from '../AxiosClient/axiosClient';

export interface IMyPageService {
  getUserActivities: (
    type: 'board' | 'comment' | 'notification',
    sortBy: 'like' | 'commentCount' | 'view' | '',
    page: number,
  ) => Promise<any>;
  deleteCharacterFromUserAccount: (characterId: string, serverId: string) => Promise<any>;
  getUserMyPageResponse: () => Promise<MyPageResponse>;
  validateUserNickname: (nickname: string) => Promise<any>;
  addCharacterToUserAccount: (characterId: string, serverId: string) => Promise<void>;
  changeUserProfileIcon: (formData: FormData) => Promise<any>;
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
  addCharacterToUserAccount(characterId: string, serverId: string): Promise<void> {
    return this.axiosInstance.post(
      this.addCharacterToUserAccountUrl.replace('{characterId}', characterId).replace('{serverId}', serverId),
    );
  }

  changeUserNickname(nickname: string): Promise<any> {
    return this.axiosInstance.put(this.changeUserNicknameUrl.replace('{nickname}', nickname));
  }

  changeUserPassword(password: string): Promise<any> {
    return this.axiosInstance.put(this.changeUserPasswordUrl.replace('{password}', password));
  }

  changeUserProfileIcon(formData: FormData): Promise<any> {
    return this.axiosInstance.put(this.changeUserProfileIconUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  deleteCharacterFromUserAccount(characterId: string, serverId: string): Promise<any> {
    return this.axiosInstance.delete(
      this.deleteCharacterFromUserAccountUrl.replace('{characterId}', characterId).replace('{serverId}', serverId),
    );
  }

  getUserActivities(
    type: 'board' | 'comment' | 'notification',
    sortBy: 'like' | 'commentCount' | 'view' | '',
    page: number,
  ): Promise<any> {
    return this.axiosInstance.get(
      this.getUserActivitiesUrl.replace('{type}', type).replace('{sortBy}', sortBy).replace('{page}', page.toString()),
    );
  }

  getUserMyPageResponse(): Promise<MyPageResponse> {
    return this.axiosInstance.get(this.getUserMyPageResponseUrl);
  }

  validateUserNickname(nickname: string): Promise<any> {
    return this.axiosInstance.get(this.validateUserNicknameUrl.replace('{nickname}', nickname));
  }
}
