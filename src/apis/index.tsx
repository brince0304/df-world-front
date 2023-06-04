import axios, { AxiosInstance } from 'axios';
import store from "../redux/store";
import {setIsAuthenticated, setUserDetails} from "../redux";


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
            if (error.response.status === 401) {
                store.dispatch(setIsAuthenticated(false));
                store.dispatch(setUserDetails({}));
            }
            // 응답 에러 처리 로직
            return Promise.reject(error);
        }
    );

    return instance;
}

const baseURL = '';
const axiosInstance = (url:string,options?:any) => {
    const instance = axios.create({
        baseURL: url,
        ...options,
    });

    return setInterceptors(instance)
}

export default axiosInstance(baseURL);