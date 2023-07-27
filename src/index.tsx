import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { AxiosClient } from './AxiosClient/axiosClient';
import axiosClient from './apis/axiosClient';
import { AuthService } from './service/authService';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyPageService from './service/myPageService';
import ServiceContextProvider from './context/serviceContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const persistor = persistStore(store);
const client = new AxiosClient(axiosClient);
const authService = new AuthService(client);
const myPageService = new MyPageService(client);
const queryClient = new QueryClient();

root.render(
  <ServiceContextProvider authService={authService} myPageService={myPageService}>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </ServiceContextProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
