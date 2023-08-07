import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { AxiosClient } from './axiosClient/axiosClient';
import axiosClient from './apis/customAxios';
import { UserService } from './services/userService';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyPageService from './services/myPageService';
import ServiceContextProvider from './context/serviceContextProvider';
import { RecoilRoot } from 'recoil';
import CharacterService from './services/characterService';
import BoardService from './services/boardService';
import BoardCommentService from 'services/boardCommentService';
import PrivateRouter from './router/Router';
import { QUERY_KEY } from './constants/myConstants';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const client = new AxiosClient(axiosClient);
const authService = new UserService(client);
const characterService = new CharacterService(client);
const myPageService = new MyPageService(client);
const boardService = new BoardService(client);
const boardCommentService = new BoardCommentService(client);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      retry: false,
      staleTime: 1000 * 60 * 2,
    },
    mutations: {
      retry: false,
      onError: (error:any) => {
        if (error.response && error.response.status === 401) {
          queryClient.invalidateQueries([QUERY_KEY.user]);
        }
      }
    },
  },
});

root.render(
  <RecoilRoot>
    <ServiceContextProvider
      userService={authService}
      myPageService={myPageService}
      characterService={characterService}
      boardService={boardService}
      boardCommentService={boardCommentService}
    >
      <QueryClientProvider client={queryClient}>
        <PrivateRouter />
      </QueryClientProvider>
    </ServiceContextProvider>
  </RecoilRoot>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
