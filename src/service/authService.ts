import { IAxiosClient } from '../AxiosClient/axiosClient';

export interface IAuthService {
  login: (data: IAuthLoginRequest) => Promise<IAuthLoginResponse>;
  register: (data: IAuthRegisterRequest) => Promise<void>;
  getUser: () => Promise<IAuthLoginResponse>;
  logout: () => Promise<void>;
}

export class AuthService implements IAuthService {
  private axiosClient: IAxiosClient;
  private readonly loginUrl = '/users/login';
  private readonly registerUrl = '/users';
  private readonly getUserUrl = '/users/details';
  private readonly logoutUrl = '/users/logout';

  constructor(axiosClient: IAxiosClient) {
    this.axiosClient = axiosClient;
  }

  login(data: IAuthLoginRequest) {
    return this.axiosClient.post(this.loginUrl, data);
  }

  register(data: IAuthRegisterRequest) {
    return this.axiosClient.post(this.registerUrl, data);
  }

  getUser() {
    return this.axiosClient.get(this.getUserUrl);
  }

  logout() {
    return this.axiosClient.get(this.logoutUrl);
  }
}

export interface IAuthRegisterRequest {
  username: string;
  password: string;
  passwordCheck: string;
  email: string;
  nickname: string;
}

export interface IAuthLoginResponse {
  userId: string;
  nickname: string;
  profileImgPath: string;
  adventureName: string;
  notificationCount: number;
}

export interface IAuthLoginRequest {
  username: string;
  password: string;
}