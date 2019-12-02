import { ILoginValues } from 'models/login';
import { SIGN_UP, LOGIN, REFRESH_USER, LOGOUT } from './authTypes';
import { ISignUpValues } from 'models/signUp';

export const signUpAction = (values: ISignUpValues) => ({
  type: SIGN_UP,
  values,
});
export const loginAction = (values: ILoginValues) => ({ type: LOGIN, values });
export const refreshUserAction = () => ({ type: REFRESH_USER });
export const logoutAction = () => ({ type: LOGOUT });
