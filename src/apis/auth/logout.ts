import {Dispatch} from "redux";
import store, {
    RootState,
} from "../../redux/store";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {setHasNotification, setIsAuthenticated, setLoginModalOpened, setUserDetails} from "../../redux";
import {Action, ThunkAction} from "@reduxjs/toolkit";
import {USER_LOGOUT_URL} from "../../data/ApiUrl";
import createInstance from "../index";
import {UserDetail} from "../data";

export const logout=() : ThunkAction<void, RootState, unknown, Action>=> {
    return async (dispatch: Dispatch) => {
        createInstance.get(USER_LOGOUT_URL)
            .then((res: any) => {
                dispatch(setIsAuthenticated(false));
                dispatch(setUserDetails({} as UserDetail));
                dispatch(setHasNotification(false));
                dispatch(setLoginModalOpened(false));
                window.location.reload();
            })
            .catch((err: any) => {
                console.log(err)
                alert("로그아웃 실패")
            })
    }
}