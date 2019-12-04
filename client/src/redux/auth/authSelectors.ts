import { AppState } from "../store";
import {IUserRedux} from "./authTypes";

export const getUser = (state: AppState) => state.user;
export const getToken = (state: AppState): string => state.user.token;
