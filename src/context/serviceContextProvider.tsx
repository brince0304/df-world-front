import UserServiceProvider from './userServiceContext';
import MyPageServiceProvider from './myPageServiceContext';
import { ReactNode } from 'react';
import { IUserService } from '../service/userService';
import { IMyPageService } from '../service/myPageService';
import { SnackbarProvider } from 'notistack';
import CharacterServiceProvider from './characterServiceContext';
import { ICharacterService } from '../service/characterService';
import { IBoardService } from '../service/boardService';
import BoardServiceProvider from './boardServiceContext';

const ServiceContextProvider = ({
  children,
  userService,
  myPageService,
  characterService,
  boardService,
}: {
  children: ReactNode;
  userService: IUserService;
  myPageService: IMyPageService;
  characterService: ICharacterService;
  boardService: IBoardService;
}) => {
  return (
    <BoardServiceProvider boardService={boardService}>
      <UserServiceProvider userService={userService}>
        <CharacterServiceProvider characterService={characterService}>
          <MyPageServiceProvider myPageService={myPageService}>
            <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
          </MyPageServiceProvider>
        </CharacterServiceProvider>
      </UserServiceProvider>
    </BoardServiceProvider>
  );
};

export default ServiceContextProvider;
