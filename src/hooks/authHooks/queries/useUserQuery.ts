import { ILoginResponse } from '../../../services/userService';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../../../constants/myConstants';
import { useAuthService } from '../../../context/userServiceContext';
import { useEffect } from 'react';
import useAuthError from '../useAuthError';
import { userLocalStorage } from '../../../storages/userLocalStorage';

interface IUseUser {
  user: ILoginResponse | null;
}

export const useUserQuery = (): IUseUser => {
  const { getUser } = useAuthService();
  const { handleTokenExpiredError } = useAuthError();
  const { data: user } = useQuery<ILoginResponse | null>([QUERY_KEY.user], getUser, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    cacheTime: 0,
    onError: () => {
      userLocalStorage.clearUser();
      handleTokenExpiredError();
    },
  });

  useEffect(() => {
    if (!user) userLocalStorage.clearUser();
    else userLocalStorage.saveUser(user);
  }, [user]);

  return {
    user: user ?? null,
  };
};
