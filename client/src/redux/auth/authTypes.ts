export const SIGN_UP = "SIGN_UP";
export const LOGIN = "LOGIN";
export const REFRESH_USER = "REFRESH_USER";

export interface IUserRedux {
  token: string;
  email: string;
  name: string;
  // avatar: string;
}

export interface ISignUpActions {
  type: typeof SIGN_UP;
  payload: IUserRedux;
}

export interface ILoginActions {
  type: typeof LOGIN;
  payload: IUserRedux;
}

export interface IRefreshUserActions {
  type: typeof REFRESH_USER;
  payload: IUserRedux;
}

export type authActionsType =
  | ISignUpActions
  | ILoginActions
  | IRefreshUserActions;
