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
import AuthServiceProvider from './context/authContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const persistor = persistStore(store);
const client = new AxiosClient(axiosClient);
const authService = new AuthService(client);
const queryClient = new QueryClient();

root.render(
    <AuthServiceProvider authService={authService}>
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <BrowserRouter>
                      <SnackbarProvider maxSnack={3}>
                        <App/>
                      </SnackbarProvider>
                    </BrowserRouter>
                </PersistGate>
            </Provider>
        </QueryClientProvider>
    </AuthServiceProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
