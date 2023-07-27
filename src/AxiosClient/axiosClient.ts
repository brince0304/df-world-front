import { AxiosInstance } from 'axios';

export interface IAxiosClient {
  get: (url: string) => Promise<any>;
  post: (url: string, data: any) => Promise<any>;
  put: (url: string, data: any) => Promise<any>;
  delete: (url: string) => Promise<any>;
}

export class AxiosClient implements IAxiosClient {
  private instance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.instance = axiosInstance;
  }

  async get(url: string) {
    try {
      const { data } = await this.instance.get(url);
      return data;
    } catch (e) {
      throw new Error(e as string);
    }
  }

  async post(url: string, request: any) {
    try {
      const { data } = await this.instance.post(url, request);
      return data;
    } catch (e) {
      throw new Error(e as string);
    }
  }

  async put(url: string, request: any) {
    try {
      const { data } = await this.instance.put(url, request);
      return data;
    } catch (e) {
      throw new Error(e as string);
    }
  }

  async delete(url: string) {
    try {
      return await this.instance.delete(url);
    } catch (e) {
      throw new Error(e as string);
    }
  }
}
