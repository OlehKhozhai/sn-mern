import {
  authActionsType,
  IUserRedux,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  REFRESH_USER_SUCCESS,
  REFRESH_USER_FAIL,
  LOGOUT,
} from './authTypes';

const initialState: IUserRedux = {
  token: '',
  name: '',
  email: '',
};

const authReducer = (
  state = initialState,
  action: authActionsType,
): IUserRedux => {
  switch (action.type) {
    case SIGN_UP_SUCCESS:
    case LOGIN_SUCCESS:
    case REFRESH_USER_SUCCESS:
      return { ...state, ...action.payload };

    case SIGN_UP_FAIL:
    case LOGIN_FAIL:
    case REFRESH_USER_FAIL:
    case LOGOUT:
      return { ...initialState };

    default:
      return state;
  }
};
export default authReducer;
