import store, { UserDetail} from "../redux/store";
import axios from "./axios";
import {AxiosInstance} from "axios";
import {useDispatch} from "react-redux";
import {setLogin, setUser} from "../redux";




export function setInterceptors(instance: AxiosInstance) {
    // 요청 인터셉터 추가
    instance.interceptors.request.use(
        (config) => {
            config.headers["Content-Type"] = "application/json";
            config.headers["Access-Control-Allow-Origin"] = "*";
            config.headers["Access-Control-Allow-Methods"] = "GET,PUT,POST,DELETE,PATCH,OPTIONS";
            config.headers["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, Content-Type, Accept, Authorization";
            config.headers["Access-Control-Allow-Credentials"] = "true";
            config.timeout = 100000000;
            // 요청 전처리 로직
            return config;
        },
        (error) => {
            console.log("error: ", error);
            // 요청 에러 처리 로직
            return Promise.reject(error);
        }
    );

    instance.interceptors.response.use(
        (response) => {

            // 응답 전처리 로직
            return response;
        },
        (error) => {
            if(error.response.status === 401){
                store.dispatch(setLogin(false));
                store.dispatch(setUser({}));
                alert("로그인이 필요합니다.")
            }
            // 응답 에러 처리 로직
            return Promise.reject(error);
        }
    );

    return instance;
}