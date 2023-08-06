import axios, { AxiosInstance } from 'axios';

export function setInterceptors(instance: AxiosInstance) {
  // 요청 인터셉터 추가
  instance.interceptors.request.use(
    (config) => {
      config.headers['Access-Control-Allow-Origin'] = '*';
      config.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS';
      config.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization';
      config.timeout = 100000000;
      // 요청 전처리 로직
      return config;
    },
    (error) => {
      console.info(error);
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if(error.response.status === 401) {
        localStorage.removeItem('user');
        window.location.href = '/';
      }
      return Promise.reject(error);
    },
  );

  return instance;
}

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8080/';
const axiosInstance = (url: string, options?: any) => {
  const instance = axios.create({
    baseURL: url,
    ...options,
    withCredentials: true,
  });

  return setInterceptors(instance);
};

export default axiosInstance(baseURL);
