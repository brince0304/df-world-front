import { combineReducers, createSlice } from '@reduxjs/toolkit';
import { SearchOption } from '../interfaces/SeachBox';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const historySlice = createSlice({
  name: 'history',
  initialState: {
    characterHistory: [] as SearchOption[],
  },
  reducers: {
    setCharacterHistory: (state, action) => {
      state.characterHistory = action.payload;
    },
    pushCharacterHistory: (state, action) => {
      state.characterHistory.push(action.payload);
    },
    removeCharacterHistory: (state, action) => {
      state.characterHistory = state.characterHistory.filter((item: SearchOption) => item.id !== action.payload);
    },
  },
});

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    isLoading: false,
    progress: 0,
    isError: false,
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
    setIsError: (state, action) => {
      state.isError = action.payload;
    },
  },
});

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    hasNotification: false,
    notificationCount: 0,
  },
  reducers: {
    setHasNotification: (state, action) => {
      state.hasNotification = action.payload;
    },
    setNotificationCount: (state, action) => {
      state.notificationCount = action.payload;
    },
  },
});

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    loginModalOpened: false,
  },
  reducers: {
    setLoginModalOpened: (state, action) => {
      state.loginModalOpened = action.payload;
    },
  },
});

const reducers = combineReducers({
  app: appSlice.reducer,
  modal: modalSlice.reducer,
  history: historySlice.reducer,
  notification: notificationSlice.reducer,
});

const persistConfig = {
  key: 'persist',
  storage,
  whitelist: ['history', 'notification', 'auth'],
};

export const { setHasNotification, setNotificationCount } = notificationSlice.actions;
export const { setLoginModalOpened } = modalSlice.actions;
export const { setIsLoading, setProgress, setIsError } = appSlice.actions;
export const { setCharacterHistory, pushCharacterHistory, removeCharacterHistory } = historySlice.actions;

export default persistReducer(persistConfig, reducers);
