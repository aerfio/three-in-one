
import { AxiosResponse } from 'axios';
import { Service } from "../types";

import { HttpClient } from "../HttpClient";
import { SessionStorageService } from "../SessionStorage";

export class GraphQLClient extends Service {
  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _sessionStorageSvc: SessionStorageService,
  ) {
    super();
  }

  async query<T = any>(query: string, variables?: any): Promise<AxiosResponse<T>> {
    const headers = this._prepateHeaders();

    return this._httpClient.post<T>(
      `/graphql`,
      JSON.stringify({ query, variables }),
      { headers },
    );
  }

  async mutation<T = any, V = any>(mutation: string, variables?: V): Promise<AxiosResponse<T>> {
    const headers = this._prepateHeaders();

    return this._httpClient.post<T>(
      `/graphql`,
      JSON.stringify({ mutation, variables }),
      { headers },
    );
  }

  private _prepateHeaders() {
    const headers: { [header: string]: string } = { 'Content-Type': 'application/json' };
    if (!!this._sessionStorageSvc.getKey()) {
      headers["Authorization"] = `JWT ${this._sessionStorageSvc.getKey()}`
    }
    return headers;
  }
}


