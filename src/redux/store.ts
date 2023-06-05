import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import redux from "./index";


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
