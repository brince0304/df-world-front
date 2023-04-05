import {setInterceptors} from "./interceptors";
import axios from 'axios';
const createInstance = () => {
    const instance = axios.create({
        baseURL: 'http://localhost:3000',
        timeout: 100000000
    });

    return setInterceptors(instance)
}

export default createInstance;

