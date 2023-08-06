import { IAxiosClient } from '../axiosClient/axiosClient';

export interface IUserService {
  login: (data: ILoginRequest) => Promise<ILoginResponse>;
  register: (data: IRegisterRequest) => Promise<void>;
  getUser: () => Promise<ILoginResponse>;
  logout: () => Promise<void>;
  kakaoLogin: (code: string) => Promise<ILoginResponse>;
}

export class UserService implements IUserService {
  private axiosClient: IAxiosClient;
  private readonly loginUrl = '/users/login';
  private readonly registerUrl = '/users';
  private readonly getUserUrl = '/users/details';
  private readonly logoutUrl = '/users/logout';
  private readonly kakaoLoginUrl = '/users/kakao';

  constructor(axiosClient: IAxiosClient) {
    this.axiosClient = axiosClient;
  }

  login(data: ILoginRequest) {
    return this.axiosClient.post(this.loginUrl, data);
  }

  register(data: IRegisterRequest) {
    return this.axiosClient.post(this.registerUrl, data);
  }

  getUser() {
    return this.axiosClient.get(this.getUserUrl);
  }

  logout() {
    return this.axiosClient.get(this.logoutUrl);
  }

  kakaoLogin(token: string) {
    return this.axiosClient.post(this.kakaoLoginUrl, {
      authorizationCode: token,
    });
  }
}

export interface IRegisterRequest {
  username: string;
  password: string;
  passwordCheck: string;
  email: string;
  nickname: string;
}

export interface ILoginResponse {
  userId: string;
  nickname: string;
  profileImgPath: string;
  adventureName: string;
  notificationCount: number;
  oauthProvider: string;
}

export interface ILoginRequest {
  username: string;
  password: string;
}
