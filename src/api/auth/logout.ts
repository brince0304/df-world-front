import {Dispatch} from "redux";
import createInstance from "../../common/axiosInstance";
import store, {
    RootState,
    UserDetail
} from "../../redux/store";
import {NavigateFunction} from "react-router-dom";
import {setHasNotification, setLogin, setLoginModalIsOpened, setUser} from "../../redux";
import {Action, ThunkAction} from "@reduxjs/toolkit";
import axios from "../../common/axiosInstance";
import {USER_LOGOUT_URL} from "../../data/ApiUrl";

export const logout=() : ThunkAction<void, RootState, unknown, Action>=> {
    return async (dispatch: Dispatch) => {
        axios().get(USER_LOGOUT_URL)
            .then((res: any) => {
                dispatch(setLogin(false));
                dispatch(setUser({} as UserDetail));
                dispatch(setHasNotification(false));
                dispatch(setLoginModalIsOpened(false));
                alert("로그아웃 되었습니다.")
                window.location.reload();
            })
            .catch((err: any) => {
                console.log(err)
                alert("로그아웃 실패")
            })
    }
}