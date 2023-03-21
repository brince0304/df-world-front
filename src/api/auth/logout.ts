import {Dispatch} from "redux";
import createInstance from "../../common/axios";
import store, {
    RootState,
    UserDetail
} from "../../redux/store";
import {NavigateFunction} from "react-router-dom";
import {setHasNotification, setLogin, setLoginModalIsOpened, setUser} from "../../redux";
import {Action, ThunkAction} from "@reduxjs/toolkit";

export const logout=() : ThunkAction<void, RootState, unknown, Action>=> {
    return async (dispatch: Dispatch) => {
        const instance = createInstance("/users/logout");
        instance.get('')
            .then((res: any) => {
                dispatch(setLogin(false));
                dispatch(setUser({} as UserDetail));
                dispatch(setHasNotification(false));
                dispatch(setLoginModalIsOpened(false));
                alert("로그아웃 되었습니다.")
            })
            .catch((err: any) => {
                console.log(err)
                alert("로그아웃 실패")
            })
    }
}