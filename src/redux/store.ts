import {combineReducers, configureStore, createSlice} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {SearchOption} from "../interfaces/SeachBox";
import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore} from "redux-persist";
import redux, {appSlice, historySlice, loginModal, loginSlice} from "./index";
export interface UserDetail {
    userId: string;
    nickname: string;
    profileImgPath: string;
    email: string;

    adventureName: string;

    representCharacterName: string;

    serverId : string;

    serverName : string;

    characterCount : string;
}





const store = configureStore({
    reducer:  redux
    , devTools: true
    , middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false}),
})







export default store;


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();




