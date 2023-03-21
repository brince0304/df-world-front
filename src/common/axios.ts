import axios from "axios";
import {setInterceptors} from "./interceptors";

const createInstance = (url:string) => {
    const instance = axios.create({
        baseURL: url,
        timeout: 100000000
    });

    return setInterceptors(instance)
}

export default createInstance;

