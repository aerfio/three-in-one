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
} from "./mutations";

export class AuthService extends Service {
  constructor(
    private readonly _gqlClient: GraphQLClient,
    private readonly _sessionStorageSvc: SessionStorageService,
  ) {
    super()
  }

  async login(dto: LoginDTO): Promise<string> {
    const response = await this._gqlClient.mutation<{ token: string }, LOGIN_MUTATION_VARIABLES>(
      LOGIN_MUTATION,
      {
        username: dto.email,
        password: dto.password,
      }
    );
    return response.data.token;
  };
  
  async register(dto: RegistrationDTO) {
    const response = await this._gqlClient.mutation<{ user: { id: string } }, REGISTRATION_MUTATION_VARIABLES>(
      REGISTRATION_MUTATION,
      {
        username: dto.email,
        password: dto.password,
      }
    );
    return response.data.user.id;
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
