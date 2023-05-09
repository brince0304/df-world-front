
import {NavigateFunction, useNavigate} from "react-router-dom";
import store, {RootState} from "../../redux/store";
import createInstance from "../../common/axiosInstance";
import {Dispatch} from "redux";
import {setLogin, setLoginModalOpened, setUser} from "../../redux";
import {Action, ThunkAction} from "@reduxjs/toolkit";
import {USER_LOGIN_URL} from "../../data/ApiUrl";
import axios from "../../common/axiosInstance";

export const login=(data:{
    username:string,
password:string }, setError:Function, navigate:NavigateFunction):ThunkAction<void, RootState, unknown, Action>=>{
    return async (dispatch:Dispatch)=>{
    axios().post(USER_LOGIN_URL,data)
        .then((res)=>{
            const data = res.data.CURRENT_USER;
            dispatch(setUser(data));
            dispatch(setLogin(true));
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