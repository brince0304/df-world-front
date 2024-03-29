import axios, { AxiosInstance } from 'axios';

export function setInterceptors(instance: AxiosInstance) {
  // 요청 인터셉터 추가
  instance.interceptors.request.use(
    (config) => {
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
