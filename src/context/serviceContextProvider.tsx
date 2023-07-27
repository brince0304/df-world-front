import UserServiceProvider from './userServiceContext';
import MyPageServiceProvider from './myPageServiceContext';
import { ReactNode } from 'react';
import { IUserService } from '../service/userService';
import { IMyPageService } from '../service/myPageService';
import { SnackbarProvider } from 'notistack';

const ServiceContextProvider = ({
  children,
  userService,
  myPageService,
}: {
  children: ReactNode;
  userService: IUserService;
  myPageService: IMyPageService;
}) => {
  return (
    <UserServiceProvider userService={userService}>
      <MyPageServiceProvider myPageService={myPageService}>
        <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
      </MyPageServiceProvider>
    </UserServiceProvider>
  );
};

export default ServiceContextProvider;
