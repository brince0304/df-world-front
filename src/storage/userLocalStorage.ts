import { ILoginResponse } from '../service/userService';

export interface IUserLocalStorage {
  getUser: () => ILoginResponse | null;
  saveUser: (user: ILoginResponse) => void;
  clearUser: () => void;
}

const userKey = 'user';

export const userLocalStorage: IUserLocalStorage = {
  getUser: () => {
    const user = localStorage.getItem(userKey);
    if (!user) return null;
    return JSON.parse(user);
  },
  saveUser: (user: ILoginResponse) => {
    localStorage.setItem(userKey, JSON.stringify(user));
  },

  clearUser: () => {
    localStorage.removeItem(userKey);
  },
};
