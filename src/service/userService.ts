import { IAxiosClient } from '../AxiosClient/axiosClient';

export interface IUserService {
  login: (data: ILoginRequest) => Promise<ILoginResponse>;
  register: (data: IRegisterRequest) => Promise<void>;
  getUser: () => Promise<ILoginResponse>;
  logout: () => Promise<void>;
}

export class UserService implements IUserService {
  private axiosClient: IAxiosClient;
  private readonly loginUrl = '/users/login';
  private readonly registerUrl = '/users';
  private readonly getUserUrl = '/users/details';
  private readonly logoutUrl = '/users/logout';

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
}

export interface ILoginRequest {
  username: string;
  password: string;
}
