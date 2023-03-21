import {Dispatch} from "redux";
import createInstance from "../../common/axios";
import UserDetail, {RootState} from "../../redux/store";
import {setHasNotification, setLogin, setUser} from "../../redux";
import {Action, ThunkAction} from "@reduxjs/toolkit";

export const getUser=():ThunkAction<void, RootState, unknown, Action> => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
    const instance = createInstance("/users/details");
    instance.get('')
        .then((res: any) => {
            if (res.data.user) {
                dispatch(setUser(res.data.user));
                dispatch(setLogin(true));
                if (res.data.notification > 0) {
                    dispatch(setHasNotification(true));
                }
            } else {
                dispatch(setUser({}));
                dispatch(setLogin(false))
                dispatch(setHasNotification(false));
            }
        })
        .catch((err: any) => {
            console.log(err)
            dispatch(setUser({}));
            dispatch(setLogin(false));
            dispatch(setHasNotification(false));
        })
}
}