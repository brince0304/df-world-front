import AuthServiceProvider from './authContext';
import MyPageServiceProvider from './myPageServiceContext';
import { ReactNode } from 'react';
import { IAuthService } from '../service/authService';
import { IMyPageService } from '../service/myPageService';
import { SnackbarProvider } from 'notistack';

const ServiceContextProvider = ({
  children,
  authService,
  myPageService,
}: {
  children: ReactNode;
  authService: IAuthService;
  myPageService: IMyPageService;
}) => {
  return (
    <AuthServiceProvider authService={authService}>
      <MyPageServiceProvider myPageService={myPageService}>
        <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
      </MyPageServiceProvider>
    </AuthServiceProvider>
  );
};

export default ServiceContextProvider;
