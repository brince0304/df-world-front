import {USER_LOGIN_URL, USER_REGISTER_URL} from "../../data/ApiUrl";
import axios from "../../common/axiosInstance";
import createInstance from "../../common/axiosInstance";

export interface RegisterFormProps {
    email: string;
    userId: string;
    nickname: string;
    password: string;
    passwordCheck: string;
    isAgree: boolean;
}

export async function registerUser(data: RegisterFormProps,setError:any) {
    const response = axios().post(USER_REGISTER_URL, {
        userId: data.userId,
        nickname: data.nickname,
        email: data.email,
        password: data.password,
        passwordCheck: data.passwordCheck
    }).then((response) => {
        if(response.status === 200){
            alert("회원가입이 완료되었습니다.");
            window.location.href = "/";
        }
    }).catch((error) => {
        if(error.response.status === 409) {
            console.log(error.response.data);
            if(error.response.data.indexOf("아이디") !== -1){
                setError("userId", {
                    type: "manual",
                    message: error.response.data
                });
            }else if (error.response.data.indexOf("이메일") !== -1) {
                setError("email", {
                    type: "manual",
                    message: error.response.data
                });
            }else if(error.response.data.indexOf("닉네임") !== -1){
                setError("nickname", {
                    type: "manual",
                    message: error.response.data
                });
            }else{
                alert(error.response.data);
            }}
    });
}