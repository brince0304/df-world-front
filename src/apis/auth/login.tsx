
import {NavigateFunction, useNavigate} from "react-router-dom";
import store, {RootState} from "../../redux/store";
import {Dispatch} from "redux";
import {setIsAuthenticated, setLoginModalOpened, setUserDetails} from "../../redux";
import {Action, ThunkAction} from "@reduxjs/toolkit";
import {USER_LOGIN_URL} from "../../data/ApiUrl";
import createInstance from "../index";

export const login=(data:{
    username:string,
password:string }, setError:Function, navigate:NavigateFunction):ThunkAction<void, RootState, unknown, Action>=>{
    return async (dispatch:Dispatch)=>{
    createInstance.post(USER_LOGIN_URL,data)
        .then((res)=>{
            const data = res.data.CURRENT_USER;
            dispatch(setUserDetails(data));
            dispatch(setIsAuthenticated(true));
            alert(data.userId+"님 환영합니다.");
            dispatch(setLoginModalOpened(false));
            window.location.reload();
        })
        .catch((err)=>{
            console.log(err)
            setError("username",{
                type:"manual",
                message:"아이디 또는 비밀번호가 일치하지 않습니다."
            })
            setError("password",{
                type:"manual",
                message:""
            })
        })
}
}