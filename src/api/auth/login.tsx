import axios from "axios";
import {NavigateFunction, useNavigate} from "react-router-dom";
import store, {RootState} from "../../redux/store";
import createInstance from "../../common/axios";
import {Dispatch} from "redux";
import {setLogin, setLoginModalIsOpened, setUser} from "../../redux";
import {Action, ThunkAction} from "@reduxjs/toolkit";

export const login=(data:{
    username:string,
password:string }, setError:Function, navigate:NavigateFunction):ThunkAction<void, RootState, unknown, Action>=>{
    return async (dispatch:Dispatch)=>{
    const instance = createInstance("/users/login");
    instance.post('',data)
        .then((res)=>{
            const data = res.data.CURRENT_USER;
            dispatch(setUser(data));
            dispatch(setLogin(true));
            alert(data.userId+"님 환영합니다.");
            dispatch(setLoginModalIsOpened(false));
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