import { ILoginResponse } from '../../service/userService';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../../constants/queryKeys';
import { useAuthService } from '../../context/userServiceContext';
import { useEffect } from 'react';
import useAuthError from './useAuthError';
import { userLocalStorage } from '../../storage/userLocalStorage';

interface IUseUser {
  user: ILoginResponse | null;
}

export const useUser = (): IUseUser => {
  const { getUser } = useAuthService();
  const { handleTokenExpiredError } = useAuthError();
  const { data: user } = useQuery<ILoginResponse | null>(
    [QUERY_KEY.user],
    async (): Promise<ILoginResponse | null> => getUser(),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      initialData: userLocalStorage.getUser,
      onError: () => {
        userLocalStorage.clearUser();
        handleTokenExpiredError();
      },
    },
  );

  useEffect(() => {
    if (!user) userLocalStorage.clearUser();
    else userLocalStorage.saveUser(user);
  }, [user]);

  return {
    user: user ?? null,
  };
};
