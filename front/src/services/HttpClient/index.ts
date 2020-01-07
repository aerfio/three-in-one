import axios, { AxiosResponse } from 'axios';
import { Service } from "../types";

type RequestFn = (...args: any[]) => any

export class HttpClient extends Service {
  private _middlewares: RequestFn[] = [];

  constructor(
    private readonly _apiBasePath: string,
  ) {
    super();
  }
  
  async get<T = any, R = AxiosResponse<T>>(url: string, request?: RequestFn) {
    const result = await this.applyMiddlewares(request);
    return axios.get<T, R>(`${this._apiBasePath}/${url}`, result);
  };

  async post<T = any, R = AxiosResponse<T>>(url: string, body: any, request?: RequestFn) {
    const result = await this.applyMiddlewares(request);
    return axios.post<T, R>(`${this._apiBasePath}/${url}`, body, result);
  };

  async put<T = any, R = AxiosResponse<T>>(url: string, body: any, request?: RequestFn) {
    const result = await this.applyMiddlewares(request);
    return axios.put<T, R>(url, body, result);
  };

  async delete<T = any, R = AxiosResponse<T>>(url: string, request?: RequestFn) {
    const result = await this.applyMiddlewares(request);
    return axios.delete<T, R>(url, result);
  };

  addMiddleware(middleware: RequestFn) {
    this._middlewares.push(middleware);
  };

  private applyMiddlewares(initialRequest: any = {}) {
    return this._middlewares.reduce(async (request, applyChanges) => {
      return request.then(applyChanges);
    }, Promise.resolve(initialRequest));
  };
}


