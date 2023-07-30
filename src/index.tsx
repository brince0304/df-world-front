import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AxiosClient } from './AxiosClient/axiosClient';
import axiosClient from './apis/axiosClient';
import { UserService } from './service/userService';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyPageService from './service/myPageService';
import ServiceContextProvider from './context/serviceContextProvider';
import { RecoilRoot } from 'recoil';
import CharacterService from './service/characterService';
import BoardService from './service/boardService';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const client = new AxiosClient(axiosClient);
const authService = new UserService(client);
const characterService = new CharacterService(client);
const myPageService = new MyPageService(client);
const boardService = new BoardService(client);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      suspense: true,
      staleTime: 1000 * 60 * 5,
    },
    mutations:{
      retry: false,
    }
}
});

root.render(
  <RecoilRoot>
  <ServiceContextProvider userService={authService} myPageService={myPageService} characterService={characterService} boardService={boardService}>
    <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
    </QueryClientProvider>
  </ServiceContextProvider>
  </RecoilRoot>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
