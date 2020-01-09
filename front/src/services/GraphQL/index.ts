import jwtDecode from 'jwt-decode';
import { Service } from "../types";

import { HttpClient } from "../HttpClient";
import { SessionStorageService } from "../SessionStorage";

import { GQLResponse } from "../../common";

export class GraphQLClient extends Service {
  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _sessionStorageSvc: SessionStorageService,
  ) {
    super();
  }

  async do<T = any, V = any>(query: string, variables?: V): Promise<GQLResponse<T>> {
    const headers = this._prepateHeaders();

    const response = await  this._httpClient.post<GQLResponse<T>>(
      `/graphql/`,
      JSON.stringify({ query, variables }),
      { headers },
    );

    const data = response.data;

    if (data.errors && data.errors.length) {
      const errMessage: string = data.errors.map(err => err.message).join(",")
      throw new Error(errMessage)
    }

    return response.data;
  }

  private _prepateHeaders() {
    const headers: { [header: string]: string } = { 
      'Content-Type': 'application/json'
    };

    if (this._isAuthenticated()) {
      headers["Authorization"] = `JWT ${this._sessionStorageSvc.getKey()}`
    }
    return headers;
  }

  private _isAuthenticated(): boolean {
    const token = this._sessionStorageSvc.getKey();
    if (!token) {
      return false;
    }
    
    let data: { username: string } | undefined = undefined
    try {
      data = jwtDecode(token);
    } catch(e) {
      return false;
    }
    return !!(data && data.username);
  };
}
