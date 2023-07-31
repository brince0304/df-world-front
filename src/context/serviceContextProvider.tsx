import UserServiceProvider from './userServiceContext';
import MyPageServiceProvider from './myPageServiceContext';
import { ReactNode } from 'react';
import { IUserService } from '../services/userService';
import { IMyPageService } from '../services/myPageService';
import { SnackbarProvider } from 'notistack';
import CharacterServiceProvider from './characterServiceContext';
import { ICharacterService } from '../services/characterService';
import { IBoardService } from '../services/boardService';
import BoardServiceProvider from './boardServiceContext';
import { IBoardCommentService } from 'services/boardCommentService';
import BoardCommentServiceProvider from './boardCommentServiceContext';

const ServiceContextProvider = ({
  children,
  userService,
  myPageService,
  characterService,
  boardService,
  boardCommentService,
}: {
  children: ReactNode;
  userService: IUserService;
  myPageService: IMyPageService;
  characterService: ICharacterService;
  boardService: IBoardService;
  boardCommentService: IBoardCommentService;
}) => {
  return (
    <UserServiceProvider userService={userService}>
      <BoardServiceProvider boardService={boardService}>
        <BoardCommentServiceProvider boardCommentService={boardCommentService}>
          <CharacterServiceProvider characterService={characterService}>
            <MyPageServiceProvider myPageService={myPageService}>
              <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
            </MyPageServiceProvider>
          </CharacterServiceProvider>
      </BoardCommentServiceProvider>
    </BoardServiceProvider>
  </UserServiceProvider>

  );
};

export default ServiceContextProvider;
