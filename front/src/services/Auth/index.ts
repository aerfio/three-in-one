import { Service } from "../types";
import { 
  AUTH_SESSION_STORAGE_TOKEN,
  LoginDTO, 
  RegistrationDTO
} from "./types";

import { HttpClient } from "../HttpClient";
import { SessionStorageService } from "../SessionStorage";

export class AuthService extends Service {
  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _sessionStorageSvc: SessionStorageService,
  ) {
    super()
  }

  async login(dto: LoginDTO): Promise<string> {
    const { token } = await this._httpClient.post<any, { token: string }>(`/login`, dto);
    return token;
  };
  
  async register(dto: RegistrationDTO) {
    await this._httpClient.post(`/registration`, dto);
  }

  logout() {
    this._sessionStorageSvc.clearKey();
  }

  getToken = () => {
    return this._sessionStorageSvc.getKey();
  };

  setToken = (token: string) => {
    return this._sessionStorageSvc.setKey(token);
  };

  isAuthenticated = () => {
    return !!this.getToken();
  };
}

export const configureAuthService = ({
  httpClient,
}: {
  httpClient: HttpClient,
}): AuthService => {
  const sessionStorageSvc = new SessionStorageService({ key: AUTH_SESSION_STORAGE_TOKEN });

  return new AuthService(
    httpClient, 
    sessionStorageSvc
  );
};
