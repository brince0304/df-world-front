import {Dispatch} from "redux";
import {RootState,} from "../../redux/store";
import {setHasNotification, setIsAuthenticated, setLoginModalOpened, setUserDetails} from "../../redux";
import {Action, ThunkAction} from "@reduxjs/toolkit";
import {USER_LOGOUT_URL} from "../data/urls";
import createInstance from "../index";
import {UserDetailOptions} from "../data";

export const getSignOut=() : ThunkAction<void, RootState, unknown, Action>=> {
    return async (dispatch: Dispatch) => {
        createInstance.get(USER_LOGOUT_URL)
            .then((res: any) => {
                dispatch(setIsAuthenticated(false));
                dispatch(setUserDetails({} as UserDetailOptions));
                dispatch(setHasNotification(false));
                dispatch(setLoginModalOpened(false));
            })
            .catch((err: any) => {
                console.log(err)
                alert("로그아웃 실패")
            })
    }
}