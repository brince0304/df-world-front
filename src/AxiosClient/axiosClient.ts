import { AxiosInstance } from 'axios';

export interface IAxiosClient {
  get: (url: string, options?: any) => Promise<any>;
  post: (url: string, data?: any, options?: any) => Promise<any>;
  put: (url: string, data?: any, options?: any) => Promise<any>;
  delete: (url: string, options?: any) => Promise<any>;
}

export class AxiosClient implements IAxiosClient {
  private instance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.instance = axiosInstance;
  }

  async get(url: string, options?: any) {
    try {
      const { data } = await this.instance.get(url, options);
      return data;
    } catch (e) {
      throw new Error(e as string);
    }
  }

  async post(url: string, request?: any, options?: any) {
    try {
      const { data } = await this.instance.post(url, request, {
        ...options,
      });
      return data;
    } catch (e) {
      throw new Error(e as string);
    }
  }

  async put(url: string, request?: any, options?: any) {
    try {
      const { data } = await this.instance.put(url, request, {
        ...options,
      });
      return data;
    } catch (e) {
      throw new Error(e as string);
    }
  }

  async delete(url: string, options?: any) {
    try {
      return await this.instance.delete(url, {
        ...options,
      });
    } catch (e) {
      throw new Error(e as string);
    }
  }
}
