import { Action } from "../types";

import { AuthService } from "../../services/Auth"

import { types } from "./actions";

export interface AuthState {
  isAuthenticated: boolean;
  isAuthenticating: boolean,
  error: Error | null,
}

const initReducer = (
  services: {
    authSvc: AuthService,
  }
) => {
  const INITIAL_STATE: AuthState = {
    isAuthenticated: true, //services.authSvc.isAuthenticated(),
    isAuthenticating: false,
    error: null,
  };

  return (state: AuthState = INITIAL_STATE, action: Action): AuthState => {
    const { type, payload } = action;

    switch (type) {
      case types.LOGIN_ATTEMPT:
        return {
          ...state,
          isAuthenticating: true
        };
      case types.LOGIN_SUCCESS:
        return {
          ...state,
          isAuthenticating: false,
          isAuthenticated: true,
        };
      case types.LOGIN_FAILURE:
        return {
          ...state,
          isAuthenticating: false,
          error: payload,
        }
      case types.REGISTRATION_ATTEMPT:
        return {
          ...state,
          isAuthenticating: false,
          isAuthenticated: false,
        }
      case types.REGISTRATION_FAILURE:
        return {
          ...state,
          error: payload,
        }
      case types.LOGOUT_SUCCESS:
        return {
          ...state,
          isAuthenticating: false,
          isAuthenticated: false,
          error: null,
        }
      default:
        return state;
    }
  };
};

export default initReducer;
