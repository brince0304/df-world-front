import { createContext, ReactNode, useContext } from 'react';
import { IAuthService } from '../service/authService';

const authContext = createContext<IAuthService>({} as IAuthService);

export const useAuthService = () => useContext(authContext);

const AuthServiceProvider = ({children, authService,}: {  children:ReactNode,authService:IAuthService }) => {
    const login = authService.login.bind(authService);
    const register = authService.register.bind(authService);
    const getUser = authService.getUser.bind(authService);
    const logout = authService.logout.bind(authService);
    return (
        <authContext.Provider value={{login, register, getUser, logout}}>
            {children}
        </authContext.Provider>

    )
}

export default AuthServiceProvider;