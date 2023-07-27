import { IAuthLoginResponse } from '../service/authService';

export interface IUserLocalStorage {
  getUser: () => IAuthLoginResponse | null;
  saveUser: (user: IAuthLoginResponse) => void;
  clearUser: () => void;
}

const userKey = 'user';

export const userLocalStorage: IUserLocalStorage = {
  getUser: () => {
    const user = localStorage.getItem(userKey);
    if (!user) return null;
    return JSON.parse(user);
  },
  saveUser: (user: IAuthLoginResponse) => {
    localStorage.setItem(userKey, JSON.stringify(user));
  },

  clearUser: () => {
    localStorage.removeItem(userKey);
  },
};
