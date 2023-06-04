import {Dispatch} from "redux";
import {RootState} from "../../redux/store";
import {setHasNotification, setIsAuthenticated, setNotificationCount, setUserDetails} from "../../redux";
import {Action, ThunkAction} from "@reduxjs/toolkit";
import createInstance from "../index";
import {USER_DETAIL_URL} from "../data/urls";

export const getUser=():ThunkAction<void, RootState, unknown, Action> => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
    createInstance.get(USER_DETAIL_URL)
        .then((res) => {
            if (res.data.user) {
                dispatch(setUserDetails(res.data.user));
                dispatch(setIsAuthenticated(true));
                if (res.data.notification > 0) {
                    dispatch(setHasNotification(true));
                    dispatch(setNotificationCount(res.data.notification));
                }
            } else {
                dispatch(setUserDetails({}));
                dispatch(setIsAuthenticated(false))
                dispatch(setHasNotification(false));
            }
        })
        .catch((err) => {
            console.log(err)
            dispatch(setUserDetails({}));
            dispatch(setIsAuthenticated(false));
            dispatch(setHasNotification(false));
        })
}
}