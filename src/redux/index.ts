import {combineReducers, createSlice} from "@reduxjs/toolkit";
import {SearchOption} from "../interfaces/SeachBox";
import {UserDetail} from "./store";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
    searchHistory: [] as SearchOption[],
    // 다른 프로퍼티
}

export const historySlice = createSlice({
    name: "searchHistory",
    initialState: {
        searchHistory : initialState
    },
    reducers: {
        setSearchHistory: (state, action) => {
            state.searchHistory.searchHistory = action.payload;
        },
        pushSearchHistory: (state, action) => {
            state.searchHistory.searchHistory.push(action.payload);
        },
        removeSearchHistory: (state, action) => {
            state.searchHistory.searchHistory = state.searchHistory.searchHistory.filter((item:SearchOption)=>item.id !== action.payload);
        }
    }
});

export const appSlice = createSlice({
    name: "app",
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
    }
});

export const loginSlice = createSlice({
    name: "login",
    initialState: {
        isLogin: false,
        user: {} as UserDetail,
        profileOpened: false,
    },
    reducers: {
        setLogin: (state, action) => {
            state.isLogin = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        toggleProfileOpened: (state) => {
            state.profileOpened = !state.profileOpened;
        }


    }
});


export const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        hasNotification: false,
        notificationCount: 0
    },
    reducers: {
        setHasNotification: (state, action) => {
            state.hasNotification = action.payload;
        },
        setNotificationCount: (state, action) => {
            state.notificationCount = action.payload;
        }
    }
});


export const loginModal = createSlice({
    name: "loginModalIsOpened",
    initialState: {
        isOpened: false
    },
    reducers: {
        setLoginModalIsOpened: (state, action) => {
            state.isOpened = action.payload;
        }
    }
});

const reducers = combineReducers({
    app: appSlice.reducer,
    login: loginSlice.reducer,
    loginModal: loginModal.reducer,
    searchHistory: historySlice.reducer,
    notification: notificationSlice.reducer
});


const persistConfig = {
    key: "persist",
    storage,
    whitelist: ["searchHistory","notification","login"]
};


export const {setLogin, setUser,toggleProfileOpened} = loginSlice.actions;

export const {setHasNotification,setNotificationCount} = notificationSlice.actions;
export const {setLoginModalIsOpened} = loginModal.actions;
export const {setIsLoading, setProgress, setIsError} = appSlice.actions;
export const {setSearchHistory,pushSearchHistory,removeSearchHistory} = historySlice.actions;

export default persistReducer(persistConfig, reducers);

