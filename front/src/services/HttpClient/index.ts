import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { Service } from "../types";

export class HttpClient extends Service {
  constructor(
    private readonly _apiBasePath: string,
  ) {
    super();
  }
  
  async get<T = any, R = AxiosResponse<T>>(url: string, params?: AxiosRequestConfig) {
    return axios.get<T, R>(`${this._apiBasePath}/${url}`, params);
  };

  async post<T = any, R = AxiosResponse<T>>(url: string, body: any, params?: AxiosRequestConfig) {
    return axios.post<T, R>(`${this._apiBasePath}/${url}`, body, params);
  };

  async put<T = any, R = AxiosResponse<T>>(url: string, body: any, params?: AxiosRequestConfig) {
    return axios.put<T, R>(url, body, params);
  };

  async delete<T = any, R = AxiosResponse<T>>(url: string, params?: AxiosRequestConfig) {
    return axios.delete<T, R>(url, params);
  };
}


