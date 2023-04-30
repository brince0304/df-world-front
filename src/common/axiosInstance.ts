import {setInterceptors} from "./interceptors";
import axios from 'axios';
const createInstance = () => {
    const instance = axios.create({
        baseURL: '',
        timeout: 100000000
    });

    return setInterceptors(instance)
}

export default createInstance;

