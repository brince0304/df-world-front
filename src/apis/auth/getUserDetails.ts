import {Action, ThunkAction} from "@reduxjs/toolkit";
import {RootState} from "../../redux/store";
import {Dispatch} from "redux";
import {USER_DETAIL_URL} from "../data/urls";
import {setHasNotification, setIsAuthenticated, setNotificationCount, setUserDetails} from "../../redux";
import axiosInstance from "../../apis/index";

export const getUserDetails = ():ThunkAction<void, RootState, unknown, Action> => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        axiosInstance.get(USER_DETAIL_URL)
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
