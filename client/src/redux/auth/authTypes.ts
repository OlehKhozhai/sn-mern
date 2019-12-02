export const SIGN_UP = 'SIGN_UP';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAIL = 'SIGN_UP_FAIL';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export const REFRESH_USER = 'REFRESH_USER';
export const REFRESH_USER_SUCCESS = 'REFRESH_USER_SUCCESS';
export const REFRESH_USER_FAIL = 'REFRESH_USER_FAIL';

export const LOGOUT = 'LOGOUT';

export interface IUserRedux {
  token: string;
  email: string;
  name: string;
}

export interface ISignUpActions {
  type: typeof SIGN_UP_SUCCESS;
  payload: IUserRedux;
}

export interface ILoginActions {
  type: typeof LOGIN_SUCCESS;
  payload: IUserRedux;
}

export interface ILogoutActions {
  type: typeof LOGOUT;
}

export interface IRefreshUserActions {
  type: typeof REFRESH_USER_SUCCESS;
  payload: IUserRedux;
}

export interface IAuthFailActions {
  type: typeof SIGN_UP_FAIL | typeof LOGIN_FAIL | typeof REFRESH_USER_FAIL;
}

export type authActionsType =
  | ISignUpActions
  | ILoginActions
  | ILogoutActions
  | IRefreshUserActions
  | IAuthFailActions;
