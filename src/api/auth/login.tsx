import axios from "axios";
import {NavigateFunction, useNavigate} from "react-router-dom";
import store from "../../redux/store";
import createInstance from "../../common/axios";
import {Dispatch} from "redux";
import {setLogin, setLoginModalIsOpened, setUser} from "../../redux";

export const login=(data:{
    username:string,
password:string }, setError:Function,dispatch:Dispatch, navigate:NavigateFunction)=>{
    const instance = createInstance("/users/login");
    instance.post('',data)
        .then((res)=>{
            const data = res.data.CURRENT_USER;
            store.dispatch(setUser(data));
            store.dispatch(setLogin(true));
            alert(data.userId+"님 환영합니다.");
            store.dispatch(setLoginModalIsOpened(false));
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