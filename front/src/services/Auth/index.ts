import jwtDecode from 'jwt-decode';
import { Service } from "../types";
import { 
  LoginDTO, 
  RegistrationDTO
} from "./types";

import { GraphQLClient } from "../GraphQL";
import { SessionStorageService } from "../SessionStorage";

import {
  REGISTRATION_MUTATION,
  REGISTRATION_MUTATION_VARIABLES,
  LOGIN_MUTATION,
  LOGIN_MUTATION_VARIABLES,
  LOGIN_MUTATION_RESPONSE,
} from "./mutations";

export class AuthService extends Service {
  constructor(
    private readonly _gqlClient: GraphQLClient,
    private readonly _sessionStorageSvc: SessionStorageService,
  ) {
    super()
  }

  async login(dto: LoginDTO): Promise<string> {
    const response = await this._gqlClient.do<LOGIN_MUTATION_RESPONSE, LOGIN_MUTATION_VARIABLES>(
      LOGIN_MUTATION,
      {
        username: dto.email,
        password: dto.password,
      }
    );
    return response.data.tokenAuth.token;
  };
  
  async register(dto: RegistrationDTO) {
    await this._gqlClient.do<{ user: { id: string } }, REGISTRATION_MUTATION_VARIABLES>(
      REGISTRATION_MUTATION,
      {
        username: dto.email,
        password: dto.password,
      }
    );
  }

  logout() {
    this._sessionStorageSvc.clearKey();
  }

  getToken = (): string | null => {
    return this._sessionStorageSvc.getKey();
  };

  setToken = (token: string) => {
    return this._sessionStorageSvc.setKey(token);
  };

  isAuthenticated = (): boolean => {
    const token = this.getToken();
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

export const configureAuthService = ({
  gqlClient,
  sessionStorageSvc,
}: {
  gqlClient: GraphQLClient,
  sessionStorageSvc: SessionStorageService
}): AuthService => {
  return new AuthService(
    gqlClient, 
    sessionStorageSvc
  );
};
