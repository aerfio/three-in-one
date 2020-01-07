import { actionCreator } from "../../common";

export const types = {
  LOGIN_ATTEMPT: 'LOGIN_ATTEMPT',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',

  REGISTRATION_ATTEMPT: 'REGISTRATION_ATTEMPT',
  REGISTRATION_SUCCESS: 'REGISTRATION_SUCCESS',
  REGISTRATION_FAILURE: 'REGISTRATION_FAILURE',

  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
};

export function createActions() {
  const loginAttempt = actionCreator(types.LOGIN_ATTEMPT);
  const loginSuccess = actionCreator(types.LOGIN_SUCCESS);
  const loginFailure = actionCreator<Error>(types.LOGIN_FAILURE);

  const registrationAttempt = actionCreator(types.REGISTRATION_ATTEMPT);
  const registrationSuccess = actionCreator(types.REGISTRATION_SUCCESS);
  const registrationFailure = actionCreator<Error>(types.REGISTRATION_FAILURE);

  const logoutSuccess = actionCreator(types.LOGOUT_SUCCESS);

  return {
    loginAttempt,
    loginSuccess,
    loginFailure,

    registrationAttempt,
    registrationSuccess,
    registrationFailure,

    logoutSuccess,
  }
}

export type AuthActions = ReturnType<typeof createActions>;