import { AppState } from "../store";
import {IUserRedux} from "./authTypes";

export const getUser = (state: AppState): IUserRedux => state.user;
