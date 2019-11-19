import {
  authActionsType,
  IUserRedux,
  LOGIN,
  REFRESH_USER,
  SIGN_UP
} from "./authTypes";
import { setToken } from "../../utils/tokenManager";

const initialState: IUserRedux = {
  token: "",
  name: "",
  email: "",
  // avatar: ""
};

const authReducer = (
  state = initialState,
  action: authActionsType
): IUserRedux => {
  switch (action.type) {
    case SIGN_UP:
    case LOGIN:
    case REFRESH_USER:
      setToken(action.payload.token);
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
export default authReducer;
