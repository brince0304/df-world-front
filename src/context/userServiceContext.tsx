import { createContext, ReactNode, useContext } from 'react';
import { IUserService } from '../services/userService';

const userServiceContext = createContext<IUserService | null>(null);

export const useAuthService = () => useContext(userServiceContext);

const UserServiceProvider = ({ children, userService }: { children: ReactNode; userService: IUserService }) => {
  const login = userService.login.bind(userService);
  const register = userService.register.bind(userService);
  const getUser = userService.getUser.bind(userService);
  const logout = userService.logout.bind(userService);
  const kakaoLogin = userService.kakaoLogin.bind(userService);
  return (
    <userServiceContext.Provider value={{ login, register, getUser, logout, kakaoLogin }}>
      {children}
    </userServiceContext.Provider>
  );
};

export default UserServiceProvider;
