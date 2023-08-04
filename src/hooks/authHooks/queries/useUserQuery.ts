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
    initialData: userLocalStorage.getUser,
    onError: () => {
      userLocalStorage.clearUser();
      handleTokenExpiredError();
    },
  });

  useEffect(() => {
    if (!user) userLocalStorage.clearUser();
    else userLocalStorage.saveUser(user);
  }, [user]);
  useEffect(() => {
    if (!userLocalStorage.getUser) userLocalStorage.clearUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLocalStorage.getUser]);

  return {
    user: user ?? null,
  };
};
